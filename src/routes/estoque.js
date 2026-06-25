const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/entrada', (req, res) => {
    const { produto_id, quantidade } = req.body;

    db.run(
        'UPDATE produtos SET quantidade = quantidade + ? WHERE id = ?',
        [quantidade, produto_id],
        function (err) {
            if (err) return res.status(500).send(err);

            db.run(
                'INSERT INTO movimentacoes (produto_id, tipo, quantidade) VALUES (?, "entrada", ?)',
                [produto_id, quantidade]
            );

            res.send('Entrada registrada');
        }
    );
});

router.post('/saida', (req, res) => {
    const { produto_id, quantidade } = req.body;

    db.get(
        'SELECT quantidade FROM produtos WHERE id = ?',
        [produto_id],
        (err, produto) => {
            if (err) return res.status(500).send(err);

            if (produto.quantidade < quantidade) {
                return res.status(400).send('Estoque insuficiente');
            }

            db.run(
                'UPDATE produtos SET quantidade = quantidade - ? WHERE id = ?',
                [quantidade, produto_id]
            );

            db.run(
                'INSERT INTO movimentacoes (produto_id, tipo, quantidade) VALUES (?, "saida", ?)',
                [produto_id, quantidade]
            );

            res.send('Saída registrada');
        }
    );
});

module.exports = router;