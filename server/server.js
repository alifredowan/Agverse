const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const auditRoutes = require('./routes/audit');
const contentRoutes = require('./routes/content');

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/audit-request', auditRoutes);
app.use('/api/content', contentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'AGverse API Server',
    time: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Serve static frontend in production if built
const clientDist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(clientDist, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send('AGverse API Backend is running. Frontend dev server is on port 3000.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🚀 AGverse Backend API running on port ${PORT}`);
  console.log(`📍 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📍 Audits API:   http://localhost:${PORT}/api/audit-request`);
  console.log(`=================================================\n`);
});
