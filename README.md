# 🎓 CLMS — AI-Powered Content Learning Management System

> A production-ready, enterprise-grade LMS with integrated AI capabilities powered by Spring AI + Ollama.

![Tech Stack](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Tailwind-blue)
![Backend](https://img.shields.io/badge/Backend-Spring%20Boot%203.x%20%2B%20Java%2021-green)
![AI](https://img.shields.io/badge/AI-Spring%20AI%20%2B%20Ollama-purple)
![Database](https://img.shields.io/badge/Database-PostgreSQL%2016-orange)

---

## 🏗 Architecture

```
React 19 (Vite + Tailwind)
       ↓  Axios REST
Spring Boot 3.x (Java 21)
       ↓  Spring AI
Ollama (llama3 / mistral / deepseek)
       ↓  JPA / Hibernate
PostgreSQL 16
```

---

## ✨ Features

### 👨‍🎓 Student
- Enroll in courses & track progress
- AI-powered chat assistant (ChatGPT-style)
- Lesson summaries, explanations, translations
- Auto-generated flashcards & notes
- Quiz system with AI explanations
- Code Playground with AI review
- Personalized study plans
- Certificates with public verification
- Learning reports & analytics

### 👨‍🏫 Instructor
- Create & manage courses + lessons
- Upload videos and PDFs
- Create quizzes with question builder
- View student analytics & discussions

### 🔐 Admin
- Full user, course, quiz management
- Revenue & analytics dashboards
- AI usage monitoring & logs
- Role management
- System notifications

---

## 🚀 Quick Start

### Prerequisites
- Docker Desktop 4.x+
- (Optional) NVIDIA GPU for Ollama acceleration

### 1. Clone & Configure
```bash
git clone <repo-url>
cd lms
cp .env.example .env
# Edit .env with your values (especially JWT_SECRET and MAIL credentials)
```

### 2. Start Everything with Docker Compose
```bash
docker-compose up -d
```

This will start:
| Service | Port | Description |
|---------|------|-------------|
| PostgreSQL | 5432 | Database |
| Ollama | 11434 | AI model server |
| Spring Boot | 8080 | REST API |
| React (Nginx) | 80 | Frontend |

**First run:** Ollama will automatically pull the `llama3` model (~4GB). This takes a few minutes.

### 3. Access the Application
| URL | Description |
|-----|-------------|
| http://localhost | Frontend (React App) |
| http://localhost:8080/swagger-ui.html | API Documentation |
| http://localhost:8080/actuator/health | Health Check |
| http://localhost:11434 | Ollama API |

---

## 🛠 Local Development

### Backend (Spring Boot)
```bash
cd backend
# Requires Java 21 + Maven
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### Database
```bash
# Start only PostgreSQL
docker-compose up postgres -d

# Apply schema manually (optional — Hibernate auto-creates tables)
psql -h localhost -U clms_user -d clmsdb -f database/schema.sql
```

---

## 🤖 AI Configuration

Switch AI models by updating `.env`:
```env
AI_MODEL=llama3        # Default (recommended)
# AI_MODEL=mistral     # Smaller, faster
# AI_MODEL=deepseek-r1 # Strong reasoning
# AI_MODEL=qwen2.5     # Multilingual
# AI_MODEL=codellama   # Code-focused
```

Pull a new model:
```bash
docker exec clms_ollama ollama pull mistral
```

---

## 📁 Project Structure

```
lms/
├── docker-compose.yml
├── .env.example
├── database/
│   └── schema.sql
├── backend/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/main/java/com/clms/
│       ├── ClmsApplication.java
│       ├── config/
│       ├── controller/
│       ├── service/
│       ├── ai/
│       ├── repository/
│       ├── entity/
│       ├── dto/
│       ├── security/
│       ├── exception/
│       ├── mapper/
│       └── util/
└── frontend/
    ├── Dockerfile
    ├── nginx.conf
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── api/
        ├── services/
        ├── context/
        ├── hooks/
        ├── routes/
        ├── layouts/
        ├── components/
        ├── pages/
        ├── styles/
        └── utils/
```

---

## 🔐 Default Credentials

After first startup, create an admin user via the registration endpoint with role ADMIN, or directly in PostgreSQL:

```sql
-- Update an existing user's role to ADMIN
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.email = 'admin@clms.com' AND r.name = 'ADMIN';
```

---

## 📚 API Reference

Full API documentation available at `http://localhost:8080/swagger-ui.html`

Key endpoints:
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/courses` | Browse courses |
| POST | `/api/ai/chat` | AI chat |
| POST | `/api/ai/summarize` | Summarize lesson |
| POST | `/api/quizzes/{id}/submit` | Submit quiz |
| GET | `/api/reports/student` | Student report |

---

## 🔧 Environment Variables

See [`.env.example`](.env.example) for all configurable options.

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_USERNAME` | `clms_user` | PostgreSQL username |
| `DB_PASSWORD` | `clms_pass` | PostgreSQL password |
| `JWT_SECRET` | *(required)* | JWT signing secret (32+ chars) |
| `AI_MODEL` | `llama3` | Ollama model name |
| `OLLAMA_BASE_URL` | `http://localhost:11434` | Ollama server URL |
| `MAIL_USERNAME` | — | Gmail address for sending emails |
| `MAIL_PASSWORD` | — | Gmail App Password |

---

## 🐛 Troubleshooting

**Backend won't connect to PostgreSQL:**
```bash
docker-compose logs postgres
# Ensure postgres health check is passing before backend starts
```

**Ollama model not found:**
```bash
docker exec clms_ollama ollama pull llama3
```

**Frontend CORS errors (dev mode):**
Vite proxy is configured in `vite.config.js` to forward `/api` to `http://localhost:8080`.

---

## 📄 License

MIT License — built for educational purposes.
