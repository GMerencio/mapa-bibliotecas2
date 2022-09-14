module.exports = {
  get: {
    description: "Retorna, em JSON, o registro referente ao código MEC da instituição.",
    operationId: "getIes",
    parameters: [
      {
        name: "cod",
        in: "path", 
        schema: {
          $ref: "#/components/schemas/co_ies",
        },
        required: true,
        description: "Código MEC da instituição",
      },
    ],
    
    responses: {

      200: {
        description: "Não houve erros no processamento. Note que, se o registro não for encontrado, a resposta será um objeto vazio.",
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
