/*
 *	Web Audio Api based Drum Machine
 *
 *	Author: Andres Tavio
 */

/*
	TODO:
	Keyboard Support
	Choice of Instruments
*/
 
window.onload = init;

var numofInstruments = 4;
var numofColumns = 8;
var buttonCount = 1;

//Defining an array which corresponds to the columns of buttons
var columnArray = new Array(numofColumns);

var filterLNode;
var filterHNode;

function init() 
{
	//Initialize instruments, this includes loading
	kickSound = new Sound("sounds/kick.wav");
	tomSound = new Sound("sounds/tom.wav");
	crashSound = new Sound("sounds/crash.wav");
	hihatSound = new Sound("sounds/hihat.wav");
	buttonSound = new Sound("sounds/button.wav");
	
	//Initialize low filter
	filterLNode = audioContext.createBiquadFilter();
	filterLNode.type = 3;
	filterLNode.frequency.value = 440;
	filterLNode.Q.value = 0;
	filterLNode.gain.value = 0;
	
	document.getElementById("filterLSlider").addEventListener(
		"change", function(e) {
			filterLNode.gain.value = e.srcElement.value;}, false)
	;
	
	//Initialize high filter
	filterHNode = audioContext.createBiquadFilter();
	filterHNode.type = 4;
	filterHNode.frequency.value = 1760;
	filterHNode.Q.value = 0;
	filterHNode.gain.value = 0;
	
	document.getElementById("filterHSlider").addEventListener(
		"change", function(e) {
			filterHNode.gain.value = e.srcElement.value;}, false)
	;
	
	//Event listener for tempo slider
	document.getElementById("tempoSlider").addEventListener(
		"change", function(e) {
			tempo = document.getElementById("tempoSlider").value;
			document.getElementById("displayTempo").innerHTML = tempo;
			endLoop();
			beginLoop();}, false)
	;
	
	//Placing all button images into a two dimensional array
	for(var i=0; i < columnArray.length; i++) {
		columnArray[i] = new Array(numofInstruments);
		for(var j=0; j < numofInstruments; j++) {
			columnArray[i][j] = document.getElementById(buttonCount.toString());
			buttonCount++;
		}
	}
}	

var loopLength = 8;
var tempo = 120;
var tempoM;
var currentColumn = 0;
var currentRow = 0;

//Checks a given column for active buttons and plays them
function timing() 
{
	//Check each button from top to bottom, if "on" play sound
	if(columnArray[currentColumn][0].className == "on") {
		play(kickSound);
	}
	if(columnArray[currentColumn][1].className == "on") {
		play(tomSound);
	}
	if(columnArray[currentColumn][2].className == "on") {
		play(hihatSound);
	}
	if(columnArray[currentColumn][3].className == "on") {
		play(crashSound);
	}
	
	//Go to next column
	currentColumn++;
	
	//Loop back to the first column
	if(currentColumn == loopLength) {
		currentColumn = 0;
	}
}

var loopVariable;

//Calls the timing function according to the modified tempo
function beginLoop() 
{
	tempoM = 30000 / tempo;
	loopVariable = setInterval(timing, tempoM);
}

//Stops the function calls to timing
function endLoop() 
{
	clearInterval(loopVariable);
}

//This toggles the state of a button using CSS and plays the
//button sound
function changeState(button)
{
	
	if(button.className == "on") {
		button.className = "off";
		play(buttonSound);
	}
	else {
		button.className = "on";
		play(buttonSound);
	}
}

function play(sound) {
	sound.play();
}	