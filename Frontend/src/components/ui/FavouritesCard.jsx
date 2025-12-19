import React from "react";
import MediaCard from "./MediaCard";

/**
 *
 * This component displays the user's list of favourite media items.
 * - If there are no favourites, it shows a simple empty-state message.
 * - If there are favourites, it renders them in a responsive grid
 *   using the shared <MediaCard /> component for each item.
 *
 * The `favourites` array and `toggleFavourite` function are received as props
 * from the parent component (App.jsx), allowing the user to add/remove
 * favourites consistently across the app.
 */

function FavouritesCard({ favourites, toggleFavourite }) {
  return (
    <aside className="favourites-card">
      <div className="section-heading">FAVOURITES</div>

      {favourites.length === 0 ? (
        <p>No favourites yet</p>
      ) : (
        <div className="results-grid">
          {favourites.map((item) => (
            <MediaCard
              key={item.trackId || item.collectionId}
              item={item}
              toggleFavourite={toggleFavourite}
              isFav={true}
            />
          ))}
        </div>
      )}
    </aside>
  );
}

export default FavouritesCard;
