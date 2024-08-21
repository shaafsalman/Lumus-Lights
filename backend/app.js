const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 1122;

const db = require('./db'); 

app.use(cors()); 
app.use(express.json());

const authRoutes = require('./Route/authRoute');
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
