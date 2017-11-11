'use strict';
//two/three tab export example
let templateExcelExport = {
    workbookName: 'twotabs.xlsx',
    sheets: [
        {
            name: 'Disclaimer',
            header: {
                title: 'Abc Solutions',
                view: 'Disclaimer - ',
                date: new Date().toLocaleDateString(),
                disclaimer:
                'IMPORTANT — READ THESE TERMS CAREFULLY BEFORE ACCEPTING THIS AGREEMENT AND ACCESSING AND USING THE PROGRAM (AS DEFINED BELOW). BY CLICKING AND ACCEPTING THIS AGREEMENT AND ACCESSING AND USING THE PROGRAM, YOU ACKNOWLEDGE THAT YOU HAVE READ THIS AGREEMENT, THAT YOU UNDERSTAND IT AND THAT YOU AGREE TO BE BOUND BY ITS TERMS AND IF LICENSEE (AS DEFINED BELOW) IS A BUSINESS ENTITY, YOU HAVE THE AUTHORITY TO AGREE TO THESE TERMS AND ACCEPT THE AGREEMENT ON BEHALF OF SUCH BUSINESS ENTITY. IF YOU DO NOT AGREE, PROMPTLY EXIT THIS PAGE WITHOUT CLICKING AND ACCEPTING THE AGREEMENT OR ACCESSING OR USING THE PROGRAM. \n' +
                'Abc Ratings Inc’s Financial Forecast Model Agreement\n' +
                'This Agreement is a legal agreement between you or, as applicable, your business entity (“Licensee”) and Abc Ratings Inc, a company incorporated in the State of Delaware with its principal offices at 33 Whitehall Street, New York, NY 10004, USA (“Abc”), and is for use of certain elements of financial forecasts produced by Abc or its subsidiaries that perform ratings analysis under the trade name Abc Ratings (such subsidiaries, together with Abc, being “Abc Ratings”) in respect of certain issuers (the “Forecasts”) and the user-generated forecast tool (the “Model”), each as made available on www.Abcratings.com (the “Abc Website”) solely for Licensee’s internal business use as described below. The Program (as defined below) includes access to proprietary programs held in excel format, data and databases, as well as accompanying manuals or user guides set forth on the Abc Website, all of which are confidential to Abc and/or its licensors and provided to or accessible by Licensee under the terms of this Agreement. \n',
            },
            spaceAfterHeader: 2,
            data: [],
            spaceAfterData: 1,
            footer: { copy: 'Copyright @ 2017' },
        },
        {
            name: 'TabData',
            header: {
                title: 'Abc Solutions',
                view: 'Portfolio - ',
                date: new Date().toLocaleDateString(),
                scale: 'Scale in - ',
            },
            spaceAfterHeader: 3,
            data: [],
            spaceAfterData: 5,
            footer: { copy: 'Copyright @ 2017' },
        },
    ],
    dynamicTabs: {
        name: 'TabData',
        header: {
            title: 'Abc Solutions',
            view: 'Portfolio - ',
            date: new Date().toLocaleDateString(),
            scale: 'Scale in - ',
        },
        spaceAfterHeader: 3,
        data: [],
        spaceAfterData: 5,
        footer: { copy: 'Copyright @ 2017' },
    },
};

module.exports.templateExcelExport = templateExcelExport;