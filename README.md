# 🚀 MERN Event Booking — DevOps CI/CD

A MERN Stack Event Booking application deployed using a complete **DevOps CI/CD pipeline** with GitHub, Jenkins, Docker, Docker Hub and AWS EC2.

The project demonstrates source-code management, automated builds, containerization, security scanning and automated deployment.

---

## 📌 Project Overview

The application allows users to browse and manage events through a MERN Stack application.

The application is containerized using Docker and deployed automatically using Jenkins CI/CD.

### DevOps Workflow

```text
Developer
    │
    │ git push
    ▼
 GitHub
    │
    │ Webhook
    ▼
 Jenkins
    │
    ├── Checkout
    ├── Install Dependencies
    ├── Run Tests
    ├── Docker Build
    ├── Trivy Security Scan
    ├── Push Images
    │
    ▼
 Docker Hub
    │
    ▼
 AWS EC2
    │
    ├── Frontend Container
    └── Backend Container
             │
             ▼
          MongoDB
```

---

# 🏗️ Architecture

```text
                     ┌─────────────────┐
                     │     GitHub      │
                     │  Source Code    │
                     └────────┬────────┘
                              │
                           Webhook
                              │
                              ▼
                     ┌─────────────────┐
                     │     Jenkins     │
                     │    CI / CD      │
                     └────────┬────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
             Build          Test          Trivy
                │             │           Scan
                └─────────────┼─────────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │     Docker      │
                     │  Build Images   │
                     └────────┬────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │   Docker Hub    │
                     │ Image Registry  │
                     └────────┬────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │     AWS EC2     │
                     │ Docker Host     │
                     └────────┬────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
              ┌───────────┐       ┌───────────┐
              │ Frontend  │       │  Backend  │
              │ Container │       │ Container │
              └───────────┘       └─────┬─────┘
                                         │
                                         ▼
                                     MongoDB
```

---

# 🛠️ Technologies Used

| Technology | Purpose                     |
| ---------- | --------------------------- |
| React.js   | Frontend                    |
| Node.js    | Backend Runtime             |
| Express.js | Backend API                 |
| MongoDB    | Database                    |
| Git        | Version Control             |
| GitHub     | Source Code Management      |
| Jenkins    | CI/CD Automation            |
| Docker     | Containerization            |
| Docker Hub | Container Registry          |
| AWS EC2    | Cloud Deployment            |
| Nginx      | Web Server / Reverse Proxy  |
| Trivy      | Container Security Scanning |
| Linux      | Server Environment          |

---

# 📂 Project Structure

```text
mern-stack-event-booking/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── Dockerfile
│
├── nginx/
│   └── nginx.conf
│
├── docker-compose.yml
├── Jenkinsfile
├── .gitignore
└── README.md
```

---

# 🔄 CI/CD Pipeline

The CI/CD pipeline automatically builds and deploys the application whenever new code is pushed to the `main` branch.

```text
Git Push
   ↓
GitHub
   ↓
GitHub Webhook
   ↓
Jenkins
   ↓
Checkout Source Code
   ↓
Install Dependencies
   ↓
Run Tests
   ↓
Build Docker Images
   ↓
Trivy Security Scan
   ↓
Push Images to Docker Hub
   ↓
Deploy to AWS EC2
   ↓
Pull Latest Images
   ↓
Start New Containers
   ↓
Application Live
```

---

# 🐳 Docker

The application is divided into separate containers.

### Frontend

```text
React + Nginx
```

### Backend

```text
Node.js + Express
```

### Database

```text
MongoDB
```

Docker provides an isolated and consistent runtime environment for the application.

---

# 🔐 Security

The pipeline uses **Trivy** to scan Docker images for known vulnerabilities before deployment.

```text
Docker Image
     ↓
   Trivy
     ↓
Vulnerability Scan
     ↓
Deployment
```

