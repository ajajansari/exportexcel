'use strict'
const Excel = require('exceljs');
const isObject = require('lodash/isObject');
const mergeCells = require('./mergeCells');
const setCellValue = require('./setCellValue');
const setCellFormat = require('./setCellFormat');
const setCellStyle = require('./setCellStyle');
module.exports = function(wb, sheet, template) {
    sheet.eachRow(function(row, rowNumber) {
        row.eachCell(function(cell, colNumber) {
            let cellObjValue = cell.value;
            if (isObject(cellObjValue)) {

                let rowCell = row.getCell(colNumber);
                //set cell value
                rowCell.value = setCellValue(cellObjValue);

                //set cell format
                const cellFormat = setCellFormat(cellObjValue);
                if (cellFormat) {
                    rowCell.numFmt = cellFormat;
                }

                //set cell style
                const cellStyle = setCellStyle(cellObjValue);
                if (cellStyle) {
                    rowCell.style = cellStyle;
                }
                sheet = mergeCells(sheet, rowNumber, colNumber, cellObjValue);
            }
        });
    });

    if (template.hasOwnProperty('views')) {
        sheet.views = template.views;
    }

    sheet.addRow("").commit();

    return sheet;
}