# Rent a Ride — Full-Stack Car Rental Marketplace

<div align="center">

![Rent a Ride](https://img.shields.io/badge/Rent%20a%20Ride-Car%20Rental%20Platform-6d28d9?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTUgMTFsMS41LTQuNUgxN0wxOC41IDExTTE3IDE2YTEuNSAxLjUgMCAwIDEtMS41LTEuNUExLjUgMS41IDAgMCAxIDE3IDEzYTEuNSAxLjUgMCAwIDEgMS41IDEuNUExLjUgMS41IDAgMCAxIDE3IDE2TTcgMTZhMS41IDEuNSAwIDAgMS0xLjUtMS41QTEuNSAxLjUgMCAwIDEgNyAxM2ExLjUgMS41IDAgMCAxIDEuNSAxLjVBMS41IDEuNSAwIDAgMSA3IDE2bTExLjkyLTkuMDFDMTguNzIgNi40MiAxOC4xNiA2IDE3LjUgNmgtMTFjLS42NiAwLTEuMjEuNDItMS40Mi45OUwzIDEydjhhMSAxIDAgMCAwIDEgMWgxYTEgMSAwIDAgMCAxLTF2LTFoMTJ2MWExIDEgMCAwIDAgMSAxaDFhMSAxIDAgMCAwIDEtMXYtOGwtMi4wOC01LjAxeiIvPjwvc3ZnPg==)

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Redux](https://img.shields.io/badge/Redux%20Toolkit-2-764ABC?style=flat-square&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payments-0C2451?style=flat-square&logo=razorpay&logoColor=white)](https://razorpay.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

**Book a car in minutes — for users, vendors, and admins.**

Rent a Ride is a production-style car rental marketplace with three role-based modules. Users browse and book vehicles by city and date, vendors list their own cars for approval, and admins manage the whole platform — backed by secure JWT auth, Razorpay payments with signature verification, Cloudinary media storage, and automated email receipts.

[Live Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture--system-design)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage Guide](#-usage-guide)
- [API Reference](#-api-reference)
- [Example Workflow](#-example-workflow)
- [Challenges Solved](#-challenges-solved)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Overview

Rent a Ride is a **full-stack, role-based car rental platform** built for three distinct audiences: **renters**, **vehicle owners (vendors)**, and **administrators**.

A user searches available vehicles for a chosen city, pickup location, and date range, pays securely through **Razorpay (test mode)**, and instantly receives an HTML **booking receipt by email**. Vendors list their own vehicles (with images uploaded to **Cloudinary**) which go into an admin approval queue. Admins approve/reject listings, manage all bookings, and oversee users and vendors from a dedicated dashboard.

```
Search by city & date → Select vehicle → Pay (Razorpay) → Signature verified → Booking saved → Receipt emailed
```

> **Portfolio Note:** This project demonstrates role-based access control, a verified online payment flow, file uploads to cloud storage, transactional email, and MongoDB aggregation pipelines in a real, multi-actor marketplace.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🚗 **Search, Filter & Book** | Find available cars by district, pickup location, and date range with dynamic availability checks |
| 💳 **Verified Razorpay Payments** | Orders are created server-side and confirmed with **HMAC-SHA256 signature verification** + duplicate-payment prevention |
| 📧 **Automated Email Receipts** | A professional HTML receipt (booking ID, payment ID, trip & vehicle details) is emailed on successful payment |
| 👤 **Three Role-Based Modules** | Separate, protected experiences for **User**, **Vendor**, and **Admin** |
| 🏪 **Vendor Listings + Approval** | Vendors add vehicles (with image uploads); admins approve/reject before they go live |
| 🛡️ **JWT Auth + Google OAuth** | Access/refresh tokens, bcrypt password hashing, role-based protected routes, and Firebase Google sign-in |
| 🖼️ **Cloudinary Media Storage** | Vehicle images/videos are uploaded via Multer and stored on Cloudinary; only URLs live in the DB |
| 📊 **Admin Dashboard** | Manage bookings, vehicles, vendor requests, and users from one place |

---

## 🏗️ Architecture / System Design

```
┌─────────────────────────────────────────────────────────────────────┐
│                          CLIENT (Browser)                            │
│   React 18 · Vite · Redux Toolkit · Tailwind · MUI · React Router    │
│            User UI    ·    Vendor Dashboard    ·    Admin Panel       │
└───────────────────────────────┬──────────────────────────────────────┘
                                │ REST  (Vite proxy /api → backend)
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   BACKEND API  (Node.js / Express)                   │
│   Auth (JWT + Google) · RBAC middleware · Booking · Payments · Mail  │
└───┬───────────────┬───────────────┬───────────────┬──────────────────┘
    │               │               │               │
    ▼               ▼               ▼               ▼
┌─────────┐   ┌───────────┐   ┌───────────┐   ┌──────────────┐
│ MongoDB │   │ Razorpay  │   │Cloudinary │   │  Nodemailer  │
│ (Atlas) │   │ (payments)│   │ (media)   │   │ (Gmail SMTP) │
│         │   └───────────┘   └───────────┘   └──────────────┘
│ users   │
│ vehicles│        Firebase Google Identity ──► OAuth sign-in
│ bookings│
│masterdata│  (cities + car models lookup)
└─────────┘
```

### Data Flow (a booking)

1. **Search** — User picks district, location, and dates; backend filters vehicles via an availability check against existing bookings
2. **Checkout** — Frontend computes the total (`rate × days + fees`) and submits the order
3. **Create order** — `razorpayOrder` creates a Razorpay order server-side
4. **Pay** — The Razorpay test checkout collects payment and returns a signature
5. **Verify** — `bookCar` recomputes the HMAC-SHA256 signature and rejects mismatches; duplicates are ignored
6. **Persist** — A `Booking` document is saved and linked to the user and vehicle
7. **Notify** — A formatted HTML receipt is emailed to the user via Nodemailer

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + Vite | SPA framework & dev/build tooling |
| Redux Toolkit + redux-persist | Global state with persistence |
| Tailwind CSS + MUI | Styling and UI components |
| React Hook Form + Zod | Forms and schema validation |
| React Router v6 | Client-side routing & protected routes |
| Firebase Auth | Google OAuth sign-in |
| Razorpay Checkout | Payment UI |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 4 | REST API framework |
| MongoDB + Mongoose 8 | Database & ODM (aggregation pipelines) |
| jsonwebtoken | JWT access & refresh tokens |
| bcryptjs | Password hashing |
| Multer + datauri | Multipart file handling |
| Razorpay SDK | Order creation & payment verification |
| Nodemailer | Transactional email (Gmail) |

### Integrations & Infrastructure
| Service | Purpose |
|---|---|
| MongoDB Atlas | Cloud database |
| Cloudinary | Image/video storage & CDN |
| Razorpay (Test Mode) | Payment gateway |
| Firebase | Google identity provider |
| AWS EC2 + Nginx + PM2 | Backend hosting (reverse proxy + uptime) |
| Vercel | Frontend hosting |
| Cloudflare | DNS / CDN |

---

## 📁 Folder Structure

```
Rent-a-Ride/
├── backend/                          # Node.js / Express API
│   ├── server.js                     # App entry: CORS, routes, Mongo connection
│   ├── controllers/
│   │   ├── authController.js          # signup, signin, google, refreshToken
│   │   ├── userControllers/
│   │   │   ├── userController.js       # update, delete, signout
│   │   │   ├── userProfileController.js
│   │   │   ├── userAllVehiclesController.js  # listings, details, search
│   │   │   └── userBookingController.js      # razorpay, bookCar, receipts
│   │   ├── adminControllers/
│   │   │   ├── adminController.js
│   │   │   ├── dashboardController.js        # vehicle CRUD
│   │   │   ├── bookingsController.js
│   │   │   ├── vendorVehilceRequests.js      # approve / reject listings
│   │   │   └── masterCollectionController.js # cities + car models
│   │   └── vendorControllers/
│   │       ├── vendorController.js           # vendor auth
│   │       ├── vendorCrudController.js        # add/edit/delete vehicles
│   │       └── vendorBookingsController.js
│   ├── models/
│   │   ├── userModel.js               # user / admin / vendor (role flags)
│   │   ├── vehicleModel.js
│   │   ├── BookingModel.js
│   │   └── masterDataModel.js         # locations & car models lookup
│   ├── routes/                        # auth · user · admin · vendor
│   ├── services/checkAvailableVehicle.js     # date-based availability
│   ├── utils/                         # verifyUser (JWT), cloudinaryConfig, multer, error
│   ├── seed.js                        # seed cities + car models
│   ├── seedVehicles.js                # seed 20 admin demo cars (+ admin user)
│   └── seedVendorVehicles.js          # seed vendor demo cars
│
└── client/                           # React + Vite SPA
    ├── src/
    │   ├── pages/
    │   │   ├── user/                   # Home, Vehicles, Checkout, Orders, Profile, Legal
    │   │   ├── vendor/                 # Vendor dashboard, listings, bookings
    │   │   └── admin/                  # Admin dashboard, components, layouts
    │   ├── components/                 # Header, Footer, OAuth, modals, UI, Layout
    │   ├── redux/                      # user / vendor / adminSlices (Redux Toolkit)
    │   ├── hooks/                      # e.g. useFetchLocationsLov
    │   ├── firebase.js                 # Firebase config (Google sign-in)
    │   └── App.jsx                     # Routes & route guards
    ├── vite.config.js                 # /api proxy → backend
    └── tailwind.config.js
```

---

## 🚀 Installation

### Prerequisites

- [Node.js 18+](https://nodejs.org/)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) connection string (or local MongoDB)
- Accounts/keys for: [Cloudinary](https://cloudinary.com/), [Razorpay (test)](https://dashboard.razorpay.com/), a [Firebase](https://console.firebase.google.com/) web app, and a Gmail **App Password**

### Setup

```bash
# 1. Clone
git clone https://github.com/your-username/Rent-a-Ride.git
cd Rent-a-Ride

# 2. Backend dependencies (root package.json)
npm install

# 3. Frontend dependencies
cd client && npm install && cd ..

# 4. Environment files
cp .env.example .env
cp client/.env.example client/.env
#   → fill in the values (see Configuration below)

# 5. (Optional) Seed demo data: cities, car models, demo cars + admin
node backend/seed.js
node backend/seedVehicles.js
```

### Run (two terminals)

```bash
# Terminal 1 — backend (http://localhost:3000)
npm run dev

# Terminal 2 — frontend (http://localhost:5173)
cd client && npm run dev
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000 |

---

## ⚙️ Configuration

### Backend — root `.env`

```env
# Database
mongo_uri=mongodb+srv://<user>:<pass>@cluster.mongodb.net/rentaride

# JWT secrets (use long random strings)
ACCESS_TOKEN=your_access_token_secret
REFRESH_TOKEN=your_refresh_token_secret

# Cloudinary (vehicle image uploads)
CLOUD_NAME=your_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

# Razorpay (test mode)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_SECRET=your_razorpay_secret

# Email (Gmail address + 16-char App Password)
EMAIL_HOST=youraddress@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

### Frontend — `client/.env`

```env
# Backend base URL (used directly and by the Vite /api proxy)
VITE_PRODUCTION_BACKEND_URL=http://localhost:3000

# Firebase web API key (Google sign-in)
VITE_FIREBASE_API_KEY=your_firebase_web_api_key

# Razorpay public key id (same as backend RAZORPAY_KEY_ID)
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
```

> **Notes**
> - The Razorpay **secret** and Gmail **password** must stay in the backend `.env` only — never in `client/`.
> - Gmail requires 2-Step Verification enabled, then an **App Password** (16 chars, no spaces).
> - The Firebase API key belongs in the client (it is not a secret); the rest of the Firebase config lives in `client/src/firebase.js`.

---

## 📖 Usage Guide

### As a User
1. **Sign up / Sign in** (email + password, or Google).
2. On the home page **Book a car**: choose district, pickup & drop-off location, and dates → **Search**.
3. Pick a vehicle → on **Checkout**, confirm dates, fill phone & address → **Place Order**.
4. Pay in the Razorpay test popup (card `4111 1111 1111 1111`, any future expiry/CVV).
5. View your bookings under **Profile → Orders**; a **receipt email** is sent automatically.

### As a Vendor
1. Go to **Vendor Sign In / Sign Up** (`/vendorSignin`).
2. From the dashboard, **Add Vehicle** with details and images (uploaded to Cloudinary).
3. New listings stay **pending** until an admin approves them.

### As an Admin
1. Sign in with an admin account (a user with `isAdmin: true`) → you're routed to `/adminDashboard`.
2. Approve/reject vendor vehicle requests, manage vehicles, view all bookings, and manage users.

---

## 📡 API Reference

Base URL: `http://localhost:3000`. Protected routes require a valid token
(`Authorization: Bearer <refreshToken>,<accessToken>`).

### Auth — `/api/auth`
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/signup` | Register a user |
| `POST` | `/signin` | Login, receive tokens |
| `POST` | `/google` | Google OAuth sign-in |
| `POST` | `/refreshToken` | Rotate access/refresh tokens |

### User — `/api/user`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/listAllVehicles` | List all vehicles | ❌ |
| `POST` | `/showVehicleDetails` | Single vehicle details | ❌ |
| `POST` | `/showSingleofSameModel` | Search available cars by location/date | ❌ |
| `POST` | `/filterVehicles` | Filter/sort vehicles | ❌ |
| `POST` | `/razorpay` | Create a Razorpay order | ✅ |
| `POST` | `/bookCar` | Verify payment & save booking | — |
| `POST` | `/findBookingsOfUser` | List a user's bookings | ❌ |
| `POST` | `/latestbookings` | Latest booking (for receipt) | ❌ |
| `POST` | `/sendBookingDetailsEamil` | Email the booking receipt | ❌ |
| `POST` | `/editUserProfile/:id` | Update profile | ❌ |
| `DELETE` | `/delete/:id` | Delete own account | ✅ |

### Vendor — `/api/vendor`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/vendorsignup` · `/vendorsignin` · `/vendorgoogle` | Vendor auth | ❌ |
| `POST` | `/vendorAddVehicle` | Add a vehicle (multipart) | ✅ |
| `POST` | `/showVendorVehilces` | List the vendor's vehicles | ✅ |
| `PUT` | `/vendorEditVehicles/:id` | Edit a vehicle | ✅ |
| `DELETE` | `/vendorDeleteVehicles/:id` | Delete a vehicle | ✅ |
| `POST` | `/vendorBookings` | Bookings for the vendor's cars | ✅ |

### Admin — `/api/admin`
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/dashboard` | Admin login (role-checked) |
| `GET` | `/getVehicleModels` | Cities + car models lookup |
| `POST` | `/addProduct` | Add a vehicle (multipart) |
| `GET` | `/showVehicles` | List all vehicles |
| `PUT` | `/editVehicle/:id` · `DELETE /deleteVehicle/:id` | Manage a vehicle |
| `GET` | `/fetchVendorVehilceRequests` | Pending vendor listings |
| `POST` | `/approveVendorVehicleRequest` · `/rejectVendorVehicleRequest` | Moderate listings |
| `GET` | `/allBookings` | All platform bookings |
| `POST` | `/changeStatus` | Update a booking's status |

---

## 🔄 Example Workflow

```bash
# 1. Register a user
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"rider1","email":"rider1@example.com","password":"secret123"}'

# 2. Sign in (returns accessToken + refreshToken)
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"rider1@example.com","password":"secret123"}'

# 3. Search available cars in Delhi for a date range
curl -X POST http://localhost:3000/api/user/showSingleofSameModel \
  -H "Content-Type: application/json" \
  -d '{
    "pickUpDistrict":"Delhi",
    "pickUpLocation":"Connaught Place : Metro Station",
    "pickupDate":"2026-07-01T10:00:00.000Z",
    "dropOffDate":"2026-07-03T10:00:00.000Z"
  }'
# → [{ "name": "Swift VXI", "price": 2200, "location": "Connaught Place : Metro Station", ... }]

# 4. Create a Razorpay order (auth required)
curl -X POST http://localhost:3000/api/user/razorpay \
  -H "Authorization: Bearer <refreshToken>,<accessToken>" \
  -H "Content-Type: application/json" \
  -d '{"totalPrice":4450,"pickup_district":"Delhi","pickup_location":"...","dropoff_location":"..."}'
# → { "id": "order_xxx", "amount": 445000, "currency": "INR", "status": "created" }
```

---

## 🧩 Challenges Solved

### 1. Tamper-proof Payments
**Problem:** A client could fake a "payment success" and create a booking it never paid for.
**Solution:** `bookCar` recomputes the Razorpay **HMAC-SHA256 signature** from `order_id|payment_id` using the secret and rejects any mismatch. Bookings are also de-duplicated by `razorpayPaymentId`, so a replayed callback can't double-book.

### 2. Date-aware Vehicle Availability
**Problem:** The same car must not be bookable for overlapping date ranges.
**Solution:** A dedicated availability service (`checkAvailableVehicle.js`) excludes vehicles with overlapping bookings (while still allowing cars whose previous trips are completed/cancelled), so search only returns genuinely free cars.

### 3. Vehicle Image Uploads Without Bloating the DB
**Problem:** Storing image binaries in MongoDB is expensive and slow.
**Solution:** Images are received via **Multer**, converted to data URIs, uploaded to **Cloudinary**, and only the resulting secure URLs are stored on the vehicle document.

### 4. Token-expiry Request Hang
**Problem:** Requests with an expired access token hit a branch in the auth middleware that returned no response — hanging the client.
**Solution:** `verifyToken` now falls back to validating the **refresh token** (checked against the DB) and continues the request, eliminating the hang.

### 5. Three Actors, One Codebase
**Problem:** Users, vendors, and admins need different access and views.
**Solution:** A single `User` model with `isUser / isVendor / isAdmin` flags drives **role-based protected routes** on both the API (middleware) and the client (route guards), keeping each module isolated.

---

## 🔮 Future Improvements

- [ ] **Backend input validation** — Zod/Joi middleware on every endpoint
- [ ] **httpOnly cookie auth** — move tokens out of `localStorage` for stronger XSS protection
- [ ] **Automated tests** — Jest + Supertest for auth, booking, and payment flows
- [ ] **Razorpay webhooks** — server-to-server payment confirmation in addition to client verification
- [ ] **Password reset & email verification** — token + expiry flows
- [ ] **PDF invoices** — attach a generated PDF receipt to the confirmation email
- [ ] **Rate limiting & Helmet** — brute-force protection and secure headers
- [ ] **Booking lifecycle** — wire status transitions (booked → onTrip → completed) with validation
- [ ] **Admin analytics** — charts for revenue, bookings, and top vehicles
- [ ] **Full vendor/admin Google login** — issue tokens on OAuth so every role works with either login method

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** with a clear message: `git commit -m "feat: add booking cancellation flow"`
4. **Push** and open a **Pull Request** against `main`

### Guidelines
- Match the existing code style (ESLint for the client).
- Keep PRs focused — one feature or fix per PR.
- Update this README when you add environment variables or endpoints.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

> *Assumption: MIT license inferred from open-source conventions; no LICENSE file was present in the repository. Add one by running `npx license mit` (or create a `LICENSE` file) in the project root.*

---

<div align="center">

Built with ❤️ for renters, vendors, and the people who keep fleets moving.

**Rent a Ride** — *Your next ride, just a few clicks away.*

</div>
