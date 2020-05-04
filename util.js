const parser = require('xml2json');
const pLimit = require('p-limit');
const fs = require('fs');
const {promisify} = require('util');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const access = promisify(fs.access);

const parseData = (data) =>{
    const options = {
        object: true
    };
    return parser.toJson(data,options);
}

const limit = pLimit(20);

module.exports = {
    parseData,
    limit,
    writeFile,
    readFile,
    access
};