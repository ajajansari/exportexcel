'use strict';
const isObject = require('lodash/isObject');
//method to set data with template
module.exports = function(tmpltDataValue, dataValue) {
    //generate the data with template
    let dataWithTemplate = {};

    //apply header with template
    if (!isObject(tmpltDataValue)) {
        dataWithTemplate.value = `${tmpltDataValue}${dataValue}`;
        return dataWithTemplate;
    }
    dataWithTemplate = tmpltDataValue;
    dataWithTemplate.value = tmpltDataValue.hasOwnProperty('v') ? `${tmpltDataValue.v}${dataValue}` : dataValue;
    return dataWithTemplate;
};