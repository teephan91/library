let myLibrary = [
    {title: 'Brain Rules', author: 'John Medina', pages: 301, readOrNot: 'yes'},
    {title: 'The Dip', author: 'Seth Godin', pages: 96, readOrNot: 'no'}
];

const bookDisplay = document.querySelector('#display');
const bookForm = document.querySelector('form');

for (let i = 0; i < myLibrary.length; i++) {
    let newLibraryIndex = document.createElement('div');
    
    newLibraryIndex.textContent = `Author: ${myLibrary[i].author}, Title: ${myLibrary[i].title}, Pages: ${myLibrary[i].pages}, Read or not: ${myLibrary[i].readOrNot}`;
    
    bookDisplay.append(newLibraryIndex);
}

function Book(author, title, pages, readOrNot) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readOrNot = readOrNot;
}

bookForm.addEventListener('submit', addBookToLibrary);

function addBookToLibrary(event) {
    event.preventDefault();
    let author = document.querySelector('#author').value;
    let title = document.querySelector('#title').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read');

    read.checked === true ? read.value = "yes" : read.value = "no";
    let readOrNot = read.value;

    let newBook = new Book(author, title, pages, readOrNot);

    myLibrary.push(newBook);
    displayBook(newBook);

    this.reset();
}

function displayBook(book) {
    let newBookDisplay = document.createElement('div');

    newBookDisplay.textContent = `Author: ${book.author}, Title: ${book.title}, Pages: ${book.pages}, Read or not: ${book.readOrNot}`;

    bookDisplay.append(newBookDisplay);
}