import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// Import config
import connectDB from "./config/db.js";

// Import routes
import authRoute from "./routes/auth.route.js";
import eventRoute from "./routes/event.route.js";

import clubsRoute from "./routes/clubs.js";
import userRoute from "./routes/user.js";
import opportunityRoute from "./routes/opportunity.js";
import messageRoutes from "./routes/message.route.js";
// import meetingRoutes from "./routes/meeting.route.js";
import { app, server } from "./lib/socket.js";

// Configure environment variables
dotenv.config();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url} from origin ${req.headers.origin}`);
  next();
});
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "https://alumni-connect-1-kprb.onrender.com"],
  credentials: true
}))

// Routes

app.use("/api/auth", authRoute);
app.use("/api/events", eventRoute);
app.use("/api/clubs", clubsRoute);
app.use("/api/users", userRoute);
app.use("/api/opportunities", opportunityRoute);
app.use('/api/messages', messageRoutes);
// app.use("/api/meeting", meetingRoutes);

// Start server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
