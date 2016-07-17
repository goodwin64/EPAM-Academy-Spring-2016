//Use this file to implement Part One of your project

var fromDB = {
	users: [
		{ 
			// user #0 is empty
		},
		{
			// id: 1, // index in users
			name: "Lion",
			surname: "King",
			avatarLink: "http://image.slidesharecdn.com/wildanimals-141026174640-conversion-gate01/95/wild-animals-for-kids-2-638.jpg",
		}, 
		{
			// id: 2,
			name: "Fast",
			surname: "Monkey",
			avatarLink: "http://image.slidesharecdn.com/wildanimals-141026174640-conversion-gate01/95/wild-animals-for-kids-3-638.jpg",
		}, 
		{
			// id: 3,
			name: "Poisoness",
			surname: "Snake",
			avatarLink: "http://image.slidesharecdn.com/wildanimals-141026174640-conversion-gate01/95/wild-animals-for-kids-4-638.jpg",
		}, 
		{
			// id: 4,
			name: "Crazy",
			surname: "Tiger",
			avatarLink: "http://image.slidesharecdn.com/wildanimals-141026174640-conversion-gate01/95/wild-animals-for-kids-5-638.jpg",
		}
	],
	friends: {
		1: [2,3],
		2: [1,3],
		4: [1,2,3,4]
	},
};

$(document).ready(function() {
	// /* Styles via jQuery */
	// $(".col-4").css("float", "left").css("width", "33.33%");
	// $("#new-info-field").css("width", "100px");
	// $("#user-panel").css("background-color", "rgb(100%, 75%, 75%)");
	// $("#friends-panel").css("background-color", "rgb(75%, 100%, 75%)");
	// $("#all-users-panel").css("background-color", "rgb(75%, 75%, 100%)");


	/* Logic */
	// button OK
	$("#submitID").click(function(){
		var id = +$("#inputID").val();
		if (id) {
			$("#inputID").val("");
			$("#friends-panel h3").hide();
			$("#friends-panel .users-list").empty();
			loadData(id);
		}
	});
	$("#add-new-info-field").click(function(){
		var infoVal = $("#new-info-field").val();
		if (infoVal) {
			$("#new-info-field").val("");
			$("#user-panel .contacts-info ul").append("<li>" + infoVal + "</li>");
		}
	});
	$('input').keypress(function (e) {
		if (e.which == 13) {
			$("#add-new-info-field").click();
			return false;
		}
	});

	function loadData(id) {
		// my info
		$("#user-panel .avatar img")
			.attr(
				"src", fromDB.users[id].avatarLink
			)
			.attr(
				"alt", "bad avatar link"
			);
		$("#user-panel span.name").text(
			fromDB.users[id].name
		);
		$("#user-panel span.surname").text(
			fromDB.users[id].surname
		);

		// friends
		$("#friends-panel h3").show();
		if (fromDB.friends[id]) {
			fromDB.friends[id].forEach(function(friendID) {
				var friendName = $("<span></span>").text(
					fromDB.users[friendID].name
				);
				var friendSurname = $("<span></span>").text(
					fromDB.users[friendID].surname
				);
				var friendAvatar = $("<div></div>")
					.addClass("avatar")
					.append($("<img/>").attr("src", fromDB.users[friendID].avatarLink)
				);
				var friendInfo = $("<div></div>")
					.addClass("friend-panel")
					.append(friendAvatar)
					.append(friendName)
					.append(friendSurname);
				$("#friends-panel .users-list")
					.append(friendInfo);
			});
		}

		// other users
		for (var i = 1; i < fromDB.users.length; i++) {
			// i - user ID
			if (fromDB.friends[id]
				&& fromDB.friends[id].indexOf(i) == -1) {
				var friendName = $("<span></span>").text(
					fromDB.users[friendID].name
				);
				var friendSurname = $("<span></span>").text(
					fromDB.users[friendID].surname
				);
				var friendAvatar = $("<div></div>")
					.addClass("avatar")
					.append($("<img/>").attr("src", fromDB.users[friendID].avatarLink)
				);
				var friendInfo = $("<div></div>")
					.addClass("friend-panel")
					.append(friendAvatar)
					.append(friendName)
					.append(friendSurname);
				$("#all-users-panel .users-list")
					.append(friendInfo);
			}
		}
	}
});
