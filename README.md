# Musify 🎵

Musify is a modern full-stack web application for music streaming and management. Built with the MERN stack (MongoDB, Express, React, Node.js) and Vite, it features a beautiful, dynamic user interface with seamless audio playback, drag-and-drop playlist management, and secure cloud storage for media.

## ✨ Features

- **Modern Audio Player:** Full-featured audio playback with `react-h5-audio-player`.
- **Drag & Drop:** Interactive UI elements using `@hello-pangea/dnd`.
- **Responsive Design:** Beautifully styled with Tailwind CSS and animated using Framer Motion.
- **Secure Authentication:** User signup and login powered by JSON Web Tokens (JWT) and `bcryptjs`.
- **Cloud Storage:** Media uploads managed seamlessly with Cloudinary and Multer.
- **RESTful API:** Robust backend powered by Express and MongoDB (`mongoose`).

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** React 19 with Vite
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Routing:** React Router v7
- **Audio:** React H5 Audio Player
- **HTTP Client:** Axios

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT & bcryptjs
- **File Storage:** Cloudinary & Multer

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)
- [Cloudinary](https://cloudinary.com/) account for remote media storage

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kingloic250/Musify.git
   cd Musify
   ```

2. **Install Server Dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies:**
   ```bash
   cd ../client
   npm install
   ```

### Environment Variables

You need to set up environment variables for the server to run properly. Create a `.env` file in the `server` directory and add your keys. For example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

*(You may also need a `.env` in the `client` directory if your frontend uses custom variables like `VITE_API_URL`.)*

### Running the Application Local Development

1. **Start Backend Server:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start Frontend Client:**
   Open a new terminal and run:
   ```bash
   cd client
   npm run dev
   ```

The client UI will typically be available at `http://localhost:5173` and the backend API at the port you defined (e.g., `http://localhost:5000`).

## 📜 License
ISC License
