'use strict';

const nutritionFile = 'nutrition.xml';

function getFile(file) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		xhr.open('GET', file, true);

		xhr.onload = function(e) {
			resolve(e.target.responseXML);
		};

		xhr.onerror = function(e) { // ?????
			console.log('error');
			throw new Error(e);
		};

		xhr.send(null);

	});
}


function fillTable(xmlTable) {
	console.time("a1");
	const food = xmlTable.getElementsByTagName('food');
	const foodArray = [].slice.call(food);

	const table = document.getElementById('table-sort');
	const tableHead = document.getElementById('table-sort-thead');
	tableHead.innerHTML = "";
	const tableBody = document.getElementById('table-sort-tbody');
	tableBody.innerHTML = "";

	const firstRow = document.createElement('tr');
	[].forEach.call(food[0].children, (tag) => {
		var cell = document.createElement('th');
		cell.innerHTML = tag.tagName.charAt(0).toUpperCase() + tag.tagName.slice(1);
		firstRow.appendChild(cell);
	});
	tableHead.appendChild(firstRow);
	table.appendChild(tableHead);

	[].forEach.call(foodArray, (foodItem) => {
		const currentRow = document.createElement('tr');
		[].forEach.call(foodItem.children, (val) => {
			const currentCell = document.createElement('td');
			currentCell.innerHTML = parseCell(val);
			currentRow.appendChild(currentCell);
		});
		tableBody.appendChild(currentRow);
	});
	table.appendChild(tableBody);
	document.body.appendChild(table);
	console.timeEnd("a1");
}


function parseCell(val) {
	switch (val.tagName.toLowerCase()) {
		case 'serving':
			{
				return val.innerHTML + val.getAttribute('units');
			}
		case 'calories':
			{
				return val.getAttribute('fat') + ' - ' + val.getAttribute('total');
			}
		case 'vitamins':
		case 'minerals':
			{
				var result = '';
				[].forEach.call(val.children, (valInner) => {
					result += valInner.tagName + ': ' + valInner.innerHTML + '<br>';
				});
				return result;
			}
		default:
			{
				return val.innerHTML;
			}
	}
}

getFile(nutritionFile).then(fillTable);
