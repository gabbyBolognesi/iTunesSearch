/**
 *
 * This file defines a reusable Express middleware function for
 * verifying and authorising JSON Web Tokens (JWT) on incoming requests.
 *
 * Usage:
 *  - Import and apply this middleware to any route that should be protected.
 *  - Requires the `Authorization` header to contain a valid JWT in the format:
 *        Authorization: Bearer <token>
 *
 * Responsibilities:
 *  - Extract the token from the Authorization header.
 *  - Verify the token using the server's secret key.
 *  - Attach the decoded token payload to `req.user` for downstream handlers.
 *  - Return appropriate HTTP errors if the token is missing or invalid.
 */

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from .env (e.g., JWT_SECRET)
dotenv.config();

/**
 * Middleware to authenticate incoming requests using JWT.
 * If valid, attaches the decoded token payload to `req.user`.
 * Otherwise, responds with 401 (no token) or 403 (invalid token).
 */
export function authenticateToken(req, res, next) {
  // Retrieve the `Authorization` header: "Bearer <token>"
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // safely split

  // If no token was provided, block the request
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  // Verify the token with the secret key from .env
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = user;

    // Pass control to the next middleware or route handler
    next();
  });
}
