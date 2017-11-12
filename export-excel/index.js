'use strict';

var plugin = {
    register: function (server, options, next) {
        var routes = [
            {
                method: "GET",
                path: "/",
                handler: function (request, reply) {
                    var data = { key: 'value - twotab' }
                    reply(data).code(201)
                }
            },
            {
                method: "GET",
                path: "/twotabs",
                handler: function (request, reply) {

                    //passing data, TODO:will be updated as payload
                    var { data } = require('./dataJson');

                    const templateExcelExport = require('./template/twotab/template');
                    const { exportExcelTwoTab } = require('./template/twotab/transform');

                    //generate two tabes
                    let excelTwoTab = exportExcelTwoTab(templateExcelExport.templateExcelExport, data);

                    //create buffer of workbook
                    let buf = new Buffer(excelTwoTab, 'binary');

                    //download the buffer
                    return reply(buf)
                        .encoding('binary')
                        .type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                        .header('content-disposition', `attachment; filename=${templateExcelExport.templateExcelExport.workbookName};`);

                }
            },
            {
                method: "GET",
                path: "/twotabsdata",
                handler: function (request, reply) {
                    //let data = request.payload;
                    //passing data, TODO:will be updated as payload
                    var { data } = require('./dataJson');

                    const templateExcelExport = require('./template/twoTabData/template');
                    const { exportExcelTwoTab } = require('./template/twoTabData/transform');

                    //generate two tabes
                    let excelTwoTab = exportExcelTwoTab(templateExcelExport.templateExcelExport, data);

                    //create buffer of workbook
                    let buf = new Buffer(excelTwoTab, 'binary');

                    //download the buffer
                    return reply(buf)
                        .encoding('binary')
                        .type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                        .header('content-disposition', `attachment; filename=${templateExcelExport.templateExcelExport.workbookName};`);
                }
            },
            {
                method: "GET",
                path: "/twotabshtml",
                handler: function (request, reply) {

                    let { exportExcelTwoTabHtml } = require('./template/htmlTwoTab/transform');

                    //passing data, TODO:will be updated as payload
                    var { data } = require('./data');

                    //generate two tabes
                    exportExcelTwoTabHtml(request, reply, data);
                }
            },
            {
                method: "GET",
                path: "/twotabsformatting",
                handler: function (request, reply) {
                    var formatting = require('./formatting');
                    var wbout = formatting.formatting();

                    //create buffer of workbook
                    let buf = new Buffer(wbout, 'binary');

                    //download the buffer
                    return reply(buf)
                        .encoding('binary')
                        .type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                        .header('content-disposition', `attachment; filename=wb.xlsx;`);
                }
            },
            {
                method: "GET",
                path: "/twotabsArray",
                handler: function (request, reply) {

                    let { exportExcelTwoTabArray } = require('./template/arrayOfArray/transform');

                    //passing data, TODO:will be updated as payload
                    var { dataArray } = require('./dataArray');

                    //generate two tabes
                    exportExcelTwoTabArray(request, reply, dataArray);
                }
            },
        ]

        server.route(routes);

        //this will load the template with header/table/template
        server.route([
            {
                method: 'POST',
                path: '/twotabs',
                handler: function (request, reply) {
                    try {
                        let data = request.payload;
                        //passing data, TODO:will be updated as payload
                        //var { data } = require('./data');

                        const { templateExcelExport } = require('./template/twoTab/template');
                        const { exportExcelTwoTab } = require('./template/twotab/transform');

                        //generate two tabes
                        let excelTwoTab = exportExcelTwoTab(templateExcelExport, data);

                        //create buffer of workbook
                        let buf = new Buffer(excelTwoTab, 'binary');

                        //download the buffer
                        return reply(buf)
                            .encoding('binary')
                            .type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                            .header('content-disposition', `attachment; filename=${templateExcelExport.workbookName};`);
                    } catch (err) {
                        request.log(['error'], `An error -- ${JSON.stringify(err)} -- occurred, while generating the excel.`);
                    }
                },
            },
        ]);


        next();
    }
};

plugin.register.attributes = {
    name: "export-excel",
    version: "1.0.0"
}

module.exports = plugin;
