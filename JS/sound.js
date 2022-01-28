var markerId;
var soundPlaying = false;

function playRelativeAudio(currentElement) {
    let selection = 0;
    let music = "";
    //get relative element to assign audio index
    if(currentElement == "first") {
        music = "1"
    }
    if(currentElement == "second") {
        music = "2"
    }
    music = "#playmusic" + music; //append index onto relevant #playmusic element id tag
    var audioElement = document.querySelector(music);
    audioElement.components.sound.playSound();

    soundPlaying = true;
};

function pauseRelativeAudio(currentElement) {
    let selection = 0;
    let music = "";
    //get relative element to assign audio index
    if(currentElement == "first") {
        music = "1"
    }
    if(currentElement == "second") {
        music = "2"
    }
    music = "#playmusic" + music; //append index onto relevant #playmusic element id tag
    var audioElement = document.querySelector(music);
    audioElement.components.sound.pauseSound();

    soundPlaying = false;
};

function stopRelativeAudio(currentElement) {
    let selection = 0;
    let music = "";
    //get relative element to assign audio index
    if(currentElement == "first") {
        music = "1"
    }
    if(currentElement == "second") {
        music = "2"
    }
    music = "#playmusic" + music; //append index onto relevant #playmusic element id tag
    var audioElement = document.querySelector(music);
    audioElement.components.sound.stopSound();

    soundPlaying = false;
};


AFRAME.registerComponent('soundmarkerhandler', { //event listener that determens what is visible
    init: function () {
        var marker = this.el;
        marker.addEventListener('markerFound', () => {
            markerId = marker.id;
            console.log('markerFound', markerId);
            //playRelativeAudio(markerId); old debug tester
        });
        marker.addEventListener('markerLost', function() {
            markerId = marker.id;
            console.log('markerLost', markerId);
            stopRelativeAudio(markerId);
            let playBtns = document.querySelectorAll(".js--play");
            for (let x = 0; x < playBtns.length; x++) {
                playBtns[x].setAttribute('material', 'color', "#00AA00");
            }
        });
        
    }
});

AFRAME.registerComponent('cursor-listener', {
    init: function () {
         this.el.addEventListener('click', function (evt) {
             console.log('I was clicked at: ', evt.detail.intersection.point);
        });
    }
  });

AFRAME.registerComponent('play', {
    init: function () {
        let btn = this.el;
        btn.addEventListener('click', function (evt) {
            console.log("CLICKED", this);
            if (!soundPlaying) {
                playRelativeAudio(markerId);
                this.setAttribute('material', 'color', "#00AAAA");
            }
            else {
                pauseRelativeAudio(markerId);
                this.setAttribute('material', 'color', "#00AA00");
            }

        });
    }
});

AFRAME.registerComponent('stop', {
    init: function () {
        let btn = this.el;
        btn.addEventListener('click', function (evt) {
            if (soundPlaying) {
                stopRelativeAudio(markerId);
            }
        });
    }
});