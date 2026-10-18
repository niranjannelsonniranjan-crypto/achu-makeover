# Achu Bridal Studio — Backend API

Production-ready REST API for **Achu Bridal Studio**, a luxury makeup studio in Trichy.
Built with **Node.js, Express, MongoDB (Mongoose) and JWT authentication**.

Handles: booking requests, contact enquiries, admin authentication, and makeup package (services) management.

---

## 1. Tech Stack

| Layer      | Technology                       |
| ---------- | -------------------------------- |
| Runtime    | Node.js (v18+)                   |
| Framework  | Express 4                        |
| Database   | MongoDB Atlas + Mongoose 8       |
| Auth       | JWT (`jsonwebtoken`) + bcryptjs  |
| Email      | Nodemailer (Gmail)               |
| Validation | express-validator                |
| Config     | dotenv                           |
| Logging    | morgan (dev only)                |

---

## 2. Project Structure

```
server/
├── config/
│   └── db.js                 # MongoDB Atlas connection
├── controllers/
│   ├── adminController.js    # register / login / me
│   ├── bookingController.js  # booking CRUD
│   ├── contactController.js  # contact form + admin listing
│   └── serviceController.js  # services CRUD
├── middleware/
│   ├── asyncHandler.js       # forwards async errors to error handler
│   ├── authMiddleware.js     # JWT protection (protect)
│   ├── errorMiddleware.js    # 404 + central error handler
│   └── validate.js           # express-validator result collector
├── models/
│   ├── Admin.js              # admin user (hashed password)
│   ├── Booking.js            # bookings
│   ├── Contact.js            # contact enquiries
│   └── Service.js            # makeup packages
├── routes/
│   ├── adminRoutes.js
│   ├── bookingRoutes.js
│   ├── contactRoutes.js
│   └── serviceRoutes.js
├── utils/
│   └── sendEmail.js          # Nodemailer wrapper
├── .env.example
├── .gitignore
├── package.json
└── server.js                 # entry point
```

---

## 3. Getting Started

### Step 1 — Install dependencies

```bash
cd "c:\New folder\Achu bridal\server"
npm install
```

### Step 2 — Create your `.env`

Copy `.env.example` to `.env` and fill in real values:

```bash
copy .env.example .env
```

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/achu_bridal?retryWrites=true&w=majority
JWT_SECRET=change_this_to_a_long_random_string
JWT_EXPIRES_IN=7d
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

**MongoDB Atlas setup**
1. Create a free cluster at <https://cloud.mongodb.com>.
2. Database Access → add a user with a password.
3. Network Access → allow your IP (or `0.0.0.0/0` for testing).
4. Connect → *Drivers* → copy the connection string into `MONGO_URI`.

**Email (optional but recommended)**
Enable 2-Step Verification on the Gmail account, then create an **App Password**
and use it as `EMAIL_PASS`. Normal Gmail passwords will not work.
If email is not configured, the API still works — emails are just skipped.

### Step 3 — Run

```bash
npm run dev     # development (nodemon, auto-restart)
npm start       # production
```

Expected output:

```
MongoDB connected: cluster0-shard-00-00.xxxxx.mongodb.net
Server running in development mode on port 5000
```

Health check: `GET http://localhost:5000/`

---

## 4. API Reference

Base URL: `http://localhost:5000`

Admin routes require a header:
```
Authorization: Bearer <JWT_TOKEN>
```

### Admin Auth — `/api/admin`

| Method | Endpoint          | Access  | Description                                  |
| ------ | ----------------- | ------- | -------------------------------------------- |
| POST   | `/api/admin/register` | Public | Register the admin. **Works only once.**  |
| POST   | `/api/admin/login`    | Public | Login, returns a JWT token                |
| GET    | `/api/admin/me`       | Private| Current admin profile                     |

### Bookings — `/api/bookings`

| Method | Endpoint            | Access  | Description                          |
| ------ | ------------------- | ------- | ------------------------------------ |
| POST   | `/api/bookings`     | Public  | Create a booking request             |
| GET    | `/api/bookings`     | Admin   | List all bookings (`?status=pending`)|
| GET    | `/api/bookings/:id` | Admin   | Get one booking                      |
| PUT    | `/api/bookings/:id` | Admin   | Update a booking / change status     |
| DELETE | `/api/bookings/:id` | Admin   | Delete a booking                     |

Booking body:
```json
{
  "name": "Anitha R",
  "phone": "7806986448",
  "email": "anitha@example.com",
  "service": "Bridal",
  "date": "2026-11-20",
  "time": "09:00 AM",
  "message": "Wedding at Sri Ranganathar Hall"
}
```
`service` must be one of: `Bridal`, `Party`, `HD Makeup`. `status` is `pending` (default) or `confirmed`.

### Contact — `/api/contact`

| Method | Endpoint            | Access | Description             |
| ------ | ------------------- | ------ | ----------------------- |
| POST   | `/api/contact`      | Public | Submit an enquiry       |
| GET    | `/api/contact`      | Admin  | List all enquiries      |
| DELETE | `/api/contact/:id`  | Admin  | Delete an enquiry       |

### Services — `/api/services`

