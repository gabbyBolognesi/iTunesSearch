# iTunes Media Search App

A full-stack web application built with **React** (frontend) and **Express.js** (backend) that allows users to search the iTunes API for media (e.g. music, movies, podcasts), filter results, and manage a temporary favourites list.

---

## 📌 Features

- Search iTunes media by keyword and media type (music, movie, podcast, etc.).
- Filter search results using a dropdown selector.
- Add and remove media items to a **favourites** panel.
- Responsive layout for desktop and mobile.
- Backend Express server acts as a **secure proxy** to the iTunes API using JWT to authorise requests.

---

## 🛠️ Tech Stack

- **Frontend:** React, Axios, CSS (custom responsive layout)
- **Backend:** Node.js, Express.js, Axios, JSON Web Token (JWT)
- **Other:** CORS, Dotenv, Nodemon (dev)

---

## 🚀 How to Run Locally

### 🔧 Environment Variables

Create a .env file in the Backend directory with the following variables:

```
PORT=3000
JWT_SECRET=your_jwt_secret
```

### 1. Install dependencies

Frontend:

```bash
cd Frontend
npm install
```

Backend:

```bash
cd ../Backend
npm install
```

### 2. Start the backend server

```bash
npm start
```

The backend will run at:

```
http://localhost:3000
```

### 3. Start the frontend

Open a new terminal tab:

```bash
cd ../Frontend
npm run dev
```

The frontend will run at:

```
http://localhost:5173
```

---

## 🔐 Authentication

The backend uses **JWT** to secure the `/search` endpoint. A token is generated when the app starts, and attached to each API request. This prevents unauthorised external requests to your backend proxy.

---

## 📂 Project Structure

```
ITunesSearch/
│
├── Backend/
│   ├── Server.js
│   ├── routes/
│   │   └── search.js
│   ├── middleware/
│   │   └── auth.js
│   ├── package.json
│   └── .env
│
├── Frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Heading.jsx
│   │   │   │   ├── BodyLayout.jsx
│   │   │   ├── MediaCard.jsx
│   │   │   ├── SearchCard.jsx
│   │   │   └── FavouritesCard.jsx
│   ├── index.html
│   ├── App.css
│   └── package.json
│
└── README.md
```

---
