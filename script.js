let ts = 1724570724317;
let pubilcKey = "4a6b54a2c9a3b8835db977f766ea5889";
let hashVal = "54ba8a1367a43303f9f05ff84c876cfb";

let input = document.querySelector(".input-box");
let button = document.querySelector(".button");
let showContainer = document.querySelector(".display-container");
let listContainer = document.querySelector(".list");

let date = new Date();
console.log(date.getTime());

const [timeStamp, apiKey, hashValue] = [ts, pubilcKey, hashVal];


function showLoader() {
    document.getElementById('loader').style.display = 'block';
}


function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}



function displayWords(value) {
    input.value = value;
    removeElements();
    showData();

}

function removeElements() {
    listContainer.innerHTML = "";
}

input.addEventListener("input", async () => {
    removeElements();
    if (input.value.length < 2) {
        return false;
    }

    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${hashVal}&nameStartsWith=${input.value}`;

    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData)
    let list=1;
    listContainer.innerHTML="";
    jsonData.data["results"].forEach(result => {
        if(list>5){
            return;
        }
        let name = result.name;

        let div = document.createElement("div");
        div.style.cursor = "pointer";
        div.classList.add("autocomplete-items");
        div.setAttribute("onclick", "displayWords('" + name + "')");

        let word = "<b>" + name.substr(0, input.value.length) + "</b>";
        word += name.substr(input.value.length);
        div.innerHTML = `<p class="items">${word}</p>`
        listContainer.appendChild(div);
        list++;
    })
})


// Hide suggestions when clicking outside the suggestion box
document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !listContainer.contains(e.target)) {
        listContainer.innerHTML = '';
    }
});


async function showData(){
    
    if (input.value.trim().length < 1) {
        
        return;
    }

    showLoader();

    showContainer.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${hashVal}&name=${input.value}`;

    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData)

    jsonData.data["results"].forEach(element => {
        hideLoader();
        showContainer.innerHTML =
            `<div class="card-container">
            <div class="container-character-image">
                <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]}">
            </div>
            <div class="character-name">${element.name}</div>
            <div class="character-description">${element.description}</div>
        </div>`
    });
}


button.addEventListener("click",function(){
    if(input.value===""){
        alert("Input cannot ne blank")
    }
    else{
        showData();
    }
})

document.body.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        if (input.value === "") {
            alert("Input cannot ne blank");
        }
        else {
            showData();
        }
        
    }
});