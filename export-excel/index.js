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

                    let { exportExcelTwoTab } = require('./template/twotab/transform');

                    //passing data, TODO:will be updated as payload
                    var { data } = require('./data');

                    //generate two tabes
                    exportExcelTwoTab(request, reply, data);
                }
            },
            {
                method: "GET",
                path: "/twotabsdata",
                handler: function (request, reply) {

                    let { exportExcelTwoTab } = require('./template/twoTabData/transform');

                    //passing data, TODO:will be updated as payload
                    var { data } = require('./data');

                    //generate two tabes
                    exportExcelTwoTab(request, reply, data);
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

        next();
    }
};

plugin.register.attributes = {
    name: "export-excel",
    version: "1.0.0"
}

module.exports = plugin;
