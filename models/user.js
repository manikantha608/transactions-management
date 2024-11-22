const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true             
     },
     email:{
        type:String,
        required:true,
        unique:true            
     },
     password:{
        type:String,
        required:true,            
     },
     transactions:[
       {
         type:mongoose.Schema.Types.ObjectId,
         ref:"Transaction"           
       }           
     ]               
})

const User = mongoose.model("User",UserSchema);
module.exports = User;