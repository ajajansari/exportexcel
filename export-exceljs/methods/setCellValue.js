'use strict';
const get = require('lodash/get');
module.exports = function(cellObjValue) {
    let cellValue = "";

    if (get(cellObjValue, 'value', false)) {
        cellValue = cellObjValue.value;
    }

    if (get(cellObjValue, 'isDate', false)) {
        cellValue = new Date(cellValue);
    }

    return cellValue
}