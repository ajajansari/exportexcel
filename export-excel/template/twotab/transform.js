'use strict';

const { tabContent } = require('../../methods/tabContent');

// generate two tab excel files
let exportExcelTwoTab = function (templateExcelExport, data) {
    try {
        //object of xlsx
        const XLSX = require('xlsx');

        //new book, workbook
        let wb = XLSX.utils.book_new();

        //return if template is undefined
        if (!templateExcelExport || !templateExcelExport.sheets) {
            return;
        }

        //code to generate the xlsx from template
        for (let index = 0, length = templateExcelExport.sheets.length; index < length; index++) {
            //getting the data at the index
            let dataForTab = {
                name: '',
                header: {},
                data: [],
            };
            let sheetName = '';

            //If the data is not undefined and and have data at index will find the dataForTab
            //sheet name, if available in the data/config then take from there else template
            if (typeof data != 'undefined' && typeof data[index] != 'undefined') {
                dataForTab = data[index];
                sheetName = data[index].name;
            } else {
                sheetName = templateExcelExport.sheets[index].name;
            }

            //get the Tab/Sheet
            let tabSheeDataArray = tabContent(templateExcelExport.sheets[index], dataForTab);

            //generate/create as new sheet
            let ws = XLSX.utils.aoa_to_sheet(tabSheeDataArray);

            //append tabs/sheets to workbook
            XLSX.utils.book_append_sheet(wb, ws, sheetName);
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