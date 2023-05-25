let myLibrary = [];
// const addBook = document.querySelector('button');
const bookDisplay = document.querySelector('#display');
const bookForm = document.querySelector('form');

function Book(author, title, pages) {
    this.author = author;
    this.title = title;
    this.pages = pages;
}

bookForm.addEventListener('submit', addBookToLibrary);

function addBookToLibrary(event) {
    event.preventDefault();
    let author = document.querySelector('#author').value;
    let title = document.querySelector('#title').value;
    let pages = document.querySelector('#pages').value;

    let newBook = new Book(author, title, pages);

    myLibrary.push(newBook);
    displayBook(newBook);

    this.reset();
}

function displayBook(book) {
    let newBookDisplay = document.createElement('div');

    newBookDisplay.textContent = `Author: ${book.author}, Title: ${book.title}, Pages: ${book.pages}`;

    bookDisplay.append(newBookDisplay);
}