const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'contacts.json');

// Ensure data file exists
function getContacts() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, '[]', 'utf8');
      return [];
    }
    const raw = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Error reading contacts file:', err);
    return [];
  }
}

function saveContacts(contacts) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(contacts, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving contacts file:', err);
    return false;
  }
}

// POST /api/contact
router.post('/', (req, res) => {
  const { fullName, email, phone, company, interest, message, bot_check } = req.body;

  // Honeypot check - if bot_check is populated, silently return 200 without saving
  if (bot_check) {
    console.warn('[SPAM BOT BLOCKED] Honeypot triggered.');
    return res.status(200).json({
      success: true,
      message: "Thanks, we'll reply within 2 business days."
    });
  }

  // Required field validation
  const errors = {};
  if (!fullName || !fullName.trim()) {
    errors.fullName = 'Full name is required.';
  }

  if (!email || !email.trim()) {
    errors.email = 'Email address is required.';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
  }

  if (!message || !message.trim()) {
    errors.message = 'Please include a message or inquiry details.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please correct the highlighted errors.',
      errors
    });
  }

  const contacts = getContacts();
  const submissionId = `AGV-CNT-${Date.now().toString(36).toUpperCase()}`;

  const payload = {
    id: Date.now().toString(),
    submissionId,
    fullName: fullName.trim(),
    email: email.trim(),
    phone: phone ? phone.trim() : '',
    company: company ? company.trim() : '',
    interest: interest || 'Tech Audit',
    message: message.trim(),
    ip: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
    userAgent: req.headers['user-agent'] || '',
    status: 'new',
    createdAt: new Date().toISOString()
  };

  // Log payload to server console
  console.log(`\n--------------------------------------------------`);
  console.log(`📬 [CONTACT INQUIRY RECEIVED] [${payload.submissionId}]`);
  console.log(`👤 Name:     ${payload.fullName}`);
  console.log(`📧 Email:    ${payload.email}`);
  console.log(`📱 Phone:    ${payload.phone || 'N/A'}`);
  console.log(`🏢 Company:  ${payload.company || 'N/A'}`);
  console.log(`🎯 Interest: ${payload.interest}`);
  console.log(`💬 Message:  ${payload.message}`);
  console.log(`⏰ Time:     ${payload.createdAt}`);
  console.log(`--------------------------------------------------\n`);

  // TODO: Integrate email service (SendGrid, Resend, AWS SES, or HubSpot CRM sync)
  // Example:
  // await resend.emails.send({
  //   from: 'inquiries@agverse.ae',
  //   to: 'hello@agverse.ae',
  //   subject: `New Inquiry from ${payload.fullName} - ${payload.interest}`,
  //   text: payload.message
  // });

  contacts.unshift(payload);
  saveContacts(contacts);

  return res.status(200).json({
    success: true,
    message: "Thanks, we'll reply within 2 business days.",
    submissionId
  });
});

// GET /api/contact (Admin list)
router.get('/', (req, res) => {
  const contacts = getContacts();
  res.json({
    success: true,
    count: contacts.length,
    data: contacts
  });
});

module.exports = router;
