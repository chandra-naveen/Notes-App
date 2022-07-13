function add(){
  var Title = document.getElementById("title");
  var Des = document.getElementById("des");
  
    if (Title.value == "" || Des.value == "") {
        return alert("Please add notes title and description")
    }

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: Title.value,
    description:  Des.value,
    tim: Date().toLocaleString('en-US', { timeZone: 'UTC' })
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  Title.value = "";
  Des.value = ""
  display();
}

function display() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
      html += `
          <div class="note">
              <h3 class="title"> ${element.title} </h3>
              <p class="des"> ${element.description}</p>
              <button id="${index}"onclick="del(this.id)" class="delete-btn">Delete</button>
              <button id="${index}"onclick="edit(this.id)" class="edit-btn">Edit</button>
              <p class= "time"> ${element.tim}</p>
        </div>
            `;
  });
  let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
    notesElm.innerHTML = html;
    } else {
    notesElm.innerHTML = `No Notes to display !`;
    }
  
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsById("notes");
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        
    })
  })

function edit(index) {
    let notes = localStorage.getItem("notes");
    var Title = document.getElementById("title");
    var Des = document.getElementById("des");
    if (Title.value !== "" || Des.value !== "") {
        return alert("Please clear the form before editing a note")
      } 

    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    console.log(notesObj);

    notesObj.findIndex((element) => {
    Title.value = element.title;
    Des.value = element.description;
    })
    notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        display();
}

display();


function del(index) {
        let confirmDel = confirm("Delete this note?");
        if (confirmDel == true) {
            let notes = localStorage.getItem("notes");
            if (notes == null) {
                notesObj = [];
            } else {
                notesObj = JSON.parse(notes);
            }
    
            notesObj.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notesObj));
            display();
        }
      
    }