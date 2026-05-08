require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

async function startServer() {

  try {

    // MongoDB connection
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected');

    // Vite build folder
    const distPath = path.join(__dirname, '../client/dist');

    // Serve frontend files
    app.use(express.static(distPath));

    // React routes
    app.get('/{*any}', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {

    console.error(err);

  }
}

startServer();