const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Path to your db.json file (mock data)
const middlewares = jsonServer.defaults();

// Use CORS middleware
server.use(cors()); // Allows all origins by default

// Set default middlewares (for logging, static, etc.)
server.use(middlewares);

// You can add additional middleware here for logging or custom logic

// API routes
server.use('/api/v1', router);  // Assuming your mock API is under /api/v1

// Start the server
server.listen(5000, () => {
  console.log('JSON Server is running on http://localhost:5000');
});
