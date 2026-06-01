# 📚 Library Management System

A full-stack Library Management System built using React, Node.js, Express, PostgreSQL, and REST APIs.

<img width="1886" height="819" alt="image" src="https://github.com/user-attachments/assets/f84cfff8-484b-46d2-a111-595d0a6b99b8" />
<img width="1882" height="816" alt="image" src="https://github.com/user-attachments/assets/8659967d-a69b-4720-9227-d9820c0a54be" />
<img width="1855" height="835" alt="image" src="https://github.com/user-attachments/assets/e423a534-9d23-4a4a-a65c-62348e5393eb" />


## 🚀 Features

### Books Management

* View all books
* Add new books
* Delete books
* Update book information
* Fetch book by ID

### Students Management

* View all students
* Add new students
* Update student details
* Delete students

### Borrow Management

* Borrow books
* Track borrowed books
* Manage book-student relationships using foreign keys

### Database Features

* PostgreSQL integration
* Foreign key constraints
* Data validation
* Error handling

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

---

## 📂 Project Structure

```text
library-management-system/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── db/
│   │   └── middlewares/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── api/
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>
cd library-management-system
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🗄️ Database Setup

Create a PostgreSQL database and configure:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=library_db
DB_PORT=5432
```

---

## 📸 Screenshots

### Books Page

![Books Page](./screenshots/books-page.png)

### Students Page

![Students Page](./screenshots/students-page.png)

### Borrow Page

![Borrow Page](./screenshots/borrow-page.png)

---

## 🔗 API Endpoints

### Books

| Method | Endpoint   |
| ------ | ---------- |
| GET    | /books     |
| GET    | /books/:id |
| POST   | /books     |
| PUT    | /books/:id |
| DELETE | /books/:id |

### Students

| Method | Endpoint      |
| ------ | ------------- |
| GET    | /students     |
| GET    | /students/:id |
| POST   | /students     |
| PUT    | /students/:id |
| DELETE | /students/:id |

### Borrow

| Method | Endpoint    |
| ------ | ----------- |
| GET    | /borrow     |
| POST   | /borrow     |
| DELETE | /borrow/:id |

---

## 👩‍💻 Author

Anushka Bhardwaj
