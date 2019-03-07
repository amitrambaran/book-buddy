var query = document.querySelector("#searchInput");
var book = document.querySelector(".book");
var results = document.getElementById("results");

query.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        console.log(query.value);
        queryParse();
    }
});

function queryParse() {

    if (document.getElementById('title').checked == true) {
        console.log("title selected");
        let plusDelimitedQuery = query.value.split(' ').join('+');
        let url = 'https://openlibrary.org/search.json?q=' + plusDelimitedQuery;
        httpRequest(url);
    }

    else if (document.getElementById('author').checked == true) {
        let plusDelimitedQuery = query.value.split(' ').join('+');
        let url = 'https://openlibrary.org/search.json?author=' + plusDelimitedQuery;
        console.log(url);
        httpRequest(url);
    }
}

function httpRequest(url) {
    let httpReq = new XMLHttpRequest();
    httpReq.onload = function () {
        if (httpReq.status == 200 && httpReq.readyState == 4) {
            console.log("Status OK");
            results.innerHTML = "";
            let bookData = JSON.parse(httpReq.responseText);
            console.log(bookData);
            bookData.docs.forEach(function (book) {
                let coverURL = '';
                if (book.isbn === undefined) {
                    console.log("no isbn!");
                    return;
                }
                coverURL = "https://covers.openlibrary.org/b/isbn/" + book.isbn[0] + "-L.jpg";
                console.log(coverURL);
                results.innerHTML = results.innerHTML + book.title_suggest + " by " + book.author_name + "<br>" +
                    "<img src=" + coverURL + "></img><br>";
            });

        }
        else {
            alert("Please enter a valid search query.");
            console.log("Status error");
        }

    }
    httpReq.open("GET", url);
    httpReq.send();
}