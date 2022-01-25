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
        setInterval(() => {
            factsLoop(file, facts, i);
        }, delay * facts.length);
    }

    // loop facts
    let delay = 5000; // time between facts in ms
    const factsLoop = (file, facts, i) => {
        setTimeout(() => {
            switch(file) {
                // zet je file en tekst.setAttribute hierbij
                case 'files/bigunknown.txt':
                    bigunknowntext.setAttribute("value", facts[i]);
                    break;
                case 'files/anderetext.txt':
                    anderetext.setAttribute("value", facts[i]);
                    break;    
            }
            i++;
            if (i < facts.length) {
                factsLoop(file, facts, i);
            }
        }, delay);
    }

    // declareer je tekst element
    const bigunknowntext = document.getElementById("js--bigunknowntext");
    const anderetext = document.getElementById("js--anderetext");
    
    const readTextFile = (file) => {
        var rawFile = new XMLHttpRequest();
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

    // zet je file hierbij
    readTextFile('files/bigunknown.txt');
    readTextFile('files/anderetext.txt');
    
}