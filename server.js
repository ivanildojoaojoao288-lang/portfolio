const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./database");

const app = express();
const bcrypt = require("bcryptjs");
const { gerarToken, verificarToken } = require("./auth");

app.use(cors());
app.use(bodyParser.json());

/* =========================
   PROJETOS
========================= */

/* LISTAR */
app.get("/api/projetos", (req, res) => {
    db.all("SELECT * FROM projetos", [], (err, rows) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(rows);
    });
});

/* ADICIONAR */
app.post("/api/projetos", (req, res) => {
    const { nome, descricao } = req.body;

    db.run(
        "INSERT INTO projetos (nome, descricao) VALUES (?, ?)",
        [nome, descricao],
        function (err) {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                id: this.lastID,
                nome,
                descricao
            });
        }
    );
});

/* ATUALIZAR */
app.put("/api/projetos/:id", (req, res) => {
    const { nome, descricao } = req.body;

    db.run(
        "UPDATE projetos SET nome = ?, descricao = ? WHERE id = ?",
        [nome, descricao, req.params.id],
        function (err) {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Projeto atualizado com sucesso!"
            });
        }
    );
});

/* CONTACTO */
let mensagens = [];

app.post("/api/contacto", (req, res) => {
    mensagens.push(req.body);
    res.json({
        message: "Mensagem enviada com sucesso!"
    });
});

/* SERVIDOR */
app.listen(3000, () => {
    console.log("Servidor a correr em http://localhost:3000");
});