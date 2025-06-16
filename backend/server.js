// const express = require ('express')
import express from "express";
import dotenv from "dotenv";
import {sql} from "./config/db.js";

dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());  

// Our custom simple middleware 
// app.use((req,res,next) => {
//    console.log("Hey, we hit a req, the method is",req.method)
//    next()
//})

const PORT = process.env.PORT || 5001;

async function initDB() {
    try {
        await sql `CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;

        //DECIMAL (10,2)
        //Means: a fixed-point number with:
        // 10 digits in total 
        // 2 digits after the decimal point
        // so: the max value is 99999999.99 (8 digits, before the decimal point, and 2 digits after)

        console.log("Database initialize successfully");
    } catch (error) {
        console.log("Error initializing database:", error);
        process.exit(1); // status code 1 means failure,  0 success
    }
}

app.get("/", (req, res) => {
    res.send("It's working");
})

//connectDB(process.env.DATABASE_URL)

//app.get("/",(req,res) => {
//    res.send("It's working")
//});

app.post("/api/transactions", async (req, res) => { 
 //title, amount, category, user_id
    try {
        const {title, amount, category, user_id} = req.body;
    
        if(!title || !user_id || !category || amount == undefined ) {
            return res.status(400).json({message: "All fields are required"})
        }

        const transaction = await sql`
          INSERT INTO transactions (user_id, title, amount, category)
          VALUES (${user_id}, ${title}, ${amount}, ${category})
          RETURNING * 
          
        `
        console.log(transaction);
        res.status(201).json(transaction[0]);


    } catch (error) {
        console.log("Error creating the transaction:", error)
        res.status(500).json({message:"internal server error "}) 

    }
});

//app.listen(PORT, () => {
//    console.log("Server is running on PORT:", PORT );
//});

initDB().then (()=>{
    app.listen(PORT, () => {
        console.log("Server is running on PORT:", PORT);
    });
});