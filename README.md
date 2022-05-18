# mapa-bibliotecas

Projeto referente à disciplina PJI240 - Projeto Integrador em Computação II da Univesp. Trata-se de uma aplicação web que visa mapear as bibliotecas universitárias do Brasil e divulgar indicadores quantitativos e de serviços.

Aplicação em funcionamento: [Mapeamento de Bibliotecas](https://mapa-bibliotecas.herokuapp.com/)

## Setup (front-end)

Execute `npm install` na pasta do projeto. Note que é necessário [instalar o Node e o npm](https://balta.io/blog/node-npm-instalacao-configuracao-e-primeiros-passos) antes. O projeto usa um arquivo `.env` com a seguinte estrutura para armazenar itens como configurações de banco de dados e chaves de acesso de APIs:

```
REACT_APP_TOKEN_MAPBOX = ""
MONGODB_USERNAME = ""
MONGODB_PASSWORD = ""
MONGODB_CLUSTER = ""
MONGODB_DATABASE = ""
MONGODB_COLLECTION = ""
```

Configure e salve o arquivo como `.env` na raiz do projeto. Agora basta executar `npm run dev` para iniciar o servidor de desenvolvimento do React.

## Setup (back-end)

Após executar `npm install` e configurar o arquivo `.env`, execute `npm start` para iniciar o servidor Node localmente. Caso necessário, execute `npm build` antes desse comando para gerar uma aplicação React estática na pasta `build`.

## Deploy (Heroku)

Para fazer o deploy da aplicação no Heroku, [siga estas instruções para instalar o Heroku](https://devcenter.heroku.com/articles/heroku-cli). Em seguida, execute `heroku git:remote -a mapa-bibliotecas` na pasta do projeto. Agora basta fazer um commit e executar `git push heroku main`.
