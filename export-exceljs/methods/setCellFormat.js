'use strict';
const get = require("lodash/get");
module.exports = function(cellObjValue) {

    //add format Number
    if (get(cellObjValue, 'numFmt', false)) {
        return cellObjValue.numFmt;
    }

    return;
}