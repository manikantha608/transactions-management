const mongoose = require("mongoose");

const connectToDB = async () => {
   try {
       if (!process.env.MONGO_URI) {
           console.error("MONGO_URI environment variable is not defined.");
       }

       await mongoose.connect(process.env.MONGO_URI);

       console.log("Database is connected successfully....!");
   } catch (err) {
       console.error("Error connecting to the database:", err.message);
   }
};


module.exports = connectToDB;
