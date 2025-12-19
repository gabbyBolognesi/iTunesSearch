/**
 * This Express router handles all `/search` requests for the application.
 * It proxies queries to the public iTunes Search API and returns the results
 * to the frontend.
 *
 * Accepted query parameters:
 *  - term (string, required): The search keyword entered by the user.
 *  - media (string, optional): The type of media to filter by (e.g. "music", "movie", "podcast").
 *  - limit (number, optional): Maximum number of results to return. Defaults to 50.
 *
 * The router constructs the query string using URLSearchParams and forwards it to
 * the iTunes Search API using Axios. Errors are caught and logged, and a 500 response
 * is returned if something goes wrong.
 *
 * All routes under `/search` are protected by JWT middleware. Clients must include
 * a valid Bearer token in the Authorization header.
 *
 * Example:
 *   GET /search?term=beatles&media=music&limit=25
 */

import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  const { term, media, limit = 50 } = req.query;

  if (!term) {
    return res.status(400).json({ error: "Missing search term" });
  }

  try {
    const params = new URLSearchParams({ term, limit });
    if (media) {
      params.append("media", media);
    }

    const url = `https://itunes.apple.com/search?${params.toString()}`;
    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error("Failed to fetch from iTunes API:", error);
    res.status(500).json({ error: "Failed to fetch from iTunes API" });
  }
});

export default router;
