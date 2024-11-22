const User = require("../models/user")
const bcrypt = require("bcryptjs")

const createUser = async(req,res)=>{
   const {name,email,password} = req.body

   try{
   const existingUser = await User.findOne({email})
   if(existingUser){
      return res.status(400).json({
        success:false,
        message:"User already exists with same this email ! please try different email"            
      })              
   }

   const generateSalt = await bcrypt.genSalt(10);
   const hashpassword = await bcrypt.hash(password,generateSalt)

   const newUser = await User.create({
         name,
         email,
         password:hashpassword             
   })

   res.status(201).json({
       success:true,
       message:"User created successfully...!",
       data:newUser             
   })
   }catch(err){
     console.log(err)
     res.status(500).json({
          success:false,
          message:"something went wrong..! Please try again"          
     })
   }
}

const getallUsers = async(req,res)=>{
   try{
      const listOfUsers = await User.find()
      .populate({
        path: "transactions",
        select: "amount transaction_type status timestamp", 
      });
     
     if(!listOfUsers){
         res.status(404).json({
             success:false,
             message:"Users not found"       
         })           
     }

     res.status(200).json({
         success:true,
         message:"Data fetched succesfully",
         data:listOfUsers           
     })

   }catch(err){
      console.log(err)
      res.status(500).json({
         success:false,
         message:"Something went wrong ...! Please try again"           
      })              
   }                 
}

module.exports = {createUser,getallUsers}