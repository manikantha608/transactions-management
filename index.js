const express = require("express")
const app = express()
const dotenv = require("dotenv")
const connectToDB = require("./database/db")
const userRoutes = require("./routes/user-routes")
const transactionsRoutes = require("./routes/transactions-routes")


app.use(express.json())
dotenv.config()

//Database connection
connectToDB()

//Routes
app.use("/",userRoutes);
app.use("/api",transactionsRoutes)

//Running the server
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)              
})