module.exports.dataArray = [
    ["This is a merged cell"],
    [
        { "v": "Blank" },
        { "v": "Red", "s": { fill: { fgColor: { rgb: "FFFF0000" } } } },
        { "v": "Green", "s": { fill: { fgColor: { rgb: "FF00FF00" } } } },
        { "v": "Blue", "s": { fill: { fgColor: { rgb: "FF0000FF" } } } }
    ],
    [
        { "v": "Default" },
        { "v": "Arial", "s": { font: { name: "Arial", sz: 24 } } },
        { "v": "Times New Roman", "s": { font: { name: "Times New Roman", sz: 16 } } },
        { "v": "Courier New", "s": { font: { name: "Courier New", sz: 14 } } }
    ],
    [
        0.618033989,
        { "v": 0.618033989 },
        { "v": 0.618033989, "t": "n" },
        { "v": 0.618033989, "t": "n", "s": { "numFmt": "0.00%" } },
        { "v": 0.618033989, "t": "n", "s": { "numFmt": "0.00%" }, fill: { fgColor: { rgb: "FFFFCC00" } } },
        [(new Date()).toLocaleString()]
    ]
];