| Method | Endpoint             | Access | Description                     |
| ------ | -------------------- | ------ | ------------------------------- |
| GET    | `/api/services`      | Public | List packages (`?activeOnly=true`) |
| GET    | `/api/services/:id`  | Public | Get one package                 |
| POST   | `/api/services`      | Admin  | Create a package                |
| PUT    | `/api/services/:id`  | Admin  | Update a package                |
| DELETE | `/api/services/:id`  | Admin  | Delete a package                |

Service body:
```json
{
  "title": "HD Bridal Makeup",
  "price": 15000,
  "description": "Long-wear HD makeup with hairstyling and draping.",
  "imageUrl": "https://example.com/hd-bridal.jpg",
  "isActive": true
}
```

### Response shape

Success:
```json
{ "success": true, "message": "...", "data": { } }
```
Validation error:
```json
{ "success": false, "message": "Validation failed",
  "errors": [{ "field": "email", "message": "Please provide a valid email" }] }
```

---

## 5. Testing with Postman

### Step 0 — Start the server
```bash
npm run dev
```
Create a Postman environment variable `baseUrl = http://localhost:5000`
(and later `token`).

### Step 1 — Register the admin (one time only)
- **POST** `{{baseUrl}}/api/admin/register`
- Body → raw → JSON:
```json
{ "email": "admin@achubridal.com", "password": "admin123" }
```
- ✅ 201 Created. Copy the `token` from the response.
- ⚠️ Running this again returns **403 "Admin already registered"** — that is expected.

### Step 2 — Login
- **POST** `{{baseUrl}}/api/admin/login`
- Body → raw → JSON:
```json
{ "email": "admin@achubridal.com", "password": "admin123" }
```
- ✅ 200 OK. Copy `token`.

Save the token once so you don't repeat it:
- In Postman **Tests** tab of the login request, add:
```js
pm.environment.set("token", pm.response.json().token);
```

### Step 3 — Add the token to protected requests
For every admin request:
- Go to the **Authorization** tab → Type: **Bearer Token** → Token: `{{token}}`
- Or manually add header: `Authorization` = `Bearer {{token}}`

### Step 4 — Create a service (admin)
- **POST** `{{baseUrl}}/api/services` with Bearer token
- Body → raw → JSON:
```json
{
  "title": "HD Bridal Makeup",
  "price": 15000,
  "description": "Long-wear HD makeup with hairstyling and draping.",
  "imageUrl": "https://example.com/hd-bridal.jpg"
}
```
- ✅ 201 Created.

### Step 5 — List services (public)
- **GET** `{{baseUrl}}/api/services` → ✅ 200 OK, no token needed.

### Step 6 — Create a booking (public)
- **POST** `{{baseUrl}}/api/bookings` (no token)
- Body → raw → JSON:
```json
{
  "name": "Anitha R",
  "phone": "7806986448",
  "email": "anitha@example.com",
  "service": "Bridal",
  "date": "2026-11-20",
  "time": "09:00 AM",
  "message": "Wedding at Sri Ranganathar Hall"
}
```
- ✅ 201 Created.

### Step 7 — View all bookings (admin)
- **GET** `{{baseUrl}}/api/bookings` with Bearer token
- ✅ 200 OK with a `data` array.

### Step 8 — Confirm a booking (admin)
- **PUT** `{{baseUrl}}/api/bookings/<booking_id>` with Bearer token
- Body → raw → JSON:
```json
{ "status": "confirmed" }
```
- ✅ 200 OK, `status` is now `confirmed`.

### Step 9 — Delete a booking (admin)
- **DELETE** `{{baseUrl}}/api/bookings/<booking_id>` with Bearer token → ✅ 200 OK.

### Step 10 — Contact form (public)
- **POST** `{{baseUrl}}/api/contact` (no token)
```json
{ "name": "Priya", "phone": "9123456789", "message": "Do you travel to Thanjavur?" }
```
- ✅ 201 Created.

### Step 11 — Check the security layer
- Call **GET** `{{baseUrl}}/api/bookings` **without** the token → ✅ **401** `"Not authorized, no token provided"`.
- Send an invalid body (e.g. `"service": "Nail Art"`) → ✅ **400** with a field error.

### Quick checks

| Test                       | Expected result                          |
| -------------------------- | ---------------------------------------- |
| `GET /`                    | 200 — API is running                     |
| Register twice             | 403 — registration disabled              |
| Wrong password login       | 401 — Invalid email or password          |
| Admin route without token  | 401 — Not authorized                     |
| Invalid email in booking   | 400 — validation errors array            |
| Bad id (`/api/bookings/1`) | 400 — Invalid booking id                 |
| Unknown route              | 404 — Route not found                    |

**Tip:** In Postman use **Collections** to save these requests, and
**Environments** for `baseUrl` and `token`. Use *Save Response → Save as example*
to document each endpoint.

---

## 6. Deployment notes

- Set `NODE_ENV=production` and use a strong `JWT_SECRET`.
- Never commit `.env` (already in `.gitignore`).
- Restrict CORS to your real domain in `server.js` before going live:
  ```js
  app.use(cors({ origin: 'https://your-domain.com' }));
  ```
- Deploy to Render / Railway / VPS and whitelist the host IP in MongoDB Atlas.

---

## 7. License

MIT © Achu Bridal Studio
