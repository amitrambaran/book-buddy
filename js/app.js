var query = document.querySelector("#searchInput");
var book = document.querySelector(".book");

query.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        console.log(query.value);
        titleParse();
    }
});

function titleParse() {

    if (document.getElementById('title-author').checked == true) {
        console.log("title-author selected");
        let plusDelimitedQuery = query.value.split(' ').join('+');
        let url = 'https://openlibrary.org/search.json?q=' + plusDelimitedQuery;
        httpRequest(url);
    }

    else if (document.getElementById('isbn').checked == true) {
        let url = 'http://openlibrary.org/api/books?bibkeys=ISBN:' + query;
        httpRequest(url);
    }
}

function httpRequest(url) {
    let httpReq = new XMLHttpRequest();
    httpReq.onload = function () {
        if (httpReq.status == 200 && httpReq.readyState == 4) {
            console.log("Status OK");
            let bookData = JSON.parse(httpReq.responseText);
            console.log(bookData);

        }
        else {
            alert("Please enter a valid search query.");
            console.log("Status error");
        }

    }
    httpReq.open("GET", url);
    httpReq.send();
}