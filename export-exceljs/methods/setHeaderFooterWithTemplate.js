'use strict';

const setDataWithTemplate = require('./setDataWithTemplate');

//method to apply header/footer with template
module.exports.setHeaderFooterWithTemplate = function(template, excelData) {
    let dataWithTemplate = [];

    let templatesProp = Object.keys(template);
    //append the templates values
    for (let i = 0, length = templatesProp.length; i < length; i++) {
        //template prop name
        let templatePropName = templatesProp[i];

        //template prop value
        let tmpltDataValue = {};
        if (typeof template != 'undefined' && template.hasOwnProperty(templatePropName)) {
            tmpltDataValue = template[templatePropName];
        }

        //data prop value
        let dataValue = '';
        if (typeof excelData != 'undefined' && excelData.hasOwnProperty(templatePropName)) {
            dataValue = excelData[templatePropName];
        }

        let dataWTemplate = setDataWithTemplate(tmpltDataValue, dataValue);
        dataWithTemplate.push([dataWTemplate]);
    }

    return dataWithTemplate;
};