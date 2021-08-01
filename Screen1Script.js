let main_div = document.getElementsByClassName("task-content-box")
// getting data
if(window.location.href !== "http://127.0.0.1:5500/index.html"){

async function getData(){
    var database = firebase.database();
    ref = database.ref("todos")
    await ref.on("value",function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var id = childSnapshot.key;
          var data = childSnapshot.val();
          
          CreateTask(data,id)
        })
  })
}

  //deleting data
  function handleDelete(id) {
    return firebase.database().ref("todos").child(id).remove()
      .then(() => document.getElementById(id).remove());
  }

  //updateing data
  function handleUpdate(task,id , status){
    let updatedTask
    if(status==="incompleted"){
       updatedTask = {
        Task : task.Task,
        TastStatus : task.TastStatus,
        Status : "complete"
      };
    }
    else{
       updatedTask = {
        Task : task.Task,
        TastStatus : task.TastStatus,
        Status : "incompleted"
      };
    }
    
    return firebase.database().ref("todos").child(id).update(updatedTask).then(() => {
      document.getElementById(id).remove();
      return CreateTask(updatedTask,id) ;

    });
  }

  //creating taskk
  function CreateTask(data,id){
  
    //  div for writing data

    var div = document.createElement('div');
    div.className = 'row task-data';
    div.id = id;
    div.style.display = "flex"
    div.style.height = "auto"
    

    var secondary_div = document.createElement('div')
    secondary_div.className = 'row task-data-heading';
    secondary_div.style.width = "400px"
    secondary_div.style.wordWrap = "break-word"

    div.appendChild(secondary_div)

    if(data.Status === "incompleted")
    {
      var p = document.createElement('p');
      
      p.innerHTML =  data.Task+ " : "+ data.TastStatus
      secondary_div.appendChild(p);
    }
    else{
      var s = document.createElement('s');
     
      s.innerHTML =  data.Task+ " : "+ data.TastStatus
      secondary_div.appendChild(s);
    }
   
    // delete button
    var div_deleteButton = document.createElement('div');
    div_deleteButton.className = "col task-delete"


    var delete_button = document.createElement('button');
    delete_button.innerHTML = "<i class='fa fa-trash'></i>"
 
    // status btn
    var div_statusbutton =document.createElement('div');
    div_statusbutton.className = "col task-status"

    var status_button = document.createElement('button');
    if(data.Status === "incompleted"){
      status_button.innerHTML = "<i class='fa fa-check-circle'></i>"
    }
    else{
      status_button.innerHTML = "<i class='fa fa-circle'></i>"
    }

    //edit btn
    var div_editbutton = document.createElement('div')
    div_editbutton.className = "col task-edit"

    var edit_button = document.createElement('button');
    edit_button.innerHTML = "<i class='fa fa-edit'></i>"
    
    

    div.appendChild(div_deleteButton)
    div.appendChild(div_statusbutton)
    div.appendChild(div_editbutton)
    div_deleteButton.appendChild(delete_button)
    div_statusbutton.appendChild(status_button)
    div_editbutton.appendChild(edit_button)
    
    if(document.getElementById(id) === null)
      {
           main_div[0].appendChild(div)
      }

    // event for delete button
   delete_button.addEventListener("click", function () {
    return handleDelete(id);
  });

   // event for status button
   status_button.addEventListener("click", function () {
    return handleUpdate(data,id,data.Status);
  });

    //event for edit button
    edit_button.addEventListener("click",function(){
      localStorage.setItem('Taskname', data.Task);
      localStorage.setItem('TaskDis', data.TastStatus);
      localStorage.setItem('id', id);
      window.location.href = "index.html";
       
     
     
    })
  }


  getData();

}

