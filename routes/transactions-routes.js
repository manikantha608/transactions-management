const express = require("express")
const { createTransaction, getAllTransactions, updateTransaction, getSpecificTransaction } = require("../controllers/transactionsController")
const router = express.Router()

router.post("/transactions",createTransaction)
router.get("/transactions",getAllTransactions)
router.put("/transactions/:transaction_id",updateTransaction)
router.get("/transactions/:transaction_id",getSpecificTransaction)

module.exports = router;