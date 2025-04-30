# Roomzy – Hotel Room Booking Website

Roomzy is a full-stack hotel room booking web application built as a comprehensive 3-month database systems project. It allows users to explore, book, and manage hotel room reservations, while providing an administrative dashboard for managing rooms and bookings.

> 🧠 **Tech Stack**: React, Vite, Tailwind CSS, TypeScript, Node.js, Express, MSSQL, JWT, REST APIs  
> 💻 **Total REST Endpoints**: 29  
> 🌐 **Database**: Microsoft SQL Server

---

## 🚀 Features

### 🧑‍💻 User Features
- ✅ Browse featured rooms with filters
- 🛏️ View detailed room information and amenities
- 🔐 User registration and login with JWT authentication
- 📆 Book available rooms via an interactive form
- ✉️ Receive booking confirmation
- 👤 Manage personal bookings

### 🛠️ Admin Panel
- 📊 Dashboard with booking statistics
- 📚 Manage room listings (add/edit/delete)
- 📋 View and manage all bookings
- 🔑 Role-based access control for admin users

---

## 🏗️ Project Structure

```
Roomzy/
├── backend/            # Node.js + Express REST API
│   ├── config/         # MSSQL DB config
│   ├── routes/         # API route definitions (29 endpoints)
│   ├── server.js       # Entry point of backend
├── database/           
│   └── roomzy.sql      # MSSQL database schema and data
├── frontend/           # React + Vite + Tailwind UI
│   ├── src/
│   │   ├── pages/      # Page views (Home, Login, Register, Dashboard, etc.)
│   │   ├── components/ # Reusable components (UI, Layout, Rooms, Admin)
│   │   ├── hooks/      # Custom React hooks
│   │   ├── lib/        # Utility functions
│   │   └── App.tsx     # App entry point
```

---

## ⚙️ Tech Stack

| Layer         | Technology                                   |
|---------------|----------------------------------------------|
| Frontend      | React, TypeScript, Vite, Tailwind CSS        |
| Backend       | Node.js, Express                             |
| Database      | Microsoft SQL Server (T-SQL)                 |
| Auth          | JWT (JSON Web Tokens)                        |
| Deployment    | Local setup / ready for Docker integration   |

---

## 📊 GitHub Language Stats

```
TypeScript  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 89.1%  
JavaScript ━━━━ 6.8%  
TSQL        ━━ 2.7%  
CSS         ━  1.1%  
HTML        ░  0.3%
```

---

## 🔐 Authentication & Security

- **JWT-based** stateless authentication
- **Role-based access** for users and admins
- **Input validation** and error logging in backend
- **Secure password handling** (bcrypt implied if used)

---

## 🔌 API Overview (29 REST Endpoints)

Example Endpoints:

| Method | Endpoint                  | Description                    |
|--------|---------------------------|--------------------------------|
| GET    | `/api/rooms`              | Fetch all available rooms      |
| POST   | `/api/bookings`           | Create a new booking           |
| POST   | `/api/auth/register`      | Register a new user            |
| POST   | `/api/auth/login`         | User login and JWT issuance    |
| GET    | `/api/admin/bookings`     | Admin: View all bookings       |
| DELETE | `/api/admin/rooms/:id`    | Admin: Delete a room           |
| PUT    | `/api/admin/rooms/:id`    | Admin: Update room details     |

> 📁 Complete API list with request/response structure is documented in `routes/api.js`.

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- SQL Server (LocalDB / Express / Azure)
- npm / bun
- Git

### 1. Clone Repository

```bash
git clone https://github.com/alijafarkamal/Roomzy---Hotel-Room-Booking-website
cd Roomzy---Hotel-Room-Booking-website
```

### 2. Backend Setup

```bash
cd backend
npm install
# Configure DB connection in config/db.js
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Import SQL Schema

Use a SQL tool (like SSMS) to import the `roomzy.sql` file into your database server.

---

## 📚 Academic Context

This project was developed as part of the **Database Systems course** (Spring 2025) at **FAST NUCES Lahore**, involving:

- Relational schema design
- SQL joins, views, stored procedures
- Query optimization and normalization
- Backend design with persistent database logic
- Full-stack integration of UI and DBMS

---

## 🪪 License

This project is for academic purposes and currently does not have a specific license.
