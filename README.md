# Hotel Booking Project

A full-stack hotel booking application that allows users to search, book rooms, and manage bookings, while hotel owners can manage hotels and room listings.

## Live Demo

Backend: [https://hotel-booking-backend-blush.vercel.app](https://hotel-booking-backend-blush.vercel.app)

---

## Features

- **User Authentication**: Login and register functionality.
- **Room Booking**: Users can browse hotels and rooms, view details, and book rooms.
- **Booking Management**: Track booking status, payment methods (Stripe, Pay at Hotel), and booking history.
- **Hotel Owner Panel**: Owners can register hotels, add rooms, and toggle room availability.
- **Admin Panel**: Manage hotels, rooms, and bookings (if included in your codebase).
- **Search & Filter**: Search rooms by city and filter by amenities.
- **Responsive Frontend**: Built with React, Vite, Tailwind CSS, and Redux.
- **REST API Backend**: Built with Express.js, MongoDB, and Mongoose.

---

## Tech Stack

- **Frontend**: React, Vite, Redux Toolkit, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, Clerk (optional, commented out in code)
- **Payment**: Stripe (integration available)
- **Deployment**: Vercel, Render

---

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB instance (local or cloud)
- (Optional) Stripe account for payments
- (Optional) Clerk account for authentication

### Installation

#### Backend

```bash
cd server
npm install
# Create a .env file with your MongoDB URI and other secrets
npm start
```

#### Frontend

```bash
cd client
npm install
npm run dev
```

### Environment Variables

Backend `.env` example:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## Folder Structure

```
Hotel-Booking/
  ├── client/         # React frontend
  │   ├── src/
  │   │   ├── assets/ # Images and dummy data
  │   │   ├── context/
  │   │   ├── redux/
  │   │   ├── utils/
  │   │   └── main.jsx
  │   ├── vite.config.js
  │   └── README.md
  └── server/         # Express backend
      ├── Controllers/
      ├── Routes/
      ├── Config/
      ├── utils/
      └── server.js
```

---

## API Endpoints

- `/api/v1/user` - User authentication & profile
- `/api/v1/hotel` - Hotel registration & management
- `/api/v1/room` - Room CRUD & availability
- `/api/v1/booking` - Bookings management

---

## Contributing

Feel free to fork, open issues, or submit pull requests.

---

## License

This project currently has no explicit license.
