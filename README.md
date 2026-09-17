# Tripleten web_project_api_full (Full-Stack Application)

This repository contains the complete full-stack implementation of the "Around the U.S." web application. The project integrates React front-end with Node.js/Express back-end RESTful API, featuring full user authentication, state management, and secure secret key isolation.

## 🎨 Front-End (UX & UI)

### 🌗 Dark and Light Theme

- **UX/UI:** Switching between dark (default) and light mode for a better visual comfort across different lighting environments.
- **Local Persistence:** User theme preference is stored in `localStorage` to preserve the selected state across sessions.

![Switching between dark and Light Mode](./frontend/readme-pics/switching-theme.gif)

### 📱 Responsive Design & Mobile Adaptability

- **Fluid Layouts:** Built using CSS Grid and Flexbox to adapt from large desktop monitors down to small mobile screens.
- **Breakpoints:** Customized media queries ensure content stacks cleanly into single-column viewports without horizontal scrolling.

![Showing responsive design on DevTools gif](./frontend/readme-pics/responsive.gif)

### ❤️ Interactive Cards & Visual Feedback

- **UX/UI:** Dynamic card components with real-time like counters and active state visual highlights.
- **Micro-interactions:** Smooth hover transitions and instant UI updates when liking/unliking cards.

![Like button gif](./frontend/readme-pics/like-btn.gif)

### 💬 Modals & Contextual Popups

- **UX/UI:** Overlay windows for profile editing, avatar updates, card creation, and full-screen image views (Lightbox).

![Moldals](./frontend/readme-pics/modals.gif)

- **Error Prevention:** Real-time form validation with user-friendly error messages, keeping the submit button disabled until the input is valid.

![Form input erros](./frontend/readme-pics/error-input.gif)

- **Loading States:** Dynamic button text changes (e.g., _"Saving..."_) during asynchronous API requests to keep the user informed.

![loading gif](./frontend/readme-pics/loading.gif)

### 🗑️ Smart Contextual Buttons

- **UX/UI:** The card delete button is visible **exclusively** to the content creator, reducing interface clutter and preventing unauthorized deletion attempts.
- **Safety Confirmation:** Confirmation modal before executing destructive actions (permanent deletion).

![deleting a card](./frontend/readme-pics/delete.gif)

## Technologies Used

### Front-End

- **React 18** — Component-based architecture for dynamic user interfaces.
- **Vite** — High-performance build tool for the development environment.
- **React Router** — Client-side navigation and protected route management.
- **CSS3** — Modular styling and responsive design.

### Back-End & Database

- **Node.js & Express.js** — RESTful API server handling business logic and routing.
- **MongoDB & Mongoose** — Document-based database for storing users and cards.
- **jsonwebtoken (JWT)** — Token-based authorization for protected endpoints.
- **dotenv & Crypto** — Secure environment variable loading and 256-bit cryptographic key generation.

## Features Implemented

### 1. Front-End Interface & User Flow

- **Authentication & Authorization**: Dedicated Login and Register components managed by `ProtectedRoute` route guards.
- **Token Persistence**: Automatic user re-authentication on refresh via `localStorage` and `Authorization: Bearer {token}` API headers.
- **Componentized UI**: Modular modals (`Popup`), customizable feedback windows (`InfoTooltip`), and dynamic media cards (`Card`).
- **State Management & Feedback**: Centralized app state in `App.jsx`, native form validation, loading spinners, and instant UI updates for likes and card deletions.

### 2. Back-End API & Database Architecture

- **User Endpoints**: Routes for fetching profiles (`GET /users/me`), updating user profiles (`PATCH /users/me`), and avatar updates (`PATCH /users/me/avatar`).
- **Card Endpoints**: CRUD operations for gallery cards (`GET /cards`, `POST /cards`, `DELETE /cards/:cardId`) and interaction handling (`PUT /cards/:cardId/likes`, `DELETE /cards/:cardId/likes`).
- **Centralized Error Handling**: Standardized response codes (400, 401, 404, 500) with custom middleware for non-existent routes.

### 3. Security & Secret Management

Cryptographic Keys: Generation of 256-bit (32-byte) pseudo-random keys using Node.js's native `crypto` module:

