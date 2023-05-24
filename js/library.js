let myLibrary = [];
const addBook = document.querySelector('button');
const bookDisplay = document.querySelector('#display');

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

addBook.addEventListener('click', addBookToLibrary);

function addBookToLibrary() {
    let author = prompt('Author: ');
    let title = prompt('Title: ');
    let pages = prompt('Number of pages: ');
    let read = prompt('Read or not?');

    let newBook = new Book(author, title, pages, read);

    myLibrary.push(newBook);
    displayBook(newBook);
}

function displayBook(book) {
    let newBookDisplay = document.createElement('div');

    newBookDisplay.textContent = `Title: ${book.title}, Author: ${book.author}, Pages: ${book.pages}, ${book.read}`;

    bookDisplay.append(newBookDisplay);
}