// Importações
const path = require('path');
const express = require('express');

// Importações (arquivos locais)
const iesRoute = require("./api/ies");

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

// Escutar a porta especificada para requisições
const server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});