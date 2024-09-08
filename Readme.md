**API Endpoint's**

**Base URL**
https://tora-backend.onrender.com/api/users

**Register a New User**
Endpoint: /register
Method: POST

**Payload**  
{
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "yourpassword"
   }

**Login User**
Endpoint: /login
Method: POST

**Payload**
{
      "email": "johndoe@example.com",
      "password": "yourpassword"
}

**Forgot Password**
Endpoint: /forgot-password
Method: POST

**Payload**
{
  "email": "johndoe@example.com"
}

An email would be sent


**Reset Password**
Endpoint: /reset-password/:token
Method: POST

**Payload**
{
  "password": "newpassword"
}
