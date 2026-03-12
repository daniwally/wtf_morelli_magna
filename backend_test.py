#!/usr/bin/env python3
"""
MAGNA Microsite Backend API Testing
Tests all backend endpoints for the MAGNA premium kitchen line microsite
"""

import requests
import sys
import json
from datetime import datetime
import time

class MAGNABackendTester:
    def __init__(self, base_url="https://magna-premium.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []
        
        print(f"🔬 MAGNA Backend API Testing")
        print(f"📡 Base URL: {base_url}")
        print(f"🔗 API URL: {self.api_url}")
        print("=" * 60)

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Test {self.tests_run}: {name}")
        print(f"📋 {method} {endpoint}")
        
        try:
            start_time = time.time()
            
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=30)
            else:
                raise ValueError(f"Unsupported method: {method}")

            elapsed = round(time.time() - start_time, 3)
            
            success = response.status_code == expected_status
            
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_time": elapsed,
                "timestamp": datetime.now().isoformat()
            }
            
            if success:
                self.tests_passed += 1
                print(f"✅ PASSED - Status: {response.status_code} ({elapsed}s)")
                
                # Try to parse JSON response
                try:
                    response_data = response.json()
                    result["response_data"] = response_data
                    if isinstance(response_data, dict) and len(response_data) < 5:
                        print(f"📄 Response: {json.dumps(response_data, indent=2)}")
                except:
                    result["response_data"] = response.text[:200] + "..." if len(response.text) > 200 else response.text
                    
            else:
                print(f"❌ FAILED - Expected {expected_status}, got {response.status_code} ({elapsed}s)")
                try:
                    error_data = response.json()
                    print(f"🚨 Error Response: {json.dumps(error_data, indent=2)}")
                    result["error_data"] = error_data
                except:
                    print(f"🚨 Error Text: {response.text}")
                    result["error_data"] = response.text

            self.test_results.append(result)
            return success, response.json() if success else {}

        except requests.exceptions.Timeout:
            print(f"⏱️  TIMEOUT - Request took longer than 30 seconds")
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "success": False,
                "error": "Request timeout"
            }
            self.test_results.append(result)
            return False, {}
            
        except Exception as e:
            print(f"💥 EXCEPTION - {str(e)}")
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "success": False,
                "error": str(e)
            }
            self.test_results.append(result)
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "/",
            200
        )

    def test_create_status_check(self):
        """Test status check creation"""
        test_data = {
            "client_name": "MAGNA_TEST_CLIENT"
        }
        
        return self.run_test(
            "Create Status Check",
            "POST",
            "/status",
            200,
            data=test_data
        )

    def test_get_status_checks(self):
        """Test getting status checks"""
        return self.run_test(
            "Get Status Checks",
            "GET",
            "/status",
            200
        )

    def test_contact_form_submission(self):
        """Test contact form submission with all fields"""
        timestamp = datetime.now().strftime("%H%M%S")
        test_data = {
            "name": f"Test User MAGNA {timestamp}",
            "email": f"test.magna.{timestamp}@example.com",
            "phone": "+56912345678",
            "product_interest": "MAGNA 1200",
            "message": "Interesado en cotización para proyecto residencial premium",
            "language": "es"
        }
        
        return self.run_test(
            "Contact Form Submission (Full)",
            "POST",
            "/contact",
            200,
            data=test_data
        )

    def test_contact_form_minimal(self):
        """Test contact form with minimal required fields"""
        timestamp = datetime.now().strftime("%H%M%S")
        test_data = {
            "name": f"Test Minimal {timestamp}",
            "email": f"test.minimal.{timestamp}@example.com", 
            "phone": "+56987654321",
            "language": "pt"
        }
        
        return self.run_test(
            "Contact Form Submission (Minimal)",
            "POST",
            "/contact",
            200,
            data=test_data
        )

    def test_contact_form_validation(self):
        """Test contact form validation with invalid data"""
        test_data = {
            "name": "",
            "email": "invalid-email",
            "phone": "",
        }
        
        return self.run_test(
            "Contact Form Validation (Invalid)",
            "POST",
            "/contact",
            422,  # Validation error
            data=test_data
        )

    def test_get_contact_leads(self):
        """Test getting all contact leads"""
        return self.run_test(
            "Get Contact Leads",
            "GET",
            "/leads",
            200
        )

    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"🎯 Total Tests: {self.tests_run}")
        print(f"✅ Passed: {self.tests_passed}")
        print(f"❌ Failed: {self.tests_run - self.tests_passed}")
        print(f"📈 Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%" if self.tests_run > 0 else "0%")
        
        if self.tests_passed == self.tests_run:
            print("\n🎉 ALL TESTS PASSED! Backend API is working correctly.")
            return True
        else:
            print(f"\n⚠️  {self.tests_run - self.tests_passed} TEST(S) FAILED!")
            print("🔧 Check failed tests above for details.")
            return False

def main():
    """Main testing function"""
    tester = MAGNABackendTester()
    
    try:
        # Core API Tests
        print("\n🚀 STARTING API TESTS...")
        
        # Test basic connectivity
        tester.test_root_endpoint()
        
        # Test status endpoints
        tester.test_create_status_check()
        tester.test_get_status_checks()
        
        # Test contact form (main feature)
        print(f"\n📧 TESTING CONTACT FORM (Main Feature)...")
        tester.test_contact_form_submission()
        tester.test_contact_form_minimal()
        tester.test_contact_form_validation()
        
        # Test lead retrieval
        tester.test_get_contact_leads()
        
    except KeyboardInterrupt:
        print("\n⚠️  Testing interrupted by user")
        return 1
    except Exception as e:
        print(f"\n💥 Critical error during testing: {str(e)}")
        return 1
    
    # Print final summary
    success = tester.print_summary()
    
    # Save test results to JSON file
    try:
        with open('/app/backend_test_results.json', 'w') as f:
            json.dump({
                "summary": {
                    "total_tests": tester.tests_run,
                    "passed_tests": tester.tests_passed,
                    "failed_tests": tester.tests_run - tester.tests_passed,
                    "success_rate": round(tester.tests_passed/tester.tests_run*100, 1) if tester.tests_run > 0 else 0,
                    "timestamp": datetime.now().isoformat()
                },
                "test_results": tester.test_results
            }, f, indent=2)
        print(f"📄 Test results saved to: /app/backend_test_results.json")
    except Exception as e:
        print(f"⚠️  Could not save test results: {str(e)}")
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())