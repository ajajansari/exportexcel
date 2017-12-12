'use strict';
const get = require('lodash/get');
module.exports = function(wb, sheet, template) {
    if (get(template, 'logo', false)) {
        let imageId = wb.addImage({
            filename: template.logo.url,
            extension: 'jpeg'
        });
        sheet.addImage(imageId, template.logo.path);
    }
    return sheet;
};