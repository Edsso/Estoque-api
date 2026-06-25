const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
    const { nome } = req.body;

    db.run(
        "INSERT INTO produtos (nome) VALUES (?)",
        [nome],
        function (err) {
            if (err) return res.status(500).send(err);
            res.send({ id: this.lastID, nome });
        }
    );
})

router.get('/', (req, res) => {
    db.all("SELECT * FROM produtos", [], (err, rows) => {
        if (err) return res.status(500).send(err);
        res.send(rows);
    });
});

module.exports = router;