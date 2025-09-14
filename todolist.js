const addbtn = document.getElementById("addtask");
const taskinput = document.getElementById("taskinp");
const tasklist = document.getElementById("tasklist");

loadtasks();

function addtask() {
    const task = taskinput.value.trim();

    if (task) {

        createtaskelement(task);
        tasksavelocal();
        taskinput.value = "";  // clear input field
    
    } else {
        alert("Enter a task")
    }
}




addbtn.addEventListener("click", addtask);

function createtaskelement(task) {
    
    const listitem = document.createElement("li"); // list elements

    listitem.textContent = task;

    listitem.style.transition = "opacity 1s ease-out";
    listitem.addEventListener("click", function() {
        listitem.style.textDecoration = "line-through";
        listitem.style.opacity = "0.05";

        setTimeout(() => {

            confetti({
                
                particleCount: 100, // cool js particle effect
                spread: 55,
                origin: { y: 0.5 } 
            });

            
            tasklist.removeChild(listitem);
            tasksavelocal();
            
        }, 1000);
    })


    const deletebtn = document.createElement("img") // adding delete icon and cool functions/animation
    deletebtn.src = "delete.png";
    deletebtn.className = "delete-icon";
    deletebtn.alt = "Delete";

    listitem.appendChild(deletebtn);
    tasklist.appendChild(listitem);

    deletebtn.addEventListener("click", function(){
        event.stopPropagation(); // fixes the delete + confetti bug
        tasklist.removeChild(listitem)
        tasksavelocal();
    })

}


function tasksavelocal() {

    let tasks = [];
    tasklist.querySelectorAll("li").forEach(function(item) { // saves tasks in array to keep from leaving after page refresh
        tasks.push(item.textContent.replace("Delete", "").trim());
         
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadtasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [] // emopty array handling

    tasks.forEach(createtaskelement);
}


const deleteAllBtn = document.getElementById("delete-all");

deleteAllBtn.addEventListener("click", function() {
    tasklist.innerHTML = ""; // Removes all tasks
    localStorage.removeItem("tasks"); // Clears localStorage
});
