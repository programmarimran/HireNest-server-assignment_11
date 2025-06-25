# 🚀 HireNest – Your Ultimate Service Marketplace

## 🔗 Relevant Links

- 🌐 **Live Website:** [https://hire-nest-by-imran.web.app/](https://hire-nest-by-imran.web.app/)
- 📦 **Client Repository:** [HireNest Client Repo](https://github.com/programmarimran/HireNest-client-assignment_11)
- 🛠️ **Server Repository:** [HireNest Server Repo](https://github.com/programmarimran/HireNest-server-assignment_11)
- 📄 **API Documentation:** *(Add link if available)*

---

## 📌 Project Overview

**HireNest** is a full-stack service marketplace application. This repository contains the backend API built with **Node.js**, **Express.js**, and **MongoDB**. It handles authentication, services, bookings, role-based access, and secure JWT-based authorization via HTTP-only cookies.

---

## 📦 Features

- 🔐 Firebase Authentication + JWT issuing
- 🧾 Secure route protection using HTTP-only JWT cookies
- ⚙️ Full CRUD operations for services
- 🧑‍💼 Service booking system with status updates
- 👥 Role-based access (Provider / User)
- 🛡️ Token validation & auto logout on failure

---

## 🛠 Tech Stack

| Category     | Tools / Libraries                   |
|--------------|-------------------------------------|
| Backend      | Node.js, Express.js                |
| Database     | MongoDB (Mongoose)                 |
| Auth         | Firebase + JWT                     |
| Middleware   | Express, Cookie Parser, CORS       |
| Config       | dotenv (.env)                      |

---

## 🔗 API Endpoints

| Method | Endpoint                            | Description                             | Auth Required |
|--------|-------------------------------------|-----------------------------------------|---------------|
| POST   | `/jwt`                              | Login & issue JWT token                 | No            |
| POST   | `/logout`                           | Logout & clear cookie                   | No            |
| GET    | `/services`                         | Get all services                        | No            |
| GET    | `/services/home`                    | Get top 6 services for homepage         | No            |
| GET    | `/services/:id`                     | Get specific service details            | No            |
| GET    | `/search/services?search=`          | Search services                         | No            |
| POST   | `/services`                         | Add new service                         | Yes           |
| PUT    | `/services/:id`                     | Edit a service                          | Yes           |
| DELETE | `/services/:id`                     | Delete a service                        | Yes           |
| GET    | `/users/services?email=`            | Get user-posted services                | Yes           |
| GET    | `/users/booked/services?email=`     | Get user-booked services                | Yes           |
| GET    | `/provider/booked-services?email=`  | Get bookings for provider               | Yes           |
| POST   | `/book-service`                     | Book a service                          | Yes           |
| PATCH  | `/book-service/:id`                 | Change booking status                   | Yes           |
| DELETE | `/book-service/:id`                 | Delete a booked service                 | Yes           |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following:

```env
PORT=3000
CLIENT_URL=http://localhost:5173
CONNECT_MONGODB=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

---

## 🛠️ Getting Started (Run Locally)

```bash
# 1. Clone the Repository
git clone https://github.com/programmarimran/HireNest-server-assignment_11.git
cd HireNest-server-assignment_11

# 2. Install Dependencies
npm install

# 3. Add .env file (see above section)

# 4. Start the Server
npm run dev

# The API will be running at:
# http://localhost:3000
```

---

## 👨‍💻 Developer Information

| Detail         | Info                                                   |
|----------------|--------------------------------------------------------|
| 👨‍💻 Developer   | Md Imran Hasan                                         |
| 💼 Role         | React & MERN Stack Web Developer, JavaScript Enthusiast |
| 📬 Email        | programmarimran@gmail.com                              |
| 🌐 Portfolio    | Coming Soon                                            |
