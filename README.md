# HomeMitra - House Work Services Platform

A MERN stack platform connecting customers with house work service providers including plumbers, electricians, security guards, maids, AC repair agents, and gardeners.

## Project Structure

```
HomeMitra/
├── client/          # React frontend
├── server/          # Node.js backend
└── package.json     # Root package.json for scripts
```

## Features

### Client Features
- User authentication (Customer/Service Provider)
- Service browsing by category
- Service booking system
- User dashboard with booking history
- Responsive design with Unsplash images

### Admin Features
- Admin dashboard with stats
- Booking management (pending → confirmed → in-progress → completed)
- Service management (CRUD operations)
- Provider management (add/verify service members)

## Tech Stack

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT

## Setup Instructions

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all dependencies (client + server)
npm run install-all
```

### 2. Environment Setup

Update `server/.env` with your MongoDB Atlas connection:

```env
MONGO_URI=mongodb+srv://agentabi07_db_user:Jai29Abi@cluster0.q6djm88.mongodb.net/homemitra?retryWrites=true&w=majority
JWT_SECRET=your-jwt-secret-key-here
```

### 3. Create Admin User

```bash
npm run create-admin
```

**Admin Credentials:**
- Email: admin@homemitra.com
- Password: admin123

### 4. Seed Initial Data

```bash
npm run seed
```

### 5. Run the Application

```bash
# Development mode (runs both client and server)
npm run dev

# Or run separately:
# Server only
npm run server

# Client only
npm run client
```

### 6. Access the Application

- **Client**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Server API**: http://localhost:5000

## Available Services

1. **Plumber** - Basic repairs, emergency services
2. **Electrician** - Wiring, installations
3. **Security** - Guard services
4. **Maid** - House cleaning, deep cleaning
5. **AC Repair** - Repair, installation, maintenance
6. **Gardener** - Garden maintenance, landscaping

## API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- GET `/api/auth/me` - Get current user

### Services
- GET `/api/services` - Get all services
- GET `/api/services?category=plumber` - Get services by category

### Bookings
- POST `/api/bookings` - Create booking
- GET `/api/bookings/my` - Get user bookings

### Admin Routes
- GET `/api/admin/stats` - Dashboard stats
- GET `/api/admin/bookings` - All bookings
- PATCH `/api/admin/bookings/:id/status` - Update booking status
- POST `/api/admin/providers` - Add service provider

## MongoDB Atlas Setup

1. Create account at https://cloud.mongodb.com
2. Create a new cluster
3. Whitelist your IP address (0.0.0.0/0 for development)
4. Update connection string in `server/.env`

## Admin Panel Features

- **Dashboard**: Overview stats and quick actions
- **Booking Management**: Update status, view customer details
- **Service Management**: Add/edit/delete services
- **Provider Management**: Add new service members, verify accounts