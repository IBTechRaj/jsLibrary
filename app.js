class Book {
    constructor(title, author, isbn,pages,read) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.pages = pages;
        this.read = read;
    }
}

class UI {
    addBookToList(book) { //display in web page
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>${book.pages}</td>
        <td>${book.read}</td>
        <td><a href="#" class="delete">X</a></td>
        
        `;
        list.appendChild(row);
    }

    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`

        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#add-book');

        container.insertBefore(div, form);

        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
        document.getElementById('pages').value = '';
        document.getElementById('read').value = '';
    }
}

class LocalStorage{
   static getBooks() {
       let books;
       if (localStorage.getItem('books') === null) {
           books = [];
       } else {
           books = JSON.parse(localStorage.getItem('books'));
       }
//just to clear the list

       return books;
    }

   static render() {
   	
const book1 = new Book("Book1", "Author1", "90001","99","Y");
const book2 = new Book("Book2", "Author2", "90002","99","Y");
const book3 = new Book("Book3", "Author3", "90003","99","Y");
const book4 = new Book("Book4", "Author4", "90004","99","Y");
       const books = LocalStorage.getBooks();
books.push(book1);
books.push(book2);
books.push(book3);
books.push(book4);
       books.forEach(function (book) {
           const ui = new UI();

           ui.addBookToList(book);
       });
    }

   static addBook(book) {
       const books = LocalStorage.getBooks();

       books.push(book);

       localStorage.setItem('books', JSON.stringify(books));
    }

    //populate some books initially


    static removeBooks(isbn) {
        const books = LocalStorage.getBooks();

        books.forEach(function (book, index) {
            if (book.isbn ===  isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', LocalStorage.render);


// Event listeners
document.getElementById('book-form').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('ISBN').value;
pages = document.getElementById('pages').value;
read = document.getElementById('read').value;

    // Instantiate a new book
    const book = new Book(title, author, isbn, pages, read);

    const ui = new UI();

    if (title === '' || author === '' || isbn === '' || pages === '' || read === '') {
        ui.showAlert('Please fill in all feilds', 'error');
    } else {

        ui.addBookToList(book);
        // Adds the book to storage.
        LocalStorage.addBook(book);

        ui.showAlert('Success! Book added!', 'success');
        ui.clearFields();
    }

    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function (e) {
    const ui = new UI();

    ui.deleteBook(e.target);
    LocalStorage.removeBooks(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);

    ui.showAlert('Book removed!', 'success');
    e.preventDefault();
});