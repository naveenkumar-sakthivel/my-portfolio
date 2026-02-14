const express = require("express");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Load projects (used in terminal/projects section if needed later)
const projectsFile = path.join(__dirname, "data", "projects.json");
let projects = [];
if (fs.existsSync(projectsFile)) {
  try {
    const data = fs.readFileSync(projectsFile, "utf-8");
    projects = JSON.parse(data);
  } catch (err) {
    console.error("Error loading projects.json", err);
  }
}

// Simple API to return projects (optional)
app.get("/api/projects", (req, res) => {
  res.json(projects);
});

// Nodemailer transporter (example: Gmail with app password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// Contact endpoint – sends email to you
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      to: "snaveenkumar0601@gmail.com",
      subject: `New portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({ message: "Message received and emailed." });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({ message: "Failed to send email." });
  }
});

// Fallback – serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Portfolio server running on http://localhost:${PORT}`);
});
