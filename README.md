📊 Sales Analytics Dashboard - README
🎯 Project Overview
Sales Analytics Dashboard is a comprehensive full-stack web application designed to help businesses track, analyze, and visualize their sales data. Built with Java backend and vanilla JavaScript frontend, this system provides personalized analytics including top-selling products, peak sales hours, monthly trends, and category-wise performance metrics.
🌟 Key Features

User Authentication: Secure login and registration system with password hashing
Persistent Storage: File-based database for storing user credentials and sales data
Sales Management: Add, view, and delete sales transactions
Real-time Analytics:

Total revenue and sales count
Top 5 best-selling products
Bottom 5 products needing attention
Peak sales hours (hourly analysis)
Best performing month
Category-wise sales distribution


Interactive Visualizations: 5 dynamic charts using Chart.js
Responsive Design: Modern UI that works on desktop and mobile devices


🏗️ Project Structure
project-root/
│
├── backend/                    # Java Backend
│   ├── User.java              # User authentication model
│   ├── Product.java           # Product/Sale transaction model
│   ├── Database.java          # File-based data persistence layer
│   ├── SalesAnalytics.java    # Analytics computation engine
│   ├── AuthService.java       # Authentication service
│   ├── Resource.java          # REST API controller
│   └── Main.java              # Application entry point
│
├── frontend/                   # Frontend
│   ├── login.html             # Login/Registration page
│   ├── dashboard.html         # Main analytics dashboard
│   ├── login.js               # Authentication logic
│   ├── dashboard.js           # Dashboard functionality
│   └── style.css              # Complete styling
│
└── data/                       # Data storage (auto-generated)
    ├── users.txt              # User credentials
    └── sales_[username].txt   # Individual user sales data

🛠️ Technology Stack
Backend

Language: Java (JDK 11 or higher)
Server: Built-in com.sun.net.httpserver.HttpServer
Architecture: RESTful API
Data Storage: File-based (text files)
Security: SHA-256 password hashing

Frontend

HTML5: Semantic markup
CSS3: Modern responsive design with gradients and animations
JavaScript (ES6+): Vanilla JS with async/await
Charts: Chart.js 4.4.0 for data visualization
API Communication: Fetch API

Algorithms Used

Sorting: O(n log n) - Priority-based task sorting
Grouping: O(n) - HashMap-based categorization
Top-K Selection: O(n log k) - Min-heap based selection
Aggregation: O(n) - Stream-based analytics


📋 Prerequisites
Required Software

Java Development Kit (JDK)

Version: 11 or higher
Download: Oracle JDK or OpenJDK


Web Browser

Chrome, Firefox, Edge, or Safari (latest version)


Text Editor / IDE (Optional)

VS Code, IntelliJ IDEA, Eclipse, or any code editor



Installation Steps
Windows

Install Java JDK:

Download JDK installer from Oracle or Adoptium
Run the installer
Default installation path: C:\Program Files\Java\jdk-17


Set Environment Variables:

Press Win + R, type sysdm.cpl, press Enter
Go to Advanced → Environment Variables
Under System Variables, find Path and click Edit
Click New and add: C:\Program Files\Java\jdk-17\bin
Click OK on all dialogs


Verify Installation:

cmd   java -version
   javac -version
macOS

Install Java JDK:

bash   # Using Homebrew
   brew install openjdk@17
   
   # Or download from Oracle/Adoptium and install

Set JAVA_HOME:

bash   echo 'export JAVA_HOME=$(/usr/libexec/java_home)' >> ~/.zshrc
   source ~/.zshrc

Verify Installation:

bash   java -version
   javac -version
Linux (Ubuntu/Debian)

Install Java JDK:

bash   sudo apt update
   sudo apt install openjdk-17-jdk

Verify Installation:

bash   java -version
   javac -version

🚀 Installation & Setup
Step 1: Download/Clone the Project
bash# If using Git
git clone <repository-url>
cd sales-analytics-dashboard

# Or download ZIP and extract
Step 2: Compile Java Backend
IMPORTANT: Before compiling, ensure all Java files DO NOT have package backend; at the top. Remove this line if present.
bash# Navigate to backend folder
cd backend

# Compile all Java files
javac User.java
javac Product.java
javac Database.java
javac SalesAnalytics.java
javac AuthService.java
javac Resource.java
javac Main.java
Alternative (compile all at once):
bashjavac *.java
Step 3: Run the Backend Server
bashjava Main
```

**Expected Output**:
```
═══════════════════════════════════════════════
  Sales Analytics Dashboard - Backend Server
═══════════════════════════════════════════════
Server started successfully on port 8080

Available API Endpoints:
  • POST http://localhost:8080/api/register
  • POST http://localhost:8080/api/login
  • POST http://localhost:8080/api/add-sale
  • GET  http://localhost:8080/api/sales?username=<username>
  • GET  http://localhost:8080/api/analytics?username=<username>
  • POST http://localhost:8080/api/delete-sale

