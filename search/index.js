/* Script para gerar arquivo com filtros de busca regionais
(filtros.json). Só precisa ser executado se houver uma mudança na
quantidade de registros de IES no banco de dados. 

Execute o script com o comando 'node index.js'. */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { MongoClient } = require("mongodb");
const fs = require('fs');

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.vnpiw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(MONGODB_URI);

/* Inicializa os filtros a nível regional sem informações do BD. */
function getFilters() {
	let filters = {};
	
	filters['Norte'] = {
		lat: -3.10719,
		long: -60.0261,
		qtd_ies: 0,
		CO_REGIAO_IES: '1',
		estados: {}
	};
	filters['Nordeste'] = {
		lat: -5.08921,
		long: -42.8016,
		qtd_ies: 0,
		CO_REGIAO_IES: '2',
		estados: {}
	};
	filters['Centro-Oeste'] = {
		lat: -15.5989,
		long: -56.0949,
		qtd_ies: 0,
		CO_REGIAO_IES: '5',
		estados: {}
	};
	filters['Sul'] = {
		lat: -27.5969,
		long: -48.5495,
		qtd_ies: 0,
		CO_REGIAO_IES: '4',
		estados: {}
	};
	filters['Sudeste'] = {
		lat: -19.912998,
		long: -43.940933,
		qtd_ies: 0,
		CO_REGIAO_IES: '3',
		estados: {}
	};
	
	return filters;
}

/* Salva o objeto de filros no arquivo filtros.json. */
function saveFilters(filters) {
	const data = JSON.stringify(filters);
	fs.writeFileSync('filtros.json', data);
	console.log("Filtros salvos em arquivo");
}

/* Função principal. Realiza a conexão com o banco de dados e
executa queries. */
async function run(){
	let filters = getFilters();
    try{
        await client.connect();
        console.log("Conectado com sucesso ao BD");
        const database = client.db(process.env.MONGODB_DATABASE);
        const censo2020 = database.collection(process.env.MONGODB_COLLECTION);
        
        filters = getFilters();
        
        for (const regiao in filters) {
        	const query_regiao = { NO_REGIAO_IES: regiao };
        	// Obter a quantidade de IES na região
        	filters[regiao]['qtd_ies'] = await censo2020.countDocuments(query_regiao);
        	
        	// Obter os estados da região
        	const nomes_estados = await censo2020.distinct('NO_UF_IES', query_regiao);
        	
        	// Popular a região com os estados
        	for (const nome_estado of nomes_estados) {
        		const query = { NO_UF_IES: nome_estado };
        		let estado = await censo2020.findOne(query, {
        			projection: {_id: 0, lat: 1, long: 1, CO_UF_IES: 1}
        		});
        		estado['qtd_ies'] = await censo2020.countDocuments(query);
        		estado['municipios'] = {};
        		
        		// Obter os municípios do estado
        		const nomes_municipios = await censo2020.distinct('NO_MUNICIPIO_IES', {
        			NO_UF_IES: nome_estado
        		});
        		
        		// Popular o estado com os municípios
        		for (const nome_municipio of nomes_municipios) {
        			const query_municipio = { NO_MUNICIPIO_IES: nome_municipio };
        			let municipio = await censo2020.findOne(query_municipio, {
        				projection: {_id: 0, lat: 1, long: 1, CO_MUNICIPIO_IES: 1}
        			});
        			municipio['qtd_ies'] = await censo2020.countDocuments(query_municipio);
        			
        			// Adicionar município ao estado
        			estado['municipios'][nome_municipio] = municipio;
        		}
        		
        		// Adicionar estado com seus municípios aos filtros
        		filters[regiao]['estados'][nome_estado] = estado;
        	}
        }
        
        console.log("Populou os filtros com sucesso");
        saveFilters(filters);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);