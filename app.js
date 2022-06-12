/* Componente responsável por estabelecer as rotas e servir arquivos
estáticos do React no ambiente de produção. */

// Importações
const path = require('path');
const express = require('express');

// Importações (arquivos locais)
const iesRoute = require("./api/ies");
const dbo = require('./db-connection');

// Inicialização
const app = express();

// Especifica o caminho dos arquivos estáticos do front end
app.use(express.static(path.join(__dirname, 'build')));

// Configurações de porta e parsing
app.set('port', process.env.PORT || 5000);
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// Rotas da aplicação
app.use("/api/ies", iesRoute);

/* Handler para quando as rotas acima não suportarem uma requisição;
redirecionar para o front end. */
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Conectar ao BD
const connectToDB = async () => {
	await dbo.connectToServer(function (err) {
  		if (err) {
    		console.error(err);
    		process.exit();
  		}
	});
}

// Encerrar conexão com o BD
const closeDb = async () => {
	await dbo.closeDb();
}

module.exports = { app, connectToDB, closeDb };