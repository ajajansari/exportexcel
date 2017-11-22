var XLSX = require('xlsx');

module.exports.exportExcel = function () {

    function Workbook() {

        if (!(this instanceof Workbook)) return new Workbook();

        this.SheetNames = [];

        this.Sheets = {};

    }



    function imgToDataUrl(img) {

        // var canvas = document.createElement('canvas');

        // canvas.width = img.naturalWidth; // or 'width' if you want a special/scaled size

        // canvas.height = img.naturalHeight; // or 'height' if you want a special/scaled size



        // canvas.getContext('2d').drawImage(img, 0, 0);

        // return canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, '');



        return "R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7";



    }



    var images = [];

    var wb = new Workbook();

    var ws_name = "SheetJS";

    wb.SheetNames.push(ws_name);

    var ws = {};

    var rows = [

        ["Header1", "Header2", "Header3"],

        ["Column1", "Column2", "Column3"],

        ["Column1", "Column2", "Column3"]

    ];

    var rowsCount = rows.length;

    var colsCount = 3;

    var range = { s: { c: 0, r: 0 }, e: { c: colsCount - 1, r: rowsCount - 1 } };

    ws['!ref'] = XLSX.utils.encode_range(range);



    for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {

        var row = rows[rowIndex];



        var cols = row;



        for (var colIndex = 0; colIndex < cols.length; colIndex++) {

            var col = cols[colIndex];

            var cell_ref = XLSX.utils.encode_cell({ c: colIndex, r: rowIndex });

            var excelCell = {

                v: col,

                t: "s",

                s: {

                    fill: {

                        patternType: "none",

                        fgColor: { rgb: "FF000000" },

                        bgColor: { rgb: "FFFFFFFF" }

                    },

                    font: {

                        name: 'Times New Roman',

                        sz: 16,

                        color: { rgb: "#FF000000" },

                        bold: false,

                        italic: false,

                        underline: false

                    },

                    border: {

                        top: { style: "thin", color: { auto: 1 } },

                        right: { style: "thin", color: { auto: 1 } },

                        bottom: { style: "thin", color: { auto: 1 } },

                        left: { style: "thin", color: { auto: 1 } }

                    }

                }

            };



            if (rowIndex == 0) {

                excelCell.s.font.bold = true;

                excelCell.s.fill.patternType = "solid";

                excelCell.s.fill.fgColor = {

                    rgb: "FFFF0000"

                };

                excelCell.s.fill.bgColor = {

                    rgb: "FFFF0000"

                };

            }



            if (col = 'image') {

                images.push({

                    c: colIndex,

                    r: rowIndex,

                    element: col

                })

            }

            ws[cell_ref] = excelCell;

        }

    }

    ws["!images"] = [];



    // $.each(images, function(index, image) {

    //     ws["!images"].push({

    //         name: 'image' + index + '.png',

    //         data: imgToDataUrl(image.element),

    //         opts: { base64: true },

    //         type: "png",

    //         position: {

    //             type: 'twoCellAnchor',

    //             attrs: { editAs: 'oneCell' },

    //             from: { col: image.c, row:  image.r },

    //             to: { col: image.c + 1, row:  image.r + 1 }

    //         }

    //     });

    // });

    wb.Sheets[ws_name] = ws;

    return {

        exportToExcel: function () {

            var wbout = XLSX.write(wb, { bookType: "xlsx", bookSST: true, type: 'binary' });

            return wbout;

        }

    }

}


