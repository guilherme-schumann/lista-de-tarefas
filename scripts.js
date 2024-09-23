const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

const validadeInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
  const inputIsValid = validadeInput();

  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }
};

const handleInputChange = () => {
  const inputIsValid = validadeInput();

  if (inputIsValid) {
    return inputElement.classList.remove('error');
  }
}

addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener('change', () => handleInputChange());
