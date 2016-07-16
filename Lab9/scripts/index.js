$(document).ready(function() {
	// submit ID
	$("#submitID").click(function(){
		var id = +$("#inputID").val();
		if (id) {
			$("#inputID").val("");
			$("#friends-panel h3").hide();
			$("#friends-panel .users-list").empty();
			loadData(id);
		}
	});
	$("#inputID").keypress(function (e) {
		if (e.which == 13) {
			$("#submitID").click();
			return false;
		}
	});

	$("#new-hobbie-add").click(function(){
		var hobbie = $("#new-hobbie-input").val();
		if (hobbie) {
			$("#new-hobbie-input").val("");
			$("#user-panel .hobbies ul").append("<li>" + hobbie + "</li>");
		}
	});
	$("#new-hobbie-input").keypress(function (e) {
		if (e.which == 13) {
			$("#new-hobbie-add").click();
			return false;
		}
	});

	function loadData(id) {
		// TODO: implementation
	}
});
