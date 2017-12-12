'use strict';

var Excel = require('exceljs');
const getSheetName = require('./getSheetName');
const tabContent = require('./tabContent');
const finalizeSheet = require('./finalizeSheet');
const insertImage = require('./insertImage');
const customizeWidth = require('./customizeWidth');
const setRowHeight = require('./setRowHeight');
const cloneDeep = require('lodash/cloneDeep');

// generate excel files based on template
const exportExcelByTemplate = function (templateExcelExport, data) {
    try {

        //new book, workbook
        let wb = new Excel.Workbook();
        wb.creator = 'My App';
        wb.properties.date1904 = true;

        //return if template is undefined
        if (
            typeof templateExcelExport == 'undefined' ||
            typeof templateExcelExport.sheets == 'undefined' ||
            typeof data == 'undefined'
        ) {
            return;
        }

        //code to generate the exceljs from data
        for (let index = 0, length = data.length; index < length; index++) {

            //getting the data at the index
            let dataForTab = data[index];
            let templateForTab = {};
            let sheetName = '';

            //If the data is not undefined and and have data at index will find the dataForTab
            if (typeof templateExcelExport.sheets[index] != 'undefined') {
                templateForTab = cloneDeep(templateExcelExport.sheets[index]);
            } else {
                templateForTab = cloneDeep(templateExcelExport.dynamicTabs);
            }

            //get the Tab/Sheet
            let tabSheeDataArray = tabContent(templateForTab, dataForTab);

            //get the Tab Name
            sheetName = getSheetName(templateForTab, dataForTab, wb, index);
            let sheet = wb.addWorksheet(sheetName);
            sheet.addRows(tabSheeDataArray);

            //insert image in sheet like disclaimer tab
            //sheet = insertImage(wb, sheet, templateForTab);

            //custumize column width
            //sheet = customizeWidth(sheet, templateForTab);

            //set height of each row in excel sheet
            sheet = setRowHeight(sheet, templateForTab);
            sheet = finalizeSheet(wb, sheet, templateForTab);
        }

        return wb;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = exportExcelByTemplate;