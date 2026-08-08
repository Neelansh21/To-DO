document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {

    let input = document.getElementById("taskInput");
    let task = input.value.trim();

    
    if (task === "") {
        return;
    }

    createTask(task, false);

    
    input.value = "";

    saveTasks();
}


function createTask(taskText, completed) {

   
    let li = document.createElement("li");

    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete">Delete</button>
    `;

    
    if (completed) {
        li.classList.add("completed");
    }

   
    li.querySelector("span").addEventListener("click", function() {

        li.classList.toggle("completed");

        saveTasks();
    });

    
    li.querySelector(".delete").addEventListener("click", function() {

        li.remove();

        saveTasks();
    });

   
    document.getElementById("taskList").appendChild(li);
}


function saveTasks() {

    let tasks = [];

    document.querySelectorAll("#taskList li").forEach(function(li) {

        let task = {
            text: li.querySelector("span").innerText,
            completed: li.classList.contains("completed")
        };

        tasks.push(task);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {

    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(function(task) {

        createTask(task.text, task.completed);

    });
}
