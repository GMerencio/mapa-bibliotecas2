const getIes = require('./get-ies');
const postIes = require('./post-ies');
const postQtdIes = require('./post-qtd-ies');
const getIesEstado = require('./get-ies-estado');
const getIesMunicipio = require('./get-ies-municipio');

module.exports = {
    paths: {
    	'/api/ies/{cod}': {
            ...getIes
        },
        '/api/ies/estados/{co_estado}': {
            ...getIesEstado
        },
        '/api/ies/municipios/{co_municipio}': {
            ...getIesMunicipio
        },
        '/api/ies': {
            ...postIes
        },
        '/api/ies/qtd-ies': {
            ...postQtdIes
        }
    }
}