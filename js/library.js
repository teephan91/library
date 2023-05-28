let myLibrary = [
    {title: 'Brain Rules', author: 'John Medina', pages: 301, readOrNot: 'yes'},
    {title: 'The Dip', author: 'Seth Godin', pages: 96, readOrNot: 'no'},
    {title: 'Starting Strength', author: 'Mark Rippetoe', pages: 347, readOrNot: 'yes'},
    {title: 'The Obstacle is the Way', author: 'Ryan Holiday', pages: 224, readOrNot: 'yes'}
];

const bookDisplay = document.querySelector('#display');
const bookForm = document.querySelector('form');

for (let i = 0; i < myLibrary.length; i++) {
    var newLibraryIndex = document.createElement('div');
    let newTitle = document.createElement('div');
    let newAuthor = document.createElement('div');
    let newPages = document.createElement('div');
    let newRead = document.createElement('div');
    let removeBtn = document.createElement('button');

    newTitle.textContent = `Title: ${myLibrary[i].title}`;
    newAuthor.textContent = `Author: ${myLibrary[i].author}`;
    newPages.textContent = `Pages: ${myLibrary[i].pages}`;
    newRead.textContent = `Read or not: ${myLibrary[i].readOrNot}`;
    removeBtn.textContent = 'Delete';
    removeBtn.classList.add('remove');
    removeBtn.addEventListener('click', removeBook);

    newLibraryIndex.dataset.indexNumber = i;
    newLibraryIndex.classList.add('book');
    
    newLibraryIndex.append(newTitle, newAuthor, newPages, newRead, removeBtn);
    bookDisplay.append(newLibraryIndex);
}

function removeBook() {
    updateLibraryRemove(this.parentElement);        
    this.parentElement.remove();
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
    updateLibraryAdd(myLibrary);

    this.reset();
}

function updateLibraryAdd(library) {
    let newBookDisplay = document.createElement('div');
    let newLibraryIndex = library[library.length - 1];
    let newTitle = document.createElement('div');
    let newAuthor = document.createElement('div');
    let newPages = document.createElement('div');
    let newRead = document.createElement('div');
    let removeBtn = document.createElement('button');

    newTitle.textContent = `Title: ${newLibraryIndex.title}`;
    newAuthor.textContent = `Author: ${newLibraryIndex.author}`;
    newPages.textContent = `Pages: ${newLibraryIndex.pages}`;
    newRead.textContent = `Read or not: ${newLibraryIndex.readOrNot}`;
    removeBtn.textContent = 'Delete';
    removeBtn.classList.add('remove');
    removeBtn.addEventListener('click', removeBook);

    newBookDisplay.dataset.indexNumber = library.length - 1;
    newBookDisplay.classList.add('book');

    newBookDisplay.append(newTitle, newAuthor, newPages, newRead, removeBtn);
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