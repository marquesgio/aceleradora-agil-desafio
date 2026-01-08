const express = require('express');

const app = express();

app.use(express.json());

const productRoutes = require('./routes/products');

app.use('/api/produtos', productRoutes);

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API de Inventário - Bem-vindo!',
        endpoints: {
            criar: 'POST /api/produtos',
            listar: 'GET /api/produtos',
            buscar: 'GET /api/produtos/search?id=... ou ?nome=...',
            atualizar: 'PUT /api/produtos/:id',
            deletar: 'DELETE /api/produtos/:id',
        },
    });
});

module.exports = app;
