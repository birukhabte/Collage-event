# Univent - College Event Management System

<div align="center">
  <img src="Univent-College_Event_Management_System-main/frontend/public/logo3.jpg" alt="Univent Logo" width="800" />
</div>

<p align="center">
  <a href="LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge" alt="License"></a>
  <a href="#"><img src="https://img.shields.io/badge/status-active-success.svg?style=for-the-badge" alt="Status"></a>
  <a href="#"><img src="https://img.shields.io/badge/version-1.0.0-blue.svg?style=for-the-badge" alt="Version"></a>
</p>

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [User Roles](#-user-roles)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Overview

Univent is a comprehensive, real-time event management platform designed specifically for colleges and universities. Built with a modern microservices architecture using the MERN stack, it streamlines the entire event lifecycle from creation to execution.

### Why Univent?

- **Real-time Updates**: Instant notifications and live leaderboards keep everyone engaged
- **Scalable Architecture**: Microservices design allows independent scaling of components
- **Role-based Access**: Secure, granular permissions for admins, organizers, and participants
- **Cloud-native**: MongoDB Atlas integration for reliable, distributed data storage
- **Modern UI**: Responsive React interface with TailwindCSS and Material-UI

## ✨ Features

### For Organizers
- 📅 Create and manage events with detailed information
- 👥 Track participant registrations in real-time
- 📢 Send instant announcements to all participants
- 📊 View analytics and registration statistics
- 🏆 Manage leaderboards and scoring

### For Participants
- 🎫 Browse and register for events with one click
- 🔔 Receive real-time notifications
- 🏅 Track your position on live leaderboards
- 📱 Access from any device with responsive design

### For Admins
- 👤 Manage users and assign roles
- ⚙️ Configure system-wide settings
- 📈 Monitor platform usage and metrics
- 🔐 Control access and permissions

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern UI library
- **Redux Toolkit** - State management
- **React Router v7** - Client-side routing
- **TailwindCSS v4** - Utility-first CSS
- **Material-UI v7** - Component library
- **Vite** - Fast build tool
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client
- **Formik + Yup** - Form handling and validation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js v5** - Web framework
- **MongoDB + Mongoose** - Database and ODM
- **JWT** - Authentication
- **Socket.IO** - WebSocket server
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Helmet** - Security middleware
- **Rate Limiting** - API protection

### DevOps & Tools
- **Docker** - Containerization
- **MongoDB Atlas** - Cloud database
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Nodemon** - Development server

## 🏛️ Architecture

Univent uses a microservices architecture with an API Gateway pattern:

```
┌─────────────┐
│   Client    │
│  (React)    │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│   API Gateway   │  Port 8000
│   (Express)     │
└────────┬────────┘
         │
    ┌────┴────┬────────┬──────────┬────────────┐
    ▼         ▼        ▼          ▼            ▼
┌────────┐ ┌──────┐ ┌──────┐ ┌──────────┐ ┌─────────┐
│  Auth  │ │Event │ │Notif │ │Leaderbd  │ │Settings │
│ :8001  │ │:8002 │ │:8003 │ │  :8004   │ │  :8005  │
└───┬────┘ └──┬───┘ └──┬───┘ └────┬─────┘ └────┬────┘
    │         │        │          │            │
    └─────────┴────────┴──────────┴────────────┘
                       │
                  ┌────▼─────┐
                  │ MongoDB  │
                  │  Atlas   │
                  └──────────┘
```

### Services

| Service | Port | Responsibility |
|---------|------|----------------|
| **Gateway** | 8000 | Request routing, load balancing |
| **Auth Service** | 8001 | User authentication, JWT tokens, role management |
| **Event Service** | 8002 | Event CRUD, registrations, participant management |
| **Notification Service** | 8003 | Real-time announcements via Socket.IO |
| **Leaderboard Service** | 8004 | Scoring, rankings, live updates |
| **Settings Service** | 8005 | User preferences, system configuration |

## 🏁 Getting Started

### Prerequisites

```bash
Node.js >= 14.x
MongoDB Atlas account
npm or yarn
Git
```

### Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd College_Event_Management_System-main
```

2. **Install dependencies**
```bash
# Frontend
cd Univent-College_Event_Management_System-main/frontend
npm install

# Backend services
cd ../backend/auth-service && npm install
cd ../event-service && npm install
cd ../notification-service && npm install
cd ../leaderboard-service && npm install
cd ../settings-service && npm install
cd ../gateway && npm install
```

3. **Configure environment variables**

Each service has a `.env` file pre-configured. Key settings:

```env
# MongoDB Atlas (already configured)
MONGODB_URI=mongodb+srv://...

# JWT Secret (change in production!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Service Ports
PORT=800X
```

4. **Seed test data**
```bash
cd Univent-College_Event_Management_System-main/backend/auth-service
node seedUsers.js
```

5. **Start services**

Open 7 terminal windows:

```bash
# Terminal 1: Frontend
cd Univent-College_Event_Management_System-main/frontend
npm run dev

# Terminal 2: Gateway
cd Univent-College_Event_Management_System-main/backend/gateway
npm run dev

# Terminal 3-7: Microservices
cd Univent-College_Event_Management_System-main/backend/auth-service && npm run dev
cd Univent-College_Event_Management_System-main/backend/event-service && npm run dev
cd Univent-College_Event_Management_System-main/backend/notification-service && npm run dev
cd Univent-College_Event_Management_System-main/backend/leaderboard-service && npm run dev
cd Univent-College_Event_Management_System-main/backend/settings-service && npm run dev
```

6. **Access the application**
```
Frontend: http://localhost:5173
API Gateway: http://localhost:8000
```

## 📚 API Documentation

### Authentication Endpoints

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/google
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET  /api/auth/verify-token
```

### Event Endpoints

```http
GET    /api/events
GET    /api/events/:id
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id
POST   /api/events/:id/register
GET    /api/events/:id/participants
```

### Leaderboard Endpoints

```http
GET  /api/leaderboard/:eventId
POST /api/leaderboard/update-score
GET  /api/leaderboard/user/:userId
```

### Notification Endpoints

```http
POST /api/notifications/announce
GET  /api/notifications/user/:userId
```

## 👤 User Roles

### Test Accounts

After running `seedUsers.js`:

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| **Admin** | admin@univent.com | Admin@123456 | Full system access |
| **Organizer** | organizer@univent.com | Organizer@123456 | Create/manage events |
| **Participant** | participant@univent.com | Participant@123456 | Register for events |

⚠️ **Change these passwords in production!**

## 📂 Project Structure

```
College_Event_Management_System-main/
├── Univent-College_Event_Management_System-main/
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/      # Reusable UI components
│   │   │   ├── pages/           # Route pages
│   │   │   ├── redux/           # State management
│   │   │   ├── services/        # API calls
│   │   │   ├── context/         # React context
│   │   │   └── assets/          # Static files
│   │   ├── public/              # Public assets
│   │   └── package.json
│   │
│   └── backend/
│       ├── gateway/             # API Gateway
│       ├── auth-service/        # Authentication
│       │   ├── src/
│       │   │   ├── controllers/
│       │   │   ├── models/
│       │   │   ├── routes/
│       │   │   ├── middleware/
│       │   │   └── utils/
│       │   └── tests/
│       ├── event-service/       # Event management
│       ├── notification-service/# Real-time notifications
│       ├── leaderboard-service/ # Scoring & rankings
│       └── settings-service/    # User settings
│
├── .git/
├── .vscode/
└── README.md
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Helmet.js security headers
- CORS configuration
- Input validation and sanitization
- Role-based access control (RBAC)

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd Univent-College_Event_Management_System-main/frontend
npm run build
# Deploy dist/ folder
```

### Backend (Render/Railway/Heroku)
Each microservice can be deployed independently:
- Set environment variables
- Configure MongoDB Atlas whitelist
- Deploy each service to separate instances

### Docker Deployment
```bash
docker-compose up -d
```

## 🧪 Testing

```bash
# Run tests for auth service
cd Univent-College_Event_Management_System-main/backend/auth-service
npm test

# Run tests for event service
cd ../event-service
npm test
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](Univent-College_Event_Management_System-main/LICENSE.md) file for details.

## 📧 Contact

- **Email**: info@univent.com
- **Phone**: +251 91 123 4567
- **Location**: Addis Ababa University, Ethiopia

## 🙏 Acknowledgments

- Built with ❤️ for college communities
- Inspired by the need for better event management in educational institutions
- Thanks to all contributors and the open-source community

---

<div align="center">
  Made with ❤️ by the Univent Team
</div>
