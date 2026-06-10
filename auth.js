const jwt = require("jsonwebtoken");

const SECRET = "supersegredo123"; // depois mudamos para .env

function gerarToken(user) {
    return jwt.sign(user, SECRET, { expiresIn: "2h" });
}

function verificarToken(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ error: "Sem token" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Token inválido" });
    }
}

module.exports = { gerarToken, verificarToken };