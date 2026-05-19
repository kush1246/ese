# AI-Based Smart Complaint Management System

A full-stack MERN application that allows users to register complaints online with AI-based analysis for priority detection, department recommendation, and automated response generation.

## Features

### Frontend Features
- **Complaint Registration Form**: Submit complaints with name, email, title, description, category, and location
- **Complaint List Page**: View all complaints with filtering by category and status
- **Complaint Status Update Page**: Update complaint status and view detailed information
- **AI Analysis Result Display**: View AI-generated analysis including priority, department, summary, and auto-response
- **Authentication**: Secure login and signup with JWT tokens
- **Modern UI**: Built with React, TailwindCSS, and Lucide icons

### Backend Features
- **RESTful APIs**: Complete CRUD operations for complaints and users
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **AI Integration**: AI-based complaint analysis for:
  - Priority detection (Critical, High, Medium, Low)
  - Department recommendation
  - Complaint summarization
  - Auto-generated user responses
- **Validation**: Input validation and error handling
- **MongoDB Integration**: Robust database schema with relationships

## Technology Stack

### Frontend
- React 18
- Vite
- React Router DOM
- TailwindCSS
- Lucide React (Icons)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- bcryptjs (Password Hashing)
- express-validator (Input Validation)
- CORS

## Project Structure

```
ese/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── complaintController.js
│   │   └── aiController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   └── Complaint.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── complaintRoutes.js
│   │   └── aiRoutes.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── ComplaintForm.jsx
│   │   │   ├── ComplaintList.jsx
│   │   │   ├── ComplaintStatus.jsx
│   │   │   └── AIAnalysis.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (installed locally or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-complaint-db
JWT_SECRET=your_jwt_secret_key_here_change_in_production
AI_API_KEY=your_ai_api_key_here
```

4. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
  - Body: `{ name, email, password }`
  
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  
- `GET /api/auth/profile` - Get user profile (Protected)

### Complaint Endpoints

- `POST /api/complaints` - Create a new complaint (Protected)
  - Body: `{ name, email, title, description, category, location }`
  
- `GET /api/complaints` - Get all complaints (Protected)
  - Query params: `?category=WaterSupply&status=Pending`
  
- `GET /api/complaints/search` - Search complaints by location (Protected)
  - Query params: `?location=Ghaziabad`
  
- `GET /api/complaints/:id` - Get single complaint (Protected)
  
- `PUT /api/complaints/:id` - Update complaint status (Protected)
  - Body: `{ status }`
  
- `DELETE /api/complaints/:id` - Delete complaint (Protected)

### AI Endpoints

- `POST /api/ai/analyze` - Analyze complaint with AI (Protected)
  - Body: `{ title, description, category }`
  - Returns: `{ priority, department, summary, response }`

## MongoDB Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date (default: Date.now)
}
```

### Complaint Schema
```javascript
{
  name: String (required),
  email: String (required),
  title: String (required),
  description: String (required),
  category: String (required, enum: ['Water Supply', 'Electricity', 'Sanitation', 'Roads', 'Health', 'Education', 'Other']),
  location: String (required),
  status: String (enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'], default: 'Pending'),
  priority: String (enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium'),
  department: String,
  aiSummary: String,
  aiResponse: String,
  userId: ObjectId (ref: 'User'),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

## AI Analysis Features

The AI system analyzes complaints and provides:

1. **Priority Detection**: Classifies complaints as Critical, High, Medium, or Low based on urgency keywords
2. **Department Recommendation**: Suggests the appropriate department based on complaint category
3. **Complaint Summary**: Generates a concise summary of the complaint
4. **Auto-Generated Response**: Creates an appropriate response message based on priority and department

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Submit Complaint**: Fill out the complaint form with all required details
3. **AI Analysis**: Use the "Analyze with AI" button to get instant analysis before submitting
4. **View Complaints**: Browse all complaints in the dashboard with filtering options
5. **Update Status**: Click on a complaint to view details and update its status
6. **AI Analysis Tool**: Use the dedicated AI Analysis page to analyze complaints without submitting

## Security Features

- JWT Authentication for protected routes
- bcrypt password hashing
- Input validation using express-validator
- CORS enabled for cross-origin requests
- Error handling middleware

## Deployment on Render

### Backend Deployment

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Set build and start commands:
   - Build: `npm install`
   - Start: `node server.js`
5. Add environment variables in Render dashboard:
   - `PORT`
   - `MONGODB_URI` (use MongoDB Atlas for production)
   - `JWT_SECRET`
   - `AI_API_KEY`

### Frontend Deployment

1. Create a new Web Service on Render
2. Connect your GitHub repository (frontend folder or separate repo)
3. Set build and start commands:
   - Build: `npm install && npm run build`
   - Start: `npm run preview`
4. Add environment variable:
   - `VITE_API_URL` (your deployed backend URL)

### MongoDB Setup

For production, use MongoDB Atlas:
1. Create a free account on MongoDB Atlas
2. Create a cluster
3. Get the connection string
4. Add it to Render environment variables as `MONGODB_URI`

## Testing

### Test Cases

#### Authentication
- Valid login: Token generated successfully ✓
- Invalid password: Unauthorized error ✓
- Access without token: Access denied ✓
- Stored password: Encrypted format ✓

#### Complaint Operations
- Add valid complaint: Complaint stored successfully ✓
- Missing title field: Validation error ✓
- Invalid email: Error message ✓
- Filter by location: Matching complaints displayed ✓

#### AI Analysis
- Water leakage: Water department suggestion ✓
- Electricity issue: High priority alert ✓
- Garbage complaint: Sanitation department ✓
- Long complaint text: AI-generated summary ✓

## Contributing

This project was developed as part of the B.Tech 4th Semester ESE Examination for AI Driven Full Stack Development (AI308B).

## License

ISC

## Author

B.Tech, 4th Semester
ESE Examination AIML (Blended), Even Sem. - 2025-26
AI Driven Full Stack Development (AI308B)
