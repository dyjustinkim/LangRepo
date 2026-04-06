# LangRepo

A full-stack web application that allows users to create, manage, and view documents with secure authentication and role-based access control (RBAC). Built with FastAPI backend, React frontend, and deployed on AWS infrastructure.

## Tech Stack
- Frontend: React
- Backend: FastAPI (Python)
- Auth: Auth0 (JWT, RBAC)
- Database: PostgreSQL
- Cloud: AWS (S3, CloudFront, ECS)
- Testing: pytest, k6
- CI/CD: GitHub Actions

## Architecture
Frontend (React)
   ↓
CloudFront (CDN)
   ↓
S3 (Static Hosting)

Frontend → FastAPI Backend (ECS)
              ↓
          PostgreSQL DB
