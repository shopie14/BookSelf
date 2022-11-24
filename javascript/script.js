const COMPLETED_BOOKSHELF_READING = "completeBookshelfList";
const UNCOMPLETED_BOOKSHELF_READING = "incompleteBookshelfList";
const BOOK_ITEMID = "bookId";

function addBookshelfList() {
  const uncompletedBookshelfRead = document.getElementById(
    UNCOMPLETED_BOOKSHELF_READING
  );
  const completedBookshelfRead = document.getElementById(
    COMPLETED_BOOKSHELF_READING
  );

  const titleBook = document.getElementById("inputBookTitle").value;
  const authorBook = document.getElementById("inputBookAuthor").value;
  const yearBook = document.getElementById("inputBookYear").value;
  console.log("Book Title : " + titleBook);
  console.log("Book Author : " + authorBook);
  console.log("Book Year : " + yearBook);

  let listChecked = document.getElementById("inputBookIsComplete").checked;
  if (listChecked) {
    const bookList = makeBookshelf(
      titleBook,
      authorBook,
      yearBook,
      listChecked
    );
    const bookObject = composeBookObject(
      titleBook,
      authorBook,
      yearBook,
      listChecked
    );

    console.log(bookObject);
    bookList[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
    completedBookshelfRead.append(bookList);
  } else {
    const bookList = makeBookshelf(titleBook, authorBook, yearBook, false);
    const bookObject = composeBookObject(
      titleBook,
      authorBook,
      yearBook,
      false
    );
    bookList[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
    uncompletedBookshelfRead.append(bookList);
  }
  updateDataStorage();
  setBackDefault();
}

function makeBookshelf(title, author, year, isCompleted) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = title;
  const bookAuthor = document.createElement("p");
  bookAuthor.innerHTML = `Penulis: <span id="author"> ` + author + `</span>`;
  const bookYear = document.createElement("p");
  bookYear.innerHTML = `Tahun: <span id="year">` + year + `</span>`;

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("action");
  if (isCompleted) {
    buttonContainer.append(
      createUndoButton(),
      createEditButton(),
      createDeleteButton()
    );
  } else {
    buttonContainer.append(
      createDoneButton(),
      createEditButton(),
      createDeleteButton()
    );
  }

  const bookContainer = document.createElement("article");
  bookContainer.classList.add("book-item");
  bookContainer.append(bookTitle, bookAuthor, bookYear, buttonContainer);

  return bookContainer;
}

function addBookshelfToCompleted(bookshelfElement) {
  const bookshelfCompleted = document.getElementById(
    COMPLETED_BOOKSHELF_READING
  );
  const listBookTitle =
    bookshelfElement.querySelector(".book-item > h3").innerText;
  const listBookAuthor =
    bookshelfElement.querySelector("span#author").innerText;
  const listBookYear = bookshelfElement.querySelector("span#year").innerText;

  const newBookshelf = makeBookshelf(
    listBookTitle,
    listBookAuthor,
    listBookYear,
    true
  );
  const bookList = findBook(bookshelfElement[BOOK_ITEMID]);
  bookList.isCompleted = true;
  newBookshelf[BOOK_ITEMID] = bookList.id;

  bookshelfCompleted.append(newBookshelf);
  bookshelfElement.remove();

  updateDataStorage();
}

function removeBookshelfCompleted(bookshelfElement) {
  const bookPosition = findBookIndex(bookshelfElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);

  bookshelfElement.remove();
  updateDataStorage();
}

function undoBookshelfCompleted(bookshelfElement) {
  const listUncompleted = document.getElementById(
    UNCOMPLETED_BOOKSHELF_READING
  );
  const listBookTitle =
    bookshelfElement.querySelector(".book-item > h3").innerText;
  const listBookAuthor =
    bookshelfElement.querySelector("span#author").innerText;
  const listBookYear = bookshelfElement.querySelector("span#year").innerText;

  const newBookshelf = makeBookshelf(
    listBookTitle,
    listBookAuthor,
    listBookYear,
    false
  );

  const bookList = findBook(bookshelfElement[BOOK_ITEMID]);
  bookList.isCompleted = false;
  newBookshelf[BOOK_ITEMID] = bookList.id;

  listUncompleted.append(newBookshelf);
  bookshelfElement.remove();

  updateDataStorage();
}

// edit item
function editBook(bookshelfElement) {
  document.getElementById("bookSubmit").style.display = "none";
  const editBtn = document.getElementById("bookEdit");
  editBtn.style.display = "block";

  document.getElementById("inputBookTitle").value =
    bookshelfElement.querySelector(".book-item > h3").innerText;
  document.getElementById("inputBookAuthor").value =
    bookshelfElement.querySelector("span#author").innerText;
  document.getElementById("inputBookYear").value =
    bookshelfElement.querySelector("span#year").innerText;

  editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addEditedBook(bookshelfElement);
  });
}

