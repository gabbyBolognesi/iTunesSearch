import React from "react";
import SearchCard from "./SearchCard";
import FavouritesCard from "./FavouritesCard";

/**
 *
 * This component structures the main layout of the app by rendering
 * the SearchCard (left) and FavouritesCard (right) side by side.
 * It receives the global `favourites` state and the `toggleFavourite`
 * function as props from App.jsx, and passes them down to both child
 * components to allow shared functionality.
 *
 * Layout is fully responsive using CSS flexbox:
 * - On large screens, the two panels are displayed in a horizontal layout.
 * - On smaller screens, they stack vertically.
 */

function BodyLayout({ favourites, toggleFavourite }) {
  return (
    <main className="layout-wrapper">
      <SearchCard favourites={favourites} toggleFavourite={toggleFavourite} />
      <FavouritesCard
        favourites={favourites}
        toggleFavourite={toggleFavourite}
      />
    </main>
  );
}

export default BodyLayout;
