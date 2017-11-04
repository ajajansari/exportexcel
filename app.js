var Boom = require('boom');

var baseRoutes = {
    register: function (server, options, next) {
        var routes = [
            {
                method: "GET",
                path: "/",
                handler: function (request, reply) {
                    var data = { key: 'value' }
                    reply(data).code(201)
                }
            },
            {
                method: "GET",
                path: "/error",
                handler: function (request, reply) {
                    var error = Boom.notFound('Cannot find the requested page');
                    reply(data).code(201)
                }
            }
        ]
    }
};


baseRoutes.register.attributes = {
    name: "response-status",
    version: "1.0.0"
}

module.exports = baseRoutes;