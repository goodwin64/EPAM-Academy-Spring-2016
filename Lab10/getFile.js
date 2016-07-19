function getFile(file) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		xhr.open('GET', file, true);

		xhr.onload = function(e) {
			resolve(e.target.responseXML);
		};

		xhr.onerror = function(e) {
			console.log('error' + e);
			throw new Error(e);
		};

		xhr.send(null);
	});
}
