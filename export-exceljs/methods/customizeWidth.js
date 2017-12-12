'use strict';
const get = require('lodash/get');
//method to set width of each column 
module.exports = function(sheet, templateForTab) {

    const colWidthPixelsObj = get(templateForTab, 'columnWidth', {});
    if (colWidthPixelsObj.isCustomize) { // would trigger undefined if not there
        const colArray = colWidthPixelsObj.defIdWidth || []
        colArray.forEach(columnObj => {
            let columnId = sheet.getColumn(columnObj.colId);
            columnId.width = columnObj.width
        });

    }
    return sheet;
};