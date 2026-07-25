const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addTask.addEventListener("click", function () {

   if (taskInput.value === "") {
    return;
}

const newTask = document.createElement("li");

newTask.textContent = taskInput.value + " ";

const deleteButton = document.createElement("button");

deleteButton.textContent = "Delete";

deleteButton.addEventListener("click", function (event) {
    
    event.stopPropagation();
    
    newTask.remove();

});

newTask.addEventListener("click", function () {

    if (newTask.style.textDecoration === "line-through") {
        newTask.style.textDecoration = "none";
    } else {
        newTask.style.textDecoration = "line-through";
    }

});

newTask.appendChild(deleteButton);

taskList.appendChild(newTask);

taskInput.value = "";

});