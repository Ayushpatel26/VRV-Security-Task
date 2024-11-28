# **Admin Dashboard**

A modern and responsive **Admin Dashboard** built using **Next.js**, **Tailwind CSS**, and **JSON Server**. This project provides functionality to manage **users**, **roles**, and **permissions** with CRUD operations, data persistence, and real-time feedback using **React Toastify**.

---

## **Features**

1. **User Management**:
   - View, add, edit, and delete users.
   - Persistent data storage using JSON Server.
   - Real-time toast notifications for feedback.

2. **Role Management**:
   - Define and modify roles.
   - Assign custom permissions to roles dynamically.

3. **Permission Management**:
   - Clear and easy-to-use interface for assigning permissions to roles.
   - Prevent accidental changes with a save confirmation.

4. **Responsive Sidebar Navigation**:
   - Visible on large screens; collapsible hamburger menu on smaller screens.
   - Smooth animations for opening/closing.

5. **Responsive Design**:
   - Fully responsive for mobile, tablet, and desktop views.

---

## **Tech Stack**
- **Frontend**: 
  - [Next.js](https://nextjs.org/) (React Framework)
  - [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS Framework)
  - [React Toastify](https://fkhadra.github.io/react-toastify/) (Notifications)

- **Backend**: 
  - [JSON Server](https://github.com/typicode/json-server) (Mock API for data persistence)

---

## **Getting Started**

Follow these steps to set up and run the project locally.

### **Prerequisites**
- [Node.js](https://nodejs.org/) installed on your machine.
- [Git](https://git-scm.com/) for version control.

---

### **Setup Instructions**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/admin-dashboard.git
   cd admin-dashboard
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run JSON Server**:
   ```bash
   npx json-server --watch db.json --port 3001
   ```
4. **Run the Application**:
   ```bash
   npm run dev
   ```
5. **Access the Application**:
   ```bash
   http://localhost:3000
   ```