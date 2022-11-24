const STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }

  return true;
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
  if (data !== null) books = data;
  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataStorage() {
  if (isStorageExist()) {
    saveData();
  }
}

function composeBookObject(titleBook, authorBook, yearBook, isCompleted) {
  return {
    id: +new Date(),
    titleBook,
    authorBook,
    yearBook,
    isCompleted,
  };
}

function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }
  return null;
}

function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;
    index++;
  }
  return -1;
}

function refreshDataFromBook() {
  const listUncompleted = document.getElementById(
    UNCOMPLETED_BOOKSHELF_READING
  );
  const listCompleted = document.getElementById(COMPLETED_BOOKSHELF_READING);

  for (book of books) {
    const newBook = makeBookshelf(
      book.titleBook,
      book.authorBook,
      book.yearBook,
      book.isCompleted
    );
    newBook[BOOK_ITEMID] = book.id;

    if (book.isCompleted) {
      listCompleted.append(newBook);
    } else {
      listUncompleted.append(newBook);
    }
  }
}
