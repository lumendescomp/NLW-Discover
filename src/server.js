// 1-Importar o Express
const express = require('express');
// 2-Criar um Server
const server = express();
//3-Agora vamos tentar fazer o Node mostrar a nossa home no Chrome... Pasta view criada e é lá q colocaremos nossos arquivos html. O html não roda no Node e por isso usaremos o módulo EJS! index.html -> index.ejs
//4-O node precisa de rotas para poder funcionar, as rotas são caminhos na URL que nós definimos o que deve ser exibido. Por isso criaremos o arquivo route.js onde colocamos nossas rotas.

//5-O arquivo server.js que está rodando no terminal precisa saber da existência do arquivo route para associar as rotas, por isso vamos importar:
const route = require('./route');
//7-Pronto, o EJS é o responsável por exibir nosso layout, por isso temos que configurar nossa view engine dizendo para o server que ela será o EJS.
server.set('view engine', 'ejs')
//8-Passar o caminho da pasta views para o Express onde temos nosso EJS. 
const path = require('path');
server.set('views', path.join(__dirname, 'views'));
//9-Agora queremos que ele exiba todo o HTML da nossa home! Para isso só precisamos jogar todo nosso conteúdo no nosso arquivo home.ejs!
//10-Informar para o server que estamos usando a pasta public, onde deixaremos todas as nossas imagens, estilos e arquivos.js com as funcionalidades/interações da página. Isso serve para o EJS ler nosso CSS. 
server.use(express.static('public'))
//11-Agora vamos instalar o Nodemon para não precisar ficar resentando sempre nosso terminal. Para isso o comando é npm install nodemon -D ... O -D quer dizer que é uma dependência termporária, que só usaremos enquanto estivermos desenvolvendo o projeto.
//12-Com nossa rota home pronta e funcionando, vamos criar as outras rotas.

//13-Os dados enviados pelo form devem passar por um midware para depois ir para nosso controller!
server.use(express.urlencoded({ extended: true }))
//6-Agora precisamos falar pro server para usar o route!
server.use(route)

// 14-Definir uma porta para o Server, o listen é uma funcionalidade de dentro do Express. Para ser exibido no terminal é necessário passar o caminho para o Node desse arquivo. Comando: node src/server.js Nos scripts é possível criar um "atalho" para o comando. 
//15-Ex: "start": node src/server.js. O Node já está familiarizado com o comando "start" e por isso é possível utilizado com "npm start". Para outros comando é necessário o "npm run comando". 
server.listen(3000, () => console.log('rodando'));