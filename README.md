# SEA Catering Web Application

Welcome to the SEA Catering! Where you are offered a healthy yet delicious meal plan! SEA Catering is also widely spread in major cities throughout Indonesia.

---

## ✨ Main Features

- 🔐 User & Admin Authentication
- 📝 Subscription Form with various plan & meal options
- 👤 User Dashboard: view, pause, resume, cancel subscription
- 🧑‍💼 Admin Dashboard: statistics, MRR metrics, and subscription growth
- 💬 Testimonial system with rating & login validation
- 🔐 JWT + Role-Based Access Control

---

## ⚙️ Setup and installation

Prerequisites
- Node.js v18+
- MySQL server
  
 First, you need to run Apache and MySQL on your local machine.

### 1. Clone Repository

```bash
git clone https://github.com/paranroman/sea-catering.git
```

Duplicate the folder via any terminal (recommended via github desktop) and select the path for the folder to be located

### 2. Create .env file in /server

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=sea_catering
JWT_SECRET=rahasia_super_aman
PORT=5000
```

### 3. Run setup project

```bash
npm run setup
```

### 4. Start the project

```bash
npm start
```
The web application will run on localhost:5173

## 🔐 Admin Account

To login as admin:

- Email: admin@seacatering.id
- Password: #Admin123

This admin account is automatically created when you run npm run setup
