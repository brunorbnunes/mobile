app.post("/api/login", async (req, res) => {
    try {
        const { email, senha } = req.body;
        console.log("Tentativa de login:", { email, senha }); // LOG
        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são obrigatórios" });
        }
        const users = await sql`SELECT * FROM users WHERE email = ${email}`;
        console.log("Usuários encontrados:", users); // LOG
        if (users.length === 0) {
            return res.status(401).json({ message: "Usuário ou senha inválidos" });
        }
        const user = users[0];
        if (user.password !== senha) {
            console.log("Senha incorreta:", user.password, senha); // LOG
            return res.status(401).json({ message: "Usuário ou senha inválidos" });
        }
        res.status(200).json({
            id: user.user_id,
            nome: user.name,
            role: user.role,
            email: user.email,
            polo: user.polo
        });
    } catch (error) {
        console.log("Erro no login:", error); // LOG
        res.status(500).json({ message: "Erro ao fazer login" });
    }
});