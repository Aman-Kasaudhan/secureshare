# 🔒 SecureShare

SecureShare is a secure real-time file sharing and chat application that allows users to create temporary rooms, exchange messages, and securely share files with customizable download permissions. Rooms automatically expire after inactivity, ensuring privacy and temporary collaboration.

---

## ✨ Features

### 👤 Authentication

* User Registration & Login
* JWT Authentication
* Protected Routes
* User Profile

### 🏠 Secure Rooms

* Create temporary rooms
* Join using Room Code
* Join directly using Invite Link
* Configurable maximum participants (2–10)
* Automatic room expiration
* Owner can delete room anytime

### 💬 Real-Time Chat

* Instant messaging using Socket.IO
* Typing indicator
* Join/Leave notifications
* Auto scroll to latest messages
* Connection status (Connected / Reconnected / Disconnected)

### 📂 Secure File Sharing

* Upload files up to 100 MB
* Preview supported files
* Optional download permission
* Real-time file sharing
* Room-specific file storage
* Automatic file cleanup after room expiration

### ⏳ Smart Room Management

* Auto expiry timer
* Timer pauses when room becomes active
* Timer restarts if room becomes inactive
* Automatic deletion of expired rooms
* Removes uploaded files automatically

### 🎨 Modern UI

* Responsive Design
* Full Screen Loader
* Toast Notifications
* WhatsApp-like Chat Interface
* Participant Sidebar
* SecureShare Branding

---

# 🛠 Tech Stack

## Frontend

* React
* Vite
* React Router DOM
* Axios
* Socket.IO Client
* React Toastify
* CSS3

## Backend

* Node.js
* Express.js
* Socket.IO
* MongoDB
* Mongoose
* JWT Authentication
* Multer
* bcrypt

---

# 📁 Project Structure

```text
SecureShare
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── socket
│   ├── utils
│   ├── uploads
│   ├── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/SecureShare.git
```

---

## Frontend

```bash
cd frontend 
cd client
npm install
npm run dev
```

---

## Backend

```bash
cd backend
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

DATABASE_URL=YOUR_MONGODB_URL

JWT_SECRET=YOUR_SECRET_KEY

ROOM_EXPIRY=10

CLIENT_URL=http://localhost:5173
```

---

# 🚀 Usage

1. Sign up or log in.
2. Create a secure room.
3. Choose the maximum number of participants.
4. Share the room code or invite link.
5. Participants join the room.
6. Chat in real time.
7. Upload and share files.
8. Choose whether files are downloadable.
9. Leave the room when finished.
10. Rooms expire automatically after inactivity.

---

# 🔒 Security Features

* JWT Authentication
* Protected API Routes
* Room-based Access
* Temporary File Storage
* Automatic File Deletion
* Configurable Download Permission
* Automatic Room Expiry

---


# 🔮 Future Improvements

* End-to-End Encryption
* Voice Chat
* Video Calling
* Screen Sharing
* Drag & Drop Upload
* Dark Mode
* Message Reactions
* Read Receipts
* File Versioning
* Cloud Storage Integration

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Aman Kasaudhan**

B.Tech Computer Science Student

GitHub: https://github.com/yourusername

LinkedIn: https://linkedin.com/in/yourprofile

---

⭐ If you found this project useful, please consider giving it a star on GitHub!