\`\`\`bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
\`\`\`

- **Environment Isolation**: Loading `JWT_SECRET` dynamically via `dotenv` with fallback key handling for local development vs. production environments.
- **Git Exclusions**: Strictly isolating `.env` files using `.gitignore` to prevent credential exposure in remote repositories.

## 🔐 Security Checklist

- [x] **Client Security**: Token storage and protected routes implemented on the front-end.
- [x] **API Authorization**: Express middleware validating JWT signatures on private routes.
- [x] **Strong Secrets**: Keys generated via `crypto.randomBytes(32)` instead of plain text strings.
- [x] **Git Safety**: Environment credentials excluded from public commit history.

## Server Domain

- **API:** https://web-project-api-full-t9w5.onrender.com/
- **Frontend:** https://web-project-api-full-topaz.vercel.app/

```
web_project_api_full
├─ backend
│  ├─ .editorconfig
│  ├─ .env
│  ├─ .eslintrc
│  ├─ .prettierrc
│  ├─ app.js
│  ├─ controllers
│  │  ├─ cards.js
│  │  └─ users.js
│  ├─ error.log
│  ├─ errors
│  │  ├─ BadRequestError.js
│  │  ├─ ConflictError.js
│  │  ├─ ForbiddenError.js
│  │  ├─ NotFoundError.js
│  │  └─ UnauthorizedError.js
│  ├─ middlewares
│  │  ├─ auth.js
│  │  └─ logger.js
│  ├─ models
│  │  ├─ card.js
│  │  └─ user.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ request.log
│  └─ routes
│     ├─ cards.js
│     └─ users.js
├─ frontend
│  ├─ .env
│  ├─ dist
│  │  ├─ assets
│  │  │  ├─ alright-C_GbZo9o.png
│  │  │  ├─ error-7CfmJwJ9.png
│  │  │  ├─ index-2KsANoPV.js
│  │  │  ├─ index-vfL1X3AA.css
│  │  │  ├─ Inter-Black-B5fx6SzK.woff2
│  │  │  ├─ Inter-Medium-DVwNBK5Q.woff2
│  │  │  ├─ Inter-Regular-CuH2jfV0.woff2
│  │  │  └─ logo-BtAh_fAz.svg
│  │  ├─ favicon.svg
│  │  ├─ icons.svg
│  │  └─ index.html
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.svg
│  │  └─ icons.svg
│  ├─ react-router-demo-pt
│  ├─ src
│  │  ├─ assets
│  │  │  ├─ hero.png
│  │  │  ├─ react.svg
│  │  │  └─ vite.svg
│  │  ├─ blocks
│  │  │  ├─ card.css
│  │  │  ├─ cards.css
│  │  │  ├─ content.css
│  │  │  ├─ footer.css
│  │  │  ├─ header.css
│  │  │  ├─ login.css
│  │  │  ├─ page.css
│  │  │  ├─ popup.css
│  │  │  ├─ profile.css
│  │  │  ├─ register.css
│  │  │  ├─ spinner.css
│  │  │  └─ theme.css
│  │  ├─ components
│  │  │  ├─ App.jsx
│  │  │  ├─ Footer
│  │  │  │  └─ Footer.jsx
│  │  │  ├─ Header
│  │  │  │  └─ Header.jsx
│  │  │  ├─ InfoToolTip
│  │  │  │  ├─ components
│  │  │  │  │  ├─ IsAuthorized.jsx
│  │  │  │  │  └─ IsNotAuthorized.jsx
│  │  │  │  └─ InfoToolTip.jsx
│  │  │  ├─ Main
│  │  │  │  ├─ components
│  │  │  │  │  ├─ Card
│  │  │  │  │  │  └─ Card.jsx
│  │  │  │  │  └─ Popup
│  │  │  │  │     ├─ components
│  │  │  │  │     │  ├─ EditAvatar.jsx
│  │  │  │  │     │  ├─ EditProfile.jsx
│  │  │  │  │     │  ├─ ImagePopup.jsx
│  │  │  │  │     │  ├─ NewCard.jsx
│  │  │  │  │     │  └─ PopupWithConfirmation.jsx
│  │  │  │  │     └─ Popup.jsx
│  │  │  │  └─ Main.jsx
│  │  │  ├─ pages
│  │  │  │  ├─ Login.jsx
│  │  │  │  └─ Register.jsx
│  │  │  ├─ ProtectedRoute
│  │  │  │  └─ ProtectedRoute.jsx
│  │  │  └─ spinner
│  │  │     └─ spinner.jsx
│  │  ├─ contexts
│  │  │  └─ CurrentUserContext.js
│  │  ├─ hooks
│  │  │  └─ useValidation.js
│  │  ├─ images
│  │  │  ├─ add-icon.svg
│  │  │  ├─ alright.png
│  │  │  ├─ avatar.jpg
│  │  │  ├─ close.svg
│  │  │  ├─ dark-mode.svg
│  │  │  ├─ delete-icon.svg
│  │  │  ├─ edit-icon.svg
│  │  │  ├─ error.png
│  │  │  ├─ light-mode.svg
│  │  │  ├─ like-active.svg
│  │  │  ├─ like-inactive.svg
│  │  │  ├─ logo-black.svg
│  │  │  ├─ logo.svg
│  │  │  ├─ placeholder.jpg
│  │  │  └─ profile-edit.svg
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  ├─ utils
│  │  │  ├─ api.js
│  │  │  ├─ auth.js
│  │  │  ├─ theme.js
│  │  │  └─ token.js
│  │  └─ vendor
│  │     ├─ fonts
│  │     │  ├─ Inter-Black.woff2
│  │     │  ├─ Inter-Medium.woff2
│  │     │  └─ Inter-Regular.woff2
│  │     ├─ fonts.css
│  │     └─ normalize.css
│  └─ vite.config.js
└─ README.md

```
