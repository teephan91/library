let myLibrary = [
    {title: 'Brain Rules', author: 'John Medina', pages: 301, readOrNot: 'yes'},
    {title: 'The Dip', author: 'Seth Godin', pages: 96, readOrNot: 'no'},
    {title: 'Starting Strength', author: 'Mark Rippetoe', pages: 347, readOrNot: 'yes'},
    {title: 'The Obstacle is the Way', author: 'Ryan Holiday', pages: 224, readOrNot: 'yes'}
];

const bookDisplay = document.querySelector('#display');
const bookForm = document.querySelector('form');

function Book(author, title, pages, readOrNot) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readOrNot = readOrNot;
}

for (let i = 0; i < myLibrary.length; i++) {
    let newLibraryDisplay = createNewBookIndex(myLibrary[i], i);
    bookDisplay.append(newLibraryDisplay);
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
    updateLibraryAdd(myLibrary);

    this.reset();
}

function createNewBookIndex(lib, order) {
    let newBookIndex = document.createElement('div');
    let newTitle = document.createElement('div');
    let newAuthor = document.createElement('div');
    let newPages = document.createElement('div');
    let newRead = document.createElement('div');
    let removeBtn = document.createElement('button');

    newTitle.textContent = `Title: ${lib.title}`;
    newAuthor.textContent = `Author: ${lib.author}`;
    newPages.textContent = `Pages: ${lib.pages}`;
    newRead.textContent = `Read or not: ${lib.readOrNot}`;
    removeBtn.textContent = 'Delete';
    removeBtn.classList.add('remove');
    removeBtn.addEventListener('click', removeBook);

    newBookIndex.dataset.indexNumber = order;
    newBookIndex.classList.add('book');
    
    newBookIndex.append(newTitle, newAuthor, newPages, newRead, removeBtn);

    return newBookIndex;
}

function removeBook() {
    updateLibraryRemove(this.parentElement);        
    this.parentElement.remove();
}

function updateLibraryAdd(library) {
    let newBookDisplay = createNewBookIndex(library[library.length - 1], library.length - 1);
    bookDisplay.append(newBookDisplay);
}

function updateLibraryRemove(oldLibraryIndex) {
    myLibrary.splice(oldLibraryIndex.dataset.indexNumber, 1);
    document.querySelectorAll('.book').forEach((index) => {
        if (index.dataset.indexNumber > oldLibraryIndex.dataset.indexNumber) {
            index.dataset.indexNumber--;
        }
    });
}