const express = require("express")
const cors = require("cors")
const expensesRouter = require("./routes/expenseRoutes");

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    process.env.ALLOWED_ORIGIN 
  ];
  
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
    })
  );
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
