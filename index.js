console.log("Hey! Whats Up.")

function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

function Display() {

}

Display.prototype.add = function (book) {
    let row = document.getElementById('content_view');
    html = `     <tr>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.type}</td>
                </tr>`
                row.innerHTML +=html;
}
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();

}
Display.prototype.validation=function(book){
    if(book.name.length<2 || book.author.length<2){
        return false;
        console.log('Validation working for false')
    }
    else{
        return true;
    }
}
Display.prototype.showError=function(type,msg){
    let message=document.getElementById('message');
    message.innerHTML=`
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
  <strong>${type}! </strong>${msg}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
  `
  setTimeout(() => {
      message.innerHTML="";
  }, 5000);

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
    let display=new Display();
    if(display.validation(addBook)){
        display.add(addBook);
        display.clear();
        display.showError('success','Your book has been successfully added');
    }
    else{
        display.showError('danger',"Sorry we couldn't add your book, Provide a correct information.");
    }
    e.preventDefault();
}
