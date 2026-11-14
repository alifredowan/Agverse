const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'audits.json');

// Helper to read audits
function getAudits() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, '[]', 'utf8');
      return [];
    }
    const raw = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Error reading audits file:', err);
    return [];
  }
}

// Helper to save audits
function saveAudits(audits) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(audits, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving audits file:', err);
    return false;
  }
}

// POST /api/audit-request
router.post('/', (req, res) => {
  const { fullName, email, phone, farmName, location, farmSize, interest, notes } = req.body;

  // Validation
  if (!fullName || !email || !phone || !farmName) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields: fullName, email, phone, and farmName.'
    });
  }

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
  }

  const audits = getAudits();
  const referenceId = `AGV-${Math.floor(100000 + Math.random() * 900000)}`;

  const newAudit = {
    id: Date.now().toString(),
    referenceId,
    fullName: fullName.trim(),
    email: email.trim(),
    phone: phone.trim(),
    farmName: farmName.trim(),
    location: location ? location.trim() : 'Dubai, UAE',
    farmSize: farmSize || 'Not specified',
    interest: interest || 'Autonomous Robotics',
    notes: notes ? notes.trim() : '',
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  audits.unshift(newAudit);
  saveAudits(audits);

  console.log(`[AUDIT REQUEST] New submission from ${newAudit.fullName} (${newAudit.farmName}) - Ref #${referenceId}`);

  return res.status(201).json({
    success: true,
    message: 'Farm technology audit request submitted successfully.',
    referenceId,
    data: newAudit
  });
});

// GET /api/audit-request
router.get('/', (req, res) => {
  const audits = getAudits();
  res.json({
    success: true,
    count: audits.length,
    data: audits
  });
});

// GET /api/audit-request/:referenceId
router.get('/:ref', (req, res) => {
  const audits = getAudits();
  const item = audits.find(
    a => a.referenceId.toLowerCase() === req.params.ref.toLowerCase() || a.id === req.params.ref
  );

  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Audit request not found.'
    });
  }

  res.json({
    success: true,
    data: item
  });
});

module.exports = router;
