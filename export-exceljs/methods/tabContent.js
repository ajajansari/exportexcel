'use strict';
const jsonToArrayOfArrayXlsxTemplate = require('./jsonToArrayOfArrayXlsxTemplate');

const {
  setHeaderFooterWithTemplate
} = require('./setHeaderFooterWithTemplate');

//this method return the body of the sheet based on the data given
const tabContent = function tabContent(template, excelData) {
  let dataArray = [];

  //apply the header data with template
  const headerArrWithTemplate = setHeaderFooterWithTemplate(template.header, excelData.header);
  dataArray = headerArrWithTemplate;

  //append extra lines
  for (let j = 0, length = template.spaceAfterHeader; j < length; j++) {
    dataArray.push([]);
  }

  //append data if any
  if (typeof excelData.data != 'undefined' && excelData.data.length > 0) {
    const dataColumnHeader = excelData.dataColumnHeader ? excelData.dataColumnHeader : {};
    dataArray = jsonToArrayOfArrayXlsxTemplate(dataColumnHeader, excelData.data, dataArray, template);
  }

  //append extra lines
  for (let l = 0, length = template.spaceAfterData; l < length; l++) {
    dataArray.push([]);
  }

  //apply the header data with template
  const footerArrWithTemplate = setHeaderFooterWithTemplate(template.footer, excelData.footer);
  dataArray = dataArray.concat(footerArrWithTemplate);

  return dataArray;
};

module.exports = tabContent;
