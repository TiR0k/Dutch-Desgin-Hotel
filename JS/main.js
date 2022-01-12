//https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples/311373

fetch("https://type.fit/api/quotes")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

    })
    .catch(err => {
        console.error("Error", err);
    });