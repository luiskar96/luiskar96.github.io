document.addEventListener("DOMContentLoaded", loadTasks);
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskDate = document.getElementById("taskDate");
    let taskText = taskInput.value.trim();
    let taskDueDate = taskDate.value;
    if (taskText === "" || taskDueDate === "") return;
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let newTask = { text: taskText, date: taskDueDate };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    taskInput.value = "";
    taskDate.value = "";
    showPopup("taskPopup");
}
function showPopup(id) {
    let popup = document.getElementById(id);
    popup.style.display = "flex";
    popup.addEventListener("click", function(event) {
        if (event.target === popup) {
            closePopup(id);
        }
    });
}
function closePopup(id) {
    document.getElementById(id).style.display = "none";
}
function showTasksPopup() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let popupTaskList = document.getElementById("popupTaskList");
    popupTaskList.innerHTML = "";
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = `${task.text} - ${task.date}`;
        popupTaskList.appendChild(li);
    });
    showPopup("viewTasksPopup");
}
function showDeleteTasksPopup() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let deleteTaskList = document.getElementById("deleteTaskList");
    deleteTaskList.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${task.text} - ${task.date} <button class='delete' onclick='deleteTask(${index})'>Eliminar</button>`;
        deleteTaskList.appendChild(li);
    });
    showPopup("deleteTasksPopup");
}
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showDeleteTasksPopup();
}
