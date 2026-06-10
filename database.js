const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./portfolio.db", (err) => {
    if (err) {
        console.error("Erro ao abrir BD:", err.message);
    } else {
        console.log("SQLite ligado com sucesso!");
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS projetos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            descricao TEXT NOT NULL
        )
    `);
});

module.exports = db;