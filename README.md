# MAGNA Microsite - Morelli Premium Kitchen

## Descripción
Microsite premium para la línea MAGNA de Morelli. Concepto: "Silenciosamente Imponente".

## Tech Stack
- **Frontend**: React + Tailwind CSS + Framer Motion + Shadcn UI
- **Backend**: FastAPI + MongoDB + Resend
- **Idiomas**: Español, Portugués, Inglés

## Estructura del Proyecto
```
/app
├── backend/          # FastAPI backend
│   ├── server.py     # API principal
│   ├── requirements.txt
│   └── .env          # Variables de entorno
├── frontend/         # React frontend
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── translations.js
│   │   └── App.js
│   └── package.json
```

## Variables de Entorno

### Backend (.env)
```
MONGO_URL=mongodb://...
DB_NAME=magna_db
RESEND_API_KEY=re_xxxxx
SENDER_EMAIL=onboarding@resend.dev
RECIPIENT_EMAIL=valeria@wtf-agency.com
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=https://your-backend-url.com
```

## Deploy en Railway

### 1. Crear servicios en Railway:
- **MongoDB**: Agregar servicio de base de datos MongoDB
- **Backend**: Deploy desde `/backend` folder
- **Frontend**: Deploy desde `/frontend` folder

### 2. Configurar variables de entorno en cada servicio

### 3. Conectar servicios internamente

## Desarrollo Local

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --port 8001
```

### Frontend
```bash
cd frontend
yarn install
yarn start
```

## Funcionalidades
- Hero con video aleatorio
- Manifiesto de marca
- Showcase de productos MAGNA 1200 y MAGNA 900
- Especificaciones técnicas
- Galería con hover mostrando modelo
- Formulario de contacto con envío de email
- Selector de idioma (ES/PT/EN)
