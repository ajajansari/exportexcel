'use strict';

//two/three tab export example
const templateExcelExport = {
    workbookName: "ResearchList.xlsx",
    sheets: [
        {
            name: "Disclaimer",
            header: {
                title: {
                    v: "Abc Solutions - Update", "font": {
                        name: 'Comic Sans MS',
                        family: 4,
                        size: 16,
                        underline: true,
                        bold: true
                    }
                },
                view: {
                    v: "Disclaimer - ", "font": {
                        name: 'Arial Black',
                        color: { argb: 'FF00FF00' },
                        family: 2,
                        size: 14,
                        italic: true
                    }
                },
                date: {
                    v: new Date(),
                    isDate: true,
                    numFmt: "mm/dd/yyyy",
                    alignment: {
                        vertical: 'top', horizontal: 'left'
                    }
                },
                disclaimer: {
                    v: "IMPORTANT — READ THESE TERMS CAREFULLY BEFORE ACCEPTING THIS AGREEMENT AND ACCESSING AND USING THE PROGRAM (AS DEFINED BELOW). BY CLICKING AND ACCEPTING THIS AGREEMENT AND ACCESSING AND USING THE PROGRAM, YOU ACKNOWLEDGE THAT YOU HAVE READ THIS AGREEMENT, THAT YOU UNDERSTAND IT AND THAT YOU AGREE TO BE BOUND BY ITS TERMS AND IF LICENSEE (AS DEFINED BELOW) IS A BUSINESS ENTITY, YOU HAVE THE AUTHORITY TO AGREE TO THESE TERMS AND ACCEPT THE AGREEMENT ON BEHALF OF SUCH BUSINESS ENTITY. IF YOU DO NOT AGREE, PROMPTLY EXIT THIS PAGE WITHOUT CLICKING AND ACCEPTING THE AGREEMENT OR ACCESSING OR USING THE PROGRAM. \n" +
                    "Abc Ratings Inc’s Financial Forecast Model Agreement\n" +
                    "This Agreement is a legal agreement between you or, as applicable, your business entity (“Licensee”) and Abc Ratings Inc, a company incorporated in the State of Delaware with its principal offices at 33 Whitehall Street, New York, NY 10004, USA (“Abc”), and is for use of certain elements of financial forecasts produced by Abc or its subsidiaries that perform ratings analysis under the trade name Abc Ratings (such subsidiaries, together with Abc, being “Abc Ratings”) in respect of certain issuers (the “Forecasts”) and the user-generated forecast tool (the “Model”), each as made available on www.Abcratings.com (the “Abc Website”) solely for Licensee’s internal business use as described below. The Program (as defined below) includes access to proprietary programs held in excel format, data and databases, as well as accompanying manuals or user guides set forth on the Abc Website, all of which are confidential to Abc and/or its licensors and provided to or accessible by Licensee under the terms of this Agreement. \n",
                    font: {
                        name: 'Arial',
                        color: { argb: '80008000' },
                        size: 12
                    },
                    alignment: { wrapText: true },
                    merge: {
                        cellRightCount: 6,
                        cellBottomCount: 4
                    }
                },
            },
            spaceAfterHeader: 2,
            data: [],
            dataHeaderTemplate: {},
            dataValueTemplate: {},
            spaceAfterData: 1,
            footer: {
                copy: { v: "Copyright @ 2017" }
            }
        },
        {
            name: "Search Results",
            header: {
                title: { v: "Fitch Solutions" },
                view: { v: "Research - " },
                date: {
                    v: new Date(),
                    isDate: true,
                    numFmt: "dd/MMM/yyyy",
                    alignment: {
                        vertical: 'top', horizontal: 'left'
                    }
                },
                scale: { v: "Data in - " }
            },
            spaceAfterHeader: 3,
            data: [],
            dataHeaderTemplate: {
                Title: {
                    fill: {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FF808080' }
                    },
                    border: {
                        top: { style: 'thin', color: { argb: 'FF000000' } },
                        left: { style: 'thin', color: { argb: 'FF000000' } },
                        bottom: { style: 'thin', color: { argb: 'FF000000' } },
                        right: { style: 'thin', color: { argb: 'FF000000' } }
                    }
                },
                Category: {
                    fill: {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FF808080' }
                    },
                    border: {
                        top: { style: 'thin', color: { argb: 'FF000000' } },
                        left: { style: 'thin', color: { argb: 'FF000000' } },
                        bottom: { style: 'thin', color: { argb: 'FF000000' } },
                        right: { style: 'thin', color: { argb: 'FF000000' } }
                    }
                },
                ResearchDate: {
                    fill: {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FF808080' }
                    },
                    border: {
                        top: { style: 'thin', color: { argb: 'FF000000' } },
                        left: { style: 'thin', color: { argb: 'FF000000' } },
                        bottom: { style: 'thin', color: { argb: 'FF000000' } },
                        right: { style: 'thin', color: { argb: 'FF000000' } }
                    }
                }
            },
            dataValueTemplate: {
                Title: {
                    font: {
                        name: 'Calibri',
                        color: { argb: 'FF0000FF' },
                        size: 11
                    },
                    alignment: {
                        // horizontal: "fill"
                    }
                },
                Category: {
                    alignment: {
                        // horizontal: "distributed"
                    }
                },
                ResearchDate: {
                    isDate: true,
                    numFmt: "dd-MMM-yyyy",
                    alignment: {
                        // horizontal: "distributed"
                    }
                }
            },
            spaceAfterData: 3,
            footer: {
                copy: { v: "Copyright @ 2017" }
            }
        },
    ],
    dynamicTabs: {
        name: "Search Results",
        header: {
            title: { v: "Fitch Solutions" },
            view: { v: "Research - " },
            date: {
                v: new Date(),
                isDate: true,
                numFmt: "dd/MMM/yyyy",
                alignment: {
                    vertical: 'top', horizontal: 'left'
                }
            },
            scale: { v: "Data in - " }
        },
        spaceAfterHeader: 3,
        data: [],
        dataHeaderTemplate: {
            Title: {
                fill: {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF808080' }
                },
                border: {
                    top: { style: 'thin', color: { argb: 'FF000000' } },
                    left: { style: 'thin', color: { argb: 'FF000000' } },
                    bottom: { style: 'thin', color: { argb: 'FF000000' } },
                    right: { style: 'thin', color: { argb: 'FF000000' } }
                }
            },
            Category: {
                fill: {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF808080' }
                },
                border: {
                    top: { style: 'thin', color: { argb: 'FF000000' } },
                    left: { style: 'thin', color: { argb: 'FF000000' } },
                    bottom: { style: 'thin', color: { argb: 'FF000000' } },
                    right: { style: 'thin', color: { argb: 'FF000000' } }
                }
            },
            Date: {
                fill: {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FF808080' }
                },
                border: {
                    top: { style: 'thin', color: { argb: 'FF000000' } },
                    left: { style: 'thin', color: { argb: 'FF000000' } },
                    bottom: { style: 'thin', color: { argb: 'FF000000' } },
                    right: { style: 'thin', color: { argb: 'FF000000' } }
                }
            }
        },
        dataValueTemplate: {
            Title: {
                font: {
                    name: 'Arial Black',
                    color: { argb: 'FF0000FF' },
                    family: 2,
                    size: 14,
                    italic: true
                },
                alignment: {
                    // horizontal: "fill"
                }
            },
            Category: {
                alignment: {
                    // horizontal: "distributed"
                }
            },
            Date: {
                isDate: true,
                numFmt: "dd-MMM-yyyy",
                alignment: {
                    // horizontal: "distributed"
                }
            }
        },
        spaceAfterData: 3,
        footer: {
            copy: { v: "Copyright @ 2017" }
        }
    }
};

module.exports.templateExcelExport = templateExcelExport;