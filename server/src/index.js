const express = require("express")
const cors = require("cors")
const expensesRouter = require("./routes/expenseRoutes");

const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

app.use("/api/expenses", expensesRouter);

app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
