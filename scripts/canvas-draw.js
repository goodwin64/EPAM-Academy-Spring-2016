;
var drawingParams = {
	faceParams: {
		strokeStyle: "#000000", // black
		fillStyle: "#FFFF00", // yellow
		radius: 100,
	},
	eyesParams: {
		strokeStyle: "#000000", // black
		fillStyleEye: "#FFFFFF", // white
		fillStyleAppleEye: "#33CCFF", // green
		radius: 20,
		bothEyesOffsetX: 35,
		bothEyesOffsetY: -40,
		bothAppleEyesOffsetX: 3,
		bothAppleEyesOffsetY: 5,
	},
	noseParams: {
		strokeStyle: "#000000", // black
		fillStyle: "#666000", // white
		radius: 3,
		nostrilsOffsetX: 5,
		nostrilsOffsetY: 2,
	},
	mouthParams: {
		strokeStyle: "#000000", // black
		fillStyleMouth: "#000000", // black
		fillStyleTongue: "#FF0000", // red
		angleDelta: 0.35,
	},
	circleAngleStart: 0,
	circleAngleEnd: Math.PI * 2,
}

var canvas = document.getElementById("main-canvas");
var context = canvas.getContext("2d");
if (context) {
	drawingParams.faceParams.centerX = canvas.width / 2;
	drawingParams.faceParams.centerY = canvas.height / 2;
	drawSmilingFace();
}

function drawCircle(centerX, centerY, radius, circleAngleStart, circleAngleEnd, fillStyle, strokeStyle) {
	context.beginPath();
	context.arc(centerX, centerY, radius, circleAngleStart, circleAngleEnd);
	if (fillStyle) {
		context.fillStyle = fillStyle;
		context.fill();
	}
	if (strokeStyle) {
		context.strokeStyle = strokeStyle;
		context.stroke();
	}
}

function drawFace() {
	drawCircle(
		drawingParams.faceParams.centerX, drawingParams.faceParams.centerY,
		drawingParams.faceParams.radius,
		drawingParams.circleAngleStart, drawingParams.circleAngleEnd,
		drawingParams.faceParams.fillStyle,
		drawingParams.faceParams.strokeStyle
	);
}

function drawEyes() {
	var eyeCenterX, eyeCenterY;

	// left eye
	eyeCenterX = drawingParams.faceParams.centerX + drawingParams.eyesParams.bothEyesOffsetX * -1;
	eyeCenterY = drawingParams.faceParams.centerY + drawingParams.eyesParams.bothEyesOffsetY;
	// 	eye
	drawCircle(
		eyeCenterX, eyeCenterY,
		drawingParams.eyesParams.radius,
		drawingParams.circleAngleStart, drawingParams.circleAngleEnd,
		drawingParams.eyesParams.fillStyleEye,
		drawingParams.eyesParams.strokeStyle
	);
	// 	pupil
	drawCircle(
		eyeCenterX + drawingParams.eyesParams.bothAppleEyesOffsetX, 
		eyeCenterY + drawingParams.eyesParams.bothAppleEyesOffsetY,
		drawingParams.eyesParams.radius * 0.7,
		drawingParams.circleAngleStart, drawingParams.circleAngleEnd,
		drawingParams.eyesParams.fillStyleAppleEye,
		drawingParams.eyesParams.strokeStyle
	);

	// right eye
	eyeCenterX = drawingParams.faceParams.centerX + drawingParams.eyesParams.bothEyesOffsetX;
	// 	eye
	drawCircle(
		eyeCenterX, eyeCenterY,
		drawingParams.eyesParams.radius,
		drawingParams.circleAngleStart, drawingParams.circleAngleEnd,
		drawingParams.eyesParams.fillStyleEye,
		drawingParams.eyesParams.strokeStyle
	);
	// 	pupil
	drawCircle(
		eyeCenterX + drawingParams.eyesParams.bothAppleEyesOffsetX * -1, 
		eyeCenterY + drawingParams.eyesParams.bothAppleEyesOffsetY,
		drawingParams.eyesParams.radius * 0.7,
		drawingParams.circleAngleStart, drawingParams.circleAngleEnd,
		drawingParams.eyesParams.fillStyleAppleEye,
		drawingParams.eyesParams.strokeStyle
	);
}

function drawNose() {

	// left nostril
	var centerX = drawingParams.faceParams.centerX + drawingParams.noseParams.nostrilsOffsetX * -1;
	var centerY = drawingParams.faceParams.centerY + drawingParams.noseParams.nostrilsOffsetY;
	drawCircle(
		centerX, centerY,
		drawingParams.noseParams.radius,
		drawingParams.circleAngleStart, drawingParams.circleAngleEnd,
		drawingParams.noseParams.fillStyle,
		drawingParams.noseParams.strokeStyle
	);

	// right nostril
	centerX = drawingParams.faceParams.centerX + drawingParams.noseParams.nostrilsOffsetX;
	drawCircle(
		centerX, centerY,
		drawingParams.noseParams.radius,
		drawingParams.circleAngleStart, drawingParams.circleAngleEnd,
		drawingParams.noseParams.fillStyle,
		drawingParams.noseParams.strokeStyle
	);
}

function drawSmile() {
	drawMouth();
	drawTongue();
}

function drawMouth() {
	drawCircle(
		drawingParams.faceParams.centerX, drawingParams.faceParams.centerY,
		drawingParams.faceParams.radius * 0.75,
		Math.PI * (0.5 - drawingParams.mouthParams.angleDelta),
		Math.PI * (0.5 + drawingParams.mouthParams.angleDelta),
		drawingParams.mouthParams.fillStyleMouth,
		drawingParams.mouthParams.strokeStyle
	);
}

function drawTongue() {
	var tongueOffsetY = drawingParams.faceParams.radius * 0.75 * Math.cos(Math.PI * drawingParams.mouthParams.angleDelta);
	drawCircle(
		drawingParams.faceParams.centerX, drawingParams.faceParams.centerY + tongueOffsetY,
		drawingParams.faceParams.radius * 0.25,
		0, Math.PI,
		drawingParams.mouthParams.fillStyleTongue,
		drawingParams.mouthParams.strokeStyle
	);
}

function drawSmilingFace() {
	drawFace();
	drawEyes();
	drawNose();
	drawSmile();
}
