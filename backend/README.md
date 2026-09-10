# Tripleten web_project_around_express

## Around the US (Back-End) - Web Project Around Express

This repository contains the back-end RESTful API for the **"Around the US"** web application. Built using **Node.js**, **Express.js**, and **MongoDB** with **Mongoose**, this server provides routes for managing users, cards, and interactions such as likes and profile updates.

---

## 🚀 Features & Endpoints

The API interacts with a MongoDB database (`aroundb`) and runs by default on `http://localhost:3000`.

### 👤 User Routes

- **`GET /users`** — Returns a list of all users.
- **`GET /users/:userId`** — Returns a user object matching the provided `_id`.
- **`POST /users`** — Creates a new user. Accepts `name`, `about`, and `avatar` in the JSON request body.
- **`PATCH /users/me`** — Updates the current user's profile (`name` and `about`).
- **`PATCH /users/me/avatar`** — Updates the current user's avatar (`avatar` URL).

### 🎴 Card Routes

- **`GET /cards`** — Returns a list of all cards.
- **`POST /cards`** — Creates a new card. Accepts `name` and `link` in the JSON request body (owner is set via authorization middleware).
- **`DELETE /cards/:cardId`** — Deletes a card by its `_id`.
- **`PUT /cards/:cardId/likes`** — Adds a like to the card for the current user.
- **`DELETE /cards/:cardId/likes`** — Removes a like from the card for the current user.

### ⚠️ Non-Existent Routes & Error Handling

- **`ALL /*`** — Returns status `404` with `{"message": "Requested resource not found"}`.
- **Standardized Error Responses:**
  - `400` — Invalid data provided to controllers or schema validation failure.
  - `404` — Requested user or card ID not found in the database.
  - `500` — Standard server error.

---

## 🛠️ Tech Stack & Database

- **Runtime Environment:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database & ODM:** [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) (`mongodb://localhost:27017/aroundb`)
- **Development Reload:** [Nodemon](https://nodemon.io/)
- **Linter & Code Style:** [ESLint](https://eslint.org/) following the Airbnb JavaScript Style Guide (`airbnb-base`)
- **Code Formatting:** [EditorConfig](https://editorconfig.org/) / [Prettier](https://prettier.io/)

---

## 📁 Project Structure

```text
web_project_around_express/
├── controllers/
│   ├── users.js         # User controller logic (CRUD, error handling)
│   └── cards.js         # Card controller logic (CRUD, likes)
├── models/
│   ├── user.js          # Mongoose schema and model for users (with regex URL validation)
│   └── card.js          # Mongoose schema and model for cards
├── routes/
│   ├── users.js         # User API endpoints setup
│   └── cards.js         # Card API endpoints setup
├── app.js               # Express application setup, MongoDB connection, & temporary auth middleware
├── .editorconfig        # Code style specifications across editors
├── .eslintrc            # ESLint configuration setup
├── .prettierrc          # Prettier code formatting configuration
├── .gitignore           # Ignored files for Git
├── package.json         # NPM scripts and project dependencies
├── package-lock.json    # Locked dependency version tree
└── README.md            # Project documentation
```
