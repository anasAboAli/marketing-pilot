# MarketPilot 🚀

MarketPilot is a full-stack marketing management platform designed to help marketing teams manage clients, campaigns, leads, and performance data from one centralized dashboard.

## ✨ Features

- 📊 Marketing dashboard with performance overview
- 👥 Client management
- 📢 Campaign management
- 🎯 Lead management
- 📈 Revenue and campaign analytics
- 🧩 CRM pipeline
- 📋 Reports
- 🔔 Notifications
- 👤 User and profile management
- 📅 Calendar integration
- 🗄️ MySQL database
- 🔗 REST API
- 📱 Responsive interface for desktop, tablet, and mobile

## 🛠️ Technologies

### Frontend

- Vue.js
- Vite
- Pinia
- Vue Router
- Tailwind CSS
- Axios
- ApexCharts

### Backend

- Node.js
- Express.js
- MySQL2
- REST API

### Database

- MySQL / MariaDB

### Development Tools

- Git
- GitHub
- npm

## 📁 Project Structure

```text
marketpilot/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── router/
│   └── services/
│
├── server/
│   ├── db/
│   ├── routes/
│   ├── services/
│   ├── data/
│   └── server.js
│
├── database.sql
├── package.json
├── vite.config.js
└── README.md


1. Clone the repository
git clone https://github.com/anasAboAli/marketing-pilot.git
2. Navigate to the project
cd marketing-pilot
3. Install dependencies
npm install
🗄️ Database Setup

Create a MySQL database named:

marketpilot_db

Then import the database structure:

mysql -u root -p marketpilot_db < database.sql

Alternatively, the database.sql file can be imported using phpMyAdmin.

🔐 Backend Environment

Create:

server/.env

based on:

server/.env.example

Example:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=marketpilot_db
PORT=3001

Do not commit your actual .env file to GitHub.

▶️ Run the Backend
npm run server

The API will run on:

http://localhost:3001
▶️ Run the Frontend

Open another terminal:

npm run dev

The frontend will normally be available at:

http://localhost:5173


📱 Responsive Design

MarketPilot is designed to work across:

Desktop
Tablet
Mobile

The interface adapts tables, cards, navigation, and dashboard components according to screen size.

🔒 Security

Environment variables and sensitive configuration files are excluded from version control.

The project uses:

.env for local configuration
.env.example as a configuration template
🚧 Project Status

The project is actively being developed.

Current architecture:

Vue.js Frontend
       ↓
Axios / REST API
       ↓
Node.js + Express Backend
       ↓
MySQL Database
👨‍💻 Author

Anas

Frontend Developer specializing in Vue.js and modern web applications.

📄 License

This project is intended for portfolio and educational purposes.


---

## 2. احفظ الملف

في Notepad:

**Ctrl + S**

ثم أغلقه.

بعدها نفّذ:

```cmd
git status

المفروض يظهر:

Untracked files:
    README.md