# HomeMitra - House Work Services Platform

A MERN stack platform connecting customers with house work service providers including plumbers, electricians, security guards, maids, AC repair agents, and gardeners.

## Features

- User authentication (Customer/Service Provider)
- Service browsing by category
- Service booking system
- User dashboard with booking history
- Responsive design with Unsplash images
- MongoDB integration ready

## Tech Stack

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas ready)
- **Authentication**: JWT

## Setup Instructions

### 1. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 2. Environment Setup

Update the `.env` file with your MongoDB Atlas connection string:

```env
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/homemitra?retryWrites=true&w=majority
JWT_SECRET=your-jwt-secret-key-here
```

### 3. Seed Initial Data

```bash
node seedServices.js
```

### 4. Run the Application

```bash
# Development mode (runs both frontend and backend)
npm run dev

# Or run separately:
# Backend only
npm run server

# Frontend only (in another terminal)
npm run client
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

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
- GET `/api/services/:id` - Get service by ID

### Bookings
- POST `/api/bookings` - Create booking
- GET `/api/bookings/my` - Get user bookings
- PATCH `/api/bookings/:id/status` - Update booking status

### Providers
- GET `/api/providers` - Get all providers
- POST `/api/providers` - Create provider profile

## MongoDB Atlas Setup

1. Create account at https://cloud.mongodb.com
2. Create a new cluster
3. Get connection string
4. Update MONGO_URI in .env file
5. Whitelist your IP address

## Deployment

The app is configured for Heroku deployment with build scripts included in package.json.

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request"# HomeMitra" 
