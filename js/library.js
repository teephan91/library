let myLibrary = [
    {title: 'Brain Rules', author: 'John Medina', pages: 301, status: 'Read'},
    {title: 'The Dip', author: 'Seth Godin', pages: 96, status: 'Read'},
    {title: 'Catch-22', author: 'Joseph Heller', pages: 453, status: 'Not Yet'}
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

bookForm.addEventListener('submit', (event) => {
    let titleValidation = validate("title");
    let authorValidation = validate("author");
    let pagesValidation = validate("pages");

    if (titleValidation === false || authorValidation === false || pagesValidation === false) {
       event.preventDefault();
    } else {
       addBookToLibrary(event);
    }
});

function addBookToLibrary(event) {
    event.preventDefault();
    let author = document.querySelector('#author').value;
    let title = document.querySelector('#title').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read');
    let status = read.value;
    
    read.checked === true ? read.value = 'yes' : read.value = 'no';
    (read.value === 'yes') ? status = 'Read' : status = 'Not Yet'; 
    
    let newBook = new Book(author, title, pages, status);

    myLibrary.push(newBook);
    updateLibraryAdd(myLibrary);

    bookForm.reset();
}

function createNewBookIndex(lib, order) {
    let newBookIndex = document.createElement('div');
    let newTitle = document.createElement('div');
    let newAuthor = document.createElement('div');
    let newPages = document.createElement('div');
    let switchBtn = document.createElement('button');
    let removeBtn = document.createElement('button');

    newTitle.textContent = lib.title;
    newAuthor.textContent = lib.author;
    newPages.textContent = `${lib.pages} pages`;

    switchBtn.textContent = lib.status;
    switchBtn.textContent.includes('Read') ? switchBtn.classList.add('read') : switchBtn.classList.add('notyet');    
    switchBtn.addEventListener('click', changeBookStatus);

    removeBtn.textContent = 'Delete';
    removeBtn.classList.add('remove');
    removeBtn.addEventListener('click', removeBook);

    newBookIndex.dataset.indexNumber = order;
    newBookIndex.classList.add('book');
    
    newBookIndex.append(newTitle, newAuthor, newPages, switchBtn, removeBtn);

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
    if (this.textContent.includes('Read')) {
        this.textContent = this.textContent.replace('Read', 'Not Yet');
        this.classList.remove('read');
        this.classList.add('notyet');
        changeLibraryStatus(this.parentElement, this);
    } else if (this.textContent.includes('Not Yet')) {
        this.textContent = this.textContent.replace('Not Yet', 'Read');
        this.classList.remove('notyet');
        this.classList.add('read');
        changeLibraryStatus(this.parentElement, this);
    }
}

function changeLibraryStatus(book, status) {
    if (status.textContent.includes('Not Yet')) {
    myLibrary[book.dataset.indexNumber].status = 'Not Yet';
    } else if (status.textContent.includes('Read')) {
    myLibrary[book.dataset.indexNumber].status = 'Read';
    }
}

function validate(inputID) {
    const input = document.getElementById(inputID);
    const validityState = input.validity;

    if (validityState.valueMissing) {
        input.setCustomValidity("Don't forget to fill this one in!");
    } else {
        input.setCustomValidity("");
    }

    return input.reportValidity();
}