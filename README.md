# Job Portal

A full-stack MERN Job Portal that connects organizations with job seekers. Organizations can register, log in, and manage job postings, while job seekers can browse available opportunities and apply for jobs.

---

## Features

### Organization

* Secure registration and login
* Session-based authentication
* Organization dashboard
* Create job postings
* View all posted jobs
* Edit existing job postings
* Delete job postings
* View applicants for each job

### Job Seeker

* Register and log in
* Browse available job listings
* View complete job details
* Apply for jobs
* Track applied jobs *(if implemented)*

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* Express Session
* HTTP-Only Cookies
* bcrypt Password Hashing

---

## Project Structure

```text
JobPortal/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── config/
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/<your-username>/<repository-name>.git
cd <repository-name>
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory.

Example:

```env
DB_URL=<your_mongodb_connection_string>
SESSION_SECRET=<your_session_secret>
PORT=8000
```

Start the backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Authentication

* Session-based authentication using Express Session
* Passwords hashed with bcrypt
* HTTP-only cookies
* Protected routes for authenticated organizations

---

## Database

MongoDB is used to store:

* Organizations
* Job Seekers
* Jobs
* Applications

---

## API Overview

### Organization

* Register
* Login
* Logout
* Get Current Organization

### Jobs

* Create Job
* Update Job
* Delete Job
* Get All Jobs
* Get Job Details

### Applications

* Apply to Job
* View Applicants

---

## Future Improvements

* Resume Upload
* Search & Filters
* Pagination
* Email Notifications
* Saved Jobs
* Admin Dashboard
* Company Profiles
* Applicant Status Tracking
* JWT/OAuth Authentication
* Docker Support
* Unit & Integration Testing

---

## Screenshots

Screenshots and GIF demonstrations will be added after deployment.

---

## Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## License

This project is built for learning purposes and portfolio demonstration.

---

## Author

**Kushal V**

Computer Science Engineering Student

Interested in Full-Stack Development, Data Structures & Algorithms, and Software Engineering.
