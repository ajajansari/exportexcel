'use strict';

//const XLSX = require('xlsx');
var Excel = require('exceljs');
const { tabContent } = require('../export-excel/methods/tabContent');
const { finalizeSheet } = require('./finalizeSheet');

// generate two tab excel files
let exportExcelTwoTab = function (templateExcelExport, data) {
    try {

        //new book, workbook
        //let wb = require('../export-excel/methods/workbook')(XLSX);
        let wb = new Excel.Workbook();
        wb.creator = 'Aj';
        wb.lastModifiedBy = 'Aj';
        wb.created = new Date();
        wb.modified = new Date();
        wb.lastPrinted = new Date();
        wb.properties.date1904 = true;

        //return if template is undefined
        if (
            typeof templateExcelExport == 'undefined' ||
            typeof templateExcelExport.sheets == 'undefined' ||
            typeof data == 'undefined'
        ) {
            return;
        }

        //code to generate the xlsx from data
        for (let index = 0, length = data.length; index < length; index++) {

            //getting the data at the index
            let dataForTab = data[index];
            let templateForTab = {};
            let sheetName = '';

            //If the data is not undefined and and have data at index will find the dataForTab
            if (typeof templateExcelExport.sheets[index] != 'undefined') {
                templateForTab = templateExcelExport.sheets[index];
            } else {
                templateForTab = JSON.parse(JSON.stringify(templateExcelExport.dynamicTabs));
                //Object.assign(templateForTab, templateExcelExport.dynamicTabs);
            }

            //sheet name, if available in the data/config then take from there else template
            if (data[index].hasOwnProperty('name')) {
                sheetName = `${data[index].name} - ${index}`;
            } else {
                sheetName = `${templateForTab.name} - ${index}`;
            }

            //get the Tab/Sheet
            let tabSheeDataArray = tabContent(templateForTab, dataForTab);

            //append tabs/sheets to workbook
            //wb.addRowsToSheet(sheetName, tabSheeDataArray).finalize();

            let sheet = wb.addWorksheet(sheetName, { views: [{ xSplit: 1, ySplit: 1 }] });
            sheet.addRows(tabSheeDataArray);
            //sheet.addRow("").commit();
            //sheet.commit();

            sheet = finalizeSheet(sheet);

            sheet.addRow("").commit();
        }

        return wb;

        // //code to write sheet to workbook
        // let wbout = XLSX.write(wb, {
        //     type: 'binary',
        //     bookType: 'xlsx',
        // });

        // //returning workbook output
        // return wbout;
    } catch (error) {
        throw error;
    }
};

module.exports.exportExcelTwoTab = exportExcelTwoTab;