'use strict';

var plugin = {
    register: function (server, options, next) {
        var routes = [
            {
                method: "GET",
                path: "/export",
                handler: function (request, reply) {
                    var data = { key: 'value - twotab' }
                    reply(data).code(201)
                }
            },
            {
                method: "GET",
                path: "/export1",
                handler: function (request, reply) {
                    const { excelExport } = require('./demo1/image');
                    excelExport();
                    reply('Export1 - Done').code(201);
                }
            },
            {
                method: "GET",
                path: "/export2",
                handler: function (request, reply) {

                    //passing data, TODO:will be updated as payload
                    let { data } = require('./data');

                    const templateExcelExport = require('./template');
                    const { exportExcelTwoTab } = require('./transform');

                    //generate two tabes
                    let workbookExcel = exportExcelTwoTab(templateExcelExport.templateExcelExport, data);

                    // reply.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').se
                    // reply.header("Content-Disposition", `attachment; filename=${templateExcelExport.templateExcelExport.workbookName};`);

                    let fileName = `${(new Date()).getMilliseconds()}${templateExcelExport.templateExcelExport.workbookName}`;

                    workbookExcel.xlsx.writeFile(fileName).then(function () {
                        console.log("saved");
                        // res.download('test.xlsx'); 
                    });

                    reply("Done").code(200);
                    // .then(function () {
                    //     reply.end().type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                    //         .header('content-disposition', `attachment; filename=${templateExcelExport.templateExcelExport.workbookName};`);

                    // let buf = new Buffer(workbookStream, 'binary');
                    // return reply(buf)
                    //     .encoding('binary')
                    //     .type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                    //     .header('content-disposition', `attachment; filename=${templateExcelExport.templateExcelExport.workbookName};`);
                    //});

                    // //create buffer of workbook
                    // let buf = new Buffer(workbookExcel, 'binary');

                    // //download the buffer
                    // return reply(buf)
                    //     .encoding('binary')
                    //     .type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                    //     .header('content-disposition', `attachment; filename=${templateExcelExport.templateExcelExport.workbookName};`);

                }
            }
        ]

        server.route(routes);

        next();
    }
};

plugin.register.attributes = {
    name: "export-exceljs",
    version: "1.0.0"
}

module.exports = plugin;
