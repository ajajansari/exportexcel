'use strict';
const templateExcelExport = require('./research_template');
const templateDyanmicColumn = require('../export-exceljs/dynamicTemplate/template');
import { cube } from './cube';

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
            },
            {
                method: "GET",
                path: "/export3",
                handler: function (request, reply) {

                    //passing data, TODO:will be updated as payload
                    let { data } = require('./data_r');

                    const lodash = require('lodash');

                    const templateResearch = lodash.cloneDeep(templateExcelExport.templateExcelExport);
                    const { exportExcelTwoTab } = require('./transform');

                    //generate two tabes
                    let workbookExcel = exportExcelTwoTab(templateResearch, data);

                    // reply.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').se
                    // reply.header("Content-Disposition", `attachment; filename=${templateExcelExport.templateExcelExport.workbookName};`);

                    let fileName = `${(new Date()).getMilliseconds()}${templateResearch.workbookName}`;

                    workbookExcel.xlsx.writeFile(fileName).then(function () {
                        console.log("saved");
                        // res.download('test.xlsx');
                    });

                    reply("Done").code(200);
                }
            },
            {
                method: "GET",
                path: "/export4",
                handler: function (request, reply) {

                    //passing data, TODO:will be updated as payload
                    let { data } = require('../export-exceljs/dynamicTemplate/data');

                    const lodash = require('lodash');

                    const templateResearch = lodash.cloneDeep(templateDyanmicColumn.templateExcelExport);
                    const { exportExcelTwoTab } = require('./transform');

                    //generate two tabes
                    let workbookExcel = exportExcelTwoTab(templateResearch, data);

                    // reply.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').se
                    // reply.header("Content-Disposition", `attachment; filename=${templateExcelExport.templateExcelExport.workbookName};`);

                    let fileName = `${(new Date()).getMilliseconds()}${templateResearch.workbookName}`;

                    workbookExcel.xlsx.writeFile(fileName).then(function () {
                        console.log("saved");
                        // res.download('test.xlsx');
                    });

                    reply("Done").code(200);
                }
            },
            {
                method: "GET",
                path: "/export5",
                handler: function (request, reply) {

                    reply(cube(3)).code(200);
                }
            }
        ]

        server.route(routes);

        next();
    }
};

plugin.register.attributes = {
    name: "export-exceljs1",
    version: "1.0.0"
}

module.exports = plugin;
