'use strict';

//this method will return Array of Array of a Json Object with Header at the Top position
let jsonToArrayOfArrayXlsxTemplate = function (objData, appendTodata, template) {
  let dataToAoA = appendTodata || [];

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
      headerValueTemplate.v = headerKey;

      //assign header value with template
      headerValue = headerValueTemplate;
    }
    else {
      //assign header
      headerValue = { v: headerKey };
    }

    //append header with template
    headerValues.push(headerValue);
  });

  //header with template
  dataToAoA.push(headerValues);

  //append items
  objData.forEach((data) => {
    let dataArray = [];

    //for each column in data
    headerKeys.forEach((headerKey) => {
      let dataValue = {};

      //assign the template to the column
      if (typeof template.dataValueTemplate != 'undefined' && template.dataValueTemplate.hasOwnProperty(headerKey)) {

        //get the column tempalte
        let dataValueTemplate = template.dataValueTemplate[headerKey];

        //get the data from the column
        let value = data[headerKey];

        //apply the link template to hyperlink column
        if (typeof value == 'object' && value.hasOwnProperty('type') && value['type'] === 'Uri') {
          //dataValueTemplate.v = value.hasOwnProperty('value') ? value['value'] : ""; //XLSX
          dataValueTemplate.value = value.hasOwnProperty('value') ? value['value'] : ""; //excelJs
          let target = value.hasOwnProperty('target') ? value['target'] : "";
          //dataValueTemplate.l = { Target: target, Tooltip: dataValueTemplate.v };
          dataValueTemplate.value = { text: dataValueTemplate.value, hyperlink: target }; //excelJs
        }
        else {
          dataValueTemplate.value = value;
        }

        //assign value with template
        dataValue = dataValueTemplate;
      }
      else {

        //get the data from the column
        let value = data[headerKey];
        var dataValueTemplate = {};
        //apply the link template to hyperlink column
        if (typeof value == 'object' && value.hasOwnProperty('type') && value['type'] === 'Uri') {
          //dataValueTemplate.v = value.hasOwnProperty('value') ? value['value'] : ""; //XLSX
          dataValueTemplate.value = value.hasOwnProperty('value') ? value['value'] : ""; //excelJs
          let target = value.hasOwnProperty('target') ? value['target'] : "";
          //dataValueTemplate.l = { Target: target, Tooltip: dataValueTemplate.v };
          dataValueTemplate.value = { text: dataValueTemplate.value, hyperlink: target }; //excelJs
        }
        else {
          //dataValueTemplate.v = value;
          dataValueTemplate.value = value; //excelJs
        }

        //assign value with template
        dataValue = dataValueTemplate;

      }

      //append the column data
      dataArray.push(dataValue);
    });

    //append data row
    dataToAoA.push(dataArray);
  });

  return dataToAoA;
};

module.exports.jsonToArrayOfArrayXlsxTemplate = jsonToArrayOfArrayXlsxTemplate;