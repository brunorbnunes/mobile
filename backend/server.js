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
     // Usuários (Admin, Docente, Monitor, Aluno)
        await sql`CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            cpf VARCHAR(11) UNIQUE NOT NULL,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(20) NOT NULL, -- 'admin', 'docente', 'monitor', 'aluno'
            polo VARCHAR(255),
            active BOOLEAN DEFAULT TRUE,
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

// Get all users
app.get("/api/users", async (req, res) => {
    try {
        const users = await sql`SELECT * FROM users ORDER BY created_at DESC`;
        res.status(200).json(users);
    } catch (error) {
        console.log("Error getting users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Get a user by CPF
app.get("/api/users/:cpf", async (req, res) => {
    try {
        const { cpf } = req.params;
        const user = await sql`SELECT * FROM users WHERE cpf = ${cpf}`;
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user[0]);
    } catch (error) {
        console.log("Error getting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Create a new user
app.post("/api/users", async (req, res) => {
    try {
        const { cpf, name, email, password } = req.body;
        if (!cpf || !name || !email || !polo || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await sql`
            INSERT INTO users (cpf, name, email, polo, password)
            VALUES (${cpf}, ${name}, ${email}, ${polo}, ${password})
            RETURNING *
        `;
        res.status(201).json(user[0]);
    } catch (error) {
        console.log("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete a user by CPF
app.delete("/api/users/:cpf", async (req, res) => {
    try {
        const { cpf } = req.params;
        const result = await sql`
            DELETE FROM users WHERE cpf = ${cpf} RETURNING *
        `;
        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(result[0]);
    } catch (error) {
        console.log("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
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