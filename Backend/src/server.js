import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// Import config
import connectDB from "./config/db.js";

// Import routes
import authRoute from "./routes/authRoute.js";
import eventRoute from "./routes/event.js";
import testRoute from "./routes/testRoute.js";
import clubsRoute from "./routes/clubs.js";
import userRoute from "./routes/user.js";
import opportunityRoute from "./routes/opportunity.js";
import messageRoute from "./routes/message.js";

// Configure environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/", testRoute);
app.use("/api/auth", authRoute);
app.use("/api/clubs", clubsRoute);
app.use("/api/events", eventRoute);
app.use("/api/users", userRoute);
app.use("/api/opportunities", opportunityRoute);
app.use("/api/messages", messageRoute);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
