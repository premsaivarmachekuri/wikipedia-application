let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearcResults(result) {
    // Creating Result Item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    // Creating Title
    let {
        link,
        title,
        description
    } = result;
    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    // Creating Break Element 
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    // Creating URL Element
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    // Creating Break Element
    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);

    // Creating Description Element
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    let result; //= searchResults[0];
    for (result of searchResults) {
        createAndAppendSearcResults(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter" && searchInputEl.value !== "") {
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = "";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData);
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            })
        //console.log(searchInput);
    }
}
searchInputEl.addEventListener("keydown", searchWikipedia);