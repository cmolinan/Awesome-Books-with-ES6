import { DateTime } from './modules/luxon-min.js';
import Library from './modules/library.js';

const library = new Library();

// Book local storage

// BOOK ELEMENT

const listOfBooksElement = document.querySelector('#list-books .list-of-books');

const deleteBookElement = (parentContainer, id) => {
  parentContainer.remove();
  library.remove(id);
};

const CreateBookItemHTML = (id, title, author) => {
  const divContainer = document.createElement('div');
  const bookTitleAndAuthorElement = document.createElement('p');
  const deleteBookBtn = document.createElement('button');

  divContainer.id = `Book-${id}`;
  divContainer.classList.add('books-details');

  bookTitleAndAuthorElement.innerText = `"${title}" by ${author}`;
  bookTitleAndAuthorElement.classList.add('book-title');
  bookTitleAndAuthorElement.classList.add('book-author');

  deleteBookBtn.innerText = 'Remove';

  deleteBookBtn.addEventListener('click', () => {
    deleteBookElement(divContainer, id);
  });

  divContainer.appendChild(bookTitleAndAuthorElement);
  divContainer.appendChild(deleteBookBtn);

  return divContainer;
};

const AddBookToContainerElement = (book) => {
  listOfBooksElement.appendChild(CreateBookItemHTML(book.id, book.title, book.author));
};

const createBookListing = () => {
  library.books.forEach((book) => {
    AddBookToContainerElement(book);
  });
};

// ADD book from

const addBookForm = document.querySelector('#add-book-form');
const bookTitleInput = addBookForm.querySelector('#title-input');
const bookAuthorInput = addBookForm.querySelector('#author-input');

const addBook = (e) => {
  e.preventDefault();
  AddBookToContainerElement(library.createBookAndAdd(bookTitleInput.value, bookAuthorInput.value));
  return false;
};

const addBookButtonLIstener = () => {
  addBookForm.addEventListener('submit', addBook);
};

const refreshTime = () => {
  const timeDisplay = document.getElementById('date-time');
  const dateString = DateTime.local().toFormat("MMMM dd yyyy',' h:mm:ss a");
  timeDisplay.textContent = dateString;
};

const initTime = () => {
  refreshTime();
  setInterval(refreshTime, 1000);
};

const queryListBooks = document.getElementById('list-books');
const queryAddBook = document.getElementById('add-book');
const queryContact = document.getElementById('contact-section');

const queryMenuList = document.getElementById('menuList');
const queryMenuAdd = document.getElementById('menuAdd');
const queryMenuContact = document.getElementById('menuContact');

const removeActiveLink = () => {
  queryMenuList.classList.remove('active');
  queryMenuAdd.classList.remove('active');
  queryMenuContact.classList.remove('active');
};

const clickOnList = (e) => {
  e.preventDefault();
  removeActiveLink();
  e.target.classList.add('active');
  queryListBooks.style.display = 'block';
  queryAddBook.style.display = 'none';
  queryContact.style.display = 'none';
};

const clickOnAdd = (e) => {
  e.preventDefault();
  removeActiveLink();
  e.target.classList.add('active');
  queryListBooks.style.display = 'none';
  queryAddBook.style.display = 'block';
  queryContact.style.display = 'none';
};

const clickOnContact = (e) => {
  e.preventDefault();
  removeActiveLink();
  e.target.classList.add('active');
  queryListBooks.style.display = 'none';
  queryAddBook.style.display = 'none';
  queryContact.style.display = 'block';
};

const addMenusListeners = () => {
  queryMenuList.addEventListener('click', clickOnList);
  queryMenuAdd.addEventListener('click', clickOnAdd);
  queryMenuContact.addEventListener('click', clickOnContact);
};

// INITS

const init = () => {
  library.initBookStorage();
  createBookListing();
  addBookButtonLIstener();
  addMenusListeners();
  initTime();
};

window.addEventListener('load', init);
