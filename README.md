# Whatsup - A WhatsApp Clone

Whatsup is a real-time messaging app that mimics the core functionalities of WhatsApp, including secure authentication, media sharing, and real-time message updates.

## 🔗 Live Demo

**App Live at** [https://whatsup-lime-rho.vercel.app](https://whatsup-lime-rho.vercel.app)

## 📂 Repositories

- **Frontend**: [https://github.com/Nurio34/whatsup](https://github.com/Nurio34/whatsup)
- **Backend**: [https://github.com/Nurio34/whatsup-server](https://github.com/Nurio34/whatsup-server)

## 📜 Features

- **Authentication**
  - Email & Password login (Express & MongoDB)
  - Google, GitHub, and X login (Firebase Authentication)
  - Password reset via OTP (Nodemailer & Express)
  - Account creation with OTP verification
- **Messaging**

  - Real-time messaging (Socket.io)
  - Read receipts (single tick, double tick, blue tick)
  - Right-click menu for message actions (copy, delete, multi-select)
  - Timestamp formatting for messages

- **Media Sharing**
  - Upload & send images, videos, audio, and documents
  - Preview files before sending
  - Gallery view for viewing & downloading media

## 🛠 Tech Stack

### Frontend

- **Framework**: Next.js (TypeScript)
- **State Management**: Redux Toolkit & Redux Persist
- **UI**: Tailwind CSS, DaisyUI
- **Authentication**: Firebase
- **Other Libraries**: Framer Motion, React Icons, Axios, Emoji Picker, File Saver

### Backend

- **Server**: Express.js
- **Database**: MongoDB with Mongoose & Prisma
- **Authentication**: JSON Web Token (JWT), bcrypt.js
- **Email Service**: Nodemailer
- **Real-time Messaging**: Socket.io
- **Security**: Helmet, CORS, Express Rate Limit
- **File Storage**: Cloudinary, Multer

## 🚀 Getting Started

### 🔧 Installation

#### 1️⃣ Clone the repositories

```sh
git clone https://github.com/Nurio34/whatsup.git  # Frontend
cd whatsup
npm install
```

```sh
git clone https://github.com/Nurio34/whatsup-server.git  # Backend
cd whatsup-server
npm install
```

#### 2️⃣ Start the Development Servers

```sh
# Frontend
npm run dev
```

```sh
# Backend
npm run dev
```

## 📬 Contact

For any inquiries or collaboration opportunities, feel free to reach out!
