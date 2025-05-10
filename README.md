# 🏋️‍♂️ Gym Class Scheduling and Membership Management System

A complete backend system for managing gym class scheduling, trainer assignments, and trainee bookings with robust authentication and business rule enforcement.

---

## Features

- **Role-Based Access Control**: Admin, Trainer, and Trainee roles
- **Class Management**: Schedule, update, and cancel classes with capacity limits
- **Booking System**: Trainee booking with conflict detection
- **Authentication**: JWT-based secure authentication
- **Validation**: Comprehensive input validation
- **Error Handling**: Custom error responses with proper status codes
- **Pagination & Filtering**: Efficient data retrieval
- **Database Management**: Prisma ORM with PostgreSQL

## Important Link

- **Live Link**: https://gymbackend-pi.vercel.app
- **Postman Documentation**: https://documenter.getpostman.com/view/20207336/2sB2j98UUr
- **ER Diagram**: https://drive.google.com/file/d/1BZCunAjsPcr_Dkc-KaiQQTNCrsgFpSE5/view?usp=sharing

## 🛠️ Technology Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Input Validation**: zod
- **Documentation**: POSTMAN ([postman](https://documenter.getpostman.com/view/20207336/2sB2j98UUr))

### Deployment

- **Vercel**

---

## 📡 API Endpoints

### User Routes

#### create Trainer

```http
  POST https://gymbackend-pi.vercel.app/api/v1/user/create-trainer

```

- Request Headers

```http
 Authorization: Admin Token
```

- Request Body:

```http
{
   
    "firstName": "Abul Ala",
    "lastName": "Jobayar",
    "email": "abulalajobssssbxb@gmail.com",
    "password": "12345"

}
```

- Response:

```http

   {
    
    "success": true,
    "statusCode": 201,
    "message": "Trainer created successfully",
    "data": {
        "id": "e8bee46a-7456-40fb-a232-be5483a52809",
        "firstName": "Abul Ala",
        "lastName": "Jobayar",
        "email": "abulalajobssssbxb@gmail.com",
        "isDeleted": false,
        "createdAt": "2025-05-10T02:50:12.271Z",
        "updatedAt": "2025-05-10T02:50:12.271Z",
        "role": "TRAINER"
    }
}

```

#### create Trainee

```http
  POST https://gymbackend-pi.vercel.app/api/v1/user/create-trainee

```

- Request Body:

```http

   {
    "firstName": "Abul Ala",
    "lastName": "Jobayar",
    "email": "abulalajobssssbxb@gmail.com",
    "password": "12345"
}

```

- Response:

```http


{
    "success": true,
    "statusCode": 201,
    "message": "Trainee created successfully",
    "data": {
        "id": "415ad20f-1472-404f-919d-53075bfb5847",
        "firstName": "Abul Ala",
        "lastName": "Jobayar",
        "email": "jobyar12345eea@gmail.com",
        "isDeleted": false,
        "createdAt": "2025-05-10T02:50:35.368Z",
        "updatedAt": "2025-05-10T02:50:35.368Z",
        "role": "TRAINEE"
    }
}

```

#### All Trainer

```http
  GET https://gymbackend-pi.vercel.app/api/v1/user/trainers

```

- Request Headers

```http
 Authorization: Admin Token
```

- Response:

```http

  {
    "success": true,
    "statusCode": 200,
    "message": "Trainee retrieved successfully",
    "data": [
        {
            "id": "75929507-f2ed-4504-aafa-77d52265dbac",
            "firstName": "Abul Ala",
            "lastName": "Jobayar",
            "email": "abulalajobssss@gmail.com",
            "isDeleted": false,
            "createdAt": "2025-05-08T20:32:39.483Z",
            "updatedAt": "2025-05-08T20:32:39.483Z",
            "user": {
                "email": "abulalajobssss@gmail.com",
                "role": "TRAINER"
            }
        },
        {
            "id": "0557bdc8-5bd8-4d44-983c-0478a040ae7a",
            "firstName": "Abul Ala",
            "lastName": "Jobayar",
            "email": "abulalajobssssbb@gmail.com",
            "isDeleted": false,
            "createdAt": "2025-05-09T18:40:35.841Z",
            "updatedAt": "2025-05-09T18:40:35.841Z",
            "user": {
                "email": "abulalajobssssbb@gmail.com",
                "role": "TRAINER"
            }
        },
        {
            "id": "ff78071e-5261-46cf-b391-5ecfb1c280d2",
            "firstName": "Abul Ala",
            "lastName": "Jobayar",
            "email": "abulalajobssssbbv@gmail.com",
            "isDeleted": false,
            "createdAt": "2025-05-09T18:41:16.825Z",
            "updatedAt": "2025-05-09T18:41:16.825Z",
            "user": {
                "email": "abulalajobssssbbv@gmail.com",
                "role": "TRAINER"
            }
        },
        {
            "id": "b42fff8e-474e-4252-b75f-332d8c0ee9ce",
            "firstName": "Abul Ala",
            "lastName": "Jobayar",
            "email": "abulalajobssssbxb@gmail.com",
            "isDeleted": false,
            "createdAt": "2025-05-10T02:50:12.732Z",
            "updatedAt": "2025-05-10T02:50:12.732Z",
            "user": {
                "email": "abulalajobssssbxb@gmail.com",
                "role": "TRAINER"
            }
        }
    ]
}

```

### Auth Routes

#### User Login

```http
  POST https://gymbackend-pi.vercel.app/api/v1/auth/login
```

- Request Body:

```http

  {
    "email": "abulalajobssss@gmail.com",
    "password": "12345"
}

```

- Response:

```http


{
    "success": true,
    "statusCode": 200,
    "message": "User logged in successfully !",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ZWZjMjBkOS1iOTViLTRjMzItYjM4Zi00NjE5NDQ0Mzc1YWIiLCJyb2xlIjoiVFJBSU5FRSIsImVtYWlsIjoiam9ieWFyMTIzNDVAZ21haWwuY29tIiwiaWF0IjoxNzQ2ODE2MjM1LCJleHAiOjE3NDk0MDgyMzV9.KcU4O_kFh_f6A_A96U1oWxPC70de8qLuOqnBlyy7ssY"
    }
}

```

### Class Routes

#### create class

```http
  POST https://gymbackend-pi.vercel.app/api/v1/class/create-classes

```

- Request Headers

```http
 Authorization: Admin Token
```

- Request Body:

```http

 {
  "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
  "title": "Morning Strength Training",
  "description": "A two-hour class focused on strength training for all levels.",
  "date": "2025-05-16",
  "startTime": "07:00 AM"
}

```

- Response:

```http

   {
    "success": true,
    "statusCode": 201,
    "message": "Class Created successfully",
    "data": {
        "id": "61efa740-4763-4024-b739-346e615abe52",
        "title": "Morning Strength Training",
        "description": "A two-hour class focused on strength training for all levels.",
        "date": "2025-05-14T18:00:00.000Z",
        "startTime": "07:00 PM",
        "endTime": "09:00 PM",
        "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
        "maxTrainees": 10,
        "status": "ACTIVE",
        "createdAt": "2025-05-09T18:28:33.739Z",
        "updatedAt": "2025-05-09T18:28:33.739Z"
    }
}

```

- Error Response:

```http

   {
    "success": false,
    "message": "Trainer already has a class during 09:00 PM - 11:00 PM",
    "errorDetails": [
        {
            "field": "",
            "message": "Trainer already has a class during 09:00 PM - 11:00 PM"
        }
    ]
}

```

- Error Response:

```http

  {
    "success": false,
    "message": "Maximum of 5 classes per day reached.",
    "errorDetails": [
        {
            "field": "",
            "message": "Maximum of 5 classes per day reached."
        }
    ]
}

```

#### Trainer classes

```http
  GET https://gymbackend-pi.vercel.app/api/v1/class/my-classes

```

- Request Headers

```http
 Authorization: Trainer Token
```

- Response:

```http

  {
    "success": true,
    "statusCode": 200,
    "message": "Class Retrieved successfully",
    "data": [
        {
            "id": "1a6c5637-75e7-48e3-85c3-10eedd0fe9fd",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "date": "2025-05-09T18:00:00.000Z",
            "startTime": "2025-05-10T04:00:00.000Z",
            "endTime": "2025-05-10T06:00:00.000Z",
            "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
            "maxTrainees": 10,
            "status": "ACTIVE",
            "createdAt": "2025-05-09T04:39:59.166Z",
            "updatedAt": "2025-05-09T04:39:59.166Z"
        },
        {
            "id": "52c2fce1-2d4a-47b2-8587-8d60a87ad252",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "date": "2025-05-09T18:00:00.000Z",
            "startTime": "2025-05-10T17:30:00.000Z",
            "endTime": "2025-05-10T19:30:00.000Z",
            "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
            "maxTrainees": 10,
            "status": "ACTIVE",
            "createdAt": "2025-05-09T04:46:52.259Z",
            "updatedAt": "2025-05-09T04:46:52.259Z"
        },
        {
            "id": "049aa606-1e09-484b-9de0-4532e44a995e",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "date": "2025-05-09T18:00:00.000Z",
            "startTime": "2025-05-10T02:00:00.000Z",
            "endTime": "2025-05-10T04:00:00.000Z",
            "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
            "maxTrainees": 10,
            "status": "FULL",
            "createdAt": "2025-05-09T04:38:21.454Z",
            "updatedAt": "2025-05-09T08:42:24.276Z"
        },
        {
            "id": "a0d10469-14fc-45ef-adb9-2b977ce093d3",
            "title": "Morning Training",
            "description": "A two-hour class focused on strength training for all levels at a time.",
            "date": "2025-05-09T18:00:00.000Z",
            "startTime": "2025-05-10T10:00:00.000Z",
            "endTime": "2025-05-10T12:00:00.000Z",
            "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
            "maxTrainees": 10,
            "status": "ACTIVE",
            "createdAt": "2025-05-09T04:48:03.085Z",
            "updatedAt": "2025-05-09T16:41:40.485Z"
        },
        {
            "id": "61efa740-4763-4024-b739-346e615abe52",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "date": "2025-05-14T18:00:00.000Z",
            "startTime": "2025-05-15T13:00:00.000Z",
            "endTime": "2025-05-15T15:00:00.000Z",
            "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
            "maxTrainees": 10,
            "status": "ACTIVE",
            "createdAt": "2025-05-09T18:28:33.739Z",
            "updatedAt": "2025-05-09T18:28:33.739Z"
        },
        {
            "id": "aafb5f9c-42ab-462f-b6a2-575028d556d0",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "date": "2025-05-14T18:00:00.000Z",
            "startTime": "2025-05-15T15:00:00.000Z",
            "endTime": "2025-05-15T17:00:00.000Z",
            "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
            "maxTrainees": 10,
            "status": "ACTIVE",
            "createdAt": "2025-05-09T18:45:17.345Z",
            "updatedAt": "2025-05-09T18:45:17.345Z"
        },
        {
            "id": "d9656477-975c-494b-8625-c70d05509f89",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "date": "2025-05-14T18:00:00.000Z",
            "startTime": "2025-05-15T17:00:00.000Z",
            "endTime": "2025-05-15T19:00:00.000Z",
            "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
            "maxTrainees": 10,
            "status": "ACTIVE",
            "createdAt": "2025-05-09T18:46:27.966Z",
            "updatedAt": "2025-05-09T18:46:27.966Z"
        },
        {
            "id": "34cc4de0-d50f-4b8d-9986-ac789cf102aa",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "date": "2025-05-14T18:00:00.000Z",
            "startTime": "2025-05-15T07:00:00.000Z",
            "endTime": "2025-05-15T09:00:00.000Z",
            "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
            "maxTrainees": 10,
            "status": "ACTIVE",
            "createdAt": "2025-05-09T18:46:39.501Z",
            "updatedAt": "2025-05-09T18:46:39.501Z"
        },
        {
            "id": "9b9d1ade-32b0-4ddf-b4b0-ee5aaf1ffef0",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "date": "2025-05-14T18:00:00.000Z",
            "startTime": "2025-05-15T10:00:00.000Z",
            "endTime": "2025-05-15T12:00:00.000Z",
            "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
            "maxTrainees": 10,
            "status": "ACTIVE",
            "createdAt": "2025-05-09T18:46:45.445Z",
            "updatedAt": "2025-05-09T18:46:45.445Z"
        }
    ]
}

```

#### All classes

```http
  GET https://gymbackend-pi.vercel.app/api/v1/class/classes
```

- Request Headers

```http
 Authorization: Admin Token
```

- Response:

```http

  {
    "success": true,
    "statusCode": 200,
    "message": "Class Retrieved successfully",
    "meta": {
        "total": 9,
        "page": 1,
        "limit": 10
    },
    "data": [
        {
            "id": "9b9d1ade-32b0-4ddf-b4b0-ee5aaf1ffef0",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "startTime": "2025-05-15T10:00:00.000Z",
            "endTime": "2025-05-15T12:00:00.000Z",
            "date": "2025-05-14T18:00:00.000Z",
            "createdAt": "2025-05-09T18:46:45.445Z",
            "updatedAt": "2025-05-09T18:46:45.445Z",
            "status": "ACTIVE",
            "trainer": {
                "id": "75929507-f2ed-4504-aafa-77d52265dbac",
                "firstName": "Abul Ala",
                "lastName": "Jobayar",
                "email": "abulalajobssss@gmail.com",
                "isDeleted": false,
                "createdAt": "2025-05-08T20:32:39.483Z",
                "updatedAt": "2025-05-08T20:32:39.483Z"
            },
            "bookings": []
        },
        {
            "id": "34cc4de0-d50f-4b8d-9986-ac789cf102aa",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "startTime": "2025-05-15T07:00:00.000Z",
            "endTime": "2025-05-15T09:00:00.000Z",
            "date": "2025-05-14T18:00:00.000Z",
            "createdAt": "2025-05-09T18:46:39.501Z",
            "updatedAt": "2025-05-09T18:46:39.501Z",
            "status": "ACTIVE",
            "trainer": {
                "id": "75929507-f2ed-4504-aafa-77d52265dbac",
                "firstName": "Abul Ala",
                "lastName": "Jobayar",
                "email": "abulalajobssss@gmail.com",
                "isDeleted": false,
                "createdAt": "2025-05-08T20:32:39.483Z",
                "updatedAt": "2025-05-08T20:32:39.483Z"
            },
            "bookings": []
        },
        {
            "id": "d9656477-975c-494b-8625-c70d05509f89",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "startTime": "2025-05-15T17:00:00.000Z",
            "endTime": "2025-05-15T19:00:00.000Z",
            "date": "2025-05-14T18:00:00.000Z",
            "createdAt": "2025-05-09T18:46:27.966Z",
            "updatedAt": "2025-05-09T18:46:27.966Z",
            "status": "ACTIVE",
            "trainer": {
                "id": "75929507-f2ed-4504-aafa-77d52265dbac",
                "firstName": "Abul Ala",
                "lastName": "Jobayar",
                "email": "abulalajobssss@gmail.com",
                "isDeleted": false,
                "createdAt": "2025-05-08T20:32:39.483Z",
                "updatedAt": "2025-05-08T20:32:39.483Z"
            },
            "bookings": []
        },
        {
            "id": "aafb5f9c-42ab-462f-b6a2-575028d556d0",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "startTime": "2025-05-15T15:00:00.000Z",
            "endTime": "2025-05-15T17:00:00.000Z",
            "date": "2025-05-14T18:00:00.000Z",
            "createdAt": "2025-05-09T18:45:17.345Z",
            "updatedAt": "2025-05-09T18:45:17.345Z",
            "status": "ACTIVE",
            "trainer": {
                "id": "75929507-f2ed-4504-aafa-77d52265dbac",
                "firstName": "Abul Ala",
                "lastName": "Jobayar",
                "email": "abulalajobssss@gmail.com",
                "isDeleted": false,
                "createdAt": "2025-05-08T20:32:39.483Z",
                "updatedAt": "2025-05-08T20:32:39.483Z"
            },
            "bookings": []
        },
        {
            "id": "61efa740-4763-4024-b739-346e615abe52",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "startTime": "2025-05-15T13:00:00.000Z",
            "endTime": "2025-05-15T15:00:00.000Z",
            "date": "2025-05-14T18:00:00.000Z",
            "createdAt": "2025-05-09T18:28:33.739Z",
            "updatedAt": "2025-05-09T18:28:33.739Z",
            "status": "ACTIVE",
            "trainer": {
                "id": "75929507-f2ed-4504-aafa-77d52265dbac",
                "firstName": "Abul Ala",
                "lastName": "Jobayar",
                "email": "abulalajobssss@gmail.com",
                "isDeleted": false,
                "createdAt": "2025-05-08T20:32:39.483Z",
                "updatedAt": "2025-05-08T20:32:39.483Z"
            },
            "bookings": [
                {
                    "id": "11e21f9f-217d-41de-832a-dffa36a097b3",
                    "status": "CANCELLED",
                    "classId": "61efa740-4763-4024-b739-346e615abe52",
                    "traineeId": "0f0f46f6-9ad1-46fc-8587-15a69e0f3b9a",
                    "createdAt": "2025-05-09T18:34:40.694Z",
                    "updatedAt": "2025-05-09T18:36:28.406Z"
                }
            ]
        },
        {
            "id": "a0d10469-14fc-45ef-adb9-2b977ce093d3",
            "title": "Morning Training",
            "description": "A two-hour class focused on strength training for all levels at a time.",
            "startTime": "2025-05-10T10:00:00.000Z",
            "endTime": "2025-05-10T12:00:00.000Z",
            "date": "2025-05-09T18:00:00.000Z",
            "createdAt": "2025-05-09T04:48:03.085Z",
            "updatedAt": "2025-05-09T16:41:40.485Z",
            "status": "ACTIVE",
            "trainer": {
                "id": "75929507-f2ed-4504-aafa-77d52265dbac",
                "firstName": "Abul Ala",
                "lastName": "Jobayar",
                "email": "abulalajobssss@gmail.com",
                "isDeleted": false,
                "createdAt": "2025-05-08T20:32:39.483Z",
                "updatedAt": "2025-05-08T20:32:39.483Z"
            },
            "bookings": []
        },
        {
            "id": "52c2fce1-2d4a-47b2-8587-8d60a87ad252",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "startTime": "2025-05-10T17:30:00.000Z",
            "endTime": "2025-05-10T19:30:00.000Z",
            "date": "2025-05-09T18:00:00.000Z",
            "createdAt": "2025-05-09T04:46:52.259Z",
            "updatedAt": "2025-05-09T04:46:52.259Z",
            "status": "ACTIVE",
            "trainer": {
                "id": "75929507-f2ed-4504-aafa-77d52265dbac",
                "firstName": "Abul Ala",
                "lastName": "Jobayar",
                "email": "abulalajobssss@gmail.com",
                "isDeleted": false,
                "createdAt": "2025-05-08T20:32:39.483Z",
                "updatedAt": "2025-05-08T20:32:39.483Z"
            },
            "bookings": []
        },
        {
            "id": "1a6c5637-75e7-48e3-85c3-10eedd0fe9fd",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "startTime": "2025-05-10T04:00:00.000Z",
            "endTime": "2025-05-10T06:00:00.000Z",
            "date": "2025-05-09T18:00:00.000Z",
            "createdAt": "2025-05-09T04:39:59.166Z",
            "updatedAt": "2025-05-09T04:39:59.166Z",
            "status": "ACTIVE",
            "trainer": {
                "id": "75929507-f2ed-4504-aafa-77d52265dbac",
                "firstName": "Abul Ala",
                "lastName": "Jobayar",
                "email": "abulalajobssss@gmail.com",
                "isDeleted": false,
                "createdAt": "2025-05-08T20:32:39.483Z",
                "updatedAt": "2025-05-08T20:32:39.483Z"
            },
            "bookings": []
        },
        {
            "id": "049aa606-1e09-484b-9de0-4532e44a995e",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "startTime": "2025-05-10T02:00:00.000Z",
            "endTime": "2025-05-10T04:00:00.000Z",
            "date": "2025-05-09T18:00:00.000Z",
            "createdAt": "2025-05-09T04:38:21.454Z",
            "updatedAt": "2025-05-09T08:42:24.276Z",
            "status": "FULL",
            "trainer": {
                "id": "75929507-f2ed-4504-aafa-77d52265dbac",
                "firstName": "Abul Ala",
                "lastName": "Jobayar",
                "email": "abulalajobssss@gmail.com",
                "isDeleted": false,
                "createdAt": "2025-05-08T20:32:39.483Z",
                "updatedAt": "2025-05-08T20:32:39.483Z"
            },
            "bookings": [
                {
                    "id": "99003490-6c37-4aad-8f2d-b052b6312423",
                    "status": "CONFIRMED",
                    "classId": "049aa606-1e09-484b-9de0-4532e44a995e",
                    "traineeId": "0f0f46f6-9ad1-46fc-8587-15a69e0f3b9a",
                    "createdAt": "2025-05-09T08:22:37.039Z",
                    "updatedAt": "2025-05-09T08:22:37.039Z"
                },
                {
                    "id": "5858c810-d872-4131-86e6-8a5eb1cf362b",
                    "status": "CONFIRMED",
                    "classId": "049aa606-1e09-484b-9de0-4532e44a995e",
                    "traineeId": "6ed0c6de-59fb-4494-b0d7-83933bbbc282",
                    "createdAt": "2025-05-09T08:38:46.618Z",
                    "updatedAt": "2025-05-09T08:38:46.618Z"
                },
                {
                    "id": "b35bf0ea-d145-438c-adc2-8799c1386ee9",
                    "status": "CONFIRMED",
                    "classId": "049aa606-1e09-484b-9de0-4532e44a995e",
                    "traineeId": "c0713477-3b4b-4bc0-8c1c-446ffb095b66",
                    "createdAt": "2025-05-09T08:39:22.023Z",
                    "updatedAt": "2025-05-09T08:39:22.023Z"
                },
                {
                    "id": "9176407a-85e7-471b-8728-186e21d34a4c",
                    "status": "CONFIRMED",
                    "classId": "049aa606-1e09-484b-9de0-4532e44a995e",
                    "traineeId": "422072b9-d8ca-45e4-b14c-b8188f097c10",
                    "createdAt": "2025-05-09T08:39:30.573Z",
                    "updatedAt": "2025-05-09T08:39:30.573Z"
                },
                {
                    "id": "d24303b3-2120-43f5-8da3-f3afc0c8474c",
                    "status": "CONFIRMED",
                    "classId": "049aa606-1e09-484b-9de0-4532e44a995e",
                    "traineeId": "52590950-e073-4152-a129-948bc3841f2f",
                    "createdAt": "2025-05-09T08:40:12.698Z",
                    "updatedAt": "2025-05-09T08:40:12.698Z"
                },
                {
                    "id": "50551059-8c5b-451c-a626-a971b1fc2c5f",
                    "status": "CONFIRMED",
                    "classId": "049aa606-1e09-484b-9de0-4532e44a995e",
                    "traineeId": "dfd7cc6e-0bae-4a2a-bb5a-2457eb5ae4a9",
                    "createdAt": "2025-05-09T08:40:22.958Z",
                    "updatedAt": "2025-05-09T08:40:22.958Z"
                },
                {
                    "id": "eb7f8a13-7f46-4f3b-b48a-0ae8ea49f829",
                    "status": "CONFIRMED",
                    "classId": "049aa606-1e09-484b-9de0-4532e44a995e",
                    "traineeId": "fcf40880-ef3a-4c55-ab39-108717da0343",
                    "createdAt": "2025-05-09T08:40:33.510Z",
                    "updatedAt": "2025-05-09T08:40:33.510Z"
                },
                {
                    "id": "3ff16163-6c86-41c7-88c1-4c7ddcb092fc",
                    "status": "CONFIRMED",
                    "classId": "049aa606-1e09-484b-9de0-4532e44a995e",
                    "traineeId": "5562d86d-50c3-48bc-aaf7-23e0eea8526b",
                    "createdAt": "2025-05-09T08:40:47.323Z",
                    "updatedAt": "2025-05-09T08:40:47.323Z"
                },
                {
                    "id": "6e7a55ca-fb09-4c71-9a07-dbf8440597ee",
                    "status": "CONFIRMED",
                    "classId": "049aa606-1e09-484b-9de0-4532e44a995e",
                    "traineeId": "6cb9a2bd-1717-49db-9546-30bd33e76bfc",
                    "createdAt": "2025-05-09T08:42:09.075Z",
                    "updatedAt": "2025-05-09T08:42:09.075Z"
                },
                {
                    "id": "b198532e-9a72-422a-833f-2c0f93398dee",
                    "status": "CONFIRMED",
                    "classId": "049aa606-1e09-484b-9de0-4532e44a995e",
                    "traineeId": "6e07e887-65e5-471c-b0e5-5c4bddd58cb5",
                    "createdAt": "2025-05-09T08:42:22.854Z",
                    "updatedAt": "2025-05-09T08:42:22.854Z"
                }
            ]
        }
    ]
}

```

#### class details

```http
  POST https://gymbackend-pi.vercel.app/api/v1/class/classes/61efa740-4763-4024-b739-346e615abe52

```

- Request Headers

```http
 Authorization: Admin Token
```

- Response:

```http

   {
    "success": true,
    "statusCode": 200,
    "message": "Class Retrieved successfully",
    "data": {
        "id": "61efa740-4763-4024-b739-346e615abe52",
        "title": "Morning Strength Training",
        "description": "A two-hour class focused on strength training for all levels.",
        "bookings": [
            {
                "id": "11e21f9f-217d-41de-832a-dffa36a097b3",
                "status": "CANCELLED",
                "classId": "61efa740-4763-4024-b739-346e615abe52",
                "traineeId": "0f0f46f6-9ad1-46fc-8587-15a69e0f3b9a",
                "createdAt": "2025-05-09T18:34:40.694Z",
                "updatedAt": "2025-05-09T18:36:28.406Z"
            }
        ],
        "startTime": "2025-05-15T13:00:00.000Z",
        "endTime": "2025-05-15T15:00:00.000Z",
        "date": "2025-05-14T18:00:00.000Z",
        "status": "ACTIVE",
        "trainer": {
            "id": "75929507-f2ed-4504-aafa-77d52265dbac",
            "firstName": "Abul Ala",
            "lastName": "Jobayar",
            "email": "abulalajobssss@gmail.com",
            "isDeleted": false,
            "createdAt": "2025-05-08T20:32:39.483Z",
            "updatedAt": "2025-05-08T20:32:39.483Z"
        },
        "createdAt": "2025-05-09T18:28:33.739Z",
        "updatedAt": "2025-05-09T18:28:33.739Z"
    }
}

```

#### update Class

```http
  PUT https://gymbackend-pi.vercel.app/api/v1/class/classes/9b9d1ade-32b0-4ddf-b4b0-ee5aaf1ffef0
```

- Request Headers

```http
 Authorization: Admin Token
```

- Request Body:

```http

  {
   "title": "Training",
    "description": "A two-hour class focused "
}

```

- Response:

```http
{
    "success": true,
    "statusCode": 200,
    "message": "Class Updated successfully",
    "data": {
        "id": "9b9d1ade-32b0-4ddf-b4b0-ee5aaf1ffef0",
        "title": "Training",
        "description": "A two-hour class focused ",
        "date": "2025-05-14T18:00:00.000Z",
        "startTime": "2025-05-15T10:00:00.000Z",
        "endTime": "2025-05-15T12:00:00.000Z",
        "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
        "maxTrainees": 10,
        "status": "ACTIVE",
        "createdAt": "2025-05-09T18:46:45.445Z",
        "updatedAt": "2025-05-09T18:51:40.531Z"
    }
}

```

#### Available Class

```http
  GET https://gymbackend-pi.vercel.app/api/v1/class/available-classes
```

- Request Headers

```http
 Authorization: trainee Token
```

- Response:

```http
{
    "success": true,
    "statusCode": 200,
    "message": "Available Class retrieved successfully",
    "data": [
        {
            "id": "1a6c5637-75e7-48e3-85c3-10eedd0fe9fd",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "date": "2025-05-09T18:00:00.000Z",
            "startTime": "2025-05-10T04:00:00.000Z",
            "endTime": "2025-05-10T06:00:00.000Z",
            "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
            "maxTrainees": 10,
            "status": "ACTIVE",
            "createdAt": "2025-05-09T04:39:59.166Z",
            "updatedAt": "2025-05-09T04:39:59.166Z"
        },
        {
            "id": "52c2fce1-2d4a-47b2-8587-8d60a87ad252",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "date": "2025-05-09T18:00:00.000Z",
            "startTime": "2025-05-10T17:30:00.000Z",
            "endTime": "2025-05-10T19:30:00.000Z",
            "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
            "maxTrainees": 10,
            "status": "ACTIVE",
            "createdAt": "2025-05-09T04:46:52.259Z",
            "updatedAt": "2025-05-09T04:46:52.259Z"
        },
        {
            "id": "a0d10469-14fc-45ef-adb9-2b977ce093d3",
            "title": "Morning Training",
            "description": "A two-hour class focused on strength training for all levels at a time.",
            "date": "2025-05-09T18:00:00.000Z",
            "startTime": "2025-05-10T10:00:00.000Z",
            "endTime": "2025-05-10T12:00:00.000Z",
            "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
            "maxTrainees": 10,
            "status": "ACTIVE",
            "createdAt": "2025-05-09T04:48:03.085Z",
            "updatedAt": "2025-05-09T16:41:40.485Z"
        },
        {
            "id": "61efa740-4763-4024-b739-346e615abe52",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "date": "2025-05-14T18:00:00.000Z",
            "startTime": "2025-05-15T13:00:00.000Z",
            "endTime": "2025-05-15T15:00:00.000Z",
            "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
            "maxTrainees": 10,
            "status": "ACTIVE",
            "createdAt": "2025-05-09T18:28:33.739Z",
            "updatedAt": "2025-05-09T18:28:33.739Z"
        },
        {
            "id": "aafb5f9c-42ab-462f-b6a2-575028d556d0",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "date": "2025-05-14T18:00:00.000Z",
            "startTime": "2025-05-15T15:00:00.000Z",
            "endTime": "2025-05-15T17:00:00.000Z",
            "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
            "maxTrainees": 10,
            "status": "ACTIVE",
            "createdAt": "2025-05-09T18:45:17.345Z",
            "updatedAt": "2025-05-09T18:45:17.345Z"
        },
        {
            "id": "d9656477-975c-494b-8625-c70d05509f89",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "date": "2025-05-14T18:00:00.000Z",
            "startTime": "2025-05-15T17:00:00.000Z",
            "endTime": "2025-05-15T19:00:00.000Z",
            "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
            "maxTrainees": 10,
            "status": "ACTIVE",
            "createdAt": "2025-05-09T18:46:27.966Z",
            "updatedAt": "2025-05-09T18:46:27.966Z"
        },
        {
            "id": "34cc4de0-d50f-4b8d-9986-ac789cf102aa",
            "title": "Morning Strength Training",
            "description": "A two-hour class focused on strength training for all levels.",
            "date": "2025-05-14T18:00:00.000Z",
            "startTime": "2025-05-15T07:00:00.000Z",
            "endTime": "2025-05-15T09:00:00.000Z",
            "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
            "maxTrainees": 10,
            "status": "ACTIVE",
            "createdAt": "2025-05-09T18:46:39.501Z",
            "updatedAt": "2025-05-09T18:46:39.501Z"
        },
        {
            "id": "9b9d1ade-32b0-4ddf-b4b0-ee5aaf1ffef0",
            "title": "Training",
            "description": "A two-hour class focused ",
            "date": "2025-05-14T18:00:00.000Z",
            "startTime": "2025-05-15T10:00:00.000Z",
            "endTime": "2025-05-15T12:00:00.000Z",
            "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
            "maxTrainees": 10,
            "status": "ACTIVE",
            "createdAt": "2025-05-09T18:46:45.445Z",
            "updatedAt": "2025-05-09T18:51:40.531Z"
        }
    ]
}

```

#### Delete Class

```http
  DELETE https://gymbackend-pi.vercel.app/api/v1/class/classes/0f1f78b4-ea8f-40c3-9349-64f1fa69cb4a
```

- Request Headers

```http
 Authorization: Admin Token
```

- Response:

```http
{
    "success": true,
    "statusCode": 200,
    "message": "Class Deleted successfully",
    "data": {
        "id": "0f1f78b4-ea8f-40c3-9349-64f1fa69cb4a",
        "title": "Morning Strength Training",
        "description": "A two-hour class focused on strength training for all levels.",
        "date": "2025-05-09T18:00:00.000Z",
        "startTime": "2025-05-10T07:30:00.000Z",
        "endTime": "2025-05-10T09:30:00.000Z",
        "trainerId": "75929507-f2ed-4504-aafa-77d52265dbac",
        "maxTrainees": 10,
        "status": "ACTIVE",
        "createdAt": "2025-05-09T04:47:40.434Z",
        "updatedAt": "2025-05-09T04:47:40.434Z"
    }
}

```

- Error Response:

```http
{
    "success": false,
    "message": "Cannot delete class with enrolled students",
    "errorDetails": [
        {
            "field": "",
            "message": "Cannot delete class with enrolled students"
        }
    ]
}

```

       |

### Booking Routes

#### create Booking

```http
  POST https://gymbackend-pi.vercel.app/api/v1/booking/create-booking

```

- Request Headers

```http
 Authorization: Trainee Token
```

- Request Body:

```http

   {
  "classId": "61efa740-4763-4024-b739-346e615abe52"
}

```

- Response:

```http

   {
    "success": true,
    "statusCode": 201,
    "message": "Booking created successfully",
    "data": {
        "id": "11e21f9f-217d-41de-832a-dffa36a097b3",
        "status": "CONFIRMED",
        "classId": "61efa740-4763-4024-b739-346e615abe52",
        "traineeId": "0f0f46f6-9ad1-46fc-8587-15a69e0f3b9a",
        "createdAt": "2025-05-09T18:34:40.694Z",
        "updatedAt": "2025-05-09T18:34:40.694Z",
        "class": {
            "title": "Morning Strength Training",
            "date": "2025-05-14T18:00:00.000Z",
            "startTime": "2025-05-15T13:00:00.000Z",
            "endTime": "2025-05-15T15:00:00.000Z",
            "trainer": {
                "id": "75929507-f2ed-4504-aafa-77d52265dbac",
                "firstName": "Abul Ala",
                "lastName": "Jobayar",
                "email": "abulalajobssss@gmail.com",
                "isDeleted": false,
                "createdAt": "2025-05-08T20:32:39.483Z",
                "updatedAt": "2025-05-08T20:32:39.483Z"
            }
        },
        "trainee": {
            "firstName": "Abul Ala",
            "lastName": "Jobayar",
            "email": "jobayarrrtt@gmail.com"
        }
    }
}

```

#### trainee Booking

```http
  GET https://gymbackend-pi.vercel.app/api/v1/booking/all-booking

```

- Request Headers

```http
 Authorization: Trainee Token
```

- Response:

```http

 {
    "success": true,
    "statusCode": 200,
    "message": "All Booking From Trainee ",
    "data": [
        {
            "id": "11e21f9f-217d-41de-832a-dffa36a097b3",
            "class": {
                "title": "Morning Strength Training",
                "description": "A two-hour class focused on strength training for all levels.",
                "startTime": "2025-05-15T13:00:00.000Z",
                "endTime": "2025-05-15T15:00:00.000Z",
                "date": "2025-05-14T18:00:00.000Z",
                "status": "ACTIVE",
                "trainer": {
                    "id": "75929507-f2ed-4504-aafa-77d52265dbac",
                    "firstName": "Abul Ala",
                    "lastName": "Jobayar",
                    "email": "abulalajobssss@gmail.com",
                    "isDeleted": false,
                    "createdAt": "2025-05-08T20:32:39.483Z",
                    "updatedAt": "2025-05-08T20:32:39.483Z"
                },
                "createdAt": "2025-05-09T18:28:33.739Z"
            },
            "trainee": {
                "id": "0f0f46f6-9ad1-46fc-8587-15a69e0f3b9a",
                "firstName": "Abul Ala",
                "lastName": "Jobayar",
                "email": "jobayarrrtt@gmail.com",
                "isDeleted": false,
                "createdAt": "2025-05-08T19:50:19.280Z",
                "updatedAt": "2025-05-08T19:50:19.280Z"
            },
            "status": "CANCELLED",
            "createdAt": "2025-05-09T18:34:40.694Z"
        },
        {
            "id": "99003490-6c37-4aad-8f2d-b052b6312423",
            "class": {
                "title": "Morning Strength Training",
                "description": "A two-hour class focused on strength training for all levels.",
                "startTime": "2025-05-10T02:00:00.000Z",
                "endTime": "2025-05-10T04:00:00.000Z",
                "date": "2025-05-09T18:00:00.000Z",
                "status": "FULL",
                "trainer": {
                    "id": "75929507-f2ed-4504-aafa-77d52265dbac",
                    "firstName": "Abul Ala",
                    "lastName": "Jobayar",
                    "email": "abulalajobssss@gmail.com",
                    "isDeleted": false,
                    "createdAt": "2025-05-08T20:32:39.483Z",
                    "updatedAt": "2025-05-08T20:32:39.483Z"
                },
                "createdAt": "2025-05-09T04:38:21.454Z"
            },
            "trainee": {
                "id": "0f0f46f6-9ad1-46fc-8587-15a69e0f3b9a",
                "firstName": "Abul Ala",
                "lastName": "Jobayar",
                "email": "jobayarrrtt@gmail.com",
                "isDeleted": false,
                "createdAt": "2025-05-08T19:50:19.280Z",
                "updatedAt": "2025-05-08T19:50:19.280Z"
            },
            "status": "CONFIRMED",
            "createdAt": "2025-05-09T08:22:37.039Z"
        }
    ]
}

```

#### cancel Booking

```http
  POST https://gymbackend-pi.vercel.app/api/v1/booking/cancel-booking

```

- Request Headers

```http
 Authorization: Trainee Token
```

- Request Body:

```http

   {
    "bookingId":"11e21f9f-217d-41de-832a-dffa36a097b3"
}

```

- Response:

```http

  {
    "success": true,
    "statusCode": 200,
    "message": "cancel booking From Trainee ",
    "data": {
        "id": "11e21f9f-217d-41de-832a-dffa36a097b3",
        "status": "CANCELLED",
        "classId": "61efa740-4763-4024-b739-346e615abe52",
        "traineeId": "0f0f46f6-9ad1-46fc-8587-15a69e0f3b9a",
        "createdAt": "2025-05-09T18:34:40.694Z",
        "updatedAt": "2025-05-09T18:36:28.406Z"
    }
}

```

-error Response:

```http

  {
    "success": false,
    "message": "You can only cancel your own bookings",
    "errorDetails": [
        {
            "field": "",
            "message": "You can only cancel your own bookings"
        }
    ]
}

```

-error Response:

```http

  {
    "success": false,
    "message": "Cancellations must be made at least 24 hours before class",
    "errorDetails": [
        {
            "field": "",
            "message": "Cancellations must be made at least 24 hours before class"
        }
    ]
}

```

## 🧬 Database Schema

### `User`

```ts
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      UserRole
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  admin     Admin?
  trainer   Trainer?
  trainee   Trainee?

  @@map("users")
}
```

### `Admin`

```ts
model Admin {
  id        String   @id @default(uuid())
  firstName String
  lastName  String
  email     String   @unique
  user      User     @relation(fields: [email], references: [email])
  isDeleted Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("admins")
}
```

### `Trainer`

```ts
model Trainer {
  id        String   @id @default(uuid())
  firstName String
  lastName  String
  email     String   @unique
  user      User     @relation(fields: [email], references: [email])
  isDeleted Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  classes   Class[]

  @@map("trainers")
}

```

### `Trainee`

```model Trainee {
  id        String    @id @default(uuid())
  firstName String
  lastName  String
  email     String    @unique
  user      User      @relation(fields: [email], references: [email])
  isDeleted Boolean   @default(false)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  bookings  Booking[]

  @@map("trainees")
}

```

### `Class`

```ts
model Class {
  id          String      @id @default(uuid())
  title       String
  description String?
  date        DateTime
  startTime   DateTime
  endTime     DateTime
  trainerId   String
  trainer     Trainer     @relation(fields: [trainerId], references: [id])
  maxTrainees Int         @default(10)
  status      ClassStatus @default(ACTIVE)
  bookings    Booking[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@index([trainerId])
  @@index([date])
  @@map("classes")
}
```

### `Booking`

```ts
model Booking {
  id        String        @id @default(uuid())
  status    BookingStatus @default(CONFIRMED)
  classId   String
  class     Class         @relation(fields: [classId], references: [id])
  traineeId String
  trainee   Trainee       @relation(fields: [traineeId], references: [id])
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt

  @@unique([classId, traineeId])
  @@index([classId])
  @@index([traineeId])
  @@map("bookings")
}
```

### `User Role`

```ts
enum UserRole {
  ADMIN
  TRAINER
  TRAINEE
}
```

### `Booking Status`

```ts
enum BookingStatus {
  CONFIRMED
  CANCELLED
  ATTENDED

}
```

### `Class Status`

```ts
enum ClassStatus {
  ACTIVE
  FULL
  CANCELLED
}
```

---

## 👤 Admin Credentials

| Email                    | Password |
| ------------------------ | -------- |
| abulalajobayar@gmail.com | 12345    |

> You can update credentials via database seeding or manually after deployment.

---

## 🧪 Testing Instructions

1. **Login as Admin**

   - Go to `/login`
   - Use admin credentials from above

2. **Create Trainers**

   - Go to `Admin Panel > Users`
   - Create a new trainer account

3. **Schedule Classes**

   - Navigate to `Admin Panel > Classes`
   - Add new class with proper time, trainer, and date

4. **Book a Class**

   - Register and login as a user
   - Browse available classes and click "Book"

5. **Check Bookings**
   - Go to `My Bookings` (User)
   - Go to `Class Bookings` (Trainer)

---

## 💻 Instructions to Run Locally

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AbulAlaJobayar/gym_backend.git
   ```
2. **Install dependencies:**:
   ```
   yarn install
   ```
3. **Set up environment variables:**:
   ```
   .env.example .env
   ```
   Edit .env with your configuration:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/gym-management?schema=public"
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=1d
   PORT=5000
   NODE_ENV=development
   ```
4. **Database setup:**

   ```
   npx prisma migrate dev
   npx prisma generate
   ```

   **Development mode:**

```
yarn run dev
```

## 🌐 Live Hosting Links

- **Backend API**: [https://gymbackend-pi.vercel.app](https://gymbackend-pi.vercel.app)

---

## 📩 Contact

Created by **Abul Ala Jobayar**  
📧 Email: [ abulalajobayar@gmail.com](mailto:y abulalajobayar@gmail.com)  
🌐 Portfolio: [https://portfolio-rose-theta-63.vercel.app](https://portfolio-rose-theta-63.vercel.app)
