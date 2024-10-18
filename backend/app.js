const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();  

const PORT = process.env.PORT || 1122;

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'https://lumuslights.com', 
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const authRoutes = require('./Route/authRoute');
app.use('/auth', authRoutes);


const productRoutes = require('./Route/productRoutes');
app.use('/api', productRoutes);



// Basic route for testing
app.get('/', (req, res) => {
  res.send('Lumus Backend Working on localhost');
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server on PORT 1122 or from .env
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});