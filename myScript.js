let taskN , taskD
let TaskName = localStorage.getItem('Taskname');
let TaskDis = localStorage.getItem('TaskDis');
let id = localStorage.getItem('id');

if(TaskName !== null){
    
    document.getElementById("task_name").value = TaskName
    document.getElementById("task_dis").value = TaskDis



}
        // ==============================Write ===============================
    function Ready(){
        taskN = document.getElementById("task_name").value
        taskD = document.getElementById("task_dis").value
    }
    document.getElementById("submit").onclick =  function(e){
        e.preventDefault()
        if(TaskName !== null){
            updatedTaskN = document.getElementById("task_name").value
            updatedTaskD = document.getElementById("task_dis").value
            console.log(updatedTaskN);
            const Updateddata = {
                Task : updatedTaskN,
                TastStatus : updatedTaskD,
                Status : "incompleted"
            }
            firebase.database().ref("todos").child(id).update(Updateddata)
            window.onunload = deleteLocal();
            setTimeout(()=>{
                alert("Updated")
                window.location.href = "screen1.html";
            },2000)
            function deleteLocal(){
                localStorage.removeItem('Taskname');
                localStorage.removeItem('TaskDis');
                localStorage.removeItem('id');
            }
        }
        else{
            Ready();
            console.log(taskN,taskD);
            var database = firebase.database();
            console.log(database);
            var ref = database.ref('todos')
            if(taskN === '' || taskD ==='')
            {
                alert("Please enter task")
            }
            else{
                const data = {
                    Task : taskN,
                    TastStatus : taskD,
                    Status : "incompleted"
                }
                ref.push(data)
                
                setTimeout(()=>{
                    alert("ADDED")
                    window.location.href = "screen1.html";
                },2000)
               
                
    
            }
        }
       
       

    }


    function handleEdit(data,id){
        console.log("s");
    }
   
    