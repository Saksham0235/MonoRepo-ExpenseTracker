# Expense Tracker Backend

A RESTful API built with Express.js and SQLite for managing personal expenses.

## Features

* Create a new expense
* Fetch all expenses
* Update an existing expense
* Delete an expense
* SQLite database using better-sqlite3
* CORS support
* Centralized error handling

## Tech Stack

* Node.js
* Express.js
* SQLite
* better-sqlite3

## Project Structure

```text
src/
├── controllers/
├── routes/
├── services/
├── database/
└── index.js
```

## Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

4. Start production server

```bash
npm start
```

## API Endpoints

### Get All Expenses

```http
GET /api/expenses
```

### Add Expense

```http
POST /api/expenses
```

Request Body:

```json
{
  "amount": 500,
  "category": "Food",
  "date": "2026-06-05",
  "note": "Lunch"
}
```

### Update Expense

```http
PUT /api/expenses/:id
```

### Delete Expense

```http
DELETE /api/expenses/:id
```

## Environment Variables

Create a `.env` file:

```env
PORT=8080
ALLOWED_ORIGIN=http://localhost:3000
```

## Deployment

Backend is deployed on Render.

## Future Improvements

* User Authentication
* Expense Categories Management
* Monthly Reports
* Export to CSV/PDF
* PostgreSQL Migration

```
```
