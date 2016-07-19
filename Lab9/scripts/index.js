;

var usersFromDB = [
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
		friendList: [2,3],
		login: "u1",
		password: "p1"
	}, 
	{
		// id: 2,
		name: "Fast",
		surname: "Monkey",
		avatarLink: "images/user2.jpg",
		avatarLinkAltSrc: "http://image.slidesharecdn.com/wildanimals-141026174640-conversion-gate01/95/wild-animals-for-kids-3-638.jpg",
		hobbies: ["Climbing up trees", "Eating bananas", "Joking on friends"],
		friendList: [1,3],
		login: "u2",
		password: "p2"
	}, 
	{
		// id: 3,
		name: "Poisonous",
		surname: "Snake",
		avatarLink: "images/user3.jpg",
		avatarLinkAltSrc: "http://image.slidesharecdn.com/wildanimals-141026174640-conversion-gate01/95/wild-animals-for-kids-4-638.jpg",
		hobbies: ["Hiding in the bushes"],
		friendList: [],
		login: "u3",
		password: "p3"
	}, 
	{
		// id: 4,
		name: "Crazy",
		surname: "Tiger",
		avatarLink: "images/user4.jpg",
		avatarLinkAltSrc: "http://image.slidesharecdn.com/wildanimals-141026174640-conversion-gate01/95/wild-animals-for-kids-5-638.jpg",
		hobbies: [], // without hobbies
		friendList: [1,2,3],
		login: "u4",
		password: "p4"
	}
];

var operationsWithDB = {
	isUserExist: function(userID) {
		return !!usersFromDB[userID] && userID != 0;
	},

	getName: function(userID) {
		return usersFromDB[userID].name;
	},

	getSurname: function(userID) {
		return usersFromDB[userID].surname;
	},

	getAvatarLink: function(userID) {
		return usersFromDB[userID].avatarLink;
	},

	getHobbies: function(userID) {
		return usersFromDB[userID].hobbies;
	},

	addHobbie: function(hobbie, userID) {
		usersFromDB[userID].hobbies.push(hobbie);
	},

	getFriendList: function(userID) {
		return usersFromDB[userID].friendList;
	},

	getLogin: function(userID) {
		return usersFromDB[userID].login;
	},

	getPassword: function(userID) {
		return usersFromDB[userID].password;
	},

	friendRemove: function(userID, friendID) {
		var friendList = usersFromDB[userID].friendList;
		friendList.splice(friendList.indexOf(friendID), 1);
	},

	friendAdd: function(userID, friendID) {
		usersFromDB[userID].friendList.push(friendID);
	},

	checkCredentials: function(userID, userLogin, userPassword) {
		return userLogin == this.getLogin(userID)
			&& userPassword == this.getPassword(userID);
	},

	getIdByLogin: function(login) {
		for (var i = 0; i < usersFromDB.length; i++) {
			if (usersFromDB[i].login == login) {
				return i;
			}
		}
		return 0; // user isn't in DataBase
	}
};


$(document).ready(function() {
	// actions on load: sign-in (login) or sign-up (register)
	$("#show-login").click(function(event) {
		$("[data-hideable='shown']")
			.attr("data-hideable", "hidden");
		$("#sign-in")
			.attr("data-hideable", "shown");
	});
	$("#show-register").click(function(event) {
		$("[data-hideable='shown']")
			.attr("data-hideable", "hidden");
		$("#sign-up")
			.attr("data-hideable", "shown");
	});

	$("#sign-in button").click(function(event) {
		var login = $("#sign-in input.login").val();
		var password = $("#sign-in input.password").val();
		$("#sign-in input.login").val("");
		$("#sign-in input.password").val("");

		var userID = operationsWithDB.getIdByLogin(login);
		var isCredentialsCorrect = operationsWithDB.checkCredentials(userID, login, password);
		if (isCredentialsCorrect) {
			reload(userID);
		} else if (userID === 0) {
			$("[data-hideable='shown']")
				.attr("data-hideable", "hidden");
			$("#no-such-user")
				.attr("data-hideable", "shown");
		} else {
			$("[data-hideable='shown']")
				.attr("data-hideable", "hidden");
			$("#incorrect-credentials")
				.attr("data-hideable", "shown");
		}
	});
});


