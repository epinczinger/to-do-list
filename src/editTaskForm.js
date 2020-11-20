export default function renderEditTaskForm(task) {
  let form = document.createElement("form");
  form.classList.add("collapse");
  form.id = 'edit-form-task';

  let titleFormGroup = document.createElement("div");
  titleFormGroup.classList.add("form-group");
  let titleLabel = document.createElement("label");
  titleLabel.innerText = "Title:";
  let titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.value = task.title;
  titleInput.classList.add("form-control");

  titleFormGroup.appendChild(titleLabel);
  titleFormGroup.appendChild(titleInput);

  let descriptionFormGroup = document.createElement("div");
  descriptionFormGroup.classList.add("form-group");
  let descriptionLabel = document.createElement("label");
  descriptionLabel.innerText = "Description:";
  let descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.classList.add("form-control");
  descriptionInput.id = `task-input-description`;
  descriptionInput.value = task.description;
  descriptionFormGroup.appendChild(descriptionLabel);
  descriptionFormGroup.appendChild(descriptionInput);

  let dueDateFormGroup = document.createElement("div");
  dueDateFormGroup.classList.add("form-group");
  let dueDateLabel = document.createElement("label");
  dueDateLabel.innerText = "Due Date:";
  let dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.classList.add("form-control");
  dueDateInput.id = `task-input-date`;
  dueDateInput.value = task.dueDate;
  dueDateFormGroup.appendChild(dueDateLabel);
  dueDateFormGroup.appendChild(dueDateInput);
  
  let priorityFormGroup = document.createElement("div");
  priorityFormGroup.classList.add("form-group");
  let priorityLabel = document.createElement("label");
  priorityLabel.innerText = 'Priority';

  let priorityInput = document.createElement('select');
  priorityInput.classList.add('form-control');
  let optionLow = document.createElement('option');
  optionLow.textContent = 'Low';
  let optionMedium = document.createElement('option');
  optionMedium.textContent = 'Medium';
  let optionHigh = document.createElement('option');
  optionHigh.textContent = 'High';
  priorityInput.appendChild(optionLow);
  priorityInput.appendChild(optionMedium);
  priorityInput.appendChild(optionHigh);
  
  priorityFormGroup.appendChild(priorityLabel);
  priorityFormGroup.appendChild(priorityInput);

  let submitButton = document.createElement("button");
  submitButton.classList.add("btn", "btn-primary");
  submitButton.type = "button";
  submitButton.innerText = "Make Changes";
  // submitButton.addEventListener("click", function (event) {});

  form.appendChild(titleFormGroup);
  form.appendChild(descriptionFormGroup);
  form.appendChild(dueDateFormGroup);
  form.appendChild(priorityFormGroup);
  form.appendChild(submitButton);

  return form;
}
