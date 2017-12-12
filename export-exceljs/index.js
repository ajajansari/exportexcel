'use strict';

const Joi = require('joi');
const Boom = require('boom');
const exportExcelByTemplate = require('./methods/transform');
const researchTemplate = require('./template/researchList/template');
const dynamicColumnTemplate = require('./template/dynamicColumn/template');
const groupColumnTemplate = require('./template/groupColumns/template');
const cloneDeep = require('lodash/cloneDeep');
const unstream = require('unstream');

module.exports.register = function (server, options, next) {
  server.log(['debug'], `Registering Export-ExcelJs Plugin at ${server.realm.modifiers.route.prefix}`);

  //payload validation
  const payLoadValidate = {
    payload: Joi.array()
      .min(2)
      .items(
      Joi.object().keys({
        name: Joi.string().min(2),
        header: Joi.object().required(),
        dataColumnHeader: Joi.object(),
        data: Joi.array().required(),
        footer: Joi.object(),
      })
      ),
  };

  //handler request using template to get the excel export
  const handlerWithTemplate = (request, reply, template) => {
    // Block unauthorized access
    // const fc_auth = request.state.fc_auth;
    // if (!fc_auth) {
    //   reply(Boom.unauthorized('You must be logged in to use this service.'));
    // }

    try {
      let data = request.payload;

      //generate excels
      let excelWb = exportExcelByTemplate(template, data);

      excelWb.xlsx.write(unstream({}, function (data) {
        // data is your buffer
        let buf = new Buffer(data, 'binary');

        //download the buffer
        return reply(buf)
          .encoding('binary')
          .type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
          .header('content-disposition', `attachment; filename=${template.workbookName};`);
      }));

    } catch (err) {
      let msg = `An error -- ${JSON.stringify(err)} -- occurred, while generating the excel.`;
      server.log(['error'], msg);
      return reply(Boom.badRequest('We errored!.'));
    }
  };

  //Home Request to Validate Export Plugin in Available
  server.route([{
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply('Export Excel Plugin Loaded Tested');
    },
  }]);

  //this will load the data with research list Template
  server.route([{
    method: 'POST',
    path: '/research',
    config: {
      validate: payLoadValidate,
      handler: function (request, reply) {
        const templateResearch = cloneDeep(researchTemplate.templateExcelExport);
        handlerWithTemplate(request, reply, templateResearch);
      },
    },
  }]);

  //this will export excel with dynamic column template
  server.route([{
    method: 'POST',
    path: '/dynamicColumn',
    config: {
      validate: payLoadValidate,
      handler: function (request, reply) {
        const templateDynamicColumn = cloneDeep(dynamicColumnTemplate.templateExcelExport);
        handlerWithTemplate(request, reply, templateDynamicColumn);
      },
    },
  }]);

  //this will export excel with dynamic column Group template
  server.route([{
    method: 'POST',
    path: '/groupColumn',
    config: {
      validate: payLoadValidate,
      handler: function (request, reply) {
        const templateGroupColumn = cloneDeep(groupColumnTemplate.templateExcelExport);
        handlerWithTemplate(request, reply, templateGroupColumn);
      },
    },
  }]);

  //return 404 when routing not found
  server.route([{
    method: [
      'GET',
      'POST',
    ],
    path: '/{path*}',
    handler: function (request, reply) {
      reply(Boom.notFound('Method Not Found'));
    },
  }]);

  next();
};

module.exports.register.attributes = {
  pkg: require('./package.json')
};
