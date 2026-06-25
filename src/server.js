const express = require('express');
const app = express();

const produtosRoutes = require('./routes/produtos');
const estoqueRoutes = require('./routes/estoque');

app.use(express.json());

app.use('/produtos', produtosRoutes);
app.use('/estoque', estoqueRoutes);

// app.get('/', (req, res) => {
//     res.send('API de Estoque Funcionando');
// });

app.listen(3000, () => {
    console.log('Server rodando na porta 3000');
});