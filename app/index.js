"use strict";

var _socket = require("socket.io-client");

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

// Sockets
var socket = _socket2.default.connect("https://45.55.188.226:5555");
getLocation();

// End sockets

// Geolocation 
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}

function showPosition(position) {
	socket.emit("location", position.coords.latitude, position.coords.longitude, function () {
		/* eslint-disable no-console */
		console.log("location sent");
	});
	// var pos = "Latitude: " + position.coords.latitude + 
	// "<br>Longitude: " + position.coords.longitude;
}

function showError(error) {
	switch (error.code) {
	case error.PERMISSION_DENIED:
		alert("User denied the request for Geolocation.");
		break;
	case error.POSITION_UNAVAILABLE:
		alert("Location information is unavailable.");
		break;
	case error.TIMEOUT:
		alert("The request to get user location timed out.");
		break;
	case error.UNKNOWN_ERROR:
		alert("An unknown error occurred.");
		break;
	}
}
// End Geolocation

// Accelerometer
var x, y, z;
setInterval(function () {
	if (window.DeviceMotionEvent) {
		window.ondevicemotion = function (e) {
			if (e.acceleration) {
				x = e.acceleration.x;
				y = e.acceleration.y;
				z = e.acceleration.z;
				socket.emit("data", { x: x, y: y, z: z });
			} else if (e.accelerationIncludingGravity) {
				x = e.accelerationIncludingGravity.x;
				y = e.accelerationIncludingGravity.y;
				z = e.accelerationIncludingGravity.z;
				socket.emit("data", { x: x, y: y, z: z });
			} else {
				document.getElementById("app").innerHTML = "device does not support ";
			}
		};
	}
}, 1000);

// End Accelerometer