# Naveen Kumar — DevOps Portfolio

Personal portfolio website for **Naveen Kumar**, Junior DevOps Engineer based in Chennai, India. Built with vanilla HTML, CSS, and JavaScript, served by a lightweight Node.js + Express backend.

---

## Live Features

- **Hero section** — links to Email, Phone, LinkedIn, GitHub, and Blog
- **Interactive Terminal** — type commands like `help`, `whoami`, `skills`, `kubectl`, `ls`, `pwd`, `clear`
- **Blog** — 4 technical articles linking to individual article pages and GitHub repos
- **Contact form** — sends email via Nodemailer + Gmail SMTP
- **Scroll reveal animations** — cards animate in on scroll
- **Mouse-follow glow** — subtle radial highlight follows cursor on cards
- **Fully responsive** — works on mobile, tablet, and desktop

---

## Project Structure

```
naveen-portfolio/
├── public/
│   ├── index.html              # Main portfolio page
│   ├── styles.css              # All styles (global, hero, blog, terminal, contact, article)
│   ├── main.js                 # Scroll reveal, mouse glow, terminal, contact form
│   └── blog/
│       ├── aks-upgrades.html           # Article: Zero-Downtime AKS Upgrades
│       ├── siem-aks-eck.html           # Article: Building a SIEM on AKS with ECK
│       ├── terraform-modules-azure.html # Article: Reusable Terraform Modules
│       └── traefik-coraza-waf.html     # Article: Traefik + Coraza WAF
├── server.js                   # Express server + contact form API
├── package.json
├── .env                        # Environment variables (not committed)
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- A Gmail account for the contact form (or any SMTP provider)

### Installation

```bash
# Clone the repository
git clone https://github.com/naveenkumar-sakthivel/naveen-portfolio.git
cd naveen-portfolio

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MAIL_USER=your-gmail@gmail.com
MAIL_PASS=your-app-password
```

> **Note:** Use a Gmail [App Password](https://support.google.com/accounts/answer/185833), not your regular Gmail password. Enable 2-Factor Authentication on your Google account first, then generate an App Password under Security settings.

### Running Locally

```bash
# Development (auto-restarts on file changes)
npm run dev

# Production
npm start
```

Visit `http://localhost:3000` in your browser.

---

## Deployment

### Option 1 — Deploy to a VPS (Ubuntu)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Clone and install
git clone https://github.com/naveenkumar-sakthivel/naveen-portfolio.git
cd naveen-portfolio
npm install

# Set environment variables
cp .env.example .env
nano .env

# Run with PM2
npm install -g pm2
pm2 start server.js --name portfolio
pm2 save
pm2 startup
```

### Option 2 — Deploy to Azure App Service

```bash
# Install Azure CLI and login
az login

# Create resource group and App Service plan
az group create --name rg-portfolio --location eastus
az appservice plan create --name plan-portfolio --resource-group rg-portfolio --sku B1 --is-linux
az webapp create --name naveen-portfolio --resource-group rg-portfolio --plan plan-portfolio --runtime "NODE:18-lts"

# Set environment variables
az webapp config appsettings set \
  --name naveen-portfolio \
  --resource-group rg-portfolio \
  --settings MAIL_USER="your@gmail.com" MAIL_PASS="your-app-password"

# Deploy via ZIP
zip -r app.zip . --exclude "node_modules/*" --exclude ".git/*"
az webapp deployment source config-zip \
  --name naveen-portfolio \
  --resource-group rg-portfolio \
  --src app.zip
```

### Option 3 — Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
docker build -t naveen-portfolio .
docker run -p 3000:3000 --env-file .env naveen-portfolio
```

---

## Blog Articles

| Title | Tag | GitHub |
|---|---|---|
| Zero-Downtime AKS Upgrades with GitHub Actions | Kubernetes | [repo](https://github.com/naveenkumar-sakthivel/aks-zero-downtime-upgrades) |
| Building a SIEM on AKS with ECK | Observability | [repo](https://github.com/naveenkumar-sakthivel/siem-aks-eck) |
| Reusable Terraform Modules for Multi-Environment Azure | Terraform | [repo](https://github.com/naveenkumar-sakthivel/terraform-azure-modules) |
| Traefik + Coraza WAF for Kubernetes Ingress Security | Security | [repo](https://github.com/naveenkumar-sakthivel/traefik-coraza-k8s) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express |
| Email | Nodemailer + Gmail SMTP |
| Dev tooling | Nodemon |
| Fonts | Satoshi (Fontshare) |
| Hosting | Azure App Service / VPS / Docker |

---

## Contact Form Setup

The `/api/contact` endpoint accepts `POST` requests with JSON body:

```json
{
  "name": "string",
  "email": "string",
  "subject": "string (optional)",
  "message": "string"
}
```

Responses:

| Status | Meaning |
|---|---|
| `200` | Message sent successfully |
| `400` | Missing required fields |
| `500` | Email sending failed (check SMTP config) |

---

## Terminal Commands

The interactive terminal in the portfolio supports:

| Command | Description |
|---|---|
| `help` | List all available commands |
| `whoami` | About Naveen |
| `skills` | Key tools and platforms |
| `projects` | Summary of main projects |
| `ls` | List portfolio sections |
| `pwd` | Show current path |
| `kubectl` | Sample kubectl pod output |
| `clear` | Clear the terminal |

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

*Built and maintained by [Naveen Kumar](https://github.com/naveenkumar-sakthivel)*