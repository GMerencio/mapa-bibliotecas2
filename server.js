/* Ponto inicial da aplicação que escuta a porta especificada
para requisições. */

const { app, connectToDB } = require('./app');

connectToDB();
const server = app.listen(app.get('port'), () => {
	console.log(`Servidor rodando na porta: ${server.address().port}`)
});