# AlphaShop - Premium MERN Stack E-Commerce Platform

AlphaShop is a full-stack e-commerce application built using the MERN stack (MongoDB, Express.js, React, Node.js). The application delivers a smooth shopping experience, featuring dynamic product listings, a fully integrated shopping cart, real-time total calculations, user authentication, and secure order processing with history tracking.

## 🚀 Key Features Implemented

- **User Authentication:** Complete secure user registration and login dashboards with token-based authorization.
- **Product Listings & Details:** Interactive homepage displaying premium collections with individual dynamic detail views.
- **Shopping Cart System:** Live cart where users can add items, manage quantities, and see automated real-time subtotal/total price metrics.
- **Order Processing:** Backend-integrated checkout system that saves orders to a MongoDB instance, flushes the active cart upon completion, and logs invoices.
- **Order Logs Dashboard:** Dedicated personal tracking section where users can view detailed purchase summaries, order IDs, timestamps, and order statuses.

---

## 🛠️ Tech Stack Used

- **Frontend:** React.js, React Router DOM, Axios, CSS3 (Custom Responsive Styling)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs

---

## 📂 Project Directory Structure

```text
AlphaShop/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   │   ├── Cart.jsx
    │   │   ├── Orders.jsx
    │   │   ├── Login.jsx
    │   │   └── Home.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json