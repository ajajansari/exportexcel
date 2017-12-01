'use strict';

const lodash = require('lodash');

//this method will return Array of Array of a Json Object with Header at the Top position
const jsonToArrayOfArrayXlsxTemplate = function (objData, appendTodata, template) {
  let dataToAoA = appendTodata || [];
  const get = require('lodash/get');
  //append header, header keys
  let headerKeys = Object.keys(objData[0]);

  // store header value with template
  let headerValues = [];

  // iterate with column to bind with template if there
  headerKeys.forEach((headerKey) => {
    let headerValue = {};

    // apply template for data header
    if (typeof template.dataHeaderTemplate != 'undefined' && template.dataHeaderTemplate.hasOwnProperty(headerKey)) {

      //get the template
      let headerValueTemplate = template.dataHeaderTemplate[headerKey];

      //assign value to the template
      headerValueTemplate.value = headerKey;

      //assign header value with template
      headerValue = headerValueTemplate;
    } else // apply template for data header
      if (typeof template.dataHeaderTemplate != 'undefined' && template.dataHeaderTemplate.hasOwnProperty('columnStyle')) {

        //get the template
        let headerValueTemplate = template.dataHeaderTemplate['columnStyle'];

        //assign value to the template
        headerValueTemplate.value = headerKey;

        //assign header value with template
        headerValue = headerValueTemplate;
      } else {
        //assign header
        headerValue = { value: headerKey };
      }

    //append header with template
    headerValues.push(lodash.cloneDeep(headerValue));
  });

  //header with template
  dataToAoA.push(lodash.cloneDeep(headerValues));

  //append items
  objData.forEach((data) => {
    let dataArray = [];

    //for each column in data
    headerKeys.forEach((headerKey) => {
      let dataValueTemplate = new Object;
      //assign the template to the column
      if (typeof template.dataValueTemplate != 'undefined' && template.dataValueTemplate.hasOwnProperty(headerKey)) {

        //get the column tempalte
        dataValueTemplate = template.dataValueTemplate[headerKey];
      }
      //get the data from the column
      let value = data[headerKey];

      //apply the link template to hyperlink column
      if (typeof value == 'object' && value.hasOwnProperty('type')) {
        const valueType = String(value['type']).toLocaleLowerCase();
        const recodValue = get(value, 'value', "");
        let numFormat = '';
        dataValueTemplate.value = recodValue;
        switch (valueType) {
          case "uri":
            const target = get(value, 'target', "")
            dataValueTemplate.value = { text: recodValue, hyperlink: target };
            break;
          case "date":
            numFormat = get(value, 'numFormat', "DD-MMM-YYYY");
            dataValueTemplate.isDate = true;
            dataValueTemplate.numFmt = numFormat;
            break;
          case "num":
            numFormat = get(value, 'numFormat', "");
            dataValueTemplate.numFmt = numFormat;
            break;
        }
      } else {
        dataValueTemplate.value = value;
      }
      //append the column data
      dataArray.push(lodash.cloneDeep(dataValueTemplate));
    });

    //append data row
    dataToAoA.push(lodash.cloneDeep(dataArray));
  });

  return dataToAoA;
};

module.exports.jsonToArrayOfArrayXlsxTemplate = jsonToArrayOfArrayXlsxTemplate;