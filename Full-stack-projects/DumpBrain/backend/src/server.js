import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import notesRoutes from "./routes/notesRoutes.js";

dotenv.config();
const app = express();

// Built-in Express middleware to parse JSON and URL-encoded bodies
app.use(express.json()); // to support json encoded-bodies

// to support url-encoded bodies
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// Enable CORS for requests from the frontend, which allows the frontend to make requests to the backend without being blocked by the browser's same-origin policy.
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

//custom rate limiter with Upstash redis
app.use(rateLimiter);

app.use("/api/", notesRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`running on port http://localhost:${process.env.PORT}`);
  });
});
