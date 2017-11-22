const XLSX = require('XLSX');
const { dateNum } = require('./dateAsNumber');

// encode functions lifted from XLSX to eliminate dependency on XLSX so this can be serialized/deserialized to JSON
const encode_row = function (row) {
    return `${row + 1}`;
}
const encode_col = function (col) {
    let s = '';
    for (++col; col; col = Math.floor((col - 1) / 26)) s = String.fromCharCode((col - 1) % 26 + 65) + s;
    return s;
}
const encode_cell = function (cell) {
    return encode_col(cell.c) + encode_row(cell.r);
}
const encode_range = function (cs, ce) {
    if (ce === undefined || typeof ce === 'number') return encode_range(cs.s, cs.e);
    if (typeof cs !== 'string') cs = encode_cell(cs);
    if (typeof ce !== 'string') ce = encode_cell(ce);
    return cs == ce ? cs : `${cs}:${ce}`;
}
const datenum = function (v, date1904) {
    if (date1904) v += 1462;
    return (Date.parse(v) - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}
const sheetFromArrayOfArrays = function (data) {
    var ws = {};
    var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
    for (var R = 0; R != data.length; ++R) {
        for (var C = 0; C != data[R].length; ++C) {
            if (range.s.r > R) range.s.r = R;
            if (range.s.c > C) range.s.c = C;
            if (range.e.r < R) range.e.r = R;
            if (range.e.c < C) range.e.c = C;
            var cell = { v: data[R][C] };
            if (cell.v == null) continue;
            var cell_ref = encode_cell({ c: C, r: R });

            if (typeof cell.v === 'number') cell.t = 'n';
            else if (typeof cell.v === 'boolean') cell.t = 'b';
            else if (cell.v instanceof Date) {
                cell.t = 'n';
                cell.v = dateNum(cell.v);
            }
            else cell.t = 's';

            ws[cell_ref] = cell;
        }
    }
    if (range.s.c < 10000000) ws['!ref'] = encode_range(range);
    return ws;
}

module.exports.sheetFromArrayOfArrays = sheetFromArrayOfArrays;