function addEditedBook(bookshelfElement) {
  bookshelfElement.remove();
  removeBookshelfCompleted(bookshelfElement);

  const uncompletedBookshelfRead = document.getElementById(
    UNCOMPLETED_BOOKSHELF_READING
  );
  const completedBookshelfRead = document.getElementById(
    COMPLETED_BOOKSHELF_READING
  );

  const titleBook = document.getElementById("inputBookTitle").value;
  const authorBook = document.getElementById("inputBookAuthor").value;
  const yearBook = document.getElementById("inputBookYear").value;
  const listChecked = document.getElementById("inputBookIsComplete");

  if (listChecked.checked) {
    const bookList = makeBookshelf(
      titleBook,
      authorBook,
      yearBook,
      listChecked
    );
    const bookObject = composeBookObject(
      titleBook,
      authorBook,
      yearBook,
      listChecked
    );

    console.log(bookObject);
    bookList[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
    completedBookshelfRead.append(bookList);
  } else {
    const bookList = makeBookshelf(titleBook, authorBook, yearBook, false);
    const bookObject = composeBookObject(
      titleBook,
      authorBook,
      yearBook,
      false
    );
    bookList[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
    uncompletedBookshelfRead.append(bookList);
  }

  updateDataStorage();
  setBackDefault();
  buttonReturn();
}

// Fungsi membuat button
function createButton(buttonTypeClass, buttonTypeName, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.innerHTML = buttonTypeName;

  button.addEventListener("click", function (event) {
    eventListener(event);
  });

  return button;
}

function createDoneButton() {
  return createButton("green", "Already read", function (event) {
    addBookshelfToCompleted(event.target.parentElement.parentElement);
  });
}

function createDeleteButton() {
  return createButton("red", "Delete Book", function (event) {
    removeBookshelfCompleted(event.target.parentElement.parentElement);
  });
}

function createUndoButton() {
  return createButton("green", "Not Finished Reading", function (event) {
    undoBookshelfCompleted(event.target.parentElement.parentElement);
  });
}

function createEditButton() {
  return createButton("blue", "Edit Book", function (e) {
    editBook(e.target.parentElement.parentElement);
  });
}

function buttonReturn() {
  document.getElementById("bookSubmit").style.display = "block";
  document.getElementById("bookEdit").style.display = "none";
}

//Fungsi Search
function searchBookshelfList() {
  let value = document.getElementById("searchBookTitle").value.toUpperCase();
  let books = document.getElementsByClassName("book-item");
  for (let i = 0; i < books.length; i++) {
    let book = books[i].getElementsByTagName("h3");
    if (book[0].innerHTML.toUpperCase().indexOf(value) > -1) {
      books[i].style.display = "";
    } else {
      books[i].style.display = "none";
    }
  }
}

// back to default
function setBackDefault() {
  document.getElementById("inputBookTitle").value = "";
  document.getElementById("inputBookAuthor").value = "";
  document.getElementById("inputBookYear").value = "";
  document.getElementById("inputBookIsComplete").checked = false;
}
