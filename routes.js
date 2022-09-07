const { Router } = require('express');
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const routes = Router();

const AuthMiddleware = require('./middleware/auth.js');
const User = require('./models/User');

//Rotas para controle e autenticação de usuários
//Rota de cadastro de usuário
routes.post('/signup', UserController.signup);

//Rota para realizar autenticação de um usuário
routes.post('/login', AuthController.login);

//Rota para recuperar informações do usuário
routes.get('/user', AuthMiddleware, UserController.recUser);

//Rota para registrar recorde
routes.post('/record', AuthMiddleware, UserController.saveRecord);

//Rota para visualizar placar de livros
routes.get('/leaderboard', AuthMiddleware, UserController.leaderboard);

//Rotas para testar disponibilidade cadastro
routes.post('/test/l', UserController.testLogin)

module.exports = routes;