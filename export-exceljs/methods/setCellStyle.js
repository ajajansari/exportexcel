'use strict';
const get = require("lodash/get");
module.exports = function(cellObjValue) {

    //add format Number
    if (get(cellObjValue, 'style', false)) {
        return cellObjValue.style;
    }

    return;
}