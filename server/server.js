require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.json());

async function startServer() {
  try {
    // MongoDB connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const distPath = path.join(__dirname, '../client/dist');

    // Serve frontend
    app.use(express.static(distPath));

    // ROUTE
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('Server failed:', err);
  }
}

startServer();