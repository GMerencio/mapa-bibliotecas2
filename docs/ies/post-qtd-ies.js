module.exports = {
  post: {
    description: "Retorna, em JSON, a quantidade de IES correspondentes aos filtros de busca especificados no corpo da requisição.",
    operationId: "postQtdIes",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Ies",
          },
        },
      },
    },
    responses: {

      200: {
        description: "Não houve erros no processamento.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/qtd_ies",
            },
          },
        },
      },

      400: {
        description: "Erro ao tentar obter registros.",
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
