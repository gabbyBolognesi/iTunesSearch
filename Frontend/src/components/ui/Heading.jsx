import React from "react";

/**
 *
 * This component renders the fixed top header of the application.
 * It displays the app title "ITUNES MEDIA SEARCH" inside a styled
 * header card that remains fixed at the top of the viewport.
 *
 * The styling is handled via CSS to ensure the header stays centered,
 * responsive, and visually separated from the main layout below.
 */

function Heading() {
  return (
    <header className="heading-card">
      <h1 className="heading-title">ITUNES MEDIA SEARCH</h1>
    </header>
  );
}

export default Heading;
