// Функции для добавления и управления задачами
const taskTitle = document.getElementById("taskTitle");
const taskTime = document.getElementById("taskTime");
const addTaskButton = document.getElementById("addTaskButton");
const currentTaskList = document.getElementById("currentTaskList");
const doneTaskList = document.getElementById("doneTaskList");

function addTask() {
  const title = taskTitle.value.trim();
  const time = taskTime.value;

  if (!title || !time) {
    alert("Введите название задачи и время!");
    return;
  }

  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
    <span>${title} (время: ${time})</span>
    <div>
      <button class="doneButton">Выполнено</button>
      <button class="deleteButton">Удалить</button>
    </div>
  `;

  currentTaskList.appendChild(taskItem);
  taskTitle.value = "";
  taskTime.value = "";

  const doneButton = taskItem.querySelector(".doneButton");
  const deleteButton = taskItem.querySelector(".deleteButton");

  doneButton.addEventListener("click", () => moveToDone(taskItem));
  deleteButton.addEventListener("click", () => taskItem.remove());
}

function moveToDone(taskItem) {
  taskItem.querySelector(".doneButton").remove();
  doneTaskList.appendChild(taskItem);
}

// Событие для кнопки добавления задачи
addTaskButton.addEventListener("click", addTask);

// Автоматическое перемещение задач с истёкшим временем
function autoMoveTasks() {
  const now = new Date().toTimeString().slice(0, 5);
  [...currentTaskList.children].forEach((task) => {
    const time = task.textContent.match(/\(время: (.+?)\)/)[1];
    if (time < now) {
      task.querySelector(".doneButton").remove();
      doneTaskList.appendChild(task);
    }
  });
}

setInterval(autoMoveTasks, 1000);
