'use strict';
module.exports = function(sheet, rowNumber, colNumber, cellObjValue) {

    //merge cell
    if (cellObjValue.hasOwnProperty('merge')) {

        let bottomNumber = rowNumber;
        if (cellObjValue.merge.hasOwnProperty('cellBottomCount')) {
            bottomNumber = (rowNumber + cellObjValue.merge.cellBottomCount - 1);
        }

        let rightNumber = colNumber;
        if (cellObjValue.merge.hasOwnProperty('cellRightCount')) {
            rightNumber = (colNumber + cellObjValue.merge.cellRightCount - 1);
        }

        sheet.mergeCells(rowNumber, colNumber, bottomNumber, rightNumber);
    }
    return sheet;
}