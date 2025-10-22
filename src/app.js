import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {ApiError} from "./utils/ApiError.js"

const app = express();

// cross origin resource sharing --> cors({ can have object})
app.use(cors());

// to accept json data
app.use(express.json({
    limit : "16kb"
}))

// url se jo data aata hai uske liye kabhi vo %20 ya + aata hai usse acept karne ke ,liye middeleware 
app.use(urlencoded({
    extended:true,
    limit:"16kb"
}))
// to keep static files to the folder
app.use(express.static("public"));
// to read and write cookies /perform crud operation on client side by server
app.use(cookieParser());





//route
import userRouter from "./routes/users.route.js"

app.use("/api/v1/users",userRouter);


// Error handling middleware — must be AFTER all routes
app.use((err, req, res, next) => {
  console.error("Error middleware:", err);

  // Agar ApiError instance hai
  if (err instanceof ApiError) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Something went wrong",
      errors: err.errors || [],
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  // Generic error fallback
  return res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
    errors: [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});


export default app;