const Excel = require('exceljs');

module.exports.finalizeSheet = function (sheet) {
    sheet.eachRow(function (row, rowNumber) {
        row.eachCell(function (cell, colNumber) {
            let cellObjValue = cell.value;
            if (typeof cellObjValue == "object") {

                //add value
                let cellValue = cellObjValue.hasOwnProperty('v') ? cellObjValue.v : "";

                if (cellObjValue.hasOwnProperty('l')) {//add hyperlink
                    row.getCell(colNumber).value = { text: cellValue, hyperlink: cellObjValue.l.Target };
                }
                else if (cellObjValue.hasOwnProperty('numFmt')) {//add format

                    //add date formatting
                    let cellFormatValue = (cellObjValue.hasOwnProperty('isDate') && cellObjValue.isDate) ? new Date(cellValue) : cellValue;

                    row.getCell(colNumber).value = cellFormatValue;
                    row.getCell(colNumber).numFmt = cellObjValue.numFmt;
                }
                else {//add string
                    row.getCell(colNumber).value = cellValue;
                }

                //add styles/fonts
                if (cellObjValue.hasOwnProperty('font')) {
                    row.getCell(colNumber).font = cellObjValue.font;
                }

                //add fill
                if (cellObjValue.hasOwnProperty('fill')) {
                    row.getCell(colNumber).fill = cellObjValue.fill;
                }

                //add border
                if (cellObjValue.hasOwnProperty('border')) {
                    row.getCell(colNumber).border = cellObjValue.border;
                }

                //add alignment
                if (cellObjValue.hasOwnProperty('alignment')) {
                    row.getCell(colNumber).alignment = cellObjValue.alignment;
                }

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
            }
        });
    });

    return sheet;
}