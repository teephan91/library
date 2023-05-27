let myLibrary = [
    {title: 'Brain Rules', author: 'John Medina', pages: 301, readOrNot: 'yes'},
    {title: 'The Dip', author: 'Seth Godin', pages: 96, readOrNot: 'no'}
];

const bookDisplay = document.querySelector('#display');
const bookForm = document.querySelector('form');

for (let i = 0; i < myLibrary.length; i++) {
    let newLibraryIndex = document.createElement('div');
    let newTitle = document.createElement('div');
    let newAuthor = document.createElement('div');
    let newPages = document.createElement('div');
    let newRead = document.createElement('div');

    newTitle.textContent = `Title: ${myLibrary[i].title}`;
    newAuthor.textContent = `Author: ${myLibrary[i].author}`;
    newPages.textContent = `Pages: ${myLibrary[i].pages}`;
    newRead.textContent = `Read or not: ${myLibrary[i].readOrNot}`;
    
    newLibraryIndex.append(newTitle, newAuthor, newPages, newRead);
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
    updateLibrary(myLibrary);

    this.reset();
}

function updateLibrary(library) {
    let newBookDisplay = document.createElement('div');
    let newLibraryIndex = library[library.length - 1];

    newBookDisplay.textContent = `Author: ${newLibraryIndex.author}, Title: ${newLibraryIndex.title}, Pages: ${newLibraryIndex.pages}, Read or not: ${newLibraryIndex.readOrNot}`;

    bookDisplay.append(newBookDisplay);
}