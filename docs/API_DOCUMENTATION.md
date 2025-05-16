# Labrador Pet Shop API Documentation

This document provides details on the endpoints available in the Labrador Pet Shop API.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Many endpoints require authentication using JWT (JSON Web Tokens).

To authenticate requests, include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### User Management

#### Register a new user

```http
POST /users/register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}
```

**Response:**

```json
{
  "status": "success",
  "token": "jwt_token_here",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

#### Login

```http
POST /users/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "status": "success",
  "token": "jwt_token_here",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

### Products

#### Get all products

```http
GET /products
```

Query parameters:
- `page`: Page number (default: 1)
- `limit`: Number of products per page (default: 10)
- `sort`: Sort by fields (e.g., "price,-createdAt")
- `category`: Filter by category
- `ageRange`: Filter by age range
- `minPrice`: Minimum price
- `maxPrice`: Maximum price

**Response:**

```json
{
  "status": "success",
  "results": 10,
  "data": {
    "products": [
      {
        "_id": "product_id",
        "name": "Premium Labrador Food",
        "description": "High-quality food for your Labrador",
        "price": 49.99,
        "category": "food",
        "ageRange": "adult",
        "stock": 100,
        "images": ["image1.jpg", "image2.jpg"],
        "mainImage": "main.jpg",
        "ratings": {
          "average": 4.5,
          "count": 20
        }
      }
      // More products...
    ]
  },
  "pagination": {
    "totalProducts": 50,
    "totalPages": 5,
    "currentPage": 1,
    "limit": 10
  }
}
```

### Appointments

#### Create an appointment

```http
POST /appointments
```

**Request Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**

```json
{
  "serviceType": "grooming",
  "date": "2025-06-15T10:00:00.000Z",
  "labProfile": "lab_profile_id",
  "notes": "Please trim nails as well"
}
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "appointment": {
      "_id": "appointment_id",
      "user": "user_id",
      "serviceType": "grooming",
      "date": "2025-06-15T10:00:00.000Z",
      "labProfile": "lab_profile_id",
      "notes": "Please trim nails as well",
      "status": "scheduled",
      "createdAt": "2025-05-16T12:00:00.000Z"
    }
  }
}
```

## Error Responses

In case of errors, the API will respond with appropriate HTTP status codes and error messages:

```json
{
  "status": "error",
  "message": "Error message here"
}
```

Common error status codes:
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error
