# Highway Delite Notes App

A secure notes app with OTP-based authentication, user profile, and note management.  
Mobile-friendly design, JWT authorization, and error handling.

---

## Features

- Sign up and log in using email and OTP
- Create and delete personal notes
- "Keep me logged in" option (persistent login)
- Responsive/mobile-friendly UI
- JWT-based authentication and authorization
- Error messages for invalid input, OTP, and API failures
- Deployed on Netlify (frontend) and Render (backend)

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, JWT
- **Email:** Nodemailer (Gmail)
- **Auth:** OTP via email, JWT cookies
- **Deployment:** Netlify (frontend), Render (backend)
---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/highway-delite-notes-app.git
cd highway-delite-notes-app
```

### 2. Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### 3. Environment Variables

Create a `.env` file in the `backend` folder:

```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

### 4. Run the app

#### Backend

```bash
cd backend
npm start
```

#### Frontend

```bash
cd ../frontend
npm run dev
```


### 4. Netlify Routing Fix

Make sure `_redirects` file exists in `public` folder:

```
/*    /index.html   200
```

## API Base

Update `frontend/constant/api.js` if you change backend URL:

```js
export const API_BASE = "https://your-backend-url/api";
```
## Deployment

- **Frontend:** Deploy `frontend/dist` to Netlify.
- **Backend:** Deploy `backend` to Render or similar.

## Usage

1. **Sign Up:** Enter your name, DOB, email, and request OTP. Enter OTP to complete signup.
2. **Sign In:** Enter your email, request OTP, enter OTP to log in.
3. **Keep Me Logged In:** Check the box to stay logged in for 7 days.
4. **Dashboard:** View your profile, create and delete notes.

---

## Commit Guidelines

- Commit after each feature (signup, signin, notes, error handling, etc.)
- Use clear commit messages

---

## License

MIT

---

## Author

Sarvanand
[Your GitHub Profile](https://github.com/sarvanand98)