function loadData(ownID) {
	$("[data-panel-role='main-panel'][data-hideable='hidden']")
		.attr("data-hideable", "shown");
	$("#no-such-user")
		.attr("data-hideable", "hidden");
	
	var userData = usersFromDB[ownID];
	var userFriends = operationsWithDB.getFriendList(ownID);

	var isUserNameIsCorrect = !!userData["name"]; // or another check (by charset, length, etc..)
	var isUserSurnameIsCorrect = !!userData["surname"]; // or another check (by charset, length, etc..)

	// user panel
	appendUserData(ownID, "#user-panel .users-list");
	$("#user-panel .main-info")
		.append($("<input type='text' id='new-hobbie-input' placeholder='Add hobbie'>"))
		.append($("<button id='new-hobbie-add'>OK</button>"));
	addHobbieListener();

	for (var userID = 1; userID < usersFromDB.length; userID++) {
		if (userFriends.includes(userID)) {
			// friends panel
			appendUserData(userID, "#friends-panel .users-list");
			// button "remove"
			$("#friends-panel .main-info").last()
				.append(
					$("<button/>")
						.text("Remove from friends")
						.addClass("friend-remove")
						.click(function(event) {
							var friendID = +$(this).parent(".main-info").find(".user-id").text();
							changeFriendship(ownID, friendID, false);
						})
				);
			// friends matches
			if (operationsWithDB.getFriendList(userID).includes(ownID)) {
				$("#friends-panel .main-info").last().prepend(
					$("<div/>").text("M+").addClass("friend-match")
				);
			}
		} else if (userID != ownID) {
			// other users panel
			appendUserData(userID, "#all-users-panel .users-list");
			// button "add"
			$("#all-users-panel .main-info").last()
				.append(
					$("<button/>")
						.text("Add to friends")
						.addClass("friend-add")
						.click(function(event) {
							var friendID = +$(this).parent(".main-info").find(".user-id").text();
							changeFriendship(ownID, friendID, true);
						})
				);
		}
	}
}


function addHobbieListener() {
	$("#new-hobbie-add").click(function(argument) {
		addNewHobbie(argument, window.currentID);
	});
	$("#new-hobbie-input").keypress(function(e) {
		if (e.which == 13) {
			addNewHobbie(e, window.currentID);
			return false;
		}
	});
}


function addNewHobbie(argument, userID) {
	var hobbie = $("#new-hobbie-input").val();
	if (hobbie) {
		$("#new-hobbie-input").val("");
		$("#user-panel .hobbies ul").append("<li>" + hobbie + "</li>");
		operationsWithDB.addHobbie(hobbie, userID);
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

	var userTextID = $("<p/>")
		.text("User id: ")
		.append(
			$("<span/>")
				.addClass("user-id")
				.text(userID)
		);

	var userHobbiesList = $("<ul/>");
	var userHobbiesListFromDB = operationsWithDB.getHobbies(userID);
	for (var i = 0; i < userHobbiesListFromDB.length; i++) {
		userHobbiesList.append(
			$("<li/>").text(userHobbiesListFromDB[i])
		);
	}
	var userHobbies = $("<div/>")
		.addClass("hobbies")
		.append($("<h3/>").text("Hobbies:"))
		.append(userHobbiesList);

	var userData = $("<div/>")
		.addClass("main-info")
		.append(userAvatar)
		.append(userFullname)
		.append(userTextID)
		.append(userHobbies);

	$(panelSelector)
		.append(userData);
}


function changeFriendship(userID, friendID, isAdding) {
	if (isAdding === true) {
		operationsWithDB.friendAdd(userID, friendID);
	} else if (isAdding === false) {
		operationsWithDB.friendRemove(userID, friendID);
	}
	reload(userID);
}


function reload(id) {
	$("#user-panel .users-list").empty();
	$("#friends-panel .users-list").empty();
	$("#all-users-panel .users-list").empty();
	loadData(id);
}
