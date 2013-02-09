//Sound Object for Drum Machine

function Sound(source) {
	if(!window.audioContext) {
		audioContext = new webkitAudioContext;
	}
	var that = this;
	that.source = source;
	that.buffer = null;
	that.isLoaded = false;

	var loadSound = new XMLHttpRequest();
	loadSound.open("GET", that.source, true);
	loadSound.responseType = "arraybuffer";
	loadSound.onload = function() {
		audioContext.decodeAudioData(loadSound.response, function(buffer) {
			that.buffer = buffer;
			that.isLoaded = true;
		});
	}
	loadSound.send();
}

Sound.prototype.play = function() {
	if(this.isLoaded == true) {
		var playSound = audioContext.createBufferSource();
		playSound.buffer = this.buffer;
		
		//Connects the source to the filters to the destination
		playSound.connect(filterLNode);
		playSound.connect(filterHNode);
		filterLNode.connect(audioContext.destination);
		filterHNode.connect(audioContext.destination);
		
		//playSound.connect(audioContext.destination);
		playSound.noteOn(0);
	}
}