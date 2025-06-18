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


        // Unidades
        await sql`CREATE TABLE IF NOT EXISTS unidades (
            unidade_id SERIAL PRIMARY KEY,
            nome VARCHAR(255) NOT NULL
        )`;

         // Turmas
        await sql`CREATE TABLE IF NOT EXISTS turmas (
            turma_id SERIAL PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            unidade_id INTEGER REFERENCES unidades(unidade_id),
            docente_id INTEGER REFERENCES users(user_id),
            monitor_id INTEGER REFERENCES users(user_id)
        )`;

        // Associação aluno-turma
        await sql`CREATE TABLE IF NOT EXISTS alunos_turmas (
            id SERIAL PRIMARY KEY,
            aluno_id INTEGER REFERENCES users(user_id),
            turma_id INTEGER REFERENCES turmas(turma_id),
            ativo BOOLEAN DEFAULT TRUE
        )`;

         // Calendário de aulas
        await sql`CREATE TABLE IF NOT EXISTS calendario (
            calendario_id SERIAL PRIMARY KEY,
            turma_id INTEGER REFERENCES turmas(turma_id),
            data DATE NOT NULL
        )`;


        // Frequência
        await sql`CREATE TABLE IF NOT EXISTS frequencias (
            frequencia_id SERIAL PRIMARY KEY,
            calendario_id INTEGER REFERENCES calendario(calendario_id),
            aluno_id INTEGER REFERENCES users(user_id),
            presente BOOLEAN NOT NULL
        )`;


                // Conteúdo ministrado
        await sql`CREATE TABLE IF NOT EXISTS conteudos (
            conteudo_id SERIAL PRIMARY KEY,
            calendario_id INTEGER REFERENCES calendario(calendario_id),
            descricao TEXT NOT NULL
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
        const { cpf, name, email, password, role, polo } = req.body;
        if (!cpf || !name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await sql`
            INSERT INTO users (cpf, name, email, password, role, polo)
            VALUES (${cpf}, ${name}, ${email}, ${password}, ${role}, ${polo})
            RETURNING *
        `;
        res.status(201).json(user[0]);
    } catch (error) {
        console.log("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Exemplo de rota para criar unidade (apenas admin)
app.post("/api/unidades", async (req, res) => {
    try {
        const { nome } = req.body;
        if (!nome) {
            return res.status(400).json({ message: "Nome da unidade é obrigatório" });
        }
        const unidade = await sql`
            INSERT INTO unidades (nome)
            VALUES (${nome})
            RETURNING *
        `;
        res.status(201).json(unidade[0]);
    } catch (error) {
        console.log("Error creating unidade:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Exemplo de rota para criar turma (apenas docente)
app.post("/api/turmas", async (req, res) => {
    try {
        const { nome, unidade_id, docente_id, monitor_id } = req.body;
        if (!nome || !unidade_id || !docente_id) {
            return res.status(400).json({ message: "Campos obrigatórios faltando" });
        }
        const turma = await sql`
            INSERT INTO turmas (nome, unidade_id, docente_id, monitor_id)
            VALUES (${nome}, ${unidade_id}, ${docente_id}, ${monitor_id})
            RETURNING *
        `;
        res.status(201).json(turma[0]);
    } catch (error) {
        console.log("Error creating turma:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// --- UNIDADES ---
app.get("/api/unidades", async (req, res) => {
    try {
        const unidades = await sql`SELECT * FROM unidades ORDER BY nome`;
        res.status(200).json(unidades);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar unidades" });
    }
});

// --- TURMAS ---
app.get("/api/turmas", async (req, res) => {
    try {
        const turmas = await sql`SELECT * FROM turmas ORDER BY nome`;
        res.status(200).json(turmas);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar turmas" });
    }
});

// --- ALUNOS_TURMAS (associar/desassociar aluno) ---
app.post("/api/alunos-turmas", async (req, res) => {
    try {
        const { aluno_id, turma_id } = req.body;
        if (!aluno_id || !turma_id) {
            return res.status(400).json({ message: "Campos obrigatórios faltando" });
        }
        const assoc = await sql`
            INSERT INTO alunos_turmas (aluno_id, turma_id)
            VALUES (${aluno_id}, ${turma_id})
            RETURNING *
        `;
        res.status(201).json(assoc[0]);
    } catch (error) {
        res.status(500).json({ message: "Erro ao associar aluno à turma" });
    }
});

app.patch("/api/alunos-turmas/:id/desativar", async (req, res) => {
    try {
        const { id } = req.params;
        const assoc = await sql`
            UPDATE alunos_turmas SET ativo = FALSE WHERE id = ${id} RETURNING *
        `;
        if (assoc.length === 0) {
            return res.status(404).json({ message: "Associação não encontrada" });
        }
        res.status(200).json(assoc[0]);
    } catch (error) {
        res.status(500).json({ message: "Erro ao desassociar aluno da turma" });
    }
});

// --- CALENDÁRIO ---
app.post("/api/calendario", async (req, res) => {
    try {
        const { turma_id, data } = req.body;
        if (!turma_id || !data) {
            return res.status(400).json({ message: "Campos obrigatórios faltando" });
        }
        const calendario = await sql`
            INSERT INTO calendario (turma_id, data)
            VALUES (${turma_id}, ${data})
            RETURNING *
        `;
        res.status(201).json(calendario[0]);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar dia de calendário" });
    }
});

app.get("/api/calendario/:turma_id", async (req, res) => {
    try {
        const { turma_id } = req.params;
        const dias = await sql`
            SELECT * FROM calendario WHERE turma_id = ${turma_id} ORDER BY data
        `;
        res.status(200).json(dias);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar calendário da turma" });
    }
});


// --- FREQUÊNCIA ---
app.post("/api/frequencias", async (req, res) => {
    try {
        const { calendario_id, aluno_id, presente } = req.body;
        if (!calendario_id || !aluno_id || presente === undefined) {
            return res.status(400).json({ message: "Campos obrigatórios faltando" });
        }
        const freq = await sql`
            INSERT INTO frequencias (calendario_id, aluno_id, presente)
            VALUES (${calendario_id}, ${aluno_id}, ${presente})
            RETURNING *
        `;
        res.status(201).json(freq[0]);
    } catch (error) {
        res.status(500).json({ message: "Erro ao lançar frequência" });
    }
});

app.get("/api/frequencias/:calendario_id", async (req, res) => {
    try {
        const { calendario_id } = req.params;
        const freq = await sql`
            SELECT * FROM frequencias WHERE calendario_id = ${calendario_id}
        `;
        res.status(200).json(freq);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar frequência" });
    }
});

// --- CONTEÚDO ---
app.post("/api/conteudos", async (req, res) => {
    try {
        const { calendario_id, descricao } = req.body;
        if (!calendario_id || !descricao) {
            return res.status(400).json({ message: "Campos obrigatórios faltando" });
        }
        const conteudo = await sql`
            INSERT INTO conteudos (calendario_id, descricao)
            VALUES (${calendario_id}, ${descricao})
            RETURNING *
        `;
        res.status(201).json(conteudo[0]);
    } catch (error) {
        res.status(500).json({ message: "Erro ao lançar conteúdo" });
    }
});

app.get("/api/conteudos/:calendario_id", async (req, res) => {
    try {
        const { calendario_id } = req.params;
        const conteudos = await sql`
            SELECT * FROM conteudos WHERE calendario_id = ${calendario_id}
        `;
        res.status(200).json(conteudos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar conteúdos" });
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