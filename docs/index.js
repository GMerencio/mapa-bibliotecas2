const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const ies = require('./ies');
const tags = require('./tags');

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...ies,
    ...tags
};