const form = document.getElementById("joinRoomForm");
const customRoomDiv = document.getElementById("customRoomDiv");

form.addEventListener("submit", function (event) {
	event.preventDefault();
	const formData = new FormData(form);
	const name = formData.get("name");
	const email = formData.get("email");

	handleJoinRoom(name, email, room);
});

customRoomDiv.addEventListener("change", function (e) {
	if (customRoomDiv.style.display = "block") {
		room = e.target.value;
	}
});


function handleJoinRoom(name, email, room) {
	if (!room || !name || !email) {
		console.log("Please fill out all the field");
		return;
	}
	sessionStorage.setItem("drone-user", JSON.stringify({ name, email, room }));
	window.location.href = "inbox.html";
}
