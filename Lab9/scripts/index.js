;

var fromDB = {
	users: [
		{ 
			// user #0 is empty
		},
		{
			// id: 1, // index in users
			name: "Lion",
			surname: "King",
			avatarLink: "images/user1.jpg",
			avatarLinkAltSrc: "http://image.slidesharecdn.com/wildanimals-141026174640-conversion-gate01/95/wild-animals-for-kids-2-638.jpg",
			hobbies: ["Eating meat", "Killing zebras"],
		}, 
		{
			// id: 2,
			name: "Fast",
			surname: "Monkey",
			avatarLink: "images/user2.jpg",
			avatarLinkAltSrc: "http://image.slidesharecdn.com/wildanimals-141026174640-conversion-gate01/95/wild-animals-for-kids-3-638.jpg",
			hobbies: ["Climbing up trees", "Eating bananas", "Joking on friends"],
		}, 
		{
			// id: 3,
			name: "Poisonous",
			surname: "Snake",
			avatarLink: "images/user3.jpg",
			avatarLinkAltSrc: "http://image.slidesharecdn.com/wildanimals-141026174640-conversion-gate01/95/wild-animals-for-kids-4-638.jpg",
			hobbies: ["Hiding in the bushes"],
		}, 
		{
			// id: 4,
			name: "Crazy",
			surname: "Tiger",
			avatarLink: "images/user4.jpg",
			avatarLinkAltSrc: "http://image.slidesharecdn.com/wildanimals-141026174640-conversion-gate01/95/wild-animals-for-kids-5-638.jpg",
			hobbies: [], // without hobbies
		}
	],
	friends: {
		1: [2,3],
		2: [1,3],
		3: [],
		4: [1,2,3]
	},
};

var operationsWithDB = {
	isUserExist: function(userID) {
		return !!fromDB.users[userID];
	},

	getName: function(userID) {
		return fromDB.users[userID].name;
	},

	getSurname: function(userID) {
		return fromDB.users[userID].surname;
	},

	getAvatarLink: function(userID) {
		return fromDB.users[userID].avatarLink;
	},

	getHobbies: function(userID) {
		return fromDB.users[userID].hobbies;
	}
};


$(document).ready(function() {
	
	// submit ID
	$("#submitID").click(submitID);
	$("#inputID").keypress(function (e) {
		if (e.which == 13) {
			submitID();
			return false;
		}
	});

	// user hobbies
	$("#new-hobbie-add").click(addNewHobbie);
	$("#new-hobbie-input").keypress(function (e) {
		if (e.which == 13) {
			addNewHobbie();
			return false;
		}
	});
});


function loadData(ownID) {
	if (!operationsWithDB.isUserExist(ownID)) {
		$("[data-panel-role='main-panel'][data-hideable='shown']")
			.attr("data-hideable", "hidden");
		return;
	} else {
		$("[data-panel-role='main-panel'][data-hideable='hidden']")
			.attr("data-hideable", "shown");
	}
	var userData = fromDB.users[ownID];
	var userFriends = fromDB.friends[ownID];

	var isUserNameIsCorrect = !!userData["name"]; // or another check (by charset, length, etc..)
	var isUserSurnameIsCorrect = !!userData["surname"]; // or another check (by charset, length, etc..)
	var hasUserFriends = userFriends.length > 0;

	// user panel
	appendUserData(ownID, "#user-panel .user-info");

	for (var userID = 1; userID < fromDB.users.length; userID++) {
		if (userFriends.includes(userID)) {
			// friends panel
			appendUserData(userID, "#friends-panel .users-list");
		} else if (userID != ownID) {
			// other users panel
			appendUserData(userID, "#all-users-panel .users-list");
		}
	}
}

function submitID() {
	var id = +$("#inputID").val();
	if (id) {
		$("#inputID").val("");
		$("#user-panel .user-info").empty();
		$("#friends-panel .users-list").empty();
		$("#all-users-panel .users-list").empty();
		loadData(id);
	}
}

function addNewHobbie(argument) {
	var hobbie = $("#new-hobbie-input").val();
	if (hobbie) {
		$("#new-hobbie-input").val("");
		$("#user-panel .hobbies ul").append("<li>" + hobbie + "</li>");
	}
}

function appendUserData(userID, panelSelector) {
	var userAvatar = $("<div/>")
		.addClass("avatar")
		.append(
			$("<img/>")
				.attr("src", operationsWithDB.getAvatarLink(userID))
				.attr("alt", "user" + userID)
		);

	var userFullname = $("<div/>")
		.addClass("fullname")
		.append(
			$("<p/>").addClass("name").text(operationsWithDB.getName(userID))
		)
		.append(
			$("<p/>").addClass("surname").text(operationsWithDB.getSurname(userID))
		);

	var userHobbies = $("<div class='hobbies'>	<h3>Hobbies:</h3>	<ul></ul>	</div>");
	var hobbiesList = operationsWithDB.getHobbies(userID);
	for (var i = 0; i < hobbiesList.length; i++) {
		userHobbies.append(
			$("<li/>").text(hobbiesList[i])
		);
	}


	var userData = $("<div/>")
		.addClass("main-info")
		.append(userAvatar)
		.append(userFullname)
		.append(userHobbies);

	$(panelSelector)
		.append(userData);
}
