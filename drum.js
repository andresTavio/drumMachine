/*
 *	Web Audio Api based Drum Machine
 *
 *	@author Andres Tavio
 */

/*
	TODO:
	-volume control for each instrument
	    -play function could take a gain arg
	-aesthetics
	    -digital readout for bpm
	    -vertical sliders
	    -improve visual organization
	-Keyboard Support
	-Sample pad
*/
 
window.onload = init;

var numofInstruments = 4;
var numofColumns = 8;
var buttonCount = 1;

//Defines an array which corresponds to the columns of buttons
var columnArray = new Array(numofColumns);

//Two filters, one hi-pass and one low-pass
var filterLNode;
var filterHNode;

function init() 
{
	//Initialize instruments, this includes loading
	kickSound1 = new Sound("sounds/kick1.wav");
	snareSound1 = new Sound("sounds/snare1.wav");
	crashSound1 = new Sound("sounds/crash1.wav");
	hihatSound1 = new Sound("sounds/hihat1.wav");

        kickSound2 = new Sound("sounds/kick2.wav");
	snareSound2 = new Sound("sounds/snare2.wav");
	crashSound2 = new Sound("sounds/crash2.wav");
	hihatSound2 = new Sound("sounds/hihat2.wav");

        kickSound3 = new Sound("sounds/kick3.wav");
	snareSound3 = new Sound("sounds/snare3.wav");
	crashSound3 = new Sound("sounds/crash3.wav");
	hihatSound3 = new Sound("sounds/hihat3.wav");
	
        buttonSound = new Sound("sounds/button.wav");
        
        //Sets kit1 as the default
        kickSound = kickSound1;
        snareSound = snareSound1;
        crashSound = crashSound1;
        hihatSound = hihatSound1;    

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

var kickSound;
var snareSound;
var crashSound;
var hihatSound;

//Checks a given column for active buttons and plays them
function timing() 
{
	//Check each button from top to bottom, if "on" play sound
	if(columnArray[currentColumn][0].className == "on") {
		play(kickSound);
	}
	if(columnArray[currentColumn][1].className == "on") {
		play(snareSound);
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
var isPlaying;

//Calls the timing function according to the modified tempo
function beginLoop() 
{       
        if(!isPlaying) {
            tempoM = 30000 / tempo;
            loopVariable = setInterval(timing, tempoM);
        }
        
        isPlaying = true;
}

//Stops the function calls to timing
function endLoop() 
{
        if(isPlaying) {
            clearInterval(loopVariable);
        }
	
        isPlaying = false;
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

function play(sound) 
{
	sound.play();
}	

//Toggles the different drum kits
//Triggered by onclick events on kit radio buttons

function changeKit(kit)
{   
    if(kit == "kit1") {
	kickSound = kickSound1;
	snareSound = snareSound1;
	crashSound = crashSound1;
	hihatSound = hihatSound1;
    }

    if(kit == "kit2") {
	kickSound = kickSound2;
	snareSound = snareSound2;
	crashSound = crashSound2;
	hihatSound = hihatSound2;
    }

    if(kit == "kit3") {
	kickSound = kickSound3;
	snareSound = snareSound3;
	crashSound = crashSound3;
	hihatSound = hihatSound3;
    }
}

