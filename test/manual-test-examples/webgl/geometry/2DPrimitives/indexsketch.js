var testID = 1 
var setStroke = true;
var setFill = true;
var nTests = 25   //This setting must equal the number of tests available in the sketch.js;

function setup(){
	refreshTests();
}


function refreshTests(){

	window.frames['2d'].location = 'frame.html?mode=2d&testID=' + testID + '&setStroke=' + setStroke + '&setFill=' + setFill
	window.frames['3d'].location = 'frame.html?mode=3d&testID=' + testID + '&setStroke=' + setStroke + '&setFill=' + setFill
}

function keyPressed() {

	if (keyCode === 69) {
		testID++;
		testID = testID > nTests ? 1 : testID;
		refreshTests()
	}

	if (keyCode === 68) {
		testID--;
		testID = testID == 0 ? nTests : testID;
		refreshTests()
	}

	if (keyCode === 83) {
		setStroke = setStroke ? false : true;
		refreshTests()
	} 

	if (keyCode === 70) {
		setFill = setFill ? false : true;
		refreshTests()
	}
  }