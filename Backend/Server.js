/**
 * This file sets up and starts the Express server for the iTunes Media Search application.
 * It configures global middleware, authentication, and routing for the backend API.
 *
 * Responsibilities:
 *  - Initialise the Express app and configure middleware (CORS, JSON parsing).
 *  - Load environment variables (e.g. JWT secret, port) from `.env`.
 *  - Register authentication middleware to protect API routes.
 *  - Mount feature routers, such as `/search`, which proxy to the iTunes Search API.
 *  - Start the server on the specified port and log a success message.
 *
 * Key Routes:
 *  - POST /login — Issues a signed JWT token for the given username.
 *  - GET /search — (Protected) Proxies search requests to the iTunes Search API.
 */

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authenticateToken } from "./middleware/auth.js";
import searchRouter from "./routes/Search.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple login route that issues a JWT token for a given username
app.post("/login", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username required" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

// Protected route that uses JWT authentication
app.use("/search", authenticateToken, searchRouter);

// Root route for health checks
app.get("/", (req, res) => {
  res.send("iTunes Search API Proxy with JWT is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
