# SellNiti — Complete Project File Structure

```
sellniti/
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── logo.png
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │   ├── logo.svg
│   │   │   └── icons/
│   │   │       ├── dashboard.svg
│   │   │       ├── inventory.svg
│   │   │       ├── billing.svg
│   │   │       └── ai.svg
│   │   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── PageWrapper.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   │
│   │   │   ├── ui/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Spinner.jsx
│   │   │   │   ├── Alert.jsx
│   │   │   │   └── Dropdown.jsx
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── KPICard.jsx
│   │   │   │   ├── SalesBarChart.jsx
│   │   │   │   ├── SalesLineChart.jsx
│   │   │   │   ├── CategoryPieChart.jsx
│   │   │   │   ├── TopSellersList.jsx
│   │   │   │   ├── LowStockPanel.jsx
│   │   │   │   └── DateRangeFilter.jsx
│   │   │   │
│   │   │   ├── inventory/
│   │   │   │   ├── ProductTable.jsx
│   │   │   │   ├── AddProductModal.jsx
│   │   │   │   ├── EditProductModal.jsx
│   │   │   │   ├── DeleteConfirmModal.jsx
│   │   │   │   ├── StockBadge.jsx
│   │   │   │   └── SearchBar.jsx
│   │   │   │
│   │   │   ├── billing/
│   │   │   │   ├── ItemSelectionGrid.jsx
│   │   │   │   ├── CartPanel.jsx
│   │   │   │   ├── CartItem.jsx
│   │   │   │   ├── GSTSummary.jsx
│   │   │   │   ├── CustomerForm.jsx
│   │   │   │   ├── PaymentModeSelector.jsx
│   │   │   │   └── BillPreviewModal.jsx
│   │   │   │
│   │   │   ├── ai/
│   │   │   │   ├── ChatWindow.jsx
│   │   │   │   ├── ChatMessage.jsx
│   │   │   │   ├── ChatInput.jsx
│   │   │   │   ├── SuggestionChips.jsx
│   │   │   │   └── AIInsightCard.jsx
│   │   │   │
│   │   │   └── common/
│   │   │       ├── ThemeToggle.jsx
│   │   │       └── LanguageToggle.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── RegisterPage.jsx
│   │   │   │
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── InventoryPage.jsx
│   │   │   ├── BillingPage.jsx
│   │   │   ├── BillHistoryPage.jsx
│   │   │   ├── AIAssistantPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   ├── LanguageContext.jsx
│   │   │   └── CartContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useTheme.js
│   │   │   ├── useLanguage.js
│   │   │   ├── useInventory.js
│   │   │   ├── useBilling.js
│   │   │   ├── useDashboard.js
│   │   │   └── useAI.js
│   │   │
│   │   ├── translations/
│   │   │   ├── index.js
│   │   │   ├── en.json
│   │   │   └── hi.json
│   │   │
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── themes/
│   │   │   │   ├── dark.css
│   │   │   │   └── light.css
│   │   │   └── tailwind.config.js
│   │   │
│   │   ├── firebase/
│   │   │   ├── config.js
│   │   │   ├── auth.js
│   │   │   ├── firestore.js
│   │   │   └── storage.js
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── inventoryService.js
│   │   │   ├── billingService.js
│   │   │   ├── dashboardService.js
│   │   │   └── aiService.js
│   │   │
│   │   ├── utils/
│   │   │   ├── generateBill.js
│   │   │   ├── calculateGST.js
│   │   │   ├── formatCurrency.js
│   │   │   ├── formatDate.js
│   │   │   └── sortAlgorithms.js
│   │   │
│   │   ├── constants/
│   │   │   ├── gstRates.js
│   │   │   ├── paymentModes.js
│   │   │   ├── categories.js
│   │   │   └── routes.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
│
└── backend/
    │
    ├── src/
    │   │
    │   ├── config/
    │   │   ├── db.js
    │   │   ├── firebase.js
    │   │   └── env.js
    │   │
    │   ├── controllers/
    │   │   ├── authController.js
    │   │   ├── shopController.js
    │   │   ├── inventoryController.js
    │   │   ├── billingController.js
    │   │   ├── dashboardController.js
    │   │   └── aiController.js
    │   │
    │   ├── routes/
    │   │   ├── index.js
    │   │   ├── authRoutes.js
    │   │   ├── shopRoutes.js
    │   │   ├── inventoryRoutes.js
    │   │   ├── billingRoutes.js
    │   │   ├── dashboardRoutes.js
    │   │   └── aiRoutes.js
    │   │
    │   ├── models/
    │   │   ├── shopModel.js
    │   │   ├── inventoryModel.js
    │   │   ├── billModel.js
    │   │   └── expenseModel.js
    │   │
    │   ├── services/
    │   │   ├── authService.js
    │   │   ├── inventoryService.js
    │   │   ├── billingService.js
    │   │   ├── dashboardService.js
    │   │   └── aiService.js
    │   │
    │   ├── middleware/
    │   │   ├── authMiddleware.js
    │   │   ├── errorMiddleware.js
    │   │   └── rateLimiter.js
    │   │
    │   ├── utils/
    │   │   ├── gstCalculator.js
    │   │   ├── billNumberGenerator.js
    │   │   ├── analyticsHelper.js
    │   │   └── aiContextBuilder.js
    │   │
    │   └── app.js
    │
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── package.json
    └── server.js
```

---

## Key File Purposes (Quick Reference)

| File | Purpose |
|------|---------|
| `context/ThemeContext.jsx` | Global dark/light mode state |
| `context/LanguageContext.jsx` | Global EN/HI language state |
| `translations/en.json` | All English UI strings |
| `translations/hi.json` | All Hindi UI strings |
| `translations/index.js` | Language switcher logic |
| `styles/themes/dark.css` | Dark mode CSS variables |
| `styles/themes/light.css` | Light mode CSS variables |
| `components/common/ThemeToggle.jsx` | Toggle button component |
| `components/common/LanguageToggle.jsx` | EN ↔ HI toggle button |
| `utils/generateBill.js` | jsPDF bill generation |
| `utils/calculateGST.js` | GST calculation logic |
| `utils/sortAlgorithms.js` | Merge sort / binary search (DAA) |
| `utils/aiContextBuilder.js` | Builds sales context for AI API |
| `firebase/config.js` | Firebase project credentials |
| `server.js` | Backend entry point |
