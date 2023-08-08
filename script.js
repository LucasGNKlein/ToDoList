const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Carregar tarefas do armazenamento local ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach(task => {
        addTaskToList(task.text, task.completed);
    });
});

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTaskToList(taskText);
        taskInput.value = "";
    }
});

// Adicionar tarefa à lista e armazenar no local storage
function addTaskToList(taskText, completed = false) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="${completed ? "completed" : ""}">${taskText}</span>
        <button class="deleteTaskBtn">Remover</button>
        <button class="completeTaskBtn">${completed ? "Desmarcar" : "Concluir"}</button>
    `;
    taskList.appendChild(li);
    
    const deleteBtn = li.querySelector(".deleteTaskBtn");
    const completeBtn = li.querySelector(".completeTaskBtn");

    deleteBtn.addEventListener("click", () => {
        taskList.removeChild(li);
        updateLocalStorage();
    });

    completeBtn.addEventListener("click", () => {
        li.querySelector("span").classList.toggle("completed");
        completeBtn.textContent = li.querySelector("span").classList.contains("completed") ? "Desmarcar" : "Concluir";
        updateLocalStorage();
    });

    updateLocalStorage();
}

// Atualizar armazenamento local com as tarefas atuais
function updateLocalStorage() {
    const tasks = Array.from(taskList.children).map(li => {
        const text = li.querySelector("span").textContent;
        const completed = li.querySelector("span").classList.contains("completed");
        return { text, completed };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}