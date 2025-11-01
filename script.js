document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const dueDateInput = document.getElementById("dueDateInput");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");

  loadTasks();

  addBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });

  function addTask() {
    const text = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (text === "") return alert("Please enter a task!");
    if (dueDate === "") return alert("Please select a due date!");

    const task = {
      id: Date.now(),
      text,
      dueDate,
      completed: false,
    };

    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    createTask(task);
    taskInput.value = "";
    dueDateInput.value = "";
  }

  function createTask(task) {
    const li = document.createElement("li");
    li.className = "task";
    if (task.completed) li.classList.add("completed");
    li.dataset.id = task.id;

    const textSpan = document.createElement("span");
    textSpan.textContent = `${task.text}`;

    const dateSpan = document.createElement("small");
    dateSpan.textContent = `Due: ${task.dueDate}`;
    dateSpan.style.color = "#666";

    const textContainer = document.createElement("div");
    textContainer.appendChild(textSpan);
    textContainer.appendChild(document.createElement("br"));
    textContainer.appendChild(dateSpan);

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.className = "complete-btn";
    completeBtn.addEventListener("click", () => toggleComplete(task.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.append(textContainer, completeBtn, deleteBtn);
    taskList.appendChild(li);
  }

  function toggleComplete(id) {
    const tasks = getTasks().map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
  }

  function deleteTask(id) {
    const tasks = getTasks().filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
  }

  function loadTasks() {
    getTasks().forEach(createTask);
  }

  function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }

  function render() {
    taskList.innerHTML = "";
    loadTasks();
  }
});
