module.exports = {
  get: {
    description: "Retorna, em JSON, os registros das IES situadas no estado correspondente ao código especificado. Este endpoint é primariamente utilizado internamente pela aplicação, então, caso não saiba o código do estado, utilize o endpoint /api/ies, especificando o estado como parâmetro.",
    operationId: "getIesEstado",
    parameters: [
      {
        name: "co_estado",
        in: "path", 
        schema: {
          $ref: "#/components/schemas/co_estado",
        },
        required: true,
        description: "Código interno do estado.",
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
