window.onload = () => {
    const scene = document.getElementById("scene");
    const body = document.getElementById("body");
    const quotes = document.getElementsByClassName("js--quote");
    
    //https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples/311373

    fetch("https://type.fit/api/quotes")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            for(let i=0; i<quotes.length; i++) {
                quotes[i].setAttribute("value", "\"" + data[i].text + "\" ~" + data[i].author);
            }

        })
        .catch(err => {
            console.error("Error", err);
        });
    
    
    // TEXT / FEITEN FUNCTIONALITEIT
    
    // show facts
    const showFacts = (file, text) => {
        let i = 0;
        let facts = text.split("\n");
        facts.push(""); // zorgt ervoor dat de loop zonder tekst eindigt
        factsLoop(file, facts, i);
    }

    const nextFact = (file, facts, i) => {
        switch(file) {
            // zet je file en tekst.setAttribute hierbij
            case 'files/bigunknown.txt':
                bigunknowntext.setAttribute("value", facts[i]);
                break;
            case 'files/anderetext.txt':
                anderetext.setAttribute("value", facts[i]);
                break;
        }
    }

    // loop facts
    let timeout = false;
    let delay = 5000; // time between facts in ms
    const factsLoop = (file, facts, i) => {
        if (!timeout) { // zorgt ervoor dat er geen delay is voor het eerste element
            nextFact(file, facts, i);
        }
        nextFact(file, facts, i); // zorgt ervoor dat de delay na het eerste element niet dubbel is
        timeout = true;
        setTimeout(() => {  
            nextFact(file, facts, i);
            i++;
            if (i < facts.length) {
                factsLoop(file, facts, i);
            }
            if (i == facts.length) {
                factsRunning = false;
                return;
            }
        }, delay);
        
    }

    // declareer je tekst element
    const bigunknowntext = document.getElementById("js--bigunknowntext");
    const anderetext = document.getElementById("js--anderetext");
    
    const readTextFile = (file) => {
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status == 0) {
                    let allText = rawFile.responseText;
                    showFacts(file, allText);
                }
            }
        }
        rawFile.send(null);
    }

    let factsRunning = false;
    const initiateText = (file) => {
        if (!factsRunning) {
            readTextFile(file);
            factsRunning = true;
        }
    }

    // declareer je marker
    const bigunknownmarker = document.getElementById('bigunknown');
<<<<<<< Updated upstream
    const anderemarker = document.getElementById('anderemarker');
=======
    //const anderemarker = document.getElementById('anderemarker');
>>>>>>> Stashed changes

    AFRAME.registerComponent('markerhandler', { // voeg dit component toe aan je marker!
        tick: function() {           
            if(bigunknownmarker.object3D.visible == true) { // voeg else ifs toe van je eigen marker en file
                initiateText('files/bigunknown.txt');
            }
<<<<<<< Updated upstream
            else if (anderemarker.object3D.visible == true) {
                initiateText('files/anderetext.txt');
            }
=======
            //else if (anderemarker.object3D.visible == true) {
            //    initiateText('files/anderetext.txt');
            //}
>>>>>>> Stashed changes
        }
    });

}