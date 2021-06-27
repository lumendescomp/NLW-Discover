//1- Para podermos criar nossas rotas é necessário importar o express.
const express = require('express');
//6-Nosso controller é quem se comunica com  o banco de dados para registrar as alterações de informação. 
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')
//2-É necessário informar quem é o route... ou seja, a nossa const route guarda todas as funcionalidades de rotas que o express tem.
const route = express.Router();
//3-Criando nossas rotas e definindo o que deve ser exebido em cada uma delas:
//4-Em duas rotas está sendo renderizada a home que é o layout em comum entre as páginas enter-room e create-pass.. Para diferenciarmos a que deve ser exibida nós passamos para nossa rota a variável{ page: "arquivo a ser exibido" }
route.get('/home', (req, res) => res.render('home', { page: 'enter-room' }));
route.get('/create-pass', (req, res) => res.render('home', { page: 'create-pass' }));
route.post('/enterroom', RoomController.enter);
route.post('/create-room', RoomController.create);
//Vamos pedir para um controller fazer a renderização pra o layout ser dinâmico.
route.get('/room/:room', RoomController.open)
route.get("/room/filter/:room", RoomController.filter);
//7-Logo, nossas rotas que estão conectadas aos formulários estarão associada aos controllers definididos aqui. 
//8-Formato que o formulário de dentro da modal tem que passar informação. Como o código da sala, a pergunta selecionada e ação(marcar como lida ou excluir)
//
route.post('/question/create/:room', QuestionController.create);
route.post('/question/:room/:question/:action', QuestionController.index);
//5-Agora exportamos o route para ser importado no arquivo server.js
module.exports = route;
