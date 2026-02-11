# 🌊 Alumni Connect

**Bridging the gap between students and alumni for mentorship and growth.**

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![Database](https://img.shields.io/badge/Database-MongoDB-green) ![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-black)

---

## 💡 The Problem

University students often struggle to find mentorship, career guidance, and networking opportunities. Meanwhile, alumni want to give back but lack a structured platform to connect with their juniors efficiently.

**Alumni Connect solves this.**

---

## ✨ What is Alumni Connect?

Alumni Connect is a full-stack platform designed to foster a thriving community. It brings **seamless networking** to university ecosystems. Just like LinkedIn connects professionals, Alumni Connect bridges the specific gap between an institution's past and present.

- 🔒 **Secure Authentication** for students and alumni with role-based access
- 💬 **Real-time Chat** for instant mentorship and guidance
- 📅 **Meeting Scheduling** via seamless **Calendly** integration
- 🏢 **Job Portal** for exclusive alumni-posted opportunities and internships
- 🎭 **Campus Culture** showcasing active clubs (GDSC, Music, Robotics) and events

Think of it as **"The Digital Campus"** — where relationships are built, careers are launched, and the college spirit never fades.

---

## 🚀 Key Features

### For Students
✅ **Find Mentors** — Browse alumni profiles and connect based on shared interests.
✅ **Instant Chat** — Direct messaging powered by **Socket.IO** for real-time advice.
✅ **Schedule Meetings** — Book mentorship sessions effortlessly with **Calendly**.
✅ **Explore Clubs** — Join communities like **GDSC**, **Music Club**, and **Robotics Club**.
✅ **Job Opportunities** — Apply for exclusive internships posted by alumni.

### For Alumni
🤝 **Give Back** — Share your expertise and guide the next generation.
💼 **Recruit Talent** — Post jobs and hire top talent directly from your alma mater.
📢 **Stay Connected** — Keep up with campus events and news from anywhere in the world.

---

## 🛠️ Tech Stack

Built with modern, industry-standard technologies:

### **Frontend**
- **React 18** — The most popular library for building interactive UIs
- **Vite** — Lightning-fast build tool and development server
- **Tailwind CSS** — Utility-first CSS framework for beautiful designs
- **Framer Motion** — Production-ready animation library for React
- **Lucide React** — Beautiful, consistent icon library
- **Zustand** — Small, fast, and scalable state management

### **Backend**
- **Node.js + Express** — Fast, unopinionated, minimalist web framework
- **MongoDB** — Flexible, scalable NoSQL database
- **Mongoose** — Elegant MongoDB object modeling for Node.js
- **Socket.IO** — Real-time bidirectional event-based communication
- **JWT** — Industry-standard for secure authentication
- **Bcrypt** — Library to help you hash passwords

---

## 📸 Screenshots

*(Coming soon — will include Home page, Connection portal, Chat interface, and Club dashboard)*

---

## 🎯 How It Works (3 Simple Steps)

1. **Sign Up** — Create your profile as a Student or Alumni.
2. **Connect** — Find peers or mentors and start chatting instantly.
3. **Engage** — Join clubs, attend events, or apply for jobs.

---

## 🏃 Running Locally

Want to contribute or run it locally? Follow these simple steps:

### **Prerequisites**
Make sure you have these installed:
- Node.js (v16 or higher) — [Download here](https://nodejs.org/)
- MongoDB — [Download here](https://www.mongodb.com/try/download/community)
- npm (comes with Node.js)

---

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/yourusername/Alumni-Connect.git
cd Alumni-Connect
```

---

### **Step 2: Backend Setup**

```bash
# Navigate to backend folder
cd Backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Edit the `.env` file** and add your credentials:
```env
MONGODB_URI="mongodb://localhost:27017/alumni_connect"
JWT_SECRET="your-secret-key-here"
PORT=3000
NODE_ENV="development"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="adminpassword"
```

**Start the backend server:**
```bash
npm run dev
# Server runs on http://localhost:3000
```

---

### **Step 3: Frontend Setup**

Open a **new terminal window** (keep the backend running):

```bash
# Navigate to frontend folder (from project root)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**You're all set!** 🎉

Open your browser and visit: **http://localhost:5173**

---

## 📂 Project Structure

```
Alumni-Connect/
├── Backend/              # Node.js + Express API
│   ├── src/
│   │   ├── controllers/  # Logic for Auth, Clubs, Jobs, Messages
│   │   ├── models/       # Mongoose Schemas (User, Club, Message)
│   │   ├── routes/       # API Endpoints
│   │   ├── lib/          # Utilities (Socket.IO, db config)
│   │   └── server.js     # Entry point
│
├── frontend/             # React application
│   ├── src/
│   │   ├── components/   # Reusable UI (Navbar, ChatHeader, Footer)
│   │   ├── pages/        # Main pages (Home, Connect, Profile)
│   │   ├── store/        # Zustand State Management
│   │   └── lib/          # Utilities (axios config)
│
└── README.md             # You are here!
```

---

## 🔒 Security Features

- ✅ **Password Hashing** — Securely hashed passwords using bcrypt
- ✅ **JWT Tokens** — Stateless authentication mechanism
- ✅ **Protected Routes** — Middleware to guard private API endpoints
- ✅ **Input Validation** — Ensuring data integrity

---

## 🚧 Roadmap

Ideas for future improvements:

- [x] Admin Dashboard for Club Management
- [x] Calendly Integration for Meetings
- [ ] Resume Review Feature
- [ ] Email Notifications for new messages
- [ ] Mobile App (React Native)
- [ ] AI-powered Mentor Matching

---

## 👨💻 Author

**Anurag Tomar**  
🔗 [LinkedIn](https://linkedin.com/in/yourprofile)  
🐙 [GitHub](https://github.com/yourusername)  
✉️ [Email](mailto:your.email@example.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

Built with amazing open-source tools:
- **React Team** — For the incredible library
- **Tailwind Labs** — For Tailwind CSS
- **Socket.IO** — For making real-time chat possible
- **MongoDB** — For the robust database

---

## 💬 Questions or Feedback?

Feel free to open an issue or reach out directly. I'd love to hear your thoughts!

---

<div align="center">
  <strong>Made with ❤️ for the Alumni Connect Community</strong>
  <br />
  ⭐ Star this repo if you found it helpful!
</div>