# 🚀 HireNest Server API

## 🔗 Relevant Links

- 🌐 **Live Website:** [https://hire-nest-by-imran.web.app/](https://hire-nest-by-imran.web.app/)
- 📦 **Client Repository:** [HireNest Client Repo](https://github.com/programmarimran/HireNest-client-assignment_11)
- 🛠️ **Server Repository:** [HireNest Server Repo](https://github.com/programmarimran/HireNest-server-assignment_11)
- 📄 **API Documentation:** *(Add link if available)*
- 📬 **Contact Email:** programmarimran@gmail.com


---

## 🚀 Project Overview

**HireNest** is a full-stack service marketplace application. This repository contains the backend API built with **Node.js**, **Express.js**, and **MongoDB**. The server handles authentication, service management, bookings, and secure JWT-based authorization with HTTP-only cookies.

---

## 📦 Features

- User authentication with Firebase + JWT token issuance  
- Secure route protection using JWT tokens stored in HTTP-only cookies  
- CRUD operations for services  
- Service booking system with real-time status updates  
- Role-based access control (Service Providers and Users)  
- Token validation and automatic logout on unauthorized requests  

---

## 🛠 Tech Stack

| Category    | Tools / Libraries                       |
|-------------|----------------------------------------|
| Backend     | Node.js, Express.js                    |
| Database    | MongoDB (via Mongoose)                 |
| Auth        | Firebase Authentication + JWT         |
| Security    | JWT verification middleware            |
| Environment | dotenv (.env) for secrets and configs  |

---

## 🔗 API Endpoints

| Method | Endpoint                            | Description                            | Auth Required |
|--------|-----------------------------------|--------------------------------------|---------------|
| POST   | `/jwt`                            | Login: issue JWT token & set cookie  | No            |
| POST   | `/logout`                         | Clear JWT cookie to logout user       | No            |
| GET    | `/services`                      | Get all services                      | No            |
| GET    | `/services/home`                 | Get top 6 services for homepage      | No            |
| GET    | `/services/:id`                  | Get service details by ID             | No            |
| GET    | `/search/services?search=`       | Search services by name/provider/area| No            |
| POST   | `/services`                     | Add a new service                     | Yes           |
| PUT    | `/services/:id`                  | Update existing service               | Yes           |
| DELETE | `/services/:id`                  | Delete a service                      | Yes           |
| GET    | `/users/services?email=`         | Get services posted by a user         | Yes           |
| GET    | `/users/booked/services?email=`  | Get services booked by user           | Yes           |
| GET    | `/provider/booked-services?email=` | Get booked services for provider     | Yes           |
| POST   | `/book-service`                  | Book a service                       | Yes           |
| PATCH  | `/book-service/:id`              | Update booking status                 | Yes           |
| DELETE | `/book-service/:id`              | Delete a booked service               | Yes           |

---

## ⚙️ Environment Variables

Create a `.env` file in the root folder with the following variables:

```env
PORT=3000
CLIENT_URL=http://localhost:5173  # Your frontend URL
CONNECT_MONGODB=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
NODE_ENV=development
