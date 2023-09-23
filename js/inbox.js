
const user = JSON.parse(sessionStorage.getItem("drone-user"));
const loadingPage = document.getElementById("loading-page");
const loadedDiv = document.querySelector(".loaded");
const errorDiv = document.querySelector(".error");


window.onload = function () {
	if (!user) {
		window.location.href = "index.html";
	}
};


const drone = new Scaledrone("CPRWeGZay6pKGtJl", {
	data: user,
});
const room = drone.subscribe(user.room);  

room.on("open", (error) => {
	if (error) {
		console.error(error);
	} else {
		document.querySelector(".room-name").textContent = user.room;
		loadingPage.style.display = "none";
		errorDiv.style.display = "block";
		loadedDiv.style.display = "block";
	}
});
		
room.on("data", (message) => {
	messageContainer(message);
});


function handleMessageSubmit(e) {
	e.preventDefault();
	const message = e.target.text.value;

	drone.publish({
		room: user.room,
		message: { message: message, client: { id: drone.clientId, ...user } },
	});
	e.target.reset();  
}

document.getElementById("send").addEventListener("submit", handleMessageSubmit);


function handleLeave() {
	window.location.href = "index.html";
}


function messageContainer(message) {
	const participant = user.email === message.client.email;
	console.log(participant);

	const chatMessageDiv = createElement( "p", { 
		class: `${participant ? "start" : "end"}`   
	});

	const chatMessage = createElement("span", {});
	if (message?.message) {
		const nameParagraph = createElement("p", {} , message?.client?.name); 
		const messageParagraph = createElement(
			"p",
			{
				class: 'txt',
			},
			message?.message 
		);
		chatMessage.appendChild(nameParagraph); 
		chatMessage.appendChild(messageParagraph);
		chatMessageDiv.appendChild(chatMessage);
	}
	document.getElementById("chatMessages").appendChild(chatMessageDiv);
}

function createElement(tag, attributes, ...children) {
	const element = document.createElement(tag);

	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}

	children.forEach((child) => {
		if (typeof child === "string") {
			element.appendChild(document.createTextNode(child));
		} else {
			element.appendChild(child);
		}
	});

	return element;
}

