var testID = 1 
var setStroke = true;
var setFill = true;
var nTests = 9

function setup(){
	refreshTests();
}


function refreshTests(){

	window.frames['2d'].location = '2d.html?testID=' + testID + '&setStroke=' + setStroke + '&setFill=' + setFill
	window.frames['3d'].location = '3d.html?testID=' + testID + '&setStroke=' + setStroke + '&setFill=' + setFill
}

function keyPressed() {
	if (keyCode === 83) {
		setStroke = setStroke ? false : true;
		refreshTests()
	} 

	if (keyCode === 70) {
		setFill = setFill ? false : true;
		refreshTests()
	}

	if (keyCode === 32) {
		testID++;
		testID = testID > nTests ? 1 : testID;
		console.log(testID)
		refreshTests()
	}

  }