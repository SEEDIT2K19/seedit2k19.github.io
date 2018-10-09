var isPlaystation = false;
var disableFeatures = false;
var ua = navigator.userAgent;
var uaStringCheck = ua.substring(ua.indexOf("5.0 (") + 5, ua.indexOf(") Apple") - 7);
var fwVersion = ua.substring(ua.indexOf("5.0 (") + 19, ua.indexOf(") Apple"));
var fwCompat = ["4.82"];

function ps3chk(){
switch (uaStringCheck) {
	case "PLAYSTATION":
		isPlaystation = true;
		break;

	default:
		alert("You are not on a PlayStation System! All features have been disabled");
		disableFeatures = true;
		isPlaystation = false;
		document.getElementById("btnnand").disabled=true;
		document.getElementById("btnnor").disabled=true;
		document.getElementById("btnemmc").disabled=true;
		break;
}


if (isPlaystation) {
	switch (fwVersion) {
		case "4.82":
			alert("Congratulations! We've detected your PlayStation 3 is running FW " + fwVersion + ", which is compatible with PS3Xploit! Enjoy!");
			break;

		default:
			alert("Your PS3 is not on FW 4.82! Your current running FW version is " + fwVersion + ", which is not compatible with PS3Xploit. All features have been disabled");
			disableFeatures = true;
			document.getElementById("btnnand").disabled=true;
			document.getElementById("btnnor").disabled=true;
			document.getElementById("btnemmc").disabled=true;
			break;
	}
}
}