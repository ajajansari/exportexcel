var jsonToAoA = function (objData, dataPrevious) {
    let dataToAoA = dataPrevious || [];

    if (typeof objData != 'undefined' && objData.length > 0) {

        //append header
        let headerKeys = Object.keys(objData[0]);
        dataToAoA.push(headerKeys);

        //append items
        objData.map(function (data) {
            let dataArray = [];
            headerKeys.map(function (headerKey) {
                if (data.hasOwnProperty(headerKey)) {
                    dataArray.push(data[headerKey]);
                }
            });
            dataToAoA.push(dataArray);
        });
    }
    return dataToAoA;
}

module.exports.jsonToAoA = jsonToAoA;