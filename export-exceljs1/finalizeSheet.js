const Excel = require('exceljs');
const lodash = require('lodash');

module.exports.finalizeSheet = function (sheet, template) {
    sheet.eachRow(function (row, rowNumber) {
        row.eachCell(function (cell, colNumber) {
            let cellObjValue = cell.value;
            if (lodash.isObject(cellObjValue)) {

                //add value
                //const cellValue = lodash.get(cellObjValue, 'value', '');
                const cellValue = cellObjValue.hasOwnProperty('value') ? cellObjValue.value : "";

                // if (cellObjValue.hasOwnProperty('l')) {//add hyperlink
                //     row.getCell(colNumber).value = { text: cellValue, hyperlink: cellObjValue.l.Target };
                // }
                // else if (cellObjValue.hasOwnProperty('numFmt')) {//add format

                //     //add date formatting
                //     const cellFormatValue = (cellObjValue.hasOwnProperty('isDate') && cellObjValue.isDate) ? new Date(cellValue) : cellValue;

                //     row.getCell(colNumber).value = cellFormatValue;
                //     row.getCell(colNumber).numFmt = cellObjValue.numFmt;
                // }
                // else {//add string
                //     row.getCell(colNumber).value = cellValue;
                // }


                if (cellObjValue.hasOwnProperty('numFmt')) {//add format
                    const cellFormatValue = (cellObjValue.hasOwnProperty('isDate') && cellObjValue.isDate) ? new Date(cellValue) : cellValue;
                    row.getCell(colNumber).value = cellFormatValue;
                    row.getCell(colNumber).numFmt = cellObjValue.numFmt;
                }
                else {
                    row.getCell(colNumber).value = cellValue;
                }

                //add styles/fonts
                if (cellObjValue.hasOwnProperty('style')) {
                    row.getCell(colNumber).style = cellObjValue.style;
                }

                // //add fill
                // if (cellObjValue.hasOwnProperty('fill')) {
                //     row.getCell(colNumber).fill = cellObjValue.fill;
                // }

                // //add border
                // if (cellObjValue.hasOwnProperty('border')) {
                //     row.getCell(colNumber).border = cellObjValue.border;
                // }

                // //add alignment
                // if (cellObjValue.hasOwnProperty('alignment')) {
                //     row.getCell(colNumber).alignment = cellObjValue.alignment;
                // }

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

    if (template.hasOwnProperty('views')) {
        sheet.views = template.views
    }

    sheet.addRow("").commit();

    return sheet;
}