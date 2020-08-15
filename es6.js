let bookArray = [];
let row = document.getElementById('content_view');
let currentIndex;
function del(rowId) {
    console.log(rowId);
    bookArray.splice(rowId, 1);
    row.innerHTML = "";
    localStorage.setItem('bookInfo', JSON.stringify(bookArray));
    loadData();
}
loadData();

function loadData() {
    let grabBookInfo = localStorage.getItem('bookInfo');
    if (grabBookInfo != null) {
        bookArray = JSON.parse(grabBookInfo);
        bookArray.forEach(function (element, index) {
            let html = `     <tr>
                <td>${element.book_name}</td>
                <td>${element.author_name}</td>
                <td>${element.book_type}</td>
                <td id="${index}" onclick="del(this.id)" style="
                cursor: pointer; color:red">Delete</td>
                </tr>`
            row.innerHTML += html;
        });
    }
}
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}
class SaveBookInfo {
    save(book) {
        let grabBookInfo = localStorage.getItem('bookInfo');
        if (grabBookInfo == null) {
            bookArray = [];
        }
        else {
            bookArray = JSON.parse(grabBookInfo);
        }
        let bookInfo = {
            book_name: book.name,
            author_name: book.author,
            book_type: book.type
        }
        bookArray.push(bookInfo);
        currentIndex = bookArray.length - 1;
        // console.log(bookArray);
        localStorage.setItem('bookInfo', JSON.stringify(bookArray));
    }
}

class Display {

    add(book) {
        // console.log("Add method")
        let html = `     <tr>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.type}</td>
        <td id="${currentIndex}" onclick="del(this.id)" style="
        cursor: pointer; color:red;">Delete</td>
        </tr>`
        row.innerHTML += html;
    }

    clear() {
        //console.log("clear method")
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();

    }

    validation(book) {
        //console.log("validation method")
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
            console.log('Validation working for false')
        }
        else {
            return true;
        }
    }

    showError(type, msg) {
        let message = document.getElementById('message');
        let boldeText;
        if (type === 'success') {
            boldeText = "Success"
        }
        else {
            boldeText = "Error"
        }
        message.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      <strong>${boldeText}! </strong>${msg}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
      `
        setTimeout(() => {
            message.innerHTML = "";
        }, 5000);

    }

}


let libraryForm = document.getElementById('libraryForm');

libraryForm.addEventListener('submit', FormSubmit);

function FormSubmit(e) {
    e.preventDefault();
    let type;
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('authorName').value;
    let programming = document.getElementById('programming');
    let fiction = document.getElementById('fiction');
    let story = document.getElementById('story');
    if (programming.checked) {
        type = programming.value;
    }
    else if (fiction.checked) {
        type = fiction.value;
    }
    else if (story.checked) {
        type = story.value;
    }
    let addBook = new Book(name, author, type);
    let display = new Display();
    let save = new SaveBookInfo();
    if (display.validation(addBook)) {
        save.save(addBook);
        display.add(addBook);
        display.clear();
        display.showError('success', 'Your book has been successfully added');
    }
    else {
        display.showError('danger', "Sorry we couldn't add your book, Provide a correct information.");
    }
    e.preventDefault();
}
