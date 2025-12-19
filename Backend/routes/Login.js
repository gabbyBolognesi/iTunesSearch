/**
 *
 * This is the main Express server entry point for the iTunes Media Search application.
 * It is responsible for:
 *  - Setting up core middleware (CORS, JSON parsing, environment variables).
 *  - Handling authentication via a simple JWT login route.
 *  - Securing the `/search` API endpoint with authentication middleware.
 *  - Delegating search requests to the dedicated router in `routes/search.js`.
 */

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import searchRouter from "./routes/search.js";
import { authenticateToken } from "./middleware/auth.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors()); // Allow cross-origin requests from the frontend
app.use(express.json()); // Parse incoming JSON request bodies

/**
 * POST /login
 *
 * A simple login route to issue a JWT token.
 * - Expects a JSON body with a `username` field.
 * - Returns a signed token valid for 1 hour.
 *
 */
app.post("/login", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  // Sign a JWT containing the username
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

/**
 * All routes under `/search` are protected by JWT authentication.
 * Clients must include a valid token in the `Authorization` header:
 *
 *   Authorization: Bearer <token>
 */
app.use("/search", authenticateToken, searchRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
