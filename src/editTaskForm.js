export default function renderEditTaskForm() {
  let form = document.createElement("form");
  form.classList.add("collapse");
  // form.id = `edit-form-project-`;

  let titleFormGroup = document.createElement("div");
  titleFormGroup.classList.add("form-group");
  let titleLabel = document.createElement("label");
  titleLabel.innerText = "Title:";
  let titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.classList.add("form-control");
  //
  titleFormGroup.appendChild(titleLabel);
  titleFormGroup.appendChild(titleInput);

  let descriptionFormGroup = document.createElement("div");
  descriptionFormGroup.classList.add("form-group");
  let descriptionLabel = document.createElement("label");
  descriptionLabel.innerText = "Description:";
  let descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.classList.add("form-control");
  //  descriptionInput.id = `project-${uniqueIdentifier}-input-description`;
  //  descriptionInput.value = project.description;
  descriptionFormGroup.appendChild(descriptionLabel);
  descriptionFormGroup.appendChild(descriptionInput);

  let dueDateFormGroup = document.createElement("div");
  dueDateFormGroup.classList.add("form-group");
  let dueDateLabel = document.createElement("label");
  dueDateLabel.innerText = "Due Date:";
  let dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.classList.add("form-control");
  // dueDateInput.id = `project-${uniqueIdentifier}-input-date`;
  // dueDateInput.value = project.dueDate;
  dueDateFormGroup.appendChild(dueDateLabel);
  dueDateFormGroup.appendChild(dueDateInput);


    let priorityFormGroup = document.createElement("div");
    priorityFormGroup.classList.add("form-group");
    let priorityLabel = document.createElement("label");
    priority.innerText = 'Priority';
    let selectPriority = document.createElement('select');
    
    

  <div class="form-group">
    <label>Priority:</label>
    <select class="form-control" id="task-input-priority">
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
    </select>
  </div>;






  let submitButton = document.createElement("button");
  submitButton.classList.add("btn", "btn-primary");
  submitButton.type = "button";
  submitButton.innerText = "Make Changes";
  submitButton.addEventListener("click", function (event) {});

  form.appendChild(titleFormGroup);
  form.appendChild(descriptionFormGroup);
  form.appendChild(dueDateFormGroup);
  form.appendChild(submitButton);

  return form;
}
