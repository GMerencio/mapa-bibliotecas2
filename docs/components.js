module.exports = {
	components: {
		schemas: {
			co_ies: {
				type: "integer",
				format: "int32",
				description: "Código MEC da instituição.",
        		example: 780,
			},
			co_estado: {
				type: "string",
				description: "Código interno do estado.",
        		example: "51",
			},
			co_municipio: {
				type: "string",
				description: "Código interno do município.",
        		example: "5103403",
			},
			qtd_ies: {
				type: "object",
				description: "Objeto contendo a quantidade de instituições localizadas.",
				properties: {
					qtd: {
						type: "integer",
						format: "int32",
						description: "Quantidade de registros localizados",
						example: 20,
					},
				},
			},
			Erro: {
				type: "string",
				description: "Mensagem retornada após algum erro no servidor.",
        		example: "Erro ao tentar obter registro",
			},
			Ies: {
				type: "object",
				properties: {
					_id: {
						type: "string",
						description: "ID interno da instituição no banco de dados.",
						example: "62820f47fc4d4646109662ba",
					},
					NU_ANO_CENSO: {
						type: "string",
						description: "Ano de referência do Censo Superior.",
						example: "2020",
					},
					NO_REGIAO_IES: {
						type: "string",
						description: "Nome da região geográfica da sede administrativa ou reitoria da IES.",
						example: "Centro-Oeste",
					},
					CO_REGIAO_IES: {
						type: "string",
						description: "Código da região geográfica.",
						example: "5",
					},
					NO_UF_IES: {
						type: "string",
						description: "Nome da Unidade da Federação da sede administrativa ou reitoria da IES.",
						example: "Mato Grosso",
					},
					SG_UF_IES: {
						type: "string",
						description: "Sigla da Unidade da Federação da sede administrativa ou reitoria da IES.",
						example: "MT",
					},
					CO_UF_IES: {
						type: "string",
						description: "Código da UF da sede administrativa ou reitoria da IES.",
						example: "51",
					},
					NO_MUNICIPIO_IES: {
						type: "string",
						description: "Nome do Município da sede administrativa ou reitoria da IES.",
						example: "Cuiabá",
					},
					CO_MUNICIPIO_IES: {
						type: "string",
						description: "Código do Município da sede administrativa ou reitoria da IES.",
						example: "5103403",
					},
					IN_CAPITAL_IES: {
						type: "string",
						description: "Informa se a sede administrativa ou reitoria da IES está localizada em uma capital da unidade da federação ('1') ou não ('0').",
						example: "1",
					},
					NO_MESORREGIAO_IES: {
						type: "string",
						description: "Nome da Mesorregião da sede administrativa ou reitoria da IES.",
						example: "Centro-Sul Mato-grossense",
					},
				},
			},
		},
	},
};