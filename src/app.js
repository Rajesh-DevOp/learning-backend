import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

// cross origin resource sharing --> cors({ can have object})
app.use(cors());


app.use(express.json({
    limit : "16kb"
}))

// url se jo data aata hai uske liye kabhi vo %20 ya + aata hai usse acept karne ke ,liye middeleware 
app.use(urlencoded({
    extended:true,
    limit:"16kb"
}))

app.use(express.static("public"));

app.use(cookieParser());




export default app;