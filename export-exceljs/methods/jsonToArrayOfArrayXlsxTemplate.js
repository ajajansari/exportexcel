'use strict';

const { setColumnHeader } = require('./setColumnHeader');
const { setGroupColumnHeader } = require('./setGroupColumnHeader');
const { setCellByDataType } = require('./setCellByDataType');
const isArray = require('lodash/isArray');
const groupBy = require('lodash/groupBy');


//this method will return Array of Array of a Json Object with Header at the Top position
const jsonToArrayOfArrayXlsxTemplate = function (objColumnHeader, objData, appendTodata, template) {
  let dataToAoA = appendTodata || [];
  //append header, header keys
  let headerKeys = Object.keys(objData[0]);

  // store header value with template
  let headerValues = [];

  // if has config and has column grouping
  if (objColumnHeader.hasOwnProperty('config') && objColumnHeader["config"].hasOwnProperty('columnGroup') && objColumnHeader["config"]['columnGroup']) {
    //Multi Header Column
    const columnHeaderValues = setGroupColumnHeader(template, objColumnHeader, headerKeys);
    if (isArray(columnHeaderValues)) {
      columnHeaderValues.forEach((headerValue) => {
        dataToAoA.push(headerValue);
      });
    }
  }
  else {
    // iterate with column to bind with template if template is there
    headerKeys.forEach((headerKey) => {
      const headerValue = setColumnHeader(template, objColumnHeader, headerKey);
      //append header with template
      headerValues.push(headerValue);
    });
  }

  //header with template
  dataToAoA.push(headerValues);

  // if has config and has column grouping
  if (objColumnHeader.hasOwnProperty('config') && objColumnHeader["config"].hasOwnProperty('rowGroup') && objColumnHeader["config"]['rowGroup']) {

    let objDataGroup = groupBy(objData, objColumnHeader["config"]["rowGroupKey"]);

    const objObjectGroupKeys = Object.keys(objDataGroup);

    objObjectGroupKeys.forEach((groupByValue) => {

      dataToAoA.push([{
        value: groupByValue,
        style: {
          fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF808080' },
          }
        }
      }]);

      const objDataAfterGroup = objDataGroup[groupByValue];

      //append items
      objDataAfterGroup.forEach((data) => {
        let dataArray = [];

        //for each column in data
        headerKeys.forEach((headerKey) => {

          const dataValueTemplate = setCellByDataType(template, objColumnHeader, data, headerKey);

          //append the column data
          dataArray.push(dataValueTemplate);
        });

        //append data row
        dataToAoA.push(dataArray);
      });

    });


  } else {
    //append items
    objData.forEach((data) => {
      let dataArray = [];

      //for each column in data
      headerKeys.forEach((headerKey) => {

        const dataValueTemplate = setCellByDataType(template, objColumnHeader, data, headerKey);

        //append the column data
        dataArray.push(dataValueTemplate);
      });

      //append data row
      dataToAoA.push(dataArray);
    });
  }

  return dataToAoA;
};

module.exports = jsonToArrayOfArrayXlsxTemplate;