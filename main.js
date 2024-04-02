document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");
    var task = taskInput.value.trim();

    if (task !== "") {
        var li = document.createElement("li");
        li.textContent = task;
        
        // Add checkbox for marking task as completed
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
                li.classList.add("completed");
                updateTaskStatus(task, true);
            } else {
                li.classList.remove("completed");
                updateTaskStatus(task, false);
            }
        });
        li.appendChild(checkbox);
        
        // Add delete button
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            if (checkbox.checked) {
                taskList.removeChild(li);
                deleteTask(task);
            } else {
                alert("Please mark the task as completed before deleting.");
            }
        });
        li.appendChild(deleteButton);

        taskList.appendChild(li);
        saveTask(task, false);
        taskInput.value = "";
    }
}

function saveTask(task, completed) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({task: task, completed: completed});
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(task, completed) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function (item) {
        if (item.task === task) {
            item.completed = completed;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(task) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(function(item) {
        return item.task !== task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var taskList = document.getElementById("taskList");

    tasks.forEach(function (item) {
        var li = document.createElement("li");
        li.textContent = item.task;
        
        // Mark task as completed if previously marked
        if (item.completed) {
            li.classList.add("completed");
        }
        
        // Add checkbox for marking task as completed
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.completed;
        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
                li.classList.add("completed");
            } else {
                li.classList.remove("completed");
            }
            updateTaskStatus(item.task, checkbox.checked);
        });
        li.appendChild(checkbox);
        
        // Add delete button
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            taskList.removeChild(li);
            deleteTask(item.task);
        });
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}
