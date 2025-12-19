/**
 * The root component of the iTunes Media Search application.
 * It is responsible for:
 *
 *  - Managing global state for:
 *      • Favourites list (shared between search results and favourites panel)
 *      • JWT authentication token for secure API requests
 *
 *  - Performing an automatic login when the app starts to retrieve a temporary JWT token.
 *    The token is stored in state and added to Axios default headers so that
 *    all subsequent API requests include it automatically.
 *
 *  - Rendering the fixed heading and main layout (Search + Favourites sections).
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Heading from "./components/ui/Heading";
import BodyLayout from "./components/ui/BodyLayout";

function App() {
  // Global list of favourited media items
  const [favourites, setFavourites] = useState([]);

  // JWT token for authenticated API requests
  const [token, setToken] = useState(null);

  /**
   * On initial mount, perform a simple login to retrieve a JWT token.
   * The token is stored and added to Axios defaults for all requests.
   */
  useEffect(() => {
    const login = async () => {
      try {
        const res = await axios.post("http://localhost:3000/login", {
          username: "demo-user",
        });

        const userToken = res.data.token;
        setToken(userToken);

        // Set token as default Authorization header for all requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      } catch (err) {
        console.error("Login failed:", err);
      }
    };

    login();
  }, []);

  /**
   * Add or remove an item from the favourites list.
   * If the item already exists, it will be removed. Otherwise, it's added.
   */
  const toggleFavourite = (item) => {
    setFavourites((prev) => {
      const exists = prev.find(
        (f) =>
          f.trackId === item.trackId || f.collectionId === item.collectionId
      );

      if (exists) {
        return prev.filter(
          (f) =>
            f.trackId !== item.trackId && f.collectionId !== item.collectionId
        );
      } else {
        return [...prev, item];
      }
    });
  };

  return (
    <>
      <Heading />
      <BodyLayout favourites={favourites} toggleFavourite={toggleFavourite} />
    </>
  );
}

export default App;
