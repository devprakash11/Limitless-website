<div align="center">

# 🚀 Limitless Website

**A modern full-stack web application — beautifully designed, powerfully built.**

[![GitHub Stars](https://img.shields.io/github/stars/devprakash11/Limitless-website?style=flat-square)](https://github.com/devprakash11/Limitless-website/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/devprakash11/Limitless-website?style=flat-square)](https://github.com/devprakash11/Limitless-website/network)
[![GitHub Issues](https://img.shields.io/github/issues/devprakash11/Limitless-website?style=flat-square)](https://github.com/devprakash11/Limitless-website/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[Demo](#) · [Report Bug](https://github.com/devprakash11/Limitless-website/issues) · [Request Feature](https://github.com/devprakash11/Limitless-website/issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 📖 About the Project

**Limitless Website** is a full-stack web application with a clean separation between frontend and backend, organized as a monorepo. It is designed with scalability, performance, and developer experience in mind.

> 🔗 **Backend:** [`/backend`](https://github.com/devprakash11/Limitless-website/tree/dev/backend)  
> 🎨 **Frontend:** [`/frontend`](https://github.com/devprakash11/Limitless-website/tree/dev/frontend)  
> 🖌️ **Design:** [`Limitless-website`](https://github.com/devprakash11/Limitless-website)

### ✨ Key Features

- ⚡ Fast, responsive UI built with React
- 🔒 Secure REST API with authentication
- 🗄️ Structured backend with clean architecture
- 🌐 Cross-origin support for local and production environments
- 📱 Mobile-friendly and accessible design
- 🚀 Ready for deployment on modern cloud platforms

---

## 🛠️ Tech Stack

### Frontend
| Technology     | Purpose                     |
|----------------|-----------------------------|
| React.js       | UI component library        |
| React Router   | Client-side navigation      |
| Axios          | HTTP requests to backend    |
| _(CSS library)_| Styling and responsiveness  |

### Backend
| Technology    | Purpose                       |
|---------------|-------------------------------|
| Node.js       | JavaScript runtime            |
| Express.js    | Web application framework     |
| MongoDB / SQL | Database                      |
| JWT           | Authentication & authorization|
| dotenv        | Environment variable management|
| CORS          | Cross-origin resource sharing |

### DevOps & Tools
| Tool          | Purpose                      |
|---------------|------------------------------|
| Git           | Version control              |
| GitHub        | Code hosting & collaboration |
| npm           | Package management           |
| _(add CI/CD)_ | Deployment pipeline          |

---

## 📂 Project Structure

```
Limitless-website/
│
├── 📁 backend/
│   ├── controllers/       # Route handler logic
│   ├── models/            # Database schemas/models
│   ├── routes/            # API route definitions
│   ├── middleware/        # Auth, error handling, etc.
│   ├── config/            # DB & app configuration
│   ├── utils/             # Helper functions
│   ├── .env.example       # Example environment variables
│   ├── server.js          # Entry point
│   └── package.json
│
├── 📁 frontend/
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page-level components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── context/       # Global state (Context API)
│   │   ├── services/      # API call functions
│   │   ├── utils/         # Helper functions
│   │   ├── assets/        # Images, icons, fonts
│   │   ├── App.jsx        # Root component
│   │   └── main.jsx       # Entry point
│   ├── .env.example
│   └── package.json
│
├── brain.md               # Project knowledge base 🧠
├── README.md              # You are here 📍
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- A running database (MongoDB / PostgreSQL)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devprakash11/Limitless-website.git
   cd Limitless-website
   git checkout dev
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your values
   npm run dev
   ```

3. **Set up the Frontend** _(open a new terminal)_
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env with your values
   npm start
   ```

4. **Open in browser**
   ```
   Frontend → http://localhost:3000
   Backend  → http://localhost:5000
   ```

---

## 🔐 Environment Variables

### Backend — `backend/.env`

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

### Frontend — `frontend/.env`

```env
REACT_APP_API_URL=http://localhost:5000/api
```

> ⚠️ Never commit `.env` files. They are included in `.gitignore`.  
> Use `.env.example` as a reference template.

---

## 📜 Available Scripts

### Backend

| Command            | Description                         |
|--------------------|-------------------------------------|
| `npm run dev`      | Start server with hot reload (nodemon) |
| `npm start`        | Start server in production mode     |
| `npm test`         | Run backend tests                   |

### Frontend

| Command            | Description                         |
|--------------------|-------------------------------------|
| `npm start`        | Start development server            |
| `npm run build`    | Build for production                |
| `npm test`         | Run frontend tests                  |
| `npm run lint`     | Lint the codebase                   |

---

## 📡 API Documentation

Base URL: `http://localhost:5000/api`

| Method | Endpoint              | Description              | Auth Required |
|--------|-----------------------|--------------------------|:-------------:|
| GET    | `/health`             | Health check             | ❌            |
| POST   | `/auth/register`      | Register a new user      | ❌            |
| POST   | `/auth/login`         | Login and get token      | ❌            |
| GET    | `/users/me`           | Get current user profile | ✅            |
| _(add more routes)_ | | | |

> 📘 Full API documentation coming soon / [Postman Collection](#)

---

## 📸 Screenshots

| Page         | Preview                          |
|--------------|----------------------------------|
| Home         | _(add screenshot)_               |
| Dashboard    | _(add screenshot)_               |
| Mobile View  | _(add screenshot)_               |

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. **Fork** the repository
2. **Create** your feature branch:
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "feat: add YourFeatureName"
   ```
4. **Push** to your branch:
   ```bash
   git push origin feature/YourFeatureName
   ```
5. **Open a Pull Request** against the `dev` branch

### Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix     | When to use                              |
|------------|------------------------------------------|
| `feat:`    | New feature                              |
| `fix:`     | Bug fix                                  |
| `docs:`    | Documentation changes                    |
| `style:`   | Formatting, no logic change              |
| `refactor:`| Code restructuring                       |
| `test:`    | Adding or updating tests                 |
| `chore:`   | Maintenance tasks                        |

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## 📬 Contact

**devprakash11**  
GitHub: [@devprakash11](https://github.com/devprakash11)

Project Link: [https://github.com/devprakash11/Limitless-website](https://github.com/devprakash11/Limitless-website)

---

<div align="center">

⭐ **If this project helped you, please give it a star!** ⭐

Made with ❤️ by [devprakash11](https://github.com/devprakash11)

</div>
