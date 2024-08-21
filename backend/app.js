const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 1122;

const db = require('./db'); 

const corsOptions = {
  origin: 'https://lumuslights.com', 
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));
app.use(express.json()); 

const authRoutes = require('./Route/authRoute');
app.use('/api', authRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
