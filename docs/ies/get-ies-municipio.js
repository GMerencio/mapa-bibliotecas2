module.exports = {
  get: {
    description: "Retorna, em JSON, os registros das IES situadas no município correspondente ao código especificado. Este endpoint é primariamente utilizado internamente pela aplicação, então, caso não saiba o código do estado, utilize o endpoint /api/ies, especificando o estado como parâmetro.",
    operationId: "getIesMunicipio",
    parameters: [
      {
        name: "co_municipio",
        in: "path", 
        schema: {
          $ref: "#/components/schemas/co_municipio",
        },
        required: true,
        description: "Código interno do município.",
      },
    ],
    
    responses: {

      200: {
        description: "Não houve erros no processamento. Note que, se nenhum registro for encontrado, a resposta será um objeto vazio.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Ies",
            },
          },
        },
      },

      400: {
        description: "Erro ao tentar obter registro.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Erro",
            },
          },
        },
      },
    },
  },
};
