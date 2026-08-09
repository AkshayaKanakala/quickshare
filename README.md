# 🚀 QuickShare

A fast, simple, and modern web application for sharing **text and files** between users through a clean and responsive interface.

## 🌐 Live Demo

**Try QuickShare:**
👉 **[Open QuickShare](YOUR_NETLIFY_URL)**

> Replace `YOUR_NETLIFY_URL` with your actual Netlify deployment URL.

---

## ✨ Features

* 📝 Share text instantly
* 📁 Upload and share files
* 📥 Download shared files
* ⚡ Fast and lightweight
* 🎨 Modern responsive user interface
* 📱 Works on desktop, tablet, and mobile
* 🔗 Frontend and backend connected through REST APIs
* ☁️ Cloud-deployed backend and frontend

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Other Technologies

* REST API
* CORS
* File handling
* Git & GitHub

### Deployment

* **Frontend:** Netlify
* **Backend:** Render

---

## 📂 Project Structure

```text
QuickShare/
│
├── Client/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── Server/
│   ├── server.js
│   └── storage.js
│
├── uploads/
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## ⚙️ How It Works

QuickShare uses a separate frontend and backend architecture.

```text
                    ┌─────────────────────┐
                    │       User          │
                    │   Browser / Phone   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Frontend       │
                    │  HTML + CSS + JS    │
                    │      Netlify        │
                    └──────────┬──────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Backend       │
                    │ Node.js + Express   │
                    │       Render        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   File / Text Data  │
                    │      Storage        │
                    └─────────────────────┘
```

---

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/AkshayaKanakala/quickshare.git
```

### 2. Navigate into the project

```bash
cd quickshare
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
node Server/server.js
```

The backend will run on:

```text
http://localhost:5000
```

### 5. Open the frontend

Open:

```text
Client/index.html
```

in your browser.

---

## 🔧 Configuration

The frontend communicates with the backend through the API URL defined in:

```text
Client/script.js
```

For local development:

```javascript
const API = "http://localhost:5000";
```

For production:

```javascript
const API = "YOUR_RENDER_BACKEND_URL";
```

---

## 🔐 Environment Variables

Sensitive configuration should be stored in a `.env` file and **must not be committed to GitHub**.

Example:

```env
PORT=5000
```

The `.gitignore` file prevents sensitive and unnecessary files from being uploaded:

```text
node_modules/
uploads/
.env
```

---

## 📡 API

The backend provides API endpoints used by the frontend for text and file sharing.

Example:

```text
POST /send-text
```

Additional endpoints are implemented in:

```text
Server/server.js
```

---

## ☁️ Deployment

### Frontend

The frontend is deployed using **Netlify**.

```text
GitHub Repository
       ↓
    Netlify
       ↓
QuickShare Web App
```

### Backend

The backend is deployed using **Render**.

```text
GitHub Repository
       ↓
     Render
       ↓
Node.js + Express API
```

---

## 🧪 Testing

You can test QuickShare directly from the live application:

👉 **[Launch QuickShare](YOUR_NETLIFY_URL)**

Try:

1. Enter some text.
2. Send the text.
3. Upload a file.
4. Verify the file is processed correctly.
5. Download/access the shared content.
6. Test the application from another browser or device.

---

## 📌 Future Improvements

* 🔐 User authentication
* 🔗 Shareable links
* ⏱️ Automatic file expiration
* 📊 File size and upload progress indicators
* 🗑️ Automatic cleanup of expired files
* 🔒 End-to-end encryption
* 📱 Progressive Web App (PWA) support
* 🖼️ Image and media previews

---

## 👨‍💻 Author

**Akshaya Kanakala**

Computer Science & Engineering Student

GitHub:
👉 [AkshayaKanakala](https://github.com/AkshayaKanakala)

---

## 📄 License

This project is open-source and available for educational and personal use.

---

⭐ **If you find QuickShare useful, consider giving the repository a star!**
