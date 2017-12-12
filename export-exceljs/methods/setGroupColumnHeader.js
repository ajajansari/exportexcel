'use strict';
const cloneDeep = require('lodash/cloneDeep');
module.exports.setGroupColumnHeader = function (template, objColumnHeader, headerKeys) {

  let headerColumnRowCollection = [];

  let columnGroupCount = 1;

  if (objColumnHeader.hasOwnProperty('config') && objColumnHeader["config"].hasOwnProperty('columnGroupCount') && objColumnHeader["config"]['columnGroupCount']) {
    columnGroupCount = parseInt(objColumnHeader["config"]['columnGroupCount']);
  }

  for (let index = (columnGroupCount - 1); index >= 0; index--) {
    let headerValues = [];
    headerKeys.forEach((headerKey) => {
      let headerValue = {};

      // apply template for data header
      if (typeof template.dataHeaderTemplate !== 'undefined' && template.dataHeaderTemplate.hasOwnProperty(headerKey)) {
        //get the template
        headerValue = cloneDeep(template.dataHeaderTemplate[headerKey]);
      } else if (typeof template.dataHeaderTemplate !== 'undefined' && template.dataHeaderTemplate.hasOwnProperty('columnStyle')) {
        //get the template
        headerValue = cloneDeep(template.dataHeaderTemplate['columnStyle']);
      }

      //assign header value
      if (objColumnHeader[headerKey] && objColumnHeader[headerKey].hasOwnProperty("displayName") && objColumnHeader[headerKey]["displayName"][index]) {
        headerValue.value = objColumnHeader[headerKey]["displayName"][index];
      } else {
        headerValue.value = "";
      }
      headerValues.push(headerValue);
    });
    headerColumnRowCollection.push(headerValues);
  }
  return headerColumnRowCollection;
}
