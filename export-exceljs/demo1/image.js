module.exports.excelExport = function () {
    var excel = require("exceljs");
    var workbook1 = new excel.Workbook();
    workbook1.creator = 'Me';
    workbook1.lastModifiedBy = 'Me';
    workbook1.created = new Date();
    workbook1.modified = new Date();
    var sheet1 = workbook1.addWorksheet('Sheet1');
    var imageId1 = workbook1.addImage({
        filename: 'd:/Ajaj/Learning/Git/exportexcel/export-exceljs/demo1/Ajaj-Ansari.jpg',
        extension: 'jpeg',
    });

    //sheet1.addImage(imageId1, 'B2:D6');
    var reColumns = [
        { header: 'FirstName', key: 'firstname' },
        { header: 'LastName', key: 'lastname' },
        { header: 'Other Name', key: 'othername' }
    ];

    sheet1.columns = reColumns;
    sheet1.getCell('A1').alignment = { wrapText: true };

    // // merge a range of cells
    // sheet1.mergeCells('A4:B5');

    // // ... merged cells are linked
    // sheet1.getCell('B5').value = 'Hello, World!';
    // expect(sheet1.getCell('B5').value).toBe(sheet1.getCell('A4').value);
    // expect(sheet1.getCell('B5').master).toBe(sheet1.getCell('A4'));

    // // merge by top-left, bottom-right
    // sheet1.mergeCells('G10', 'H12');
    //sheet1.mergeCells(10, 11, 12, 13); // top,left,bottom,right
    //sheet1.mergeCells(15, 2, 1, 1); // top,left,bottom,right
    //sheet1.mergeCells(15, 2, 15, 1); // top,left,bottom,right
    //sheet1.mergeCells(15, 2, 14, 5); // top,left,bottom,right
    //sheet1.mergeCells(15, 2, 14, 5); // top,left,bottom,right

    var rowCell = 15;
    var columnCell = 2;
    var mergeTotalCellRight = 5;
    var mergeTotalCellBottom = 2;

    sheet1.mergeCells(rowCell, columnCell, rowCell + mergeTotalCellBottom, columnCell + mergeTotalCellRight); // top,left,up/down,next

    //// fill A1 with red darkVertical stripes
    sheet1.getCell('A1').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFF00FF' },
        bgColor: { argb: 'FFFFF000' }
    };


    //// fill A1 with red darkVertical stripes
    sheet1.getCell('B1').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF808080' }
    };


    // fill A2 with yellow dark trellis and blue behind
    sheet1.getCell('A2').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF0000FF' },
        bgColor: { argb: 'FFFFF000' }
    };

    let fileName = `${(new Date()).getMilliseconds()}-CheckExcel.xlsx`;

    workbook1.xlsx.writeFile(fileName).then(function () {
        console.log("xlsx file is written.");
    });
}