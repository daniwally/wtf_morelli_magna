from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', 'valeria@wtf-agency.com')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactLead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    message: Optional[str] = ""
    product_interest: Optional[str] = ""
    language: str = "es"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactLeadCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: Optional[str] = ""
    product_interest: Optional[str] = ""
    language: str = "es"

# Routes
@api_router.get("/")
async def root():
    return {"message": "MAGNA API - Morelli Premium Kitchen"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.post("/contact", response_model=ContactLead)
async def create_contact_lead(input: ContactLeadCreate):
    """Create a new contact lead and send email notification"""
    lead_dict = input.model_dump()
    lead_obj = ContactLead(**lead_dict)
    
    # Prepare document for MongoDB
    doc = lead_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    # Save to MongoDB
    _ = await db.contact_leads.insert_one(doc)
    
    # Send email notification
    try:
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #050505; color: #F5F5F5; padding: 40px; }}
                .container {{ max-width: 600px; margin: 0 auto; background-color: #0A0A0A; border: 1px solid #262626; padding: 40px; }}
                .header {{ text-align: center; border-bottom: 1px solid #262626; padding-bottom: 20px; margin-bottom: 30px; }}
                .logo {{ font-family: serif; font-size: 32px; letter-spacing: 8px; color: #E5E5E5; }}
                .subtitle {{ font-size: 12px; letter-spacing: 4px; color: #666; margin-top: 10px; }}
                .field {{ margin-bottom: 20px; }}
                .label {{ font-size: 10px; letter-spacing: 2px; color: #666; text-transform: uppercase; margin-bottom: 5px; }}
                .value {{ font-size: 16px; color: #F5F5F5; }}
                .message-box {{ background-color: #121212; padding: 20px; border-left: 2px solid #E5E5E5; margin-top: 30px; }}
                .footer {{ text-align: center; margin-top: 40px; font-size: 11px; color: #666; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">MAGNA</div>
                    <div class="subtitle">NUEVO LEAD DE COTIZACIÓN</div>
                </div>
                
                <div class="field">
                    <div class="label">Nombre</div>
                    <div class="value">{lead_obj.name}</div>
                </div>
                
                <div class="field">
                    <div class="label">Email</div>
                    <div class="value">{lead_obj.email}</div>
                </div>
                
                <div class="field">
                    <div class="label">Teléfono</div>
                    <div class="value">{lead_obj.phone}</div>
                </div>
                
                <div class="field">
                    <div class="label">Producto de Interés</div>
                    <div class="value">{lead_obj.product_interest or 'No especificado'}</div>
                </div>
                
                <div class="field">
                    <div class="label">Idioma</div>
                    <div class="value">{'Español' if lead_obj.language == 'es' else 'Português'}</div>
                </div>
                
                {f'<div class="message-box"><div class="label">Mensaje</div><div class="value">{lead_obj.message}</div></div>' if lead_obj.message else ''}
                
                <div class="footer">
                    MORELLI — Profesional por origen. Premium por ejecución.<br>
                    Fecha: {lead_obj.created_at.strftime('%d/%m/%Y %H:%M')} UTC
                </div>
            </div>
        </body>
        </html>
        """
        
        params = {
            "from": SENDER_EMAIL,
            "to": [RECIPIENT_EMAIL],
            "subject": f"🔥 Nuevo Lead MAGNA - {lead_obj.name}",
            "html": html_content
        }
        
        # Run sync SDK in thread to keep FastAPI non-blocking
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email sent successfully for lead: {lead_obj.email}")
        
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        # Don't fail the request if email fails, lead is already saved
    
    return lead_obj

@api_router.get("/leads", response_model=List[ContactLead])
async def get_contact_leads():
    """Get all contact leads"""
    leads = await db.contact_leads.find({}, {"_id": 0}).to_list(1000)
    for lead in leads:
        if isinstance(lead['created_at'], str):
            lead['created_at'] = datetime.fromisoformat(lead['created_at'])
    return leads

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
