const form = document.getElementById("book-form");
const toggleButton = document.getElementById("toggle-button");
const modal = document.getElementById("modal-backdrop");

let title = document.getElementById("title");
let author = document.getElementById("author");
let pages = document.getElementById("pages");
let isRead = document.getElementById("read");

let myLibray = [
  {
    title: "To kill a mockingbird",
    author: "John Smith",
    pages: 232,
    isRead: false,
  },
  {
    title: "Rich Dad, Poor Dad",
    author: "Robert Kiosaki",
    pages: 232,
    isRead: true,
  },
];

window.onload = fillTable();
form.addEventListener("submit", (e) => addBookToLibrary(e));
toggleButton.addEventListener("click", toggleForm);
modal.addEventListener("click", (e) => closeModal(e));

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = read;
  }
}

function closeModal(e) {
  if (e.target.id === "modal-backdrop") {
    modal.style.display = "none";
    form.reset();
  }
}

function toggleForm() {
  if (modal.style.display === "none") {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
}

function addBookToLibrary(e) {
  e.preventDefault();

  let titleValue = title.value;
  let authorValue = author.value;
  let pagesValue = pages.value;
  let isReadValue = isRead.value == "true" ? true : false;

  let book = new Book(titleValue, authorValue, pagesValue, isReadValue);

  myLibray.push(book);
  fillTable();
  modal.style.display = "none";
  form.reset();
}

function toggleReadStatus(e) {
  let readStatusBtn = e.target;
  let index = readStatusBtn.getAttribute("data-index");

  let target = myLibray[index];

  let obj = {
    title: target.title,
    author: target.author,
    pages: target.pages,
    isRead: !target.isRead,
  };

  myLibray[index] = obj;

  if (target["isRead"] === true) {
    readStatusBtn.textContent = "No";
    readStatusBtn.style.backgroundColor = "red";
  } else {
    readStatusBtn.textContent = "Yes";
    readStatusBtn.style.backgroundColor = "limegreen";
  }
}

function createRemoveBtn(book) {
  var removeTd = document.createElement("td");
  var removeButton = document.createElement("button");
  
  removeButton.classList.add("sharedBtnTraits", "deleteBtn");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", function () {
    // Remove this book from the array and refresh the table
    var index = myLibray.indexOf(book);
    myLibray.splice(index, 1);
    fillTable();
  });
  removeTd.appendChild(removeButton);

  return removeTd;
}

function fillTable() {
  var table = document.querySelector("table");
  var tbody = table.querySelector("tbody");

  // Clear any existing rows first
  tbody.innerHTML = "";

  myLibray.forEach((book, i) => {
    var tr = document.createElement("tr");

    // Create a td for each property of the book
    for (var prop in book) {
      var td = document.createElement("td");
      var readStatusBtn = document.createElement("button");

      readStatusBtn.classList.add("readStatusBtn", "sharedBtnTraits");
      readStatusBtn.style.textAlign = "center";
      readStatusBtn.setAttribute("data-index", i);

      readStatusBtn.addEventListener("click", (e) => toggleReadStatus(e));

      if (prop == "isRead") {
        if (book[prop] == true) {
          readStatusBtn.textContent = "Yes";
          readStatusBtn.style.backgroundColor = "limegreen";
        } else {
          readStatusBtn.textContent = "No";
          readStatusBtn.style.backgroundColor = "red";
        }

        td.appendChild(readStatusBtn);
        tr.appendChild(td);
        break;
      }

      td.textContent = book[prop];
      tr.appendChild(td);
    }

    // Add a remove button
    let removeTd = createRemoveBtn(book);

    tr.appendChild(removeTd);

    // Add this row to the table
    tbody.appendChild(tr);
  });
}
