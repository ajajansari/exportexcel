var XLSX = require('js-xlsx');
var Workbook = require('../workbook')(XLSX);

var formatting = function () {

    var workbook = Workbook.addRowsToSheet("Main", [
        [{ v: "This is a merged cell", l: { Target: "http://sheetjs.com", Tooltip: "sds" }, "s": { font: { bold: true } } }],
        [
            { "v": "Bold", "s": { font: { bold: true } } },
            { "v": "Italic", "s": { font: { italic: true } } },
            { "v": "Underline", "s": { font: { underline: true } } },
            { "v": "Strike", "s": { font: { strike: true } } },
            { "v": "Outline", "s": { font: { outline: true } } }
        ],
        [
            {
                "v": "Blank", "s": {
                    bold: true,
                    font: 'Arial',
                    size: 16,
                    fg_color: '#ffffff',
                    bg_color: '#000000',
                }
            },
            { "v": "Red", "s": { color: { rgba: "FFFF0000" } } },
            { "v": "Green", "s": { fill: { fgColor: { rgb: "FF00FF00" } } } },
            { "v": "Blue", "s": { fill: { fgColor: { rgb: "FF0000FF" } } } }
        ],
        [
            { "v": "Default" },
            { "v": "Arial", "s": { font: { name: "Arial", sz: 24 } } },
            { "v": "Times New Roman", "s": { font: { name: "Times New Roman", sz: 16 } } },
            { "v": "Courier New", "s": { font: { name: "Courier New", sz: 14 } } }
        ],
        [
            0.618033989,
            { "v": 1618033989, "t": "n", z: '$#,###,###,###.00' },
            { "v": 618033989, "t": "n", z: '$#,###,###,###.00' },
            { "v": 33989, "t": "n", z: '$000,000,000,000,000.00' },
            { "v": 0.618033989, "t": "n" },
            { "v": 0.618033989, "t": "n", z: "0%" },
            { "v": 0.618033989, "t": "n", z: "\"T\"\ #0.00%" },
            { "v": (new Date()) },
        ]
    ]).setFreeze("Main").finalize();

    // var OUTFILE = 'wb.xlsx';
    // var wbOut = XLSX.writeFile(workbook, OUTFILE, { defaultCellStyle: { font: { name: 'Arial', sz: '12' } } });

    // return wbOut;

    //code to write sheet to workbook
    var wbout = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });

    return wbout;

}

module.exports.formatting = formatting;