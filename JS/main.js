const scene = document.getElementById("scene");
const body = document.getElementById("body");
//https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples/311373

fetch("https://type.fit/api/quotes")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        for(let i=0; i<10; i++) {
            scene.innerHTML += "<a-marker type='barcode' value= '" + i + "'> <a-text text='"+ data[i].text + "' rotation='-90 0 0'></a-text></a-marker>"
        }

    })
    .catch(err => {
        console.error("Error", err);
    });

