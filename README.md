# 🩺 PillCheck

Medicine Dose Tracker is a full-stack web application that allows users to manage their personal medications. Users can securely register, log in, and perform CRUD operations on their medicine records.

Built with **React**, **Flask**, **PostgreSQL**, and **Docker**, the app features JWT-based authentication, protected API endpoints, and full deployment on **Render**.

---

## 🚀 Features

- User authentication (JWT)
- Register, log in, and log out securely
- Add, view, and delete medicines
- Secure communication between frontend and backend
- React state management with Flux pattern


---

## 🧰 Tech Stack

**Frontend:**
- React.js
- Flux (custom state management)
- React Hot Toast (notifications)

**Backend:**
- Flask
- Flask-JWT-Extended
- SQLAlchemy
- PostgreSQL

**DevOps:**
- Docker & Docker Compose
- Render (deployment)

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/medicine-dose-tracker.git
cd medicine-dose-tracker
```

### 2. Set up environment variables
Create a `.env` file with the following (for backend):
```
JWT_SECRET_KEY=your_jwt_secret_key
DATABASE_URL=your_database_connection_string
```

### 3. Run the app using Docker
```bash
docker-compose up --build
```

The app should now be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

---

## 🧪 Testing
You can test user registration, login, and medicine management features. Use the browser dev tools or Postman to inspect requests and responses.

---

## 🛠️ Deployment
This app is deployed on [Render](https://render.com). It uses a `render.yaml` blueprint to manage services.

---

## 📄 License
This project is licensed under the MIT License.

---

## 🙌 Acknowledgements
- [Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/)
- [Stripe](https://stripe.com) (optional integration)
- [Render](https://render.com)

---

## 📬 Contact
Created by cesarcm5 - feel free to reach out!

