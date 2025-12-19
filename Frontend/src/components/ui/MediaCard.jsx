import React from "react";
import { Heart } from "lucide-react";

/**
 *
 * This component renders a single media item as a square card with:
 *  - A high-resolution image (artwork)
 *  - Title, artist/author, and release date
 *  - A favourite (heart) button for adding/removing from favourites
 *
 * The component receives the following props:
 *  - `item`: The media object from the iTunes Search API.
 *  - `toggleFavourite`: Callback to add or remove the item from favourites.
 *  - `isFav`: Boolean indicating whether the item is currently favourited.
 *
 * The heart icon is filled red if `isFav` is true, otherwise outlined.
 * Image URLs are upgraded from 100x100 to 600x600 for better quality.
 */

function MediaCard({ item, toggleFavourite, isFav }) {
  const { artworkUrl100, trackName, collectionName, artistName, releaseDate } =
    item;

  const highResImage = artworkUrl100
    ? artworkUrl100.replace(/\/[0-9]+x[0-9]+bb\.(jpg|png)$/, "/600x600bb.$1")
    : "/placeholder.png";

  const title = trackName || collectionName || "Untitled";
  const date = releaseDate ? new Date(releaseDate).toLocaleDateString() : "";

  return (
    <div className="media-card">
      <div className="media-card-image">
        <img src={highResImage} alt={title} loading="lazy" />
      </div>

      <div className="media-card-content">
        <h3 className="media-card-title">{title}</h3>
        {artistName && <p className="media-card-artist">{artistName}</p>}
        {date && <p className="media-card-date">{date}</p>}

        <button
          className="media-card-fav"
          onClick={() => toggleFavourite(item)}
          title={isFav ? "Remove from favourites" : "Add to favourites"}
        >
          <Heart
            size={20}
            strokeWidth={1.8}
            fill={isFav ? "#e63946" : "none"}
            color={isFav ? "#e63946" : "#555"}
          />
        </button>
      </div>
    </div>
  );
}

export default MediaCard;
