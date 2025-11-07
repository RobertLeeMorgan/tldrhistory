# 🧠 TL;DR History

**TL;DR History** is a social timeline for world history — a place where users post short, witty summaries of major events, people, and civilizations.  
Think of it as history meets social media: scrollable, filterable, and fun.  
Instead of long essays, you get bite-sized glimpses of humanity’s progress across continents and centuries.

🎯 **Live Demo:** [tldrhistory.xyz](https://tldrhistory.xyz/)

---

## 🌍 Overview

TL;DR History reimagines how we explore the past — not through textbooks, but through user-generated stories displayed on an interactive global timeline.  
Each post represents a *moment in time*: a period, event, landmark, or person. Users can:

- 📝 Create, edit, or delete their own posts  
- ❤️ Like posts and build a personal timeline of favorites  
- 🧭 Filter by **continent**, **subject** (culture, politics, military, etc.), or **type**  
- 🔍 Search globally by name or keyword  
- ⏳ Watch the timeline update dynamically as they scroll through centuries  

The goal isn’t exhaustive detail — it’s context. *Who existed when?* *What overlapped?* *What was happening elsewhere at the same time?*  
TL;DR History helps answer those questions at a glance.

---

## ⚙️ Tech Stack

### **Client (React + Vite)**
- ⚛️ **React 18** built with **Vite** for fast, modular development  
- 🎨 **Tailwind CSS + DaisyUI** for clean, accessible design  
- 🔄 **TanStack React Query** for efficient data fetching and caching  
- 👁️ **Intersection Observer** to trigger auto-fetching and syncing timeline data based on visible centuries  
- 🔔 **React Toastify** for smooth user feedback  
- 🌐 **React Router DOM** for structured navigation  

### **Server (Express + MySQL + Sequelize)**
- 🚀 **Express.js** REST API serving all client data  
- 🧱 **Sequelize ORM** to model users, posts, likes, and categories  
- 🔐 Secure authentication using **JWT** + **bcryptjs**  
- 🧼 Middleware stack for validation, compression, and security headers  
- 🧰 Environment configuration with **dotenv**

### **Database**
- 🐬 **MySQL** (hosted on Render) — handles user data, posts, and filter queries  
- Schema structured around relational links between users, posts, likes, tags, and categories  

---

## 🧩 Features

- 🕰️ **Interactive Global Timeline:** Displays user-created posts chronologically by continent  
- 🌎 **Smart Widget:** A floating panel updates based on the visible century using intersection observer — showing population data, popular posts, and civilizations active in that era  
- 🧍‍♂️ **User Profiles:** View your posted and liked content as a personalized historical feed  
- 🔍 **Advanced Filters:** Query the database via api; search by region, theme, or post type  
- 💬 **Social Mechanics:** Likes, editing, deletion, and personal ownership  
- 👁️ **Intersection Observer:** Drives auto-loading of timeline data and century tracking for the global overview widget  

---

## ☁️ Deployment

- 🧩 Client is built with `vite build` and merged into the Express `/dist` folder  
- 🧱 Both frontend and backend are deployed via **Render**  
- 🐳 MySQL runs as a managed, containerized Render service

---

## 🧭 Project Structure

```
tldrhistory/
├── client/ # React + Vite frontend
│ ├── src/
│ │ ├── components/ # UI components
│ │ ├── context/ # React context providers
│ │ ├── hooks/ # Custom hooks
│ │ ├── routes/ # Client-side routing
│ │ ├── util/ # Utility functions
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── main.jsx
│ ├── public/
│ └── package.json
│
├── server/ # Express + Sequelize backend
│ ├── models/ # Sequelize models
│ ├── routes/ # API endpoints
│ ├── controllers/ # Route logic
│ ├── middleware/ # Auth, validation, etc.
│ ├── util/ # Helpers and config
│ ├── dist/ # Built client files (from Vite)
│ ├── app.js
│ └── package.json
└── README.md
```

---

## ⚙️ Scripts

**Client**
```bash
npm run dev      # Start Vite dev server
npm run build    # Build static client files
```

**Server**
```
npm start        # Run Express server
```

---

## 🧰 Setup (for local development)

To explore TL;DR History locally, you'll need **Node.js** and **MySQL** installed.

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/tldrhistory.git
cd tldrhistory
```
   
2. **Install dependencies**

```
cd server && npm install
cd ../client && npm install
```

3. **Configure environment variables**

Create a .env file in /server with your MySQL credentials:

```
MYSQL_DATABASE=your_database
MYSQL_USER=your_user
MYSQL_PASSWORD=your_password
MYSQL_HOST=localhost
JWT_SECRET=your_secret
```

4. Run both client and server
```
# In separate terminals
npm start    # in /server
npm run dev  # in /client
```

💡 Note: The live version uses a managed MySQL instance on Render.
For local testing, any MySQL 8+ setup will work.


---

## 💡 Purpose

The goal of TL;DR History is to make history approachable and connected.
Instead of reading one region in isolation, users can see how ancient civilizations, empires, and innovations coexisted — across continents and through time.
It’s history without the homework: global, visual, and crowd-driven.

---

## 👤 Author

Rob
Full-stack developer focused on modern web architecture and intuitive UX.
