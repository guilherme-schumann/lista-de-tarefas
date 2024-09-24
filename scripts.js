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
};

const handleDeleteClick = (taskItemContainer) => {
  taskItemContainer.remove();
};

const handleInputChange = () => {
  const inputIsValid = validadeInput();

  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener('change', () => handleInputChange());
