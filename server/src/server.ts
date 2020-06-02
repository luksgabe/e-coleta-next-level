import express from 'express';

const app = express();
const PORT = 3333;

app.get('/users', (request, response) => {
    const users = [
        { name: 'Lucas Gabriel', dev: 'back-end' },
        { name: 'Rafael Epifanio', dev: 'back-end' },
        { name: 'Caio teste', dev: 'front-end' },
    ]
    response.json(users);
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});