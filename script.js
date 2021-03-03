const newBookButton = document.querySelector("#new-book");
const form = document.querySelector("#form-element");
const submit = document.querySelector("#submit");
const inputTitle = document.querySelector("#title-input");
const inputAuthor = document.querySelector("#author");
const inputYear = document.querySelector("#year");
const section = document.querySelector("section");
var keys = Object.keys(localStorage);

keys.forEach((i, val) => {
    console.log(keys);
    let element = document.createElement("div");
    
    let obj = JSON.parse(localStorage.getItem(i));

    if (obj.read == false) element.className = "book is-read";
    else element.className = "book not-read";

    let pTitle = document.createElement("p");
    pTitle.className = "title";
    pTitle.textContent = `Title: ${ JSON.parse(localStorage.getItem(i)).title }`;
    let pAuthor = document.createElement("p");
    pAuthor.className = "author";
    pAuthor.textContent = `Author: ${ JSON.parse(localStorage.getItem(i)).author }`;
    let pYear = document.createElement("p");
    pYear.className = "year";
    pYear.textContent = `Year: ${ JSON.parse(localStorage.getItem(i)).year }`;
    let buttons = document.createElement("div");
    buttons.className = "buttons";
    let read = document.createElement("button");
    read.className = "read";
    read.textContent = "Read";
    let remove = document.createElement("button");
    remove.className = "remove";
    remove.textContent = "Remove";

    read.onclick = () => {
        let obj = JSON.parse(localStorage.getItem(i));

        if (element.className == "book not-read") {
            element.className = "book is-read";
        } else {
            element.className = "book not-read";
        }

        obj.read = !obj.read;
        localStorage.setItem(i, JSON.stringify(obj));      
    };

    remove.onclick = () => {
        element.remove();
        localStorage.removeItem(i);
    };

    buttons.appendChild(read);
    buttons.appendChild(remove);
    element.appendChild(pTitle);
    element.appendChild(pAuthor);
    element.appendChild(pYear);
    element.appendChild(buttons);
    section.appendChild(element);
});

newBookButton.onclick = () => {
    form.style.display = "block";  
};

submit.onclick = () => {
    let book = new Book(inputTitle.value, inputAuthor.value, inputYear.value, true);
    
    if (localStorage.length == 0) {
        localStorage.setItem(0, JSON.stringify(book));
    } else {
        let newArr = convertStrToNum(Object.keys(localStorage));
        localStorage.setItem(Math.max(...newArr) + 1, JSON.stringify(book));
    }
};

function convertStrToNum(arr) {
    let numArr = [...arr];
    let newArr = [];

    numArr.map(el => newArr.push(Number(el)));

    return newArr;
}

// Book Constructor
function Book(title, author, year, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
}