require('dotenv').config();
const express = require('express'); 
const nodemailer = require('nodemailer'); 
const cors = require('cors'); 

const app = express();
const port = 3000;

app.use(cors()); 

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASSWORD, 
  },
});

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body; 

  if (!to || !subject || !text) {
    return res.status(400).json({ message: 'Please provide recipient email, subject, and text.' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to,                           
    subject,                      
    text,                         
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email', error }); 
    }
    return res.status(200).json({ message: 'Email sent successfully!', info: info.response }); 
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
