# 📘 MEAN Stack Application

This project is a **MEAN Stack (MongoDB, Express.js, Angular, Node.js)** application that includes authentication password, product management (CRUD), and a responsive Angular Material UI.

---

## 🛠 Prerequisites

- Node.js (v18 or above)
- MongoDB (running locally)
- MySQL (running locally)
- Angular CLI

Install Angular CLI:
```bash
npm install -g @angular/cli
```

---

## 📁 Project Structure

```
mean-stack-app/
│── backend/
│── frontend/
```

---

## ▶️ Backend Setup & Run

```bash
cd backend
npm install
npm start
```

Backend runs at:
```
http://localhost:3000
```

---

## ▶️ Frontend Setup & Run

```bash
cd frontend
npm install
ng serve
```

Frontend runs at:
```
http://localhost:4200
```

---

## 🔗 API Configuration

File:
```
src/environments/environment.development.ts
```

```ts
export const environment = {
  apiUrl: 'http://localhost:3000/api'
};
```

---

## 📦 Product Module

- Add Product
- Edit Product
- Delete Product
- View Products using Angular Material Table

Fields:
- Name
- Price
- Description

---

## 🌤 Weather Feature

- Shows city name and temperature
- Displayed in the navigation bar

---

## 👤 Author
Thank You
Dinesh Kumar G  
Angular & Node.js Developer

