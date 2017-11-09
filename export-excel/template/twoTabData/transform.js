
let { templateExcelExport } = require('./template');

// generate two tab excel files
var exportExcelTwoTab = function (req, res, data) {

    try {

        //object of xlsx
        var XLSX = require('xlsx');

        //new book, workbook
        var wb = XLSX.utils.book_new();

        //return if template & data is undefined
        if (!templateExcelExport || !templateExcelExport.sheets || !data) return;

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
                templateForTab = templateExcelExport.dynamicTabs;
            }
            //sheet name, if available in the data/config then take from there else template
            if (data[index].hasOwnProperty('name')) {
                sheetName = data[index].name + " - " + index;
            } else {
                console.log(JSON.stringify(templateForTab));
                sheetName = templateForTab.name + " - " + index;
            }

            //get the Tab/Sheet
            let tabSheeDataArray = tabContent(templateForTab, dataForTab);

            //generate/create as new sheet
            let ws = XLSX.utils.aoa_to_sheet(tabSheeDataArray);

            //append tabs/sheets to workbook
            XLSX.utils.book_append_sheet(wb, ws, sheetName);

        }

        //code to write sheet to workbook
        var wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });

        //create buffer of workbook
        let buf = new Buffer(wbout, 'binary');

        //download the buffer
        return res(buf)
            .encoding('binary')
            .type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            .header('content-disposition', `attachment; filename=${templateExcelExport.workbookName};`);

    } catch (error) {
        console.log(error);
    }

    //get the object properties
    function getKeys(obj) {
        var keys = [];
        for (var key in obj) {
            keys.push(key);
        }
        return keys;
    }

    //this method return the body of the sheet based on the data given
    function tabContent(template, excelData) {
        //
        var _dataArray = [];
        var _headers = Object.keys(template.header);

        //append the headers
        for (var i = 0; i < _headers.length; i++) {

            //generate the header
            var _hdData = String(template.header[_headers[i]] + (excelData.header[_headers[i]] != undefined ? excelData.header[_headers[i]] : "")).trim();

            _dataArray.push([_hdData]);
        }

        //append extra lines
        for (var i = 0; i < template.spaceAfterHeader; i++) {
            _dataArray.push([]);
        }

        //append data if any
        if (excelData.data != undefined) {
            for (var i = 0; i < excelData.data.length; i++) {
                _dataArray.push(excelData.data[i]);
            }
        }

        //append extra lines
        for (var i = 0; i < template.spaceAfterData; i++) {
            _dataArray.push([]);
        }

        //appned footer from template
        var _footer = getKeys(template.footer);
        for (var i = 0; i < _footer.length; i++) {
            _dataArray.push([template.footer[_footer[i]]]);
        }

        return _dataArray;
    }
}

module.exports.exportExcelTwoTab = exportExcelTwoTab;