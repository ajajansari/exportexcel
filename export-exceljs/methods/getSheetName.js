'use strict';
const get = require('lodash/get');
module.exports = function(template, data, workbook, index) {
    //sheet name, if available in the data/config then take from there else template
    let sheetName = get(data, 'name', template.name)
        //check if sheet already exit, then add index to it, so that the sheet name become different
    if (workbook.getWorksheet(sheetName)) {
        sheetName = `${sheetName} - ${index}`;
    }

    return sheetName;
};