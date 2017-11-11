'use strict';

let { jsonToArrayOfArrayXlsxTemplate } = require('./jsonToArrayOfArrayXlsxTemplate');

//this method return the body of the sheet based on the data given
const tabContent = function tabContent(template, excelData) {
  //
  let dataArray = [];
  let headersProp = Object.keys(template.header);

  //append the headers
  for (let i = 0, length = headersProp.length; i < length; i++) {
    //header prop name
    let headerPropName = headersProp[i];

    //template header prop value
    let tmpltHeaderValue = template.header.hasOwnProperty(headerPropName) ? template.header[headerPropName] : '';

    //data header prop value
    let dataHeaderValue = excelData.header.hasOwnProperty(headerPropName) ? excelData.header[headerPropName] : '';

    //generate the header
    let headerData = String(`${tmpltHeaderValue}${dataHeaderValue}`).trim();

    dataArray.push([headerData]);
  }

  //append extra lines
  for (let j = 0, length = template.spaceAfterHeader; j < length; j++) {
    dataArray.push([]);
  }

  //append data if any
  if (typeof excelData.data != 'undefined' && excelData.data.length > 0) {
    dataArray = jsonToArrayOfArrayXlsxTemplate(excelData.data, dataArray, template);
  }

  //append extra lines
  for (let l = 0, length = template.spaceAfterData; l < length; l++) {
    dataArray.push([]);
  }

  //append footer from template
  let footersProp = Object.keys(template.footer);
  for (let m = 0, length = footersProp.length; m < length; m++) {
    //footer prop name
    let footerPropName = footersProp[m];
    let tmpltFooterValue = template.footer.hasOwnProperty(footerPropName) ? template.footer[footerPropName] : '';
    dataArray.push([tmpltFooterValue]);
  }

  return dataArray;
};

module.exports.tabContent = tabContent;