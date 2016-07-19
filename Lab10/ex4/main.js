'use strict';


function fillList(xmlList) {
	console.time("Restaurants benchmark");
	const restaurants = xmlList.getElementsByTagName("restaurant");
	var restaurantsUL = document.getElementById("restaurants");

	[].forEach.call(restaurants, function(restaurant) {
		var restaurantLI = document.createElement("li");
		restaurantLI.innerHTML = 
			"name: " + restaurant.getAttribute("name") +
			"<br>address: " + restaurant.getAttribute("address");
		restaurantLI.className += restaurant.getAttribute("type");
		restaurantsUL.appendChild(restaurantLI);
	});
	console.timeEnd("Restaurants benchmark");
	return null;
}
