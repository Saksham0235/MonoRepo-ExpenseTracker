# 💰 Expense Tracker (Full Stack Application)

A full-stack expense tracking application built to help users manage personal finances efficiently. Users can add, update, delete, and analyze expenses with category-based breakdowns and visual analytics.

---

## 🚀 Live Demo

- **Frontend:** https://expense-tracker-two-dun.vercel.app/
- **Backend API:** https://expense-tracker-backend-dv1a.onrender.com/api/expenses

---

## 🧰 Tech Stack

### Frontend
- React.js
- Context API (State Management)
- Axios
- Chart.js (Data Visualization)

### Backend
- Node.js
- Express.js
- SQLite (better-sqlite3)
- REST API Architecture

---

## 📦 Features

- Add new expenses
- Update existing expenses
- Delete expenses
- Fetch all expenses
- Category-wise expense tracking
- Interactive charts & analytics dashboard
- Persistent data storage using SQLite

---

## API Documentation

### GET /api/expenses

**Response**
```json
[
  {
    "id": 1,
    "title": "Food",
    "amount": 200,
    "category": "Food",
    "date": "2026-06-05"
  }
]
```

### POST /api/expenses

**Request Body**
```json
{
  "title": "Movie",
  "amount": 300,
  "category": "Entertainment"
}
```
Response
```json
{
  "message": "Expense added successfully",
  "id": 5
}
```
### PUT /api/expenses/:id

Updates an expense.

### DELETE /api/expenses/:id

Deletes an expense by ID.

---


## Project Structure

expense-tracker
├── client # React Frontend
│ ├── src
│ ├── components
│ ├── context
│ └── pages
├── server # Node + Express Backend
│ ├── db # SQLite database setup
│ ├── routes # API routes
│ ├── controllers # Request handlers
│ ├── services 
│ └── index.js
└── README.md


## Run Locally

### 1. Clone Repository
```terminal
git clone <your-repo-url>
cd expense-tracker
```

2. Backend Setup
cd server
npm install
npm run dev

Backend will run on:

http://localhost:5000
3. Frontend Setup
cd client
npm install
npm start

Frontend will run on:

http://localhost:3000



## Next Steps

Future Improvements
 User Authentication (JWT / OAuth)
Allow users to securely log in and maintain personal expense data.

 Multi-user Support
Separate expense data for each user with proper isolation.

 Budget Planning System
Let users set monthly budgets and track spending against them in real time.

Advanced Financial Insights
Provide smarter analytics like:
Spending patterns over time
Category-wise overspending alerts
Savings suggestions based on behavior
Smart Recommendations Engine
Suggest where users can reduce spending based on historical data (e.g., “You spend 30% more on food this month”).
Monthly & Weekly Reports
Auto-generated summaries showing:
Total income vs expenses
Remaining balance
Top spending categories

Dark Mode UI
Improve user experience with theme switching.

📈 Goal-based Savings Tracker
Let users set financial goals and track progress toward them.






##  Author

Saksham Sharma  
Frontend-Focussed Full-stack Developer | React | Node.js