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

