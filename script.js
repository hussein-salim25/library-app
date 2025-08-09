// Array to hold Book objects
const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read || false;
}

// Add toggleRead method on Book prototype
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Function to add a book to the library array
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  return newBook;
}

// Function to remove a book by id
function removeBookById(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}

// Function to render the library on the page
function renderLibrary() {
  const libraryDiv = document.getElementById('library');
  libraryDiv.innerHTML = ''; // Clear previous

  myLibrary.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.dataset.id = book.id;

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p class="read-status"><strong>Status:</strong> ${book.read ? 'Read' : 'Not read yet'}</p>
      <div class="book-actions">
        <button class="toggle-read-btn">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
        <button class="remove-btn">Remove</button>
      </div>
    `;

    // Toggle read status handler
    bookCard.querySelector('.toggle-read-btn').addEventListener('click', () => {
      book.toggleRead();
      renderLibrary();
    });

    // Remove book handler
    bookCard.querySelector('.remove-btn').addEventListener('click', () => {
      removeBookById(book.id);
      renderLibrary();
    });

    libraryDiv.appendChild(bookCard);
  });
}

// Modal dialog and form handlers
const newBookBtn = document.getElementById('newBookBtn');
const bookFormDialog = document.getElementById('bookFormDialog');
const bookForm = document.getElementById('bookForm');
const cancelBtn = document.getElementById('cancelBtn');

newBookBtn.addEventListener('click', () => {
  bookFormDialog.showModal();
});

cancelBtn.addEventListener('click', () => {
  bookFormDialog.close();
});

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(bookForm);
  const title = formData.get('title').trim();
  const author = formData.get('author').trim();
  const pages = parseInt(formData.get('pages'), 10);
  const read = formData.get('read') === 'on';

  if (title && author && pages > 0) {
    addBookToLibrary(title, author, pages, read);
    renderLibrary();
    bookForm.reset();
    bookFormDialog.close();
  }
});

// Add some initial sample books
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
addBookToLibrary('The Catcher in the Rye', 'J.D. Salinger', 214, true);

// Initial render
renderLibrary();
