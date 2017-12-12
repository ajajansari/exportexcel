'use strict';
const cloneDeep = require('lodash/cloneDeep');
module.exports.setColumnHeader = function (template, objColumnHeader, headerKey) {
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
  if (objColumnHeader[headerKey] && objColumnHeader[headerKey].hasOwnProperty("displayName")) {
    headerValue.value = objColumnHeader[headerKey]["displayName"];
  } else {
    headerValue.value = headerKey;
  }
  return headerValue;
}
