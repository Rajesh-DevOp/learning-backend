import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/dbConnection.js";

// ✅ dotenv config
dotenv.config({ path: "./.env" });

const app = express();

// ✅ DB connection
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });

//DB connection
// ;(async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         console.log("Connected to MongoDB");

//         app.on("error", (error) => {
//             console.error("Express error:", error);
//             throw error;
//         });

//         app.listen(process.env.PORT, ()=>{
//             console.log(`Server is running on port ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         throw error;
//     }

// })()