Server is running... Press Ctrl+C to stop.
═══════════════════════════════════════════════
Step 4: Open the Frontend
Option 1: Direct File Open

Navigate to frontend folder
Double-click login.html
Or right-click → Open with → Your Browser

Option 2: Using Local Web Server (Recommended)
Using Python:
bashcd frontend
# Python 3
python -m http.server 3000
# Then open: http://localhost:3000/login.html
Using Node.js (http-server):
bashcd frontend
npx http-server -p 3000
# Then open: http://localhost:3000/login.html
```

**Using VS Code Live Server**:
- Install "Live Server" extension
- Right-click `login.html` → Open with Live Server

---

## 📖 User Guide

### First Time Setup

1. **Register Account**:
   - Open `login.html`
   - Click "Register here"
   - Fill in:
     - Username (unique)
     - Password (minimum 6 characters)
     - Full Name
     - Business Name (optional)
   - Click "Create Account"

2. **Login**:
   - Use your registered credentials
   - Click "Login"
   - You'll be redirected to the dashboard

### Adding Sales Data

1. **Click "Show Form"** button
2. **Fill in the sale details**:
   - **Product Name**: e.g., "iPhone 15 Pro"
   - **Category**: Select from dropdown
   - **Sale Amount**: Total sale value in dollars
   - **Quantity**: Number of units sold
   - **Sale Date & Time**: When the sale occurred
   - **Customer Name**: (Optional)
3. **Click "Save Sale"**
4. Dashboard will automatically refresh with new data

### Viewing Analytics

The dashboard displays:

#### 📊 Metrics Cards
- **Total Revenue**: Sum of all sales
- **Total Sales**: Number of transactions
- **Top Product**: Best-selling product by amount
- **Best Month**: Month with highest revenue
- **Peak Hour**: Time of day with most sales
- **Highest Sale**: Single largest transaction

#### 📈 Charts
1. **Top 5 Selling Products**: Bar chart showing quantity sold
2. **Bottom 5 Products**: Products needing attention
3. **Monthly Sales Trend**: Line chart of revenue over time
4. **Sales by Category**: Doughnut chart of category distribution
5. **Sales by Hour**: Bar chart showing peak sales times

#### 📋 Sales Table
- View all sales transactions
- Delete individual sales
- Sorted by most recent first

### Managing Data

- **Refresh Data**: Click "🔄 Refresh" button
- **Delete Sale**: Click "🗑️ Delete" next to any sale
- **Logout**: Click "🚪 Logout" in header

---

## 🔌 API Documentation

### Base URL
```
http://localhost:8080/api
Endpoints
1. Register User
httpPOST /api/register
Content-Type: application/x-www-form-urlencoded

username=john&password=mypass123&fullName=John Doe&businessName=John's Store
Response:
json{
  "success": true,
  "message": "Registration successful",
  "user": {
    "username": "john",
    "fullName": "John Doe",
    "businessName": "John's Store"
  }
}
2. Login
httpPOST /api/login
Content-Type: application/x-www-form-urlencoded

username=john&password=mypass123
Response:
json{
  "success": true,
  "message": "Login successful",
  "user": {
    "username": "john",
    "fullName": "John Doe",
    "businessName": "John's Store"
  }
}
3. Add Sale
httpPOST /api/add-sale
Content-Type: application/x-www-form-urlencoded

username=john&productName=iPhone 15&category=Electronics&saleAmount=999.99&quantity=1&saleDate=2024-02-08 14:30:00&customerName=Alice
4. Get User Sales
httpGET /api/sales?username=john
Response:
json[
  {
    "id": 1,
    "productName": "iPhone 15",
    "category": "Electronics",
    "saleAmount": 999.99,
    "quantity": 1,
    "saleDate": "2024-02-08 14:30:00",
    "customerName": "Alice"
  }
]
5. Get Analytics
httpGET /api/analytics?username=john
Response:
json{
  "summary": {
    "totalRevenue": 5000.00,
    "totalSales": 15,
    "maxSaleAmount": 999.99,
    "maxSaleProduct": "iPhone 15",
    "maxSaleMonth": "FEBRUARY 2024",
    "peakSalesHour": 14
  },
  "topProducts": {
    "iPhone 15": 5,
    "MacBook Pro": 3
  },
  "leastProducts": { ... },
  "monthlySales": { ... },
  "categorySales": { ... },
  "hourlySales": { ... }
}
6. Delete Sale
httpPOST /api/delete-sale
Content-Type: application/x-www-form-urlencoded

username=john&saleId=1
```

---

## 🗂️ Data Storage Format

### users.txt
```
username|passwordHash|fullName|businessName
john|aGFzaGVkcGFzc3dvcmQ=|John Doe|John's Store
alice|aGFzaGVkcGFzc3dvcmQy|Alice Smith|Alice Electronics
```

### sales_[username].txt
```
id,productName,category,saleAmount,quantity,saleDate,customerName
1,iPhone 15,Electronics,999.99,1,2024-02-08 14:30:00,Alice
2,MacBook Pro,Electronics,2499.00,1,2024-02-08 15:45:00,Bob

