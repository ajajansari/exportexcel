var sendData = '[{"name":"Disclaimer","header":{"view":"fDisclaimer"},"data":[]},{"name":"My Port","header":{"type":"Abc Solutions","view":"myPort","scale":"Million"},"data":[{"album":"Taylor Swift","year":2006,"numPer":0.86,"cur":23312,"url":{"type":"Uri","value":"Google","target":"https://www.google.com"},"DOB":"1970-01-31T18:30:00.000Z"},{"album":"Taylor Swift","year":2006,"numPer":0.86,"cur":23312,"url":{"type":"Uri","value":"Google","target":"https://www.google.com"},"DOB":"1970-01-31T18:30:00.000Z"}]},{"name":"My Port","header":{"type":"Abc Solutions","view":"myPort","scale":"Million"},"data":[{"album":"Taylor Swift","year":2006,"numPer1":0.86,"cur1":23312,"url":{"type":"Uri","value":"Google","target":"https://www.google.com"},"DOB":"1970-01-31T18:30:00.000Z"},{"album":"Taylor Swift","year":2006,"numPer1":0.86,"cur1":23312,"url":{"type":"Uri","value":"MSN","target":"https://www.MSN.com"},"DOB":"1970-01-31T18:30:00.000Z"}]},{"name":"My Port","header":{"type":"Abc Solutions","view":"myPort","scale":"Million"},"data":[{"album":"Taylor Swift","year":2006,"url":"www.google.com","DOB":"1970-01-31T18:30:00.000Z"},{"album":"Taylor Swift","year":2006,"url":"www.google.com","DOB":"1970-01-31T18:30:00.000Z"}]},{"name":"My Port","header":{"type":"Abc Solutions","view":"myPort","scale":"Million"},"data":[{"album":"Taylor Swift","year":2006,"numPer1":0.86,"cur1":23312,"url":"www.google.com","DOB":"1970-01-31T18:30:00.000Z"},{"album":"Taylor Swift","year":2006,"numPer1":0.86,"cur1":23312,"url":"www.google.com","DOB":"1970-01-31T18:30:00.000Z"}]},{"name":"My Port","header":{"type":"Abc Solutions","view":"myPort","scale":"Million"},"data":[{"album":"Taylor Swift","year":2006,"url":"www.google.com","DOB":"1970-01-31T18:30:00.000Z"},{"album":"Taylor Swift","year":2006,"url":"www.google.com","DOB":"1970-01-31T18:30:00.000Z"}]},{"name":"My Port","header":{"type":"Abc Solutions","view":"myPort","scale":"Million"},"data":[{"album":"Taylor Swift","year":2006,"url":"www.google.com","DOB":"1970-01-31T18:30:00.000Z"},{"album":"Taylor Swift","year":2006,"url":"www.google.com","DOB":"1970-01-31T18:30:00.000Z"}]},{"name":"My Port","header":{"type":"Abc Solutions","view":"myPort","scale":"Billion"},"data":[{"album":"Taylor Swift","year":2006,"url":"www.google.com","DOB":"1970-01-31T18:30:00.000Z"},{"album":"Taylor Swift","year":2006,"url":"www.google.com","DOB":"1970-01-31T18:30:00.000Z"}]},{"name":"My Port","header":{"type":"Abc Solutions","view":"myPort","scale":"Million"},"data":[{"album":"Taylor Swift","year":2006,"url":"www.google.com","DOB":"1970-01-31T18:30:00.000Z"},{"album":"Taylor Swift","year":2006,"url":"www.google.com","DOB":"1970-01-31T18:30:00.000Z"}]},{"name":"My Port","header":{"type":"Abc Solutions","view":"myPort","scale":"Billion"},"data":[{"album":"Taylor Swift","year":2006,"url":"www.google.com","DOB":"1970-01-31T18:30:00.000Z"},{"album":"Taylor Swift","year":2006,"url":"www.google.com","DOB":"1970-01-31T18:30:00.000Z"}]}]';
var apiUrl = '/export/';

var xhr = new XMLHttpRequest();
xhr.open('POST', apiUrl);
xhr.responseType = 'blob';
xhr.onload = function (e) {
	var blob = xhr.response;
	var fileName = xhr.getResponseHeader("Content-Disposition").match(/\sfilename="([^"]+)"(\s|$)/)[1];
	saveOrOpenBlob(blob, fileName);
}
xhr.send(sendData);

function saveOrOpenBlob(blob, fileName) {
	window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
	window.requestFileSystem(window.TEMPORARY, 1024 * 1024, function (fs) {
		fs.root.getFile(fileName, { create: true }, function (fileEntry) {
			fileEntry.createWriter(function (fileWriter) {
				fileWriter.addEventListener("writeend", function () {
					window.location = fileEntry.toURL();
				}, false);
				fileWriter.write(blob, "_blank");
			}, function () { });
		}, function () { });
	}, function () { });
}