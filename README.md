# 🧩 Taskify – MERN Stack Task Management App
## 📘 Overview
**Taskify** is a full-stack MERN (MongoDB, Express, React, Node.js) application that provides user authentication, role-based dashboards (Admin/User), and task management features.  
It allows **Admins** to create, assign, and manage tasks, while **Users** can view and update their assigned tasks.  
The project is containerized using **Docker** and can be deployed on **Kubernetes**.

---
## 🚀 Features

### 👤 Authentication
- Secure login and signup using JWT authentication.
- Role-based route protection for Admin and User dashboards.
- Persistent login using HTTP-only cookies.

### 🧑‍💼 Admin Module
- Dashboard view of all users and tasks.
- Create, update, or delete tasks.
- Manage user list and assign tasks.

### 👥 User Module
- View personal dashboard.
- Access assigned tasks and update their status.
- View detailed task information.

### ⚙️ Backend (Node.js + Express + MongoDB)
- RESTful API using Express.
- MongoDB connection via Mongoose.
- Controllers for Authentication, User, Task, and Report management.
- Centralized error handling.
- CORS, dotenv, and cookie-parser support.

### 🎨 Frontend (React + Redux + Tailwind)
- React Router for navigation.
- Redux for state management.
- React Hot Toast for notifications.
- Protected routes with role-based access.
- Modern responsive UI for both desktop and mobile.

---
## 🗂️ Project Structure

```
Taskify/
│
├── backend/
│   ├── index.js                # Main backend entry point
│   ├── routes/
│   │   ├── auth.route.js       # Authentication routes
│   │   ├── user.route.js       # User management routes
│   │   ├── task.route.js       # Task management routes
│   │   └── report.route.js     # Report routes
│   ├── controller/             # Controller logic
│   ├── utils/                  # Utility functions (JWT, Multer)
│   └── models/                 # MongoDB models
│
├── client/
│   ├── src/
│   │   ├── App.jsx             # Main React app
│   │   ├── pages/              # Login, Signup, Dashboards
│   │   ├── routes/             # PrivateRoute handling
│   │   └── redux/              # State management
│   └── package.json
│
└── Dockerfile                  # Combined Docker setup
```
## ⚡ Installation and Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/v4run3/Taskify.git
cd taskify
```
### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:
```env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
FRONT_END_URL=http://localhost:5173
```
Start the backend:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd ../client
npm install
npm run dev
```
## 🐳 Docker Setup

### 🧱 Build and Run Combined Container

#### 1. Build Docker Image
```bash
docker build -t taskify-app .
```

#### 2. Run the Container
```bash
docker run -p 3000:3000 taskify-app
```
---
## ☸️ Kubernetes Deployment (Optional)

Create deployment and service files for frontend and backend, then run:
```bash
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
```
---
## 🧩 API Endpoints

| Method | Endpoint | Description | Protected |
|---------|-----------|-------------|------------|
| POST | `/api/auth/sign-up` | Register new user | ❌ |
| POST | `/api/auth/sign-in` | User login | ❌ |
| GET | `/api/auth/user-profile` | Get logged-in user | ✅ |
| PUT | `/api/auth/update-profile` | Update profile | ✅ |
| GET | `/api/users/get-users` | Get all users (Admin only) | ✅ |
| GET | `/api/users/:id` | Get user by ID | ✅ |
| POST | `/api/tasks` | Create new task (Admin only) | ✅ |
| GET | `/api/tasks` | Get all tasks | ✅ |

---
## Screenshots


## 🧠 Contributotrs
**Shivam Choughule & Varun Bhonslay** 
📧 *Developed as part of MERN stack experimentation and deployment learning.*