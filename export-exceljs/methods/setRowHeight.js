'use strict';
const get = require('lodash/get');
//method to set height of each row 
module.exports = function(sheet, templateForTab) {

    const colWidthPixelsObj = get(templateForTab, 'rowHeight', {});
    if (colWidthPixelsObj.isCustomize) { // would trigger undefined if not there
        const rowArray = colWidthPixelsObj.defIdHeight || []
        rowArray.forEach(rowObject => {
            let row = sheet.getRow(rowObject.rowId);
            row.height = rowObject.height
        });

    }
    return sheet;
};