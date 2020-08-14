
class Book{

    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display{

    add(book){
        let row = document.getElementById('content_view');
       let html = `     <tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                    </tr>`
                    row.innerHTML +=html;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    
    }

    validation(book){
        if(book.name.length<2 || book.author.length<2){
            return false;
            console.log('Validation working for false')
        }
        else{
            return true;
        }
    }

    showError(type,msg){
        let message=document.getElementById('message');
        let boldeText;
        if(type==='success'){
           boldeText="Success"
        }
        else{
            boldeText="Error"
        }
        message.innerHTML=`
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      <strong>${boldeText}! </strong>${msg}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
      `
      setTimeout(() => {
          message.innerHTML="";
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