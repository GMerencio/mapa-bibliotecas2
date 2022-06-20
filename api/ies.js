/* Lida com requisições de leitura e modificações de IES. */

const express = require("express");

const dbo = require('../db-connection');

let iesRoute = express();
    
/* Endpoint api/ies/{cod} (GET): Retorna, em JSON, o registro referente
ao código único da instituição. */
iesRoute.route("/:cod")
    .get((req, res) => {
    	const cod_no = parseInt(req.params.cod);
    	res.setHeader('Content-Type', 'application/json');
    	
    	const dbConnect = dbo.getDb();
    	
    	dbConnect
    		.findOne({CO_IES: cod_no}, function (err, result) {
      			if (err) {
        			res.status(400).send('Erro ao tentar obter registro');
      			} else {
        			res.json(result);
      			}
    		});
    });

/* Endpoint api/ies/estados/{co_estado} (GET): Retorna, em JSON,
os registros das IES situadas estado correspondente ao código 
especificado. */
iesRoute.route("/estados/:co_estado")
    .get((req, res) => {
    	const co_estado = req.params.co_estado;
    	res.setHeader('Content-Type', 'application/json');
    	
    	const dbConnect = dbo.getDb();
    	
    	dbConnect
    		.find({CO_UF_IES: co_estado})
    		.toArray(function (err, result) {
      			if (err) {
        			res.status(400).send('Erro ao tentar obter registros');
      			} else {
        			res.json(result);
      			}
    		});
    });
    
/* Endpoint api/ies/municipios/{co_municipio} (GET): Retorna, em JSON,
os registros das IES situadas no município correspondente ao código
especificado. */
iesRoute.route("/municipios/:co_municipio")
    .get((req, res) => {
    	const co_municipio = req.params.co_municipio;
    	res.setHeader('Content-Type', 'application/json');
    	
    	const dbConnect = dbo.getDb();
    	
    	dbConnect
    		.find({CO_MUNICIPIO_IES: co_municipio})
    		.toArray(function (err, result) {
      			if (err) {
        			res.status(400).send('Erro ao tentar obter registros');
      			} else {
        			res.json(result);
      			}
    		});
    });

/* Endpoint api/ies (POST): Retorna, em JSON, os registros das IES
correspondentes aos filtros de busca especificados no corpo 
da requisição. */
iesRoute.route("/")
	.post((req, res) => {
		const query = req.body;
		const dbConnect = dbo.getDb();
    	
    	dbConnect
    		.find(query)
    		.toArray(function (err, result) {
      			if (err) {
        			res.status(400).send('Erro ao tentar obter registros');
      			} else {
        			res.json(result);
      			}
    		});
	});

/* Endpoint api/ies/qtd-ies (POST): Retorna, em JSON, a quantidade
de IES correspondentes aos filtros de busca especificados no corpo 
da requisição. O objeto de resposta tem a forma {qtd: <número>}. */
iesRoute.route("/qtd-ies")
	.post((req, res) => {
		const query = req.body;
		const dbConnect = dbo.getDb();
    	
    	dbConnect
    		.countDocuments(query, function (err, result) {
      			if (err) {
        			res.status(400).send('Erro ao tentar obter registros');
      			} else {
        			res.json({'qtd': result});
      			}
    		});
	});

module.exports = iesRoute;