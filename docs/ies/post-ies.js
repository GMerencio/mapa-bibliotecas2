module.exports = {
  post: {
  	tags: ["Endpoints"],
    description: "Retorna, em JSON, os registros das IES correspondentes aos filtros de busca especificados no corpo da requisição.",
    operationId: "postIes",
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
