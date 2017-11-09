const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let { templateExcelExport } = require('./template');

// generate two tab excel files
var exportExcelTwoTabHtml = function (req, res, data) {

    try {

        //object of xlsx
        var XLSX = require('xlsx');

        //new book, workbook
        var wb = XLSX.utils.book_new();

        //return if template is undefined
        if (templateExcelExport == undefined || templateExcelExport.sheets == undefined) return;

        //code to generate the xlsx from template
        for (let index = 0; index < templateExcelExport.sheets.length; index++) {

            //getting the data at the index
            let _dataForTab = (data != undefined && data[index] != undefined) ? data[index] : { name: "", header: {}, data: [] };

            ////get the Tab/Sheet
            //let _tabSheeDataArray = returnTabContent(templateExcelExport.sheets[index], _dataForTab);

            ////generate/create as new sheet
            //let ws = XLSX.utils.table_to_sheet(_tabSheeDataArray);

            const dom = new JSDOM(`<table><tr><td><b>Hello world</b></td></tr></table>`);
            let ws = XLSX.utils.table_to_sheet(dom);
            
            //sheet name, if available in the data/config then take from there else template
            let _sheetName = data != undefined ?
                (data[index] != undefined ? data[index].name : templateExcelExport.sheets[index].name) : templateExcelExport.sheets[index].name;

            //append tabs/sheets to workbook
            XLSX.utils.book_append_sheet(wb, ws, _sheetName);

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
    function returnTabContent(template, excelData) {
        //
        var _dataArray = [];
        var _headers = getKeys(template.header);

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

module.exports.exportExcelTwoTabHtml = exportExcelTwoTabHtml;