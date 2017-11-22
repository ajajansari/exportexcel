'use strict';

let Hapi = require('hapi');
let server = new Hapi.Server();
let port = 7264;
server.connection({ host: 'localhost', port: port });

server.register([
    {
        register: require('./export-excel/index.js')
    },
    {
        register: require('./export-exceljs/index.js')
    }
], function (err) {
    if (err) {
        //console.log(JSON.stringify(err));
        throw err;
    }

    server.start(function (err) {
        if (err) {
            console.log(JSON.stringify(err));
            throw err;
        }
        console.log('Serving HTTP on port ' + port);
        server.log("info", "server running at: " + server.info.uri);
    })

})