# 🛒 Shopping Cart – Full Stack E-Commerce Platform

A fully dynamic e-commerce web application built with REST APIs, secure authentication, and seamless payment integration. Designed to deliver a smooth user shopping experience and provide powerful admin controls.

---

## 🚀 Features

### **User Features**
- Browse and explore products through a clean and responsive UI.
- View detailed product information including price, description, and images.
- Add items to cart, update quantities, and remove products.
- Complete payments securely using **Razorpay Payment Gateway**.
- User authentication implemented using **Passport.js**.
- Dynamic view rendering using **Handlebars (HBS)** templating engine.

### **Admin Features**
- Add new products with details and images.
- Update or delete product listings.
- Manage inventory and product visibility.
- Track user payments mapped via unique user IDs.
- Monitor all orders and payment statuses.
- Admin authentication with Passport.js.

---

## 🔐 Security & Authentication
- Secure login for users and admins using **Passport.js (Local Strategy)**.
- Protected admin routes with session handling.
- Razorpay signature verification ensures payment security.
- All sensitive credentials stored in a `.env` file.

---

## 🗄️ Database & Storage
- Database hosted on **MongoDB Atlas** for high scalability.
- **Cloudinary** used to store and manage product images.
- Mongoose models for users, products, carts, payments, and orders.

---

## ⚙️ Backend Architecture
- Built using **Node.js** and **Express.js**.
- RESTful API architecture for smooth communication.
- Error-handling and authentication middlewares.
- Uses **Nodemon** during development for auto-restart.
- MVC project structure for clean and maintainable code.

---

## 💳 Payment Integration
- Razorpay integration for fast and secure payments.
- Order creation + signature verification workflow.
- Payments linked to user accounts for admin tracking.
- Admin dashboard displays complete payment history.

---

## 🎨 Frontend & Templating
- Frontend rendered using **Handlebars (HBS)**.
- Uses layouts and partials for consistent UI.
- Responsive pages built with HTML, CSS, and JavaScript.

---

## 🧰 Tech Stack

### **Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Passport.js  
- Razorpay API  
- Cloudinary SDK  
- Nodemon  

### **Frontend**
- Handlebars (HBS)  
- HTML, CSS, JavaScript  

---