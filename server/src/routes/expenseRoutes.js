import express from "express";

const router=express.Router();

import  {
    getExpenses,
    addExpense,
    updateExpense,
    deleteExpense
} from "../controllers/expenseController.js";


router.get("/",getExpenses);
router.post("/",addExpense);
router.put("/:id",updateExpense);
router.delete("/:id",deleteExpense);

export default router;