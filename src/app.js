import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


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


export default app;