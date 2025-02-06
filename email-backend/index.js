require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// API route to send an email
app.post('/api/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  // Validate input
  if (!to || !subject || !text) {
    return res.status(400).json({ message: 'Please provide recipient email, subject, and text.' });
  }

  // Mail options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };
  const corsOptions = {
    origin: 'https://your-frontend-name.vercel.app', // Replace with your frontend Vercel URL
  };
  
  app.use(cors(corsOptions)); // Apply the CORS middleware with the specified options
  

  // Send email using nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email', error });
    }
    return res.status(200).json({ message: 'Email sent successfully!', info: info.response });
  });
});

// Vercel automatically invokes the app when requests are made, so we don't need to use app.listen() here.
module.exports = app;
