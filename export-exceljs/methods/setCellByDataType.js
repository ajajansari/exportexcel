'use strict';

const cloneDeep = require('lodash/cloneDeep');
const get = require('lodash/get');

module.exports.setCellByDataType = function (template, objColumnHeader, data, headerKey) {
  let dataValueTemplate = {};

  //assign the template to the column
  if (typeof template.dataValueTemplate !== 'undefined' && template.dataValueTemplate.hasOwnProperty(headerKey)) {
    //get the column tempalte
    dataValueTemplate = cloneDeep(template.dataValueTemplate[headerKey]);
  }
  //get the data from the column
  const value = data[headerKey];

  //apply the template and set data of different type of data type in cell
  if (typeof value == 'object' && objColumnHeader[headerKey] && objColumnHeader[headerKey].hasOwnProperty('type')) {
    const valueType = String(objColumnHeader[headerKey]["type"]).toLocaleLowerCase();
    const rowCellValue = get(value, 'value', "");
    let numFormat = '';
    dataValueTemplate.value = rowCellValue;
    switch (valueType) {
      case "uri":
        const target = get(value, 'target', "");
        dataValueTemplate.value = {
          text: rowCellValue,
          hyperlink: target
        };
        break;
      case "date":
        numFormat = get(objColumnHeader[headerKey], 'numFormat', "DD-MMM-YYYY");
        dataValueTemplate.isDate = true;
        dataValueTemplate.numFmt = numFormat;
        break;
      case "num":
        numFormat = get(objColumnHeader[headerKey], 'numFormat', "");
        dataValueTemplate.numFmt = numFormat;
        break;
    }
  } else {
    dataValueTemplate.value = value;
  }
  return dataValueTemplate;
}