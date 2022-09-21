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
						description: "ID interno da instituição no banco de dados",
						example: "62820f47fc4d4646109662ba",
					},
					lat: {
						type: "string",
						description: "Latitude",
						example: "-15.6233745",
					},
					long: {
						type: "string",
						description: "Longitude",
						example: "-56.087727",
					},
					latlong: {
						type: "string",
						description: "Latitude e longitude",
						example: "-15.6233745, -56.087727",
					},
					end_completo_y: {
						type: "string",
						description: "Endereço completo, incluindo complemento, bairro, CEP, cidade e estado",
						example: "Avenida Manoel José de Arruda, 3100 - UNIC - Beira Rio I (SEDE) - Jardim Europa - Cuiabá - MT - 78065-900",
					},
					"NU_ANO_CENSO": {
        				"type": "string",
        				"description": "Ano de refer\u00eancia do Censo Superior",
        				"example": "2020"
    				},
    				"NO_REGIAO_IES": {
        				"type": "string",
        				"description": "Nome da regi\u00e3o geogr\u00e1fica da sede administrativa ou reitoria da IES",
        				"example": "Centro-Oeste"
    				},
    				"CO_REGIAO_IES": {
        				"type": "string",
        				"description": "C\u00f3digo da regi\u00e3o geogr\u00e1fica",
        				"example": "5"
    				},
    				"NO_UF_IES": {
        				"type": "string",
        				"description": "Nome da Unidade da Federa\u00e7\u00e3o da sede administrativa ou reitoria da IES",
        				"example": "Mato Grosso"
    				},
    				"SG_UF_IES": {
        				"type": "string",
        				"description": "Sigla da Unidade da Federa\u00e7\u00e3o da sede administrativa ou reitoria da IES",
        				"example": "MT"
    				},
    				"CO_UF_IES": {
        				"type": "string",
        				"description": "C\u00f3digo da UF da sede administrativa ou reitoria da IES",
        				"example": "51"
    				},
    				"NO_MUNICIPIO_IES": {
        				"type": "string",
        				"description": "Nome do Munic\u00edpio da sede administrativa ou reitoria da IES",
        				"example": "Cuiabá"
    				},
    				"CO_MUNICIPIO_IES": {
        				"type": "string",
        				"description": "C\u00f3digo do Munic\u00edpio da sede administrativa ou reitoria da IES",
        				"example": "5103403"
    				},
    				"IN_CAPITAL_IES": {
        				"type": "string",
        				"description": "Informa se a sede administrativa ou reitoria da IES est\u00e1 localizada em uma capital da unidade da federa\u00e7\u00e3o",
        				"example": "1"
    				},
    				"NO_MESORREGIAO_IES": {
        				"type": "string",
        				"description": "Nome da Mesorregi\u00e3o da sede administrativa ou reitoria da IES",
        				"example": "Centro-Sul Mato-grossense"
    				},
    				"CO_MESORREGIAO_IES": {
        				"type": "string",
        				"description": "C\u00f3digo da mesorregi\u00e3o da sede administrativa ou reitoria da IES",
        				"example": "4"
    				},
    				"NO_MICRORREGIAO_IES": {
        				"type": "string",
        				"description": "Nome da Microrregi\u00e3o da sede administrativa ou reitoria da IES",
        				"example": "Cuiabá"
    				},
    				"CO_MICRORREGIAO_IES": {
        				"type": "string",
        				"description": "C\u00f3digo da microrregi\u00e3o da sede administrativa ou reitoria da IES ",
        				"example": "17"
    				},
    				"TP_ORGANIZACAO_ACADEMICA": {
        				"type": "string",
        				"description": "Tipo da Organiza\u00e7\u00e3o Acad\u00eamica da IES. 1 - Universidade. 2 - Centro Universit\u00e1rio. 3 - Faculdade. 4 - Instituto Federal de Educa\u00e7\u00e3o Ci\u00eancia e Tecnologia. 5 - Centro Federal de Educa\u00e7\u00e3o Tecnol\u00f3gica",
        				"example": "1"
    				},
    				"TP_CATEGORIA_ADMINISTRATIVA": {
        				"type": "string",
        				"description": "Tipo da Categoria Administrativa da IES. 1 - P\u00fablica Federal. 2 - P\u00fablica Estadual. 3 - P\u00fablica Municipal. 4 - Privada com fins lucrativos. 5 - Privada sem fins lucrativos. 6 - Privada - Particular em sentido estrito. 7 - Especial. 8 - Privada comunit\u00e1ria. 9 - Privada confessional",
        				"example": "4"
    				},
    				"NO_MANTENEDORA": {
        				"type": "string",
        				"description": "Nome da Mantenedora da IES",
        				"example": "EDITORA E DISTRIBUIDORA EDUCACIONAL S/A"
    				},
    				"CO_MANTENEDORA": {
        				"type": "integer",
        				"format": "int32",
        				"description": "C\u00f3digo \u00fanico de identifica\u00e7\u00e3o da mantenedora da IES",
        				"example": 14514
    				},
    				"CO_IES": {
        				"type": "integer",
        				"format": "int32",
        				"description": "C\u00f3digo \u00fanico de identifica\u00e7\u00e3o da IES",
        				"example": 780
    				},
    				"NO_IES": {
        				"type": "string",
        				"description": "Nome da IES",
        				"example": "UNIVERSIDADE DE CUIABÁ"
    				},
    				"SG_IES": {
        				"type": "string",
        				"description": "Sigla da IES",
        				"example": "UNIC/UNIME"
    				},
    				"DS_ENDERECO_IES": {
        				"type": "string",
        				"description": "Endere\u00e7o da sede administrativa/reitoria da IES",
        				"example": "Avenida Manoel José de Arruda"
    				},
    				"DS_NUMERO_ENDERECO_IES": {
        				"type": "string",
        				"description": "N\u00famero do Endere\u00e7o",
        				"example": "3100"
    				},
    				"DS_COMPLEMENTO_ENDERECO_IES": {
        				"type": "string",
        				"description": "Complemento  do Endere\u00e7o",
        				"example": "UNIC - Beira Rio I (SEDE)"
    				},
    				"NO_BAIRRO_IES": {
        				"type": "string",
        				"description": "Bairro",
        				"example": "Jardim Europa"
    				},
    				"NU_CEP_IES": {
        				"type": "integer",
        				"format": "int32",
        				"description": "CEP",
        				"example": 78065900
    				},
    				"QT_TEC_TOTAL": {
        				"type": "integer",
        				"format": "int32",
        				"description": "Quantidade de funcion\u00e1rios t\u00e9cnico-administrativos",
        				"example": 336
    				},
    				"QT_TEC_FUNDAMENTAL_INCOMP_FEM": {
        				"type": "string",
        				"description": "Quantidade de funcion\u00e1rios t\u00e9cnico-administrativos do sexo feminino com ensino fundamental incompleto",
        				"example": "TODO"
    				},
    				"QT_TEC_FUNDAMENTAL_INCOMP_MASC": {
        				"type": "string",
        				"description": "Quantidade de funcion\u00e1rios t\u00e9cnico-administrativos do sexo masculino com ensino fundamental incompleto",
        				"example": "TODO"
    				},
    				"QT_TEC_FUNDAMENTAL_COMP_FEM": {
        				"type": "string",
        				"description": "Quantidade de funcion\u00e1rios t\u00e9cnico-administrativos do sexo feminino com ensino fundamental completo ",
        				"example": "TODO"
    				},
    				"QT_TEC_FUNDAMENTAL_COMP_MASC": {
        				"type": "string",
        				"description": "Quantidade de funcion\u00e1rios t\u00e9cnico-administrativos do sexo masculino com ensino fundamental completo",
        				"example": "TODO"
    				},
    				"QT_TEC_MEDIO_FEM": {
        				"type": "string",
        				"description": "Quantidade de funcion\u00e1rios t\u00e9cnico-administrativos do sexo feminino com ensino m\u00e9dio",
        				"example": "TODO"
    				},
    				"QT_TEC_MEDIO_MASC": {
        				"type": "string",
        				"description": "Quantidade de funcion\u00e1rios t\u00e9cnico-administrativos do sexo masculino com ensino m\u00e9dio",
        				"example": "TODO"
    				},
    				"QT_TEC_SUPERIOR_FEM": {
        				"type": "string",
        				"description": "Quantidade de funcion\u00e1rios t\u00e9cnico-administrativos do sexo feminino com n\u00edvel superior ",
        				"example": "TODO"
    				},
    				"QT_TEC_SUPERIOR_MASC": {
        				"type": "string",
        				"description": "Quantidade de funcion\u00e1rios t\u00e9cnico-administrativos do sexo masculino com n\u00edvel superior ",
        				"example": "TODO"
    				},
    				"QT_TEC_ESPECIALIZACAO_FEM": {
        				"type": "string",
        				"description": "Quantidade de funcion\u00e1rios t\u00e9cnico-administrativos do sexo feminino com especializa\u00e7\u00e3o",
        				"example": "TODO"
    				},
    				"QT_TEC_ESPECIALIZACAO_MASC": {
        				"type": "string",
        				"description": "Quantidade de funcion\u00e1rios t\u00e9cnico-administrativos do sexo masculino com especializa\u00e7\u00e3o",
        				"example": "TODO"
    				},
    				"QT_TEC_MESTRADO_FEM": {
        				"type": "string",
        				"description": "Quantidade de funcion\u00e1rios t\u00e9cnico-administrativos do sexo feminino com mestrado",
        				"example": "TODO"
    				},
    				"QT_TEC_MESTRADO_MASC": {
        				"type": "string",
        				"description": "Quantidade de funcion\u00e1rios t\u00e9cnico-administrativos do sexo masculino com mestrado ",
        				"example": "TODO"
    				},
    				"QT_TEC_DOUTORADO_FEM": {
        				"type": "string",
        				"description": "Quantidade de funcion\u00e1rios t\u00e9cnico-administrativos do sexo feminino com doutorado ",
        				"example": "TODO"
    				},
    				"QT_TEC_DOUTORADO_MASC": {
        				"type": "string",
        				"description": "Quantidade de funcion\u00e1rios t\u00e9cnico-administrativos do sexo masculino com doutorado",
        				"example": "TODO"
    				},
    				"IN_ACESSO_PORTAL_CAPES": {
        				"type": "string",
        				"description": "Informa se as bibliotecas da IES tem acesso ao portal Capes de peri\u00f3dicos",
        				"example": "TODO"
    				},
    				"IN_ACESSO_OUTRAS_BASES": {
        				"type": "string",
        				"description": "Informa se as bibliotecas da IES tem acesso a outras bases de dados licenciadas ou compradas",
        				"example": "TODO"
    				},
    				"IN_ASSINA_OUTRA_BASE": {
        				"type": "string",
        				"description": "Informa se as bibliotecas da IES assina outras bases de dados licenciadas ou compradas",
        				"example": "TODO"
    				},
    				"IN_REPOSITORIO_INSTITUCIONAL": {
        				"type": "string",
        				"description": "Informa se a IES possui base de dados online que re\u00fane de maneira organizada a produ\u00e7\u00e3o cient\u00edfica da institui\u00e7\u00e3o",
        				"example": "TODO"
    				},
    				"IN_BUSCA_INTEGRADA": {
        				"type": "string",
        				"description": "Informa se as bibliotecas da IES oferecem servi\u00e7os pela internet",
        				"example": "TODO"
    				},
    				"IN_SERVICO_INTERNET": {
        				"type": "string",
        				"description": "Informa se as bibliotecas da IES oferecem servi\u00e7os pela internet",
        				"example": "TODO"
    				},
    				"IN_PARTICIPA_REDE_SOCIAL": {
        				"type": "string",
        				"description": "Informa se a biblioteca participam de Redes Sociais",
        				"example": "TODO"
    				},
    				"IN_CATALOGO_ONLINE": {
        				"type": "string",
        				"description": "Informa se a IES possui ferramenta de recupera\u00e7\u00e3o de informa\u00e7\u00e3o que permite ao usu\u00e1rio consultar de forma local ou remota a exist\u00eancia e disponibilidade de itens do acervo da(s) biblioteca(s)\n49,QT_PERIODICO_ELETRONICO,Quantidade de t\u00edtulos de peri\u00f3dicos eletr\u00f4nicos adquiridos pelas bibliotecas por meio de compra ou doa\u00e7\u00e3o ou permuta",
        				"example": "TODO"
    				},
    				"QT_LIVRO_ELETRONICO": {
        				"type": "string",
        				"description": "Quantidade de t\u00edtulos de livros eletr\u00f4nicos disponibilizados pela biblioteca convertidos ao formato digital ou originalmente produzidos nesse formato para serem lidos em computador ou outros dispositivos",
        				"example": "TODO"
    				},
    				"QT_DOCENTE_TOTAL": {
        				"type": "string",
        				"description": "Quantidade de total de docentes (em exerc\u00edcio e afastados)",
        				"example": "TODO"
    				},
    				"QT_DOCENTE_EXE": {
        				"type": "string",
        				"description": "Quantidade de total de docentes em exerc\u00edcio ",
        				"example": "TODO"
    				},
    				"DOC_EX_FEMI": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio do sexo feminino ",
        				"example": "TODO"
    				},
    				"DOC_EX_MASC": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio do sexo masculino",
        				"example": "TODO"
    				},
    				"DOC_EX_SEM_GRAD": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio sem curso de gradua\u00e7\u00e3o",
        				"example": "TODO"
    				},
    				"DOC_EX_GRAD": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio com curso de gradua\u00e7\u00e3o",
        				"example": "TODO"
    				},
    				"DOC_EX_ESP": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio com especializa\u00e7\u00e3o",
        				"example": "TODO"
    				},
    				"DOC_EX_MEST": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio com mestrado ",
        				"example": "TODO"
    				},
    				"DOC_EX_DOUT": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio com doutorado ",
        				"example": "TODO"
    				},
    				"DOC_EX_INT": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio em tempo integral",
        				"example": "TODO"
    				},
    				"DOC_EX_INT_DE": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio em tempo integral com dedica\u00e7\u00e3o exclusiva",
        				"example": "TODO"
    				},
    				"DOC_EX_INT_SEM_DE": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio em tempo integral sem dedica\u00e7\u00e3o exclusiva ",
        				"example": "TODO"
    				},
    				"DOC_EX_PARC": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio em tempo parcial ",
        				"example": "TODO"
    				},
    				"DOC_EX_HOR": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio Horista",
        				"example": "TODO"
    				},
    				"DOC_EX_0_29": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio- at\u00e9 29 anos ",
        				"example": "TODO"
    				},
    				"DOC_EX_30_34": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio- de 30 a 34 anos",
        				"example": "TODO"
    				},
    				"DOC_EX_35_39": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio - de 35 a 39 anos",
        				"example": "TODO"
    				},
    				"DOC_EX_40_44": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio - de 40 a 44 anos",
        				"example": "TODO"
    				},
    				"DOC_EX_45_49": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio - de 45 a 49 anos",
        				"example": "TODO"
    				},
    				"DOC_EX_50_54": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio - de 50 a 54 anos",
        				"example": "TODO"
    				},
    				"DOC_EX_55_59": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio - de 55 a 59 anos",
        				"example": "TODO"
    				},
    				"DOC_EX_60_MAIS": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio - de 60 anos ou mais ",
        				"example": "TODO"
    				},
    				"DOC_EX_BRANCA": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio  - Cor/Ra\u00e7a branca",
        				"example": "TODO"
    				},
    				"DOC_EX_PRETA": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio  - Cor/Ra\u00e7a preta",
        				"example": "TODO"
    				},
    				"DOC_EX_PARDA": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio  - Cor/Ra\u00e7a parda",
        				"example": "TODO"
    				},
    				"DOC_EX_AMARELA": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio  - Cor/Ra\u00e7a amarela",
        				"example": "TODO"
    				},
    				"DOC_EX_IND\u00cdGENA": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio  - Cor/Ra\u00e7a ind\u00edgena",
        				"example": "TODO"
    				},
    				"DOC_EX_COR_ND": {
        				"type": "string",
        				"description": "Quantidade de docentes em exerc\u00edcio  - Cor/Ra\u00e7a n\u00e3o disp\u00f5e da informa\u00e7\u00e3o ou n\u00e3o declarada",
        				"example": "TODO"
    				},
    				"DOC_EX_BRA": {
        				"type": "string",
        				"description": "Quantidade de docente em exerc\u00edcio - nacionalidade brasileira ou brasileira - nascido no exterior ou naturalizado",
        				"example": "TODO"
    				},
    				"DOC_EX_EST": {
        				"type": "string",
        				"description": "Quantidade de docente em exerc\u00edcio - nacionalidade estrangeira ",
        				"example": "TODO"
    				},
    				"DOC_EX_COM_DEFICI\u00caNCIA": {
        				"type": "string",
        				"description": "Quantidade de docente em exerc\u00edcio - com defici\u00eancia",
        				"example": "TODO"
    				}
					,
				},
			},
		},
	},
};