Sensitive information such as database credentials and API secrets is stored using environment variables and Jenkins credentials instead of committing secrets to GitHub.

---

# ⚙️ Jenkins Pipeline Stages

## 1. Checkout

Jenkins retrieves the latest source code from GitHub.

```text
GitHub → Jenkins
```

## 2. Install Dependencies

Dependencies are installed using:

```bash
npm ci
```

for frontend and backend.

## 3. Test

Application tests are executed before creating production images.

## 4. Docker Build

Jenkins creates Docker images for:

```text
event-booking-frontend
event-booking-backend
```

## 5. Security Scan

Trivy scans the generated Docker images.

## 6. Docker Push

Images are pushed to Docker Hub.

Example:

```text
YOUR_DOCKERHUB_USERNAME/event-booking-frontend:latest

YOUR_DOCKERHUB_USERNAME/event-booking-backend:latest
```

## 7. Deployment

Jenkins connects to AWS EC2 through SSH and deploys the latest Docker images.

---

# ☁️ AWS EC2 Deployment

The application runs on an Ubuntu-based AWS EC2 server.

Required ports:

```text
22   → SSH
80   → HTTP
443  → HTTPS
8080 → Jenkins
```

Docker is installed on the EC2 server and is used to run the application containers.

---

# 🔑 Environment Variables

Create an environment file on the deployment server.

Example:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Do not commit `.env` files or credentials to GitHub.

---

# 🚀 Deployment Commands

Clone repository:

```bash
git clone https://github.com/ramsomvanshi/mern-stack-event-booking.git

cd mern-stack-event-booking
```

Build containers:

```bash
docker compose build
```

Start application:

```bash
docker compose up -d
```

Check containers:

```bash
docker ps
```

View logs:

```bash
docker logs event-booking-backend
```

Stop application:

```bash
docker compose down
```

---

# 🔧 Jenkins Setup

Jenkins pipeline is configured using the `Jenkinsfile` stored in the repository.

Pipeline configuration:

```text
Jenkins
   ↓
New Item
   ↓
Pipeline
   ↓
Pipeline script from SCM
   ↓
Git
   ↓
Repository
   ↓
Jenkinsfile
```

Repository:

```text
https://github.com/ramsomvanshi/mern-stack-event-booking.git
```

Branch:

```text
main
```

Script:

```text
Jenkinsfile
```

---

# 🔗 GitHub Webhook

GitHub webhook triggers Jenkins automatically after every push.

```text
Developer
    ↓
git push
    ↓
GitHub
    ↓
Webhook
    ↓
Jenkins
    ↓
CI/CD Pipeline
```

Webhook endpoint:

```text
http://YOUR_JENKINS_IP:8080/github-webhook/
```

---

# 📊 DevOps Tools Flow

```text
Git
 ↓
GitHub
 ↓
Jenkins
 ↓
Docker
 ↓
Trivy
 ↓
Docker Hub
 ↓
AWS EC2
 ↓
Docker Containers
 ↓
Live Application
```

---

# 📈 Future Improvements

The project can be extended with:

* Kubernetes
* Helm
* AWS EKS
* Terraform
* SonarQube
* Prometheus
* Grafana
* AWS CloudWatch
* HTTPS / SSL
* Blue-Green Deployment
* Rolling Deployment
* Automated Rollback
* Email / Slack Notifications

---

# 🎯 DevOps Skills Demonstrated

```text
✓ Git
✓ GitHub
✓ CI/CD
✓ Jenkins
✓ Jenkins Pipeline
✓ Docker
✓ Docker Hub
✓ AWS EC2
✓ Linux
✓ Nginx
✓ MongoDB
✓ Docker Compose
✓ GitHub Webhooks
✓ SSH
✓ Trivy
✓ Automated Deployment
✓ Containerization
```

---

# 👨‍💻 Project Repository

**MERN Stack Event Booking**

GitHub:

https://github.com/ramsomvanshi/mern-stack-event-booking.git

---

