'use strict';

const { jsonToArrayOfArrayXlsxTemplate } = require('./jsonToArrayOfArrayXlsxTemplate');

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
    let tmpltHeaderValue = {};
    if (typeof template.header != "undefined" && template.header.hasOwnProperty(headerPropName)) {
      tmpltHeaderValue = template.header[headerPropName];
    }

    //data header prop value
    let dataHeaderValue = "";
    if (typeof excelData.header != "undefined" && excelData.header.hasOwnProperty(headerPropName)) {
      dataHeaderValue = excelData.header[headerPropName];
    }

    //generate the header
    let headerData = {};

    //apply header with template
    if (typeof tmpltHeaderValue == 'object') {
      headerData = tmpltHeaderValue;
      if (tmpltHeaderValue.hasOwnProperty('v')) {
        headerData.value = `${tmpltHeaderValue.v}${dataHeaderValue}`;
      }
      else {
        headerData.value = dataHeaderValue;
      }
    }
    else {
      headerData.value = `${tmpltHeaderValue}${dataHeaderValue}`;
    }

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

    //template header prop value
    let tmpltFooterValue = "";
    if (typeof template.footer != "undefined" && template.footer.hasOwnProperty(footerPropName)) {
      tmpltFooterValue = template.footer[footerPropName];
    }

    //data footer prop value
    let dataFooterValue = "";
    if (typeof excelData.footer != "undefined" && excelData.footer.hasOwnProperty(footerPropName)) {
      dataFooterValue = excelData.footer[footerPropName];
    }

    //generate the footer
    let footerData = {};

    //apply footer with template
    if (typeof tmpltFooterValue != 'undefined' && typeof tmpltFooterValue == 'object') {
      footerData = tmpltFooterValue;
      if (tmpltFooterValue.hasOwnProperty('v')) {
        footerData.value = `${tmpltFooterValue.v}${dataFooterValue}`;
      }
      else {
        footerData.value = dataFooterValue;
      }
    }
    else {
      footerData.value = `${tmpltFooterValue}${dataFooterValue}`;
    }

    dataArray.push([footerData]);
  }

  return dataArray;
};

module.exports.tabContent = tabContent;