🐛 Troubleshooting
Common Issues
1. "javac: Command not found"
Problem: Java is not installed or not in PATH
Solution:

Install JDK (see Prerequisites section)
Add Java to system PATH
Restart terminal/command prompt
Verify with: javac -version

2. Backend server won't start
Problem: Port 8080 already in use
Solution:
bash# Option 1: Kill process using port 8080
# Windows
netstat -ano | findstr :8080
taskkill /PID <process_id> /F

# macOS/Linux
lsof -ti:8080 | xargs kill -9

# Option 2: Change port in Main.java
private static final int PORT = 8081; // Change to different port
3. "Failed to connect to server"
Problem: Backend is not running or CORS issue
Solution:

Ensure backend is running (java Main)
Check console for error messages
Verify API URL in frontend JavaScript matches backend port

4. Login/Register not working
Problem: Data folder doesn't exist
Solution:

Backend creates data/ folder automatically
If it fails, manually create the folder in project root
Ensure write permissions

5. Charts not displaying
Problem: Chart.js not loading
Solution:

Check internet connection (Chart.js loads from CDN)
Open browser console (F12) to check for errors
Ensure proper HTML structure

6. Data not persisting
Problem: Files not being written
Solution:

Check folder permissions
Ensure data/ folder exists
Look for error messages in backend console


🔒 Security Considerations
Current Implementation

✅ Password hashing using SHA-256
✅ Input validation on frontend and backend
✅ CORS headers for cross-origin requests

Production Recommendations

⚠️ Use HTTPS instead of HTTP
⚠️ Implement proper session management (JWT tokens)
⚠️ Use database instead of file storage (MySQL, PostgreSQL)
⚠️ Add rate limiting to prevent brute force attacks
⚠️ Implement password complexity requirements
⚠️ Add SQL injection protection (if moving to database)
⚠️ Encrypt sensitive data at rest

Note: This is an educational project. For production use, implement proper security measures.

🎓 Academic Use
Project Suitable For:

Data Structures and Algorithms (DSA) course projects
Web Development assignments
Database Management projects
Software Engineering coursework
Final year projects

Key Concepts Demonstrated:

Algorithms:

Sorting (O(n log n))
Grouping/Hashing (O(n))
Priority Queue (O(n log k))
Stream processing


Data Structures:

HashMap
ArrayList
PriorityQueue
File I/O


Software Engineering:

REST API design
MVC architecture
Separation of concerns
Error handling
Input validation


Web Development:

Frontend-backend communication
Asynchronous JavaScript
DOM manipulation
Responsive design



Viva Questions & Answers
Q: What algorithm did you use for finding top-selling products?
A: I used a min-heap (PriorityQueue) which maintains the top K elements efficiently in O(n log k) time complexity.
Q: How do you ensure data persistence?
A: I implemented a file-based database using text files. Each user has their own sales file, and user credentials are stored in a separate file with hashed passwords.
Q: What is the time complexity of your analytics calculations?
A: Most analytics operations are O(n) where n is the number of sales, as they involve single-pass aggregations using HashMaps.
Q: How did you implement authentication?
A: Using SHA-256 hashing for passwords stored in users.txt, with session management via localStorage on the frontend.
Q: What design pattern did you use?
A: MVC (Model-View-Controller) - Models (User, Product), Controller (Resource), and Views (HTML files).

🚀 Future Enhancements
Potential Features

 Export data to CSV/Excel
 PDF report generation
 Email notifications for low-stock products
 Multi-currency support
 Product inventory management
 Sales forecasting using ML
 Mobile app version
 Real-time collaboration
 Advanced filtering and search
 Custom date range selection
 Comparison between time periods
 Role-based access control (admin/user)

Technical Improvements

 Migrate to MySQL/PostgreSQL database
 Implement JWT authentication
 Add unit tests
 Use Spring Boot framework
 Add Redis for caching
 Implement WebSocket for real-time updates
 Docker containerization
 CI/CD pipeline


📄 License
This project is created for educational purposes. Feel free to use, modify, and distribute for academic and learning purposes.

👥 Contributors

Your Name - Full Stack Developer
Project created as part of [Your College/University] coursework


📞 Support
For issues, questions, or suggestions:

Create an issue in the repository
Email: your.email@example.com
Documentation: [Project Wiki/Docs]


🙏 Acknowledgments

Chart.js - For beautiful data visualizations
Java Community - For excellent documentation
MDN Web Docs - For web development resources
Stack Overflow - For community support


📚 References

Java Documentation: https://docs.oracle.com/en/java/
Chart.js Documentation: https://www.chartjs.org/docs/
RESTful API Design: https://restfulapi.net/
Web Security Best Practices: https://owasp.org/
