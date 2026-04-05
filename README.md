# SellNiti — Smart Business Manager

<div align="center">

![SellNiti Banner](https://img.shields.io/badge/SellNiti-Smart%20Business%20Manager-6366f1?style=for-the-badge&logo=shopify&logoColor=white)

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Groq AI](https://img.shields.io/badge/Groq-Llama%203.1-FF6B35?style=flat-square&logo=meta)](https://groq.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)

**A full-stack SaaS web application for Indian small business owners to manage inventory, generate GST-compliant bills, track sales analytics, and get AI-powered business insights — all in one place.**

[🚀 Live Demo](#) • [📖 Documentation](#features) • [🐛 Report Bug](https://github.com/yourusername/sellniti/issues) • [💡 Request Feature](https://github.com/yourusername/sellniti/issues)

</div>

---

## 📸 Screenshots

| Dashboard (Light) | Dashboard (Dark) |
|---|---|
| ![Dashboard Light](https://via.placeholder.com/500x300/f8fafc/6366f1?text=Dashboard+Light) | ![Dashboard Dark](https://via.placeholder.com/500x300/0f0f1a/6366f1?text=Dashboard+Dark) |

| Billing / POS | AI Assistant |
|---|---|
| ![Billing](https://via.placeholder.com/500x300/f8fafc/6366f1?text=Billing+POS) | ![AI](https://via.placeholder.com/500x300/0f0f1a/6366f1?text=AI+Assistant) |

---

## ✨ Features

### 📊 Sales Analytics Dashboard
- Real-time sales tracking — **daily, monthly, yearly**
- KPI cards — Today's Sales, Monthly GMV, Total Orders, Total Profit
- Interactive **bar charts, line charts, pie charts** (Recharts)
- Top selling products with visual progress bars
- Low stock alerts panel
- Date range filter (Daily / Monthly / Yearly)

### 📦 Inventory Management
- Add, edit, delete products with full details
- Real-time stock tracking with **Firestore live updates**
- Low stock & out-of-stock alerts
- Profit margin % per product (auto-calculated)
- Search & filter products
- GST rate selection (0%, 5%, 12%, 18%, 28%)
- Sorting using **Merge Sort algorithm** (DAA implementation)
- Search using **Binary Search algorithm** (DAA implementation)

### 🧾 Billing / POS System
- Intuitive point-of-sale product selection grid
- Cart with quantity management (add/remove/update)
- **Auto GST calculation** per product
- Customer name & phone number capture
- Payment mode selection — Cash, UPI, Card, Net Banking
- **Auto-increment bill numbering** (per shop)
- **Inventory auto-reduces** after each successful bill
- **GST-compliant PDF bill generation** (jsPDF + autoTable)
- One-click PDF download

### 📋 Bill History
- Complete bill history with all transaction details
- **Quick filters** — Today, This Week, This Month
- **Custom date range picker**
- Search by customer name or bill number
- Re-download any past bill as PDF
- Running total for filtered period

### 🤖 AI Business Assistant
- Powered by **Groq API (Llama 3.1 8B Instant)** — completely free
- Has real-time access to shop's sales, inventory & profit data
- **Language selector** — English 🇬🇧 / Hindi 🇮🇳 / Hinglish 🔀
- Formatted responses with bullet points
- Quick suggestion chips for common queries
- Answers questions like:
  - "Why are my sales low?"
  - "Which product should I promote?"
  - "What should I restock?"
  - "How can I increase profit?"

### 🌗 Theme & Language
- **Dark mode / Light mode** toggle (persisted in localStorage)
- **English ↔ Hindi** language toggle (persisted in localStorage)
- Full Hindi UI — sidebar, dashboard, all pages

### 🔐 Authentication
- Firebase Email/Password authentication
- Shop registration with **GST number, phone, shop name**
- Shop data auto-populated in all bills
- Secure Firestore rules (per-shop data isolation)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + Vite | UI framework & build tool |
| Tailwind CSS 3 | Utility-first styling |
| Framer Motion | Animations & transitions |
| Recharts | Sales charts & visualizations |
| jsPDF + autoTable | PDF bill generation |
| React Router v6 | Client-side routing |
| React Hot Toast | Notifications |
| React Icons | Icon library |
| date-fns | Date formatting & calculations |
| Firebase SDK | Auth + Firestore real-time DB |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| Groq SDK | AI chat completions (free tier) |
| express-rate-limit | API rate limiting |
| dotenv | Environment configuration |
| cors | Cross-origin resource sharing |

### Infrastructure
| Service | Purpose | Cost |
|---|---|---|
| Firebase Auth | User authentication | Free (Spark) |
| Firebase Firestore | Real-time NoSQL database | Free (Spark) |
| Groq API | AI (Llama 3.1 8B) | Free (14k req/day) |
| Vercel | Frontend hosting | Free |
| Render | Backend hosting | Free |

---

## 🗂️ Project Structure

```
sellniti/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ai/           # AI chat components
│   │   │   ├── billing/      # POS & cart components
│   │   │   ├── common/       # ThemeToggle, LanguageToggle
│   │   │   ├── dashboard/    # Charts, KPI cards
│   │   │   ├── inventory/    # Product table, modals
│   │   │   ├── layout/       # Sidebar, Navbar, PageWrapper
│   │   │   └── ui/           # Button, Input, Card, Modal...
│   │   ├── constants/        # Categories, GST rates, routes
│   │   ├── context/          # Auth, Theme, Language, Cart
│   │   ├── firebase/         # Config, auth, firestore
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # All page components
│   │   ├── services/         # Firebase & API services
│   │   ├── styles/           # CSS + theme files
│   │   ├── translations/     # en.json + hi.json
│   │   └── utils/            # PDF, GST calc, algorithms
│   ├── .env                  # (gitignored)
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── config/           # DB, env, firebase config
    │   ├── controllers/      # Route handlers
    │   ├── middleware/        # Auth, error, rate limiter
    │   ├── models/           # Schema definitions
    │   ├── routes/           # API route definitions
    │   ├── services/         # Business logic
    │   └── utils/            # GST calc, bill gen, AI context
    ├── .env                  # (gitignored)
    └── server.js
```

---

## 🧮 DAA (Design & Analysis of Algorithms)

This project implements the following algorithms as part of the BTEC DAA course requirement:

| Algorithm | Location | Use Case | Complexity |
|---|---|---|---|
| **Merge Sort** | `utils/sortAlgorithms.js` | Sort inventory by price/name | O(n log n) |
| **Binary Search** | `utils/sortAlgorithms.js` | Find product in billing screen | O(log n) |
| **Greedy Algorithm** | `utils/sortAlgorithms.js` | Rank products by profit margin | O(n log n) |
| **Aggregation** | `services/dashboardService.js` | Daily → Monthly → Yearly GMV | O(n) |

---

## ⚙️ Local Development Setup

### Prerequisites
- Node.js v18+
- npm v9+
- Firebase account (free)
- Groq account (free)


## 👨‍💻 Author

**Vipul Joshi**
- GitHub: [@vipuljoshi0001](https://github.com/vipuljoshi0001)
- Project: [SellNiti](https://github.com/vipuljoshi0001/sellniti)

---

## 🙏 Acknowledgments

- [Firebase](https://firebase.google.com/) — Real-time database & authentication
- [Groq](https://groq.com/) — Lightning-fast free AI inference
- [Meta Llama](https://llama.meta.com/) — Open source LLM powering our AI
- [Recharts](https://recharts.org/) — Beautiful React charts
- [Framer Motion](https://www.framer.com/motion/) — Smooth animations
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [jsPDF](https://github.com/parallax/jsPDF) — Client-side PDF generation

---

<div align="center">

**Made with ❤️ for Indian Small Business Owners**

⭐ **Star this repo if you found it helpful!** ⭐

</div>
