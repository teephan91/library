let myLibrary = [
    {title: 'Brain Rules', author: 'John Medina', pages: 301, status: 'yes'},
    {title: 'The Dip', author: 'Seth Godin', pages: 96, status: 'no'},
    {title: 'Starting Strength', author: 'Mark Rippetoe', pages: 347, status: 'yes'},
    {title: 'The Obstacle is the Way', author: 'Ryan Holiday', pages: 224, status: 'yes'}
];

const bookDisplay = document.querySelector('#display');
const bookForm = document.querySelector('form');

function Book(author, title, pages, status) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
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
    let status = read.value;

    let newBook = new Book(author, title, pages, status);

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
    let switchBtn = document.createElement('button');
    let removeBtn = document.createElement('button');

    newTitle.textContent = `Title: ${lib.title}`;
    newAuthor.textContent = `Author: ${lib.author}`;
    newPages.textContent = `Pages: ${lib.pages}`;

    newRead.textContent = `Status: ${lib.status}`;
    newRead.append(switchBtn);
    switchBtn.textContent = 'Switch';
    switchBtn.addEventListener('click', changeBookStatus);

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

function changeBookStatus() {
    let bookStatus = this.previousSibling;

    if (bookStatus.textContent.includes('yes')) {
        bookStatus.textContent = bookStatus.textContent.replace('yes', 'no');
        changeLibraryStatus(this.parentElement.parentElement, bookStatus);
    } else if (bookStatus.textContent.includes('no')) {
        bookStatus.textContent = bookStatus.textContent.replace('no', 'yes');
        changeLibraryStatus(this.parentElement.parentElement, bookStatus);
    }
}

function changeLibraryStatus(book, status) {
    if (status.textContent.includes('no')) {
    myLibrary[book.dataset.indexNumber].status = 'no';
    } else if (status.textContent.includes('yes')) {
    myLibrary[book.dataset.indexNumber].status = 'yes';
    }
}