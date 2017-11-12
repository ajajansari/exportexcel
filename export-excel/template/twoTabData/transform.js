'use strict';

const XLSX = require('xlsx');
const { tabContent } = require('../../methods/tabContent');

// generate two tab excel files
let exportExcelTwoTab = function (templateExcelExport, data) {
    try {

        //new book, workbook
        let wb = require('../../methods/workbook')(XLSX);

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
            wb.addRowsToSheet(sheetName, tabSheeDataArray).finalize();
        }

        //code to write sheet to workbook
        let wbout = XLSX.write(wb, {
            type: 'binary',
            bookType: 'xlsx',
        });

        //returning workbook output
        return wbout;
    } catch (error) {
        throw error;
    }
};

module.exports.exportExcelTwoTab = exportExcelTwoTab;