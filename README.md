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

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/sellniti.git
cd sellniti
```

### 2. Setup Frontend
```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_AI_API_URL=http://localhost:5000/api/ai/chat
```

### 3. Setup Backend
```bash
cd ../backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
GROQ_API_KEY=gsk_your_groq_api_key
FRONTEND_URL=http://localhost:3000
```

### 4. Get Free API Keys

**Firebase (Database + Auth):**
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create project → Enable Authentication (Email/Password)
3. Create Firestore Database (test mode)
4. Project Settings → Add Web App → Copy config

**Groq AI (Free — 14,400 req/day):**
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up with Google → API Keys → Create Key
3. Copy key starting with `gsk_...`

### 5. Run the application
```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev

# Open: http://localhost:3000
```

### 6. Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /shops/{shopId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == shopId;
      match /{sub}/{docId} {
        allow read, write: if request.auth != null
                           && request.auth.uid == shopId;
      }
    }
  }
}
```

---

## 🚀 Deployment

### Frontend → Vercel (Free)
```bash
# Push to GitHub first, then:
1. vercel.com → Import GitHub repo
2. Root Directory: frontend
3. Framework: Vite
4. Add all VITE_ environment variables
5. Deploy → Get URL: https://sellniti.vercel.app
```

### Backend → Render (Free)
```bash
1. render.com → New Web Service
2. Connect GitHub repo
3. Root Directory: backend
4. Build: npm install | Start: node server.js
5. Add environment variables (GROQ_API_KEY, FRONTEND_URL)
6. Deploy → Get URL: https://sellniti-backend.onrender.com
```

### After Deployment
- Update `VITE_AI_API_URL` in Vercel to Render backend URL
- Add your Vercel domain to Firebase → Authentication → Authorized Domains

---

## 🗄️ Database Schema

### `shops/{shopId}`
```javascript
{
  shopId: string,        // Firebase UID
  shopName: string,
  gstNumber: string,     // 15-digit GSTIN
  phone: string,
  email: string,
  billCounter: number,   // Auto-increment bill number
  createdAt: ISO string
}
```

### `shops/{shopId}/inventory/{itemId}`
```javascript
{
  name: string,
  category: string,
  costPrice: number,
  sellingPrice: number,
  quantity: number,
  gstPercent: number,    // 0 | 5 | 12 | 18 | 28
  lowStockAt: number,
  createdAt: ISO string
}
```

### `shops/{shopId}/bills/{billId}`
```javascript
{
  billNumber: number,
  customerName: string,
  customerPhone: string,
  items: [{ itemId, name, qty, sellingPrice, gstPercent }],
  subtotal: number,
  gstAmount: number,
  totalAmount: number,
  paymentMode: string,   // Cash | UPI | Card | Net Banking
  createdAt: ISO string
}
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Health check |
| GET | `/api/health` | API status |
| POST | `/api/ai/chat` | AI chat completion |
| GET | `/api/ai/status` | AI provider status |
| POST | `/api/billing/calculate-gst` | GST calculation |
| POST | `/api/inventory/stats` | Inventory statistics |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

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
