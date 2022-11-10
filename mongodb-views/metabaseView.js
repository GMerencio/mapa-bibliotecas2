/* Script que cria uma view para ser utilizada no Metabase, mapeando
atributos categóricos aos seus valores correspondentes (por exemplo,
"Sim"/"Não" em vez de "1"/"0").

Execute o script com o comando 'node metabaseView.js'. */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { MongoClient } = require("mongodb");
const fs = require('fs');

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.vnpiw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(MONGODB_URI);

async function run(){
	try {
		await client.connect();
		console.log("Conectado com sucesso ao BD");
		
		const database = client.db(process.env.MONGODB_DATABASE);
		
		await database.createCollection("metabase-view", {
   			viewOn: process.env.MONGODB_COLLECTION,
   			pipeline: [
  				{
    				'$project': {
      					'_id': true, 
      					'NU_ANO_CENSO': true, 
      					'NO_REGIAO_IES': true, 
      					'CO_REGIAO_IES': true, 
      					'NO_UF_IES': true, 
      					'SG_UF_IES': true, 
      					'CO_UF_IES': true, 
      					'NO_MUNICIPIO_IES': true, 
      					'CO_MUNICIPIO_IES': true, 
      					'IN_CAPITAL_IES': {
        					'$switch': {
          					'branches': [
            					{
              					'case': {
                					'$eq': [
                  					'$IN_CAPITAL_IES', '0'
                					]
              					}, 
              					'then': 'Não'
            					}, {
              					'case': {
                					'$eq': [
                  					'$IN_CAPITAL_IES', '1'
                					]
              					}, 
              					'then': 'Sim'
            					}
          					], 
          					'default': '???'
        					}
      					}, 
      					'NO_MESORREGIAO_IES': true, 
      					'CO_MESORREGIAO_IES': true, 
      					'NO_MICRORREGIAO_IES': true, 
      					'CO_MICRORREGIAO_IES': true, 
      					'TP_ORGANIZACAO_ACADEMICA': {
        					'$switch': {
          					'branches': [
            					{
              					'case': {
                					'$eq': [
                  					'$TP_ORGANIZACAO_ACADEMICA', '1'
                					]
              					}, 
              					'then': 'Universidade'
            					}, {
              					'case': {
                					'$eq': [
                  					'$TP_ORGANIZACAO_ACADEMICA', '2'
                					]
              					}, 
              					'then': 'Centro Universitário'
            					}, {
              					'case': {
                					'$eq': [
                  					'$TP_ORGANIZACAO_ACADEMICA', '3'
                					]
              					}, 
              					'then': 'Faculdade'
            					}, {
              					'case': {
                					'$eq': [
                  					'$TP_ORGANIZACAO_ACADEMICA', '4'
                					]
              					}, 
              					'then': 'Instituto Federal de Educação, Ciência e Tecnologia'
            					}, {
              					'case': {
                					'$eq': [
                  					'$TP_ORGANIZACAO_ACADEMICA', '5'
                					]
              					}, 
              					'then': 'Centro Federal de Educação Tecnológica'
            					}
          					], 
          					'default': '???'
        					}
      					}, 
      					'TP_CATEGORIA_ADMINISTRATIVA': {
        					'$switch': {
          					'branches': [
            					{
              					'case': {
                					'$eq': [
                  					'$TP_CATEGORIA_ADMINISTRATIVA', '1'
                					]
              					}, 
              					'then': 'Pública Federal'
            					}, {
              					'case': {
                					'$eq': [
                  					'$TP_CATEGORIA_ADMINISTRATIVA', '2'
                					]
              					}, 
              					'then': 'Pública Estadual'
            					}, {
              					'case': {
                					'$eq': [
                  					'$TP_CATEGORIA_ADMINISTRATIVA', '3'
                					]
              					}, 
              					'then': 'Pública Municipal'
            					}, {
              					'case': {
                					'$eq': [
                  					'$TP_CATEGORIA_ADMINISTRATIVA', '4'
                					]
              					}, 
              					'then': 'Privada com fins lucrativos'
            					}, {
              					'case': {
                					'$eq': [
                  					'$TP_CATEGORIA_ADMINISTRATIVA', '5'
                					]
              					}, 
              					'then': 'Privada sem fins lucrativos'
            					}, {
              					'case': {
                					'$eq': [
                  					'$TP_CATEGORIA_ADMINISTRATIVA', '6'
                					]
              					}, 
              					'then': 'Privada - Particular em sentido estrito'
            					}, {
              					'case': {
                					'$eq': [
                  					'$TP_CATEGORIA_ADMINISTRATIVA', '7'
                					]
              					}, 
              					'then': 'Especial'
            					}, {
              					'case': {
                					'$eq': [
                  					'$TP_CATEGORIA_ADMINISTRATIVA', '8'
                					]
              					}, 
              					'then': 'Privada comunitária'
            					}, {
              					'case': {
                					'$eq': [
                  					'$TP_CATEGORIA_ADMINISTRATIVA', '9'
                					]
              					}, 
              					'then': 'Privada confessional'
            					}
          					], 
          					'default': '???'
        					}
      					}, 
      					'NO_MANTENEDORA': true, 
      					'CO_MANTENEDORA': true, 
      					'NO_IES': true, 
      					'SG_IES': true, 
      					'CO_IES': true, 
      					'DS_ENDERECO_IES': true, 
      					'DS_NUMERO_ENDERECO_IES': true, 
      					'DS_COMPLEMENTO_ENDERECO_IES': true, 
      					'NO_BAIRRO_IES': true, 
      					'NU_CEP_IES': true, 
      					'QT_TEC_TOTAL': true, 
      					'QT_TEC_FUNDAMENTAL_INCOMP_FEM': true, 
      					'QT_TEC_FUNDAMENTAL_INCOMP_MASC': true, 
      					'QT_TEC_FUNDAMENTAL_COMP_FEM': true, 
      					'QT_TEC_FUNDAMENTAL_COMP_MASC': true, 
      					'QT_TEC_MEDIO_FEM': true, 
      					'QT_TEC_MEDIO_MASC': true, 
      					'QT_TEC_SUPERIOR_FEM': true, 
      					'QT_TEC_SUPERIOR_MASC': true, 
      					'QT_TEC_ESPECIALIZACAO_FEM': true, 
      					'QT_TEC_ESPECIALIZACAO_MASC': true, 
      					'QT_TEC_MESTRADO_FEM': true, 
      					'QT_TEC_MESTRADO_MASC': true, 
      					'QT_TEC_DOUTORADO_FEM': true, 
      					'QT_TEC_DOUTORADO_MASC': true, 
      					'IN_ACESSO_PORTAL_CAPES': {
        					'$switch': {
          					'branches': [
            					{
              					'case': {
                					'$eq': [
                  					'$IN_ACESSO_PORTAL_CAPES', '0'
                					]
              					}, 
              					'then': 'Não'
            					}, {
              					'case': {
                					'$eq': [
                  					'$IN_ACESSO_PORTAL_CAPES', '1'
                					]
              					}, 
              					'then': 'Sim'
            					}
          					], 
          					'default': '???'
        					}
      					}, 
      					'IN_ACESSO_OUTRAS_BASES': {
        					'$switch': {
          					'branches': [
            					{
              					'case': {
                					'$eq': [
                  					'$IN_ACESSO_OUTRAS_BASES', '0'
                					]
              					}, 
              					'then': 'Não'
            					}, {
              					'case': {
                					'$eq': [
                  					'$IN_ACESSO_OUTRAS_BASES', '1'
                					]
              					}, 
              					'then': 'Sim'
            					}
          					], 
          					'default': '???'
        					}
      					}, 
      					'IN_ASSINA_OUTRA_BASE': {
        					'$switch': {
          					'branches': [
            					{
              					'case': {
                					'$eq': [
                  					'$IN_ASSINA_OUTRA_BASE', '0'
                					]
              					}, 
              					'then': 'Não'
            					}, {
              					'case': {
                					'$eq': [
                  					'$IN_ASSINA_OUTRA_BASE', '1'
                					]
              					}, 
              					'then': 'Sim'
            					}
          					], 
          					'default': '???'
        					}
      					}, 
      					'IN_REPOSITORIO_INSTITUCIONAL': {
        					'$switch': {
          					'branches': [
            					{
              					'case': {
                					'$eq': [
                  					'$IN_REPOSITORIO_INSTITUCIONAL', '0'
                					]
              					}, 
              					'then': 'Não'
            					}, {
              					'case': {
                					'$eq': [
                  					'$IN_REPOSITORIO_INSTITUCIONAL', '1'
                					]
              					}, 
              					'then': 'Sim'
            					}
          					], 
          					'default': '???'
        					}
      					}, 
      					'IN_BUSCA_INTEGRADA': {
        					'$switch': {
          					'branches': [
            					{
              					'case': {
                					'$eq': [
                  					'$IN_BUSCA_INTEGRADA', '0'
                					]
              					}, 
              					'then': 'Não'
            					}, {
              					'case': {
                					'$eq': [
                  					'$IN_BUSCA_INTEGRADA', '1'
                					]
              					}, 
              					'then': 'Sim'
            					}
          					], 
          					'default': '???'
        					}
      					}, 
      					'IN_SERVICO_INTERNET': {
        					'$switch': {
          					'branches': [
            					{
              					'case': {
                					'$eq': [
                  					'$IN_SERVICO_INTERNET', '0'
                					]
              					}, 
              					'then': 'Não'
            					}, {
              					'case': {
                					'$eq': [
                  					'$IN_SERVICO_INTERNET', '1'
                					]
              					}, 
              					'then': 'Sim'
            					}
          					], 
          					'default': '???'
        					}
      					}, 
      					'IN_PARTICIPA_REDE_SOCIAL': {
        					'$switch': {
          					'branches': [
            					{
              					'case': {
                					'$eq': [
                  					'$IN_PARTICIPA_REDE_SOCIAL', '0'
                					]
              					}, 
              					'then': 'Não'
            					}, {
              					'case': {
                					'$eq': [
                  					'$IN_PARTICIPA_REDE_SOCIAL', '1'
                					]
              					}, 
              					'then': 'Sim'
            					}
          					], 
          					'default': '???'
        					}
      					}, 
      					'IN_CATALOGO_ONLINE': {
        					'$switch': {
          					'branches': [
            					{
              					'case': {
                					'$eq': [
                  					'$IN_CATALOGO_ONLINE', '0'
                					]
              					}, 
              					'then': 'Não'
            					}, {
              					'case': {
                					'$eq': [
                  					'$IN_CATALOGO_ONLINE', '1'
                					]
              					}, 
              					'then': 'Sim'
            					}
          					], 
          					'default': '???'
        					}
      					}, 
      					'QT_PERIODICO_ELETRONICO': true, 
      					'QT_LIVRO_ELETRONICO': true, 
      					'QT_DOCENTE_TOTAL': true, 
      					'QT_DOCENTE_EXE': true, 
      					'DOC_EX_FEMI': true, 
      					'DOC_EX_MASC': true, 
      					'DOC_EX_SEM_GRAD': true, 
      					'DOC_EX_GRAD': true, 
      					'DOC_EX_ESP': true, 
      					'DOC_EX_MEST': true, 
      					'DOC_EX_DOUT': true, 
      					'DOC_EX_INT': true, 
      					'DOC_EX_INT_DE': true, 
      					'DOC_EX_INT_SEM_DE': true, 
      					'DOC_EX_PARC': true, 
      					'DOC_EX_HOR': true, 
      					'DOC_EX_0_29': true, 
      					'DOC_EX_30_34': true, 
      					'DOC_EX_35_39': true, 
      					'DOC_EX_40_44': true, 
      					'DOC_EX_45_49': true, 
      					'DOC_EX_50_54': true, 
      					'DOC_EX_55_59': true, 
      					'DOC_EX_60_MAIS': true, 
      					'DOC_EX_BRANCA': true, 
      					'DOC_EX_PRETA': true, 
      					'DOC_EX_PARDA': true, 
      					'DOC_EX_AMARELA': true, 
      					'DOC_EX_INDÍGENA': true, 
      					'DOC_EX_COR_ND': true, 
      					'DOC_EX_BRA': true, 
      					'DOC_EX_EST': true, 
      					'DOC_EX_COM_DEFICIÊNCIA': true, 
      					'end_completo_y': true, 
      					'latlong': true, 
      					'lat': true, 
      					'long': true
    				}
  				}
			]
   		});
   		
   		console.log("Criou view com sucesso");
	} finally {
		await client.close();
	}
}

run().catch(console.dir);