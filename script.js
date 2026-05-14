const myLibrary = [];

const list = document.querySelector(".list");
const modal = document.querySelector(".modal");

const getAuthor = document.querySelector("#author_name");
const getBookName = document.querySelector("#book_name");
const getNOP = document.querySelector("#numberofpages");






function Book(id, author, title, nop, read_status) {
  this.id = id;
  this.author = author;
  this.title = title;
  this.nop = nop;
  this.read_status = read_status;
}

function addBookToLibrary(id, author, title, nop, read_status) {
  const newBook = new Book(id, author, title, nop, read_status);
  
  myLibrary.push(newBook);

  renderBook();
}

function createBookCard(bookData) {
  const book = document.createElement("div"); 
  book.classList.add("card");
  book.id = bookData.id;

  const titleEl = document.createElement("h2");
  titleEl.textContent = bookData.title;
  titleEl.classList.add("title");
  book.appendChild(titleEl);

  const authorEl = document.createElement("p");
  authorEl.textContent = "By " + bookData.author;
  authorEl.classList.add("author");
  book.appendChild(authorEl);

  const nopEl = document.createElement("p");
  nopEl.textContent = bookData.nop + " Pages";
  nopEl.classList.add("pages");
  book.appendChild(nopEl);

  if(bookData.read_status == "yes") {
    book.classList.add("yes");
  } else {
    book.classList.add("no");

    const readBook = document.createElement("button");
    readBook.textContent = "I have Read it!"
    readBook.classList.add("readBtn");

    readBook.addEventListener("click", () => {
      const found = myLibrary.find(b => b.id === bookData.id);
      if (found) {
        found.read_status = "yes";
        renderBook();
      }
    })

    book.appendChild(readBook);
  }
  const remove = document.createElement("button");
  remove.textContent = "Remove Book";
  remove.classList.add("removeBtn");
    remove.addEventListener("click", () => {
    let removed = myLibrary.findIndex(b => b.id === bookData.id);
    if (removed !== -1) {
      myLibrary.splice(removed, 1);
      renderBook();
    }
  })
  book.appendChild(remove);

  return book;
}

function renderBook() {
  list.innerHTML = "";
  myLibrary.forEach(bookData => {
    const card = createBookCard(bookData);
    list.appendChild(card);
  })
}

const openButton = document.querySelector("#open");
openButton.addEventListener("click", () => {
  document.querySelector(".modal form").reset();
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

  const form = document.querySelector(".modal form");
  if (!form.checkValidity()) {
    form.reportValidity(); // munculkan pesan error bawaan browser
    return;
  }

  modal.close()

  let myID = crypto.randomUUID();

  console.log(myID, getAuthor.value, getBookName.value, getNOP.value, findSelected());
  addBookToLibrary(myID, getAuthor.value, getBookName.value, getNOP.value, findSelected());
})