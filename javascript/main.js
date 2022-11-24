document.addEventListener("DOMContentLoaded", function () {
  const submitAdd = document.getElementById("inputBook");

  submitAdd.addEventListener("submit", function (event) {
    event.preventDefault();
    addBookshelfList();
  });

  const searchSubmit = document.getElementById("searchBook");
  searchSubmit.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBookshelfList();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBook();
});
