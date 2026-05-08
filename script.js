const myLibrary = [];

const list = document.querySelector(".list");
const book = document.createElement("div");
const modal = document.querySelector(".modal");

const getAuthor = document.querySelector("#author_name");
const getBookName = document.querySelector("#book_name");
const getNOP = document.querySelector("#numberofpages");
const getReadStatus = document.querySelector("#author_name");

const titleEl = document.createElement("h2");
const authorEl = document.createElement("p");
const nopEl = document.createElement("p");
const read_statusEl = document.createElement("p");

function Book(id, author, title, nop, read_status) {
  this.id = id;
  this.author = author;
  this.title = title;
  this.nop = nop;
  this.read_status = read_status;
}

function addBookToLibrary(id, author, title, nop, read_status) {
  this.id = id;
  this.author = author;
  this.title = title;
  this.nop = nop;
  this.read_status = read_status;
  
  myLibrary.push({id: id, author: author, title: title, nop: nop, read_status: read_status});

  makeBook();
}

addBookToLibrary.prototype = Book.prototype;

function makeBook() {
  let manyBook = myLibrary.length;

  for(let i = 0; i < manyBook; i++){
    
    book.classList.add("card");
    book.id = myLibrary[i].id;
    book.appendChild(titleEl);
    titleEl.textContent = myLibrary[i].title;
    book.appendChild(authorEl);
    authorEl.textContent = myLibrary[i].author;
    book.appendChild(nopEl);
    nopEl.textContent = myLibrary[i].nop;
    if(myLibrary[i].read_status == "yes") {
      book.classList.add("yes");
    } else {
      book.classList.add("no");
    }

    list.appendChild(book);
  }
}

const openButton = document.querySelector("#open");
openButton.addEventListener("click", () => {
  modal.showModal();
})

const closeButton = document.querySelector("#close");
closeButton.addEventListener("click", () => {
  modal.close()
})

let radioBtns = document.querySelectorAll("input[name='read_status']")
let findSelected = () => {
  return document.querySelector("input[name='read_status']:checked").value;
}
radioBtns.forEach(radioBtn => {
  radioBtn.addEventListener("change", findSelected);
})

const submitButton = document.querySelector("#submitBook");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  modal.close()

  let myID = crypto.randomUUID();

  console.log(myID, getAuthor.value, getBookName.value, getNOP.value, findSelected());
  addBookToLibrary(myID, getAuthor.value, getBookName.value, getNOP.value, findSelected());
})