const db = require("../db/database")

const getStmt = db.prepare("SELECT * FROM expenses ORDER BY date DESC");
const insertStmt = db.prepare("INSERT INTO expenses (amount,category,date,note) VALUES(?,?,?,?)");
const updateStmt = db.prepare("UPDATE expenses SET amount=?,category=?,date=?,note=? WHERE id=?");
const deleteStmt = db.prepare("DELETE FROM expenses WHERE id=?");

exports.getExpenses = (_req, res, next) => {
    try {
        const expenses = getStmt.all();
        res.json(expenses);
    } catch (err) {
        next(err);
    }
};

exports.addExpense = (req, res, next) => {
    try {
        const { amount, category, date, note } = req.body;

        if (!amount || !category || !date) {
            return res.status(400).json({ error: "amount, category, and date are required" });
        }
        if (isNaN(Number(amount))) {
            return res.status(400).json({ error: "amount must be a number" });
        }

        const result = insertStmt.run(amount, category, date, note);
        res.status(201).json({
            id: result.lastInsertRowid,
            amount: Number(amount),
            category,
            date,
            note
        });
    } catch (err) {
        next(err);
    }
};

exports.updateExpense = (req, res, next) => {
    try {
        const { id } = req.params;
        const { amount, category, date, note } = req.body;

        if (!amount || !category || !date) {
            return res.status(400).json({ error: "amount, category, and date are required" });
        }
        if (isNaN(Number(amount))) {
            return res.status(400).json({ error: "amount must be a number" });
        }

        const result = updateStmt.run(amount, category, date, note, id);
        if (result.changes === 0) {
            return res.status(404).json({ error: "Expense not found" });
        }

        res.json({
            message: "Expense updated successfully",
            id: Number(id),
            amount: Number(amount),
            category,
            date,
            note
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteExpense = (req, res, next) => {
    try {
        const { id } = req.params;
        const result = deleteStmt.run(id);

        if (result.changes === 0) {
            return res.status(404).json({ error: "Expense not found" });
        }

        res.json({ message: "Deleted" });
    } catch (err) {
        next(err);
    }
};
