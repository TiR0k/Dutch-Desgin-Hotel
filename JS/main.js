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

    // Variabelen
    const bigunknownfile = "files/bigunknown.txt";
    const amaranthinefile = "files/amaranthine.txt";

    const bigunknownmarker = document.getElementById('bigunknown');
    const amaranthinemarker = document.getElementById('amaranthine');

    const bigunknowntext = document.getElementById("js--bigunknowntext");
    const amaranthinetext = document.getElementById("js--amaranthinetext");
    
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
            case bigunknownfile:
                bigunknowntext.setAttribute("value", facts[i]);
                break;
            case amaranthinefile:
                amaranthinetext.setAttribute("value", facts[i]);
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

    AFRAME.registerComponent('markerhandler', { // voeg dit component toe aan je marker!
        tick: function() {           
            if(bigunknownmarker.object3D.visible == true) { // voeg else ifs toe van je eigen marker en file
                initiateText(bigunknownfile);
            }
            else if (amaranthinemarker.object3D.visible == true) {
                initiateText(amaranthinefile);
            }
        }
    });

}