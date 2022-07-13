//to add new note
function add(){
  var Title = document.getElementById("title"); //take note title and description from the user
  var Des = document.getElementById("des");
  
    if (Title.value == "" || Des.value == "") { 
        return alert("Please add notes title and description") // arlert to add title and description 
                                                              //if the fields are empty
    }

  let notes = localStorage.getItem("notes"); //get exixting notes from local storage if there are any 
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {                               // creating object for title, description and time
    title: Title.value,
    description:  Des.value,
    tim: Date().toLocaleString('en-US', { timeZone: 'UTC' })
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj)); // saving the items taken from user to local storage
  Title.value = "";
  Des.value = ""
  display();    // calling display function to show all notes 
}

//to display all notes

function display() {          // to display the notes saved in local storage
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    let html = "";                        // adding html for the notes objects stored in local storage 
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
    notesElm.innerHTML = html; // displaying notes if local storage is not empty 
    } else {
    notesElm.innerHTML = `No Notes to display !`;
    }
  
}

// search the notes by title

let search = document.getElementById('searchTxt'); // to search notes by title
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase(); // converting title entered by user to lowercase
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

// edit the exiting note

function edit(index) {
    let notes = localStorage.getItem("notes"); 
    var Title = document.getElementById("title"); // to take user edited title and description
    var Des = document.getElementById("des");
    if (Title.value !== "" || Des.value !== "") { // alert user to clear the fileds before editiding a note
        return alert("Please clear the form before editing a note")
      } 

    if (notes == null) {
      notesObj = [];   // set notesobject to empty array if there are no notes 
    } else {
      notesObj = JSON.parse(notes); // else set notes into notes object
    }
    console.log(notesObj);

    notesObj.findIndex((element) => { //setting the notesobject taken from the user to the UI
    Title.value = element.title;
    Des.value = element.description;
    })
    notesObj.splice(index, 1); // to over witre the old entry with new one
        localStorage.setItem("notes", JSON.stringify(notesObj)); // setting the changes to the local storage
        display();
}

display();

// Delete notes 
function del(index) {
        let confirmDel = confirm("Delete this note?"); // alerts user to confirm 
        if (confirmDel == true) { 
            let notes = localStorage.getItem("notes"); //if user confirms it fetchs from local storage
            if (notes == null) {
                notesObj = [];
            } else {
                notesObj = JSON.parse(notes);
            }
    
            notesObj.splice(index, 1); // to remove the note
            localStorage.setItem("notes", JSON.stringify(notesObj)); 
            display();
        }
      
    }