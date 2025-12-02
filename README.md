# Slot Booking Website

A full-stack slot booking application built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to view and book available slots, while admins can manage slots and view all bookings.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** Tailwind CSS with `@tailwindcss/postcss`

## Features

- **User Authentication:** Signup and Login with JWT.
- **Role-Based Access:** Separate dashboards for Users and Admins.
- **Slot Management:** Admins can create and delete slots.
- **Booking System:** Users can book available slots (one per day).
- **Real-time Availability:** Slot capacity updates automatically.
- **Responsive Design:** Modern UI optimized for mobile and desktop.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or a cloud instance)

## Installation & Setup

### 1. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/slot-booking
JWT_SECRET=your_super_secret_key
```

Start the backend server:

```bash
npm run dev
```
The server will run on `http://localhost:5000`.

### 2. Frontend Setup

Navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
```
The client will run on `http://localhost:5173`.

## Usage

1.  **Register:** Create a new account. You can choose to be a 'User' or 'Admin' (for demo purposes).
2.  **Admin Panel:** Login as an Admin to create slots.
3.  **User Dashboard:** Login as a User to view available slots and make a booking.
4.  **Manage Bookings:** Users can cancel their bookings; Admins can view all bookings.

## API Endpoints

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/slots/all` - Get all slots
- `POST /api/slots/create` - Create a slot (Admin)
- `DELETE /api/slots/:id` - Delete a slot (Admin)
- `POST /api/bookings/:id/book` - Book a slot
- `GET /api/bookings/user` - Get user bookings
- `GET /api/bookings/admin` - Get all bookings (Admin)
- `DELETE /api/bookings/:id/cancel` - Cancel a booking

## License

ISC
