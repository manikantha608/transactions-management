const mongoose = require("mongoose");

const TransactionsSchema = new mongoose.Schema(
  {
    amount: {
      type: Number, 
      required: true,
    },
    transaction_type: {
      type: String,
      enum: ["DEPOSIT", "WITHDRAWAL"], 
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now, 
    },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "FAILED"], 
      default: "PENDING", 
    },
  },
);


const Transaction = mongoose.model("Transaction", TransactionsSchema);

module.exports = Transaction;
