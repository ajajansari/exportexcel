'use strict';

//This template support Dyanmic Column using excelJs,
//including Hyper Link, Number, Currency, DateTime
const date = new Date();
const headerFormat = {
  style: {
    fill: {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF808080' },
    },
    border: {
      top: { style: 'thin', color: { argb: 'FF000000' } },
      left: { style: 'thin', color: { argb: 'FF000000' } },
      bottom: { style: 'thin', color: { argb: 'FF000000' } },
      right: { style: 'thin', color: { argb: 'FF000000' } },
    },
  },
};
const templateExcelExport = {
  workbookName: `FCSearchResults.xlsx`,
  sheets: [
    {
      name: 'Disclaimer',
      header: {
        logo: {
          v: 'Image',
          isImage: false,
          style: {
            alignment: {
              wrapText: true,
              vertical: 'fill',
              horizontal: 'fill',
            },
          },
          imagePosition: {
            tl: { col: 0, row: 0 },
            br: { col: 3, row: 2 },
          },
        },
        blank: { v: '' },
        title: {
          v: 'Abc Solutions',
          style: {
            font: {
              bold: true,
            },
          },
        },
        view: { v: 'Disclaimer - ' },
        date: {
          v: date,
          isDate: true,
          numFmt: 'mm/dd/yyyy',
          style: {
            alignment: {
              vertical: 'top',
              horizontal: 'left',
            },
          },
        },
        disclaimer: {
          v:
          'IMPORTANT — READ THESE TERMS CAREFULLY BEFORE ACCEPTING THIS AGREEMENT AND ACCESSING AND USING THE PROGRAM (AS DEFINED BELOW). BY CLICKING AND ACCEPTING THIS AGREEMENT AND ACCESSING AND USING THE PROGRAM, YOU ACKNOWLEDGE THAT YOU HAVE READ THIS AGREEMENT, THAT YOU UNDERSTAND IT AND THAT YOU AGREE TO BE BOUND BY ITS TERMS AND IF LICENSEE (AS DEFINED BELOW) IS A BUSINESS ENTITY, YOU HAVE THE AUTHORITY TO AGREE TO THESE TERMS AND ACCEPT THE AGREEMENT ON BEHALF OF SUCH BUSINESS ENTITY. IF YOU DO NOT AGREE, PROMPTLY EXIT THIS PAGE WITHOUT CLICKING AND ACCEPTING THE AGREEMENT OR ACCESSING OR USING THE PROGRAM. \n' +
          'Abc Ratings Inc’s Financial Forecast Model Agreement\n' +
          'This Agreement is a legal agreement between you or, as applicable, your business entity (“Licensee”) and Abc Ratings Inc, a company incorporated in the State of Delaware with its principal offices at 33 Whitehall Street, New York, NY 10004, USA (“Abc”), and is for use of certain elements of financial forecasts produced by Abc or its subsidiaries that perform ratings analysis under the trade name Abc Ratings (such subsidiaries, together with Abc, being “Abc Ratings”) in respect of certain issuers (the “Forecasts”) and the user-generated forecast tool (the “Model”), each as made available on www.Abcratings.com (the “Abc Website”) solely for Licensee’s internal business use as described below. The Program (as defined below) includes access to proprietary programs held in excel format, data and databases, as well as accompanying manuals or user guides set forth on the Abc Website, all of which are confidential to Abc and/or its licensors and provided to or accessible by Licensee under the terms of this Agreement. \n',
          style: {
            alignment: {
              wrapText: true,
              vertical: 'top',
              horizontal: 'left',
            },
          },
          merge: {
            cellRightCount: 12,
            cellBottomCount: 20,
          },
        },
      },
      rowHeight: { isCustomize: true, defIdHeight: [{ rowId: 1, height: 50 }] },
      columnWidth: { isCustomize: true, defIdWidth: [{ colId: 1, width: 20 }] },
      logo: {
        url: './export-exceljs/image/Abc-solutions.png',
        path: 'A1:G1',
      },
      spaceAfterHeader: 2,
      data: [],
      dataHeaderTemplate: {},
      dataValueTemplate: {},
      spaceAfterData: 1,
      footer: { copy: `Copyright @ ${date.getFullYear()}` },
    },
    {
      name: 'Search Results',
      header: {
        title: { v: 'Abc Solutions' },
        view: { v: 'Research' },
        date: {
          v: date,
          isDate: true,
          numFmt: 'mm/dd/yyyy',
          style: {
            alignment: {
              vertical: 'top',
              horizontal: 'left',
            },
          },
        },
      },
      columnWidth: {
        isCustomize: true,
        defIdWidth: [
          { colId: 1, width: 20 },
          { colId: 2, width: 20 },
          { colId: 3, width: 20 },
        ],
      },
      spaceAfterHeader: 3,
      data: [],
      dataHeaderTemplate: {
        columnStyle: headerFormat,
        Title: headerFormat,
        Category: headerFormat,
        Date: headerFormat,
      },
      dataValueTemplate: {
        Title: {
          style: {
            font: {
              name: 'Calibri',
              color: { argb: 'FF0000FF' },
              size: 11,
            },
          },
        },
        Date: {
          isDate: true,
          numFmt: 'dd-MMM-yyyy',
        },
      },
      spaceAfterData: 3,
      footer: { copy: `Copyright @ ${date.getFullYear()}` },
      views: [{ state: 'frozen', xSplit: 1, ySplit: 7 }],
    },
  ],
  dynamicTabs: {
    name: 'Search Results',
    header: {
      title: { v: 'Abc Solutions' },
      view: { v: 'Research' },
      date: {
        v: date,
        isDate: true,
        numFmt: 'mm/dd/yyyy',
        style: {
          alignment: {
            vertical: 'top',
            horizontal: 'left',
          },
        },
      },
    },
    spaceAfterHeader: 2,
    data: [],
    dataHeaderTemplate: {},
    dataValueTemplate: {},
    spaceAfterData: 2,
    footer: { copy: `Copyright @ ${date.getFullYear()}` },
    views: [{ state: 'frozen', xSplit: 1, ySplit: 7 }],
  },
};
module.exports.templateExcelExport = templateExcelExport;
