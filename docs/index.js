const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const ies = require('./ies');

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...ies
};