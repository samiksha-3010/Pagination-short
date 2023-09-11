import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors"
import { Login, Register, getCurrentUser } from "./Controolers/userControolers.js";
import { AddProduct, allProduct, getYourProducts } from "./Controolers/productControolers.js";
import { cheackSeller } from "./Meedleware/AllMeedlware.js";


const app = express();
app.use(express.json());
app.use(cors())
app.use(morgan("dev"))
dotenv.config();


app.get("/",(req,res) => {
  res.send("working Pagination Short..")
})

app.post("/register",Register)
app.post("/login",Login)
app.post ("get-current-user",getCurrentUser)
app.post ("add-product", cheackSeller,AddProduct)
app.post ("/get-product",allProduct)
app.post ("/get-your-products",getYourProducts)
mongoose.connect(process.env.Mongo_URL).then(() =>{
    console.log("connected to DB..")
})



app.listen(8000, () =>{
    console.log("Listening on port 8000")
})