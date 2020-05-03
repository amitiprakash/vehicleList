const parser = require('xml2json');
const pLimit = require('p-limit');

const parseData = (data) =>{
    const options = {
        object: true
    };
    return parser.toJson(data,options);
}

const limit = pLimit(8);

module.exports = {
    parseData,
    limit
};