

const Transactions = require("../models/transactionModel")
const User = require("../models/user")

const createTransaction = async (req, res) => {
  try {
    const { amount, transaction_type, user } = req.body;

    if (!amount || !transaction_type || !user) {
      return res.status(400).json({
        success: false,
        message: "amount, transaction_type, and user are required.",
      });
    }

    if (!["DEPOSIT", "WITHDRAWAL"].includes(transaction_type)) {
      return res.status(400).json({
        success: false,
        message: "transaction_type must be either 'DEPOSIT' or 'WITHDRAWAL'.",
      });
    }

    const transaction = new Transactions({
      amount,
      transaction_type,
      user,
      status: "PENDING",
    });

    const savedTransaction = await transaction.save();

    await User.findByIdAndUpdate(
        user, 
        { 
           $push: { transactions: savedTransaction._id } 
      });

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully.",
      data: savedTransaction,
    });
  } catch (err) {
    console.error("Error creating transaction:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};


const getAllTransactions = async (req, res) => {
  try {
    const { user_id } = req.query; 


    if (!user_id) {
      return res.status(400).json({ message: "user_id is required." });
    }


    const transactions = await Transactions.find({ user: user_id }).select(
      "amount transaction_type status timestamp"
    );

    if (!transactions || transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found for this user." });
    }


    return res.status(200).json({
      success: true,
      message: "Retrieved all transactions for the user.",
      transactions: transactions,
    });
  } catch (err) {
    console.error("Error fetching transactions:", err.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong...! Please try again.",
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { transaction_id } = req.params; 
    console.log(transaction_id,"iddd")
    const { status } = req.body; 
    console.log(status,"status")


    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required.",
      });
    }

    if (!["COMPLETED", "FAILED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either 'COMPLETED' or 'FAILED'.",
      });
    }

    const updatedTransaction = await Transactions.findByIdAndUpdate(
      transaction_id,
      { status }, 
      { new: true, runValidators: true }

    ).select("-user");

    if (!updatedTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transaction updated successfully.",
      data: updatedTransaction,
    });
  } catch (err) {
    console.error("Error updating transaction:", err.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong...! Please try again.",
    });
  }
};


const getSpecificTransaction = async(req,res)=>{
     try{
      const { transaction_id } = req.params;   
      const transaction = await Transactions.findById(transaction_id).select(
                    "amount transaction_type status timestamp" );    
       if (!transaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }   
    
     return res.status(200).json({
          success:true,
          data:transaction          
      })   

     }catch(err){
         console.log(err)
         res.status(500).json({
             success:false,
             message:"Something went wrong...!please try again"       
         })           
     }
}

module.exports = {createTransaction,getAllTransactions,updateTransaction,getSpecificTransaction}