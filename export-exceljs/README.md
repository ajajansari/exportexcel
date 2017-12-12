# Installing the exceljs
# npm install exceljs --save
# Install's the latest version of exceljs

### Starting the Hapi server
# From the '\services' run 'node index.js'

1. Build Hapi server using pulgins.
2. Configure `index.js` file.


### Folder and File structure
service/
    |─── export-exceljs/
            |─── methods/
                  |─── getSheetName.js
                  |─── jsonToArrayOfArrayXlsxTemplate.js
                  |─── setDataWithTemplate.js
                  |─── setHeaderFooterWithTemplate.js
                  |─── tabContent.js
                  |─── transform.js
                  |─── workbook.js
            |─── template/
                  |─── countryRisk/
                        |─── template.js
                  |─── dataType/
                        |─── template.js
                  |─── dynamicTab/
                        |─── template.js
                  |─── helloWorld/
                        |─── template.js
                  |─── researchList/
                        |─── template.js
                  |─── twoTab/
                        |─── template.js
                  |─── hello-world.js
            |─── index.js
            |─── package.json

#### 'index.js'
'hapi-plugins' server is registered here.

#### plugins.js
route './export-excel' is defined here.

## For end-points use
    |─── for helloWorld, use POST method
          | - https://app.abc-dev.com/export
          | - README.md

    |─── for datatypes, use POST method
          | - https://app.abc-dev.com/export/datatypes
          | - README.md

    |─── for dynamictabs, use POST method
          | - https://app.abc-dev.com/export/dynamictabs
          | - README.md

    |─── for twotabs, use POST method
          | - https://app.abc-dev.com/export/twotabs
          | - README.md

    |─── for researchlist, use POST method
          | - https://app.abc-dev.com/export/researchlist
          | - README.md

    |─── for countryRisk, use POST method
          | - https://app.abc-dev.com/export/countryRisk
          | - README.md

##### References:
sheetJS:        https://docs.sheetjs.com/
npm:            https://www.npmjs.com/package/xlxs
github:         https://github.com/SheetJS/js-xlsx
