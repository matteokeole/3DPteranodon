// Model rotation values
const R = {
	x: 0,
	y: 90,
	now: {x: 0, y: 0},
	on: {x: 0, y: 0},
	old: {x: 0, y: 0}
},
w2 = window.innerWidth / 2, // Window width / 2
h2 = window.innerHeight / 2, // Window height / 2
// Parameters
S = 6, // Sensitivity (higher number = lower sens)
P = 2, // Smooth motion (higher number = smoother motion)
// Mouse events
M = {
	down: function(e) {
		R.on.x = -w2 + e.clientX;
		R.old.x = R.x;
		R.on.y = h2 + -e.clientY;
		R.old.y = R.y;
		document.addEventListener("mousemove", M.move)
	},
	move: function(e) {
		R.now.x = -w2 + e.clientX;
		R.x = ((R.now.x - R.on.x) / S) + R.old.x;
		R.now.y = h2 + -e.clientY;
		R.y = ((R.now.y - R.on.y) / S) + R.old.y;
		if (R.x < -360) R.x += 360;
		if (R.x > 360) R.x -= 360;
		if (R.y < 0) R.y = 0;
		if (R.y > 180) R.y = 180;
		// Model motion
		let transform = `rotateX(${R.y.toFixed(P)}deg) rotateZ(${-R.x.toFixed(P)}deg)`;
		model.style["-webkit-transform"] = transform;
		model.style["-ms-transform"] = transform;
		model.style.transform = transform
	},
	up: function() {document.removeEventListener("mousemove", M.move)}
},
// Model & faces selectors
model = document.querySelector("#model");
let facesDisplayed = false;
// Model initial rotation angle
let transform = `rotateX(${R.y.toFixed(P)}deg) rotateY(${R.x.toFixed(P)}deg)`;
model.style["-webkit-transform"] = transform;
model.style["-ms-transform"] = transform;
model.style.transform = transform;
// Event listeners
addEventListener("mousedown", M.down);
addEventListener("mouseup", M.up)