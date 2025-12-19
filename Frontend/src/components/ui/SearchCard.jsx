import React, { useState, useEffect } from "react";
import axios from "axios";
import MediaCard from "./MediaCard";

/**
 * SearchCard
 *
 * Handles searching the iTunes Search API through the backend proxy.
 * - Lets users enter a search term and select a media type.
 * - Automatically refreshes results when the media filter changes.
 * - Displays results in a responsive grid of MediaCards.
 *
 * Props:
 *  - favourites: Array of favourited items (from App.jsx)
 *  - toggleFavourite: Function to add/remove favourites
 */
function SearchCard({ favourites, toggleFavourite }) {
  const [term, setTerm] = useState("");
  const [media, setMedia] = useState("all");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!term.trim()) return;

    setLoading(true);
    try {
      const params = { term, limit: 50 };
      if (media !== "all") params.media = media;

      // ✅ This will automatically include the Authorization header
      const res = await axios.get("/search", { params });
      setResults(res.data.results || []);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Auto re-run search if media filter changes while a term is set
  useEffect(() => {
    if (term.trim()) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media]);

  return (
    <section className="search-card">
      <div className="section-heading">SEARCH MEDIA</div>

      {/* Search input + media filter */}
      <form className="search-filter-row" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />

        <div className="media-select-wrapper">
          <select
            className="media-select"
            value={media}
            onChange={(e) => setMedia(e.target.value)}
          >
            <option value="all">All</option>
            <option value="movie">Movie</option>
            <option value="podcast">Podcast</option>
            <option value="music">Music</option>
            <option value="musicVideo">Music Video</option>
            <option value="audiobook">Audiobook</option>
            <option value="shortFilm">Short Film</option>
            <option value="tvShow">TV Show</option>
            <option value="software">Software</option>
            <option value="ebook">Ebook</option>
          </select>
        </div>
      </form>

      {/* Loading state */}
      {loading && <p>Searching...</p>}

      {/* Results grid */}
      <div className="results-grid">
        {results.length > 0
          ? results.map((item) => (
              <MediaCard
                key={item.trackId || item.collectionId || Math.random()}
                item={item}
                toggleFavourite={toggleFavourite}
                isFav={favourites.some(
                  (f) =>
                    f.trackId === item.trackId ||
                    f.collectionId === item.collectionId
                )}
              />
            ))
          : !loading &&
            term && (
              <p style={{ textAlign: "center", width: "100%" }}>No results</p>
            )}
      </div>
    </section>
  );
}

export default SearchCard;
