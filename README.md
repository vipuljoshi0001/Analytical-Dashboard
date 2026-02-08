📊 Sales Analytics Dashboard
A full-stack sales tracking and analytics system with user authentication, data persistence, and interactive visualizations.

🎯 Project Overview
Sales Analytics Dashboard helps businesses track and analyze their sales data with personalized insights including top-selling products, peak sales hours, monthly trends, and category performance.
Key Features

✅ User Login/Registration with secure authentication
✅ Add, view, and delete sales transactions
✅ Real-time analytics with 5 interactive charts
✅ Persistent file-based data storage
✅ Responsive modern UI


🏗️ Project Structure
project-root/
│
├── backend/                    # Java Backend (REST API)
│   ├── User.java              # User model & authentication
│   ├── Product.java           # Sales transaction model
│   ├── Database.java          # File-based storage
│   ├── SalesAnalytics.java    # Analytics calculations
│   ├── AuthService.java       # Login/Register service
│   ├── Resource.java          # API endpoints
│   └── Main.java              # Server entry point
│
├── frontend/                   # Frontend (HTML/CSS/JS)
│   ├── login.html             # Login/Register page
│   ├── dashboard.html         # Analytics dashboard
│   ├── login.js               # Auth logic
│   ├── dashboard.js           # Dashboard logic
│   └── style.css              # Styling
│
└── data/                       # Auto-generated storage
    ├── users.txt              # User credentials
    └── sales_[username].txt   # User sales data

🔄 System Workflow
┌─────────────────────────────────────────────────────────────┐
│                    USER REGISTRATION/LOGIN                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    User opens login.html
                              ↓
        ┌─────────────────────┴─────────────────────┐
        ↓                                           ↓
   REGISTER (New User)                         LOGIN (Existing)
        ↓                                           ↓
  Fill registration form                    Enter credentials
        ↓                                           ↓
  POST /api/register                         POST /api/login
        ↓                                           ↓
  AuthService validates                      Verify password hash
        ↓                                           ↓
  Save to users.txt                          Return user data
        ↓                                           ↓
        └─────────────────────┬─────────────────────┘
                              ↓
                  Store user in localStorage
                              ↓
                  Redirect to dashboard.html

┌─────────────────────────────────────────────────────────────┐
│                    DASHBOARD OPERATIONS                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
              Dashboard loads user's sales data
                              ↓
              GET /api/sales?username=<user>
                              ↓
              Database reads sales_[user].txt
                              ↓
              GET /api/analytics?username=<user>
                              ↓
              SalesAnalytics computes metrics
                              ↓
         ┌────────────────────┴────────────────────┐
         ↓                                         ↓
    DISPLAY METRICS                          RENDER CHARTS
         ↓                                         ↓
  - Total Revenue                        - Top Products (Bar)
  - Total Sales                          - Least Products (Bar)
  - Top Product                          - Monthly Trend (Line)
  - Best Month                           - Category Split (Pie)
  - Peak Hour                            - Hourly Sales (Bar)
  - Highest Sale                                   
         ↓                                         ↓
         └────────────────────┬────────────────────┘
                              ↓
                    Show Sales Table

┌─────────────────────────────────────────────────────────────┐
│                     ADD NEW SALE                            │
└─────────────────────────────────────────────────────────────┘
                              ↓
              User fills sale form:
              - Product Name
              - Category
              - Sale Amount
              - Quantity
              - Date & Time
              - Customer Name
                              ↓
              POST /api/add-sale
                              ↓
              Create Product object
                              ↓
              Save to sales_[user].txt
                              ↓
              Refresh dashboard data
                              ↓
              Re-render charts & table

┌─────────────────────────────────────────────────────────────┐
│                     DELETE SALE                             │
└─────────────────────────────────────────────────────────────┘
                              ↓
              User clicks Delete button
                              ↓
              POST /api/delete-sale
                              ↓
              Remove from sales_[user].txt
                              ↓
              Refresh dashboard

┌─────────────────────────────────────────────────────────────┐
│                        LOGOUT                               │
└─────────────────────────────────────────────────────────────┘
                              ↓
              Clear localStorage
                              ↓
              Redirect to login.html

🛠️ Technology Stack
LayerTechnologyBackendJava (JDK 11+), Built-in HTTP ServerFrontendHTML5, CSS3, Vanilla JavaScriptChartsChart.js 4.4.0StorageFile-based (text files)SecuritySHA-256 password hashingAPIREST (JSON responses)
Algorithms Used

Sorting: O(n log n) - Priority-based sorting
Grouping: O(n) - HashMap aggregation
Top-K: O(n log k) - Min-heap selection
Analytics: O(n) - Single-pass computations


📋 Prerequisites

Java JDK 11 or higher

Download: Oracle JDK or OpenJDK
Verify: java -version and javac -version


Modern Web Browser

Chrome, Firefox, Edge, or Safari


Text Editor (Optional)

VS Code, IntelliJ IDEA, or any IDE
