# LangRepo

Full-stack web application for document storage, automatic generation of flashcards, and studying flashcards with secure authentication and role-based access control. Built with FastAPI backend, React frontend, and deployed on AWS infrastructure.

## Tech Stack

**Frontend**
- TypeScript
- React
- Vite

**Backend & Database**
- FastAPI
- Python
- Uvicorn
- Pydantic
- SQLAlchemy
- PostgreSQL
- Alembic

**Authentication & Authorization**
- Auth0 (JWT-based RBAC)

**AI Integration**
- Amazon Bedrock (Claude Haiku)

**Infrastructure & Cloud**
- AWS VPC
- AWS ECS (Cluster & Task Definitions)
- AWS ECR
- AWS RDS (PostgreSQL)
- AWS ALB (on EC2)
- AWS IAM
- AWS S3
- AWS CloudFront

**DevOps & Deployment**
- Docker
- Terraform
- GitHub Actions
- CI/CD pipelines

**Testing & Performance**
- Pytest
- K6 (load testing)

## Architecture

- Frontend: React hosted on AWS S3 and served via CloudFront
- Backend: FastAPI containerized with Docker and deployed on AWS ECS
- Container images stored in AWS ECR
- Infrastructure deployed within an AWS VPC for network isolation and security
- Authentication handled via Auth0 using JWT-based RBAC
- Data persisted in PostgreSQL database
