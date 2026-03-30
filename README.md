# Naveen Kumar Portfolio

A personal DevOps portfolio website built with HTML, CSS, JavaScript, and a Node.js + Express backend for contact form handling. The site showcases professional experience, technical skills, certifications, education, blog highlights, and an interactive terminal-style section.

## Features

- Modern responsive portfolio UI
- Hero section with quick action links
- About, Experience, Skills, Certifications, Blog, and Education sections
- Interactive terminal section
- Contact form integrated with Node.js backend
- Email sending with Nodemailer
- Docker support

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- Nodemailer
- Docker

## Project Structure

```bash
.
├── public/
│   ├── index.html
│   ├── styles.css
│   └── main.js
├── data/
│   └── projects.json
├── server.js
├── package.json
├── Dockerfile
├── .dockerignore
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a `.env` file in the project root:

```env
MAIL_USER=yourgmail@gmail.com
MAIL_PASS=your_gmail_app_password
PORT=3000
```

> `MAIL_PASS` should be a Gmail App Password, not your normal Gmail password.

### 4. Start the server

```bash
npm start
```

Open in browser:

```text
http://localhost:3000
```

## Contact Form Backend

The contact form sends a POST request to:

```text
/api/contact
```

The backend:
- validates required fields
- sends email using Nodemailer
- returns JSON success/error response

## Docker Usage

### Build image

```bash
docker build -t naveen-portfolio .
```

### Run container

```bash
docker run -p 3000:3000 \
  -e PORT=3000 \
  -e MAIL_USER=yourgmail@gmail.com \
  -e MAIL_PASS=your_gmail_app_password \
  naveen-portfolio
```

## API Endpoints

### Get projects

```http
GET /api/projects
```

### Submit contact form

```http
POST /api/contact
Content-Type: application/json
```

Example body:

```json
{
  "name": "Naveen",
  "email": "example@email.com",
  "subject": "Opportunity",
  "message": "Hello, I’d like to connect."
}
```

## Customization

You can update the following files to personalize the project:

- `public/index.html` → content and sections
- `public/styles.css` → theme and layout
- `public/main.js` → frontend behavior
- `data/projects.json` → project data
- `server.js` → backend logic

## Future Improvements

- Add dark/light theme toggle
- Add blog detail pages
- Add project detail pages
- Add analytics

## License

This project is for personal portfolio use.