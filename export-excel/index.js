'use strict';

let { exportExcelTwoTab } = require('./template/twotab/transform');

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
                    var { data } = require('./data');

                    //generate two tabes
                    exportExcelTwoTab(request, reply, data);
                }
            }
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
