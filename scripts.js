const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

const tasksContainer = document.querySelector('.tasks-container');

const validadeInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
  const inputIsValid = validadeInput();

  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }

  const taskItemContainer = document.createElement('div');
  taskItemContainer.classList.add('task-item');

  const taskContent = document.createElement('p');
  taskContent.innerText = inputElement.value;

  taskContent.addEventListener("click", () => handleClick(taskContent));

  const deleteItem = document.createElement('i');
  deleteItem.classList.add("fa-regular");
  deleteItem.classList.add("fa-trash-can");

  deleteItem.addEventListener("click", () => handleDeleteClick(taskItemContainer, taskContent));

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);

  tasksContainer.appendChild(taskItemContainer);

  inputElement.value = "";

  updadeLocalStorage();
};

const handleClick = (taskContent) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    if (task.nodeType === Node.ELEMENT_NODE && task.firstChild) {
      if (task.firstChild.isSameNode(taskContent)) {
        task.firstChild.classList.toggle("completed");
      }
    }
  }

  updadeLocalStorage();
};

const handleDeleteClick = (taskItemContainer) => {
  taskItemContainer.remove();
};

const handleInputChange = () => {
  const inputIsValid = validadeInput();

  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }

  updadeLocalStorage();
};

const updadeLocalStorage = () => {
  const tasks = tasksContainer.childNodes;

  const localStorageTasks = [ ...tasks]
  .filter(task => task.nodeType === Node.ELEMENT_NODE && task.firstChild)
  .map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted };
  });

  localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

  if (!tasksFromLocalStorage) return;

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');
  
    const taskContent = document.createElement('p');
    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }
  
    taskContent.addEventListener("click", () => handleClick(taskContent));
  
    const deleteItem = document.createElement('i');
    deleteItem.classList.add("fa-regular");
    deleteItem.classList.add("fa-trash-can");
  
    deleteItem.addEventListener("click", () => handleDeleteClick(taskItemContainer, taskContent));
  
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
  
    tasksContainer.appendChild(taskItemContainer);
  }
}

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener('change', () => handleInputChange());
