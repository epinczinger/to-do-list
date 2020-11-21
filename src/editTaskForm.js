import {populateList, displayProject, displayTask} from './dom';

export default function renderEditTaskForm(task, taskIndex) {
  
  let form = document.createElement("form");
  form.classList.add("collapse");

  form.id = `edit-form-task-${taskIndex}`;

  let titleFormGroup = document.createElement("div");
  titleFormGroup.classList.add("form-group");
  let titleLabel = document.createElement("label");
  titleLabel.innerText = "Title:";
  let titleInput = document.createElement("input");
  titleInput.id = `edit-task-title-${taskIndex}`
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
  descriptionInput.id = `edit-task-description-${taskIndex}`;
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
  dueDateInput.id = `edit-task-date-${taskIndex}`;
  dueDateInput.value = task.dueDate;
  dueDateFormGroup.appendChild(dueDateLabel);
  dueDateFormGroup.appendChild(dueDateInput);
  
  let priorityFormGroup = document.createElement("div");
  priorityFormGroup.classList.add("form-group");
  let priorityLabel = document.createElement("label");
  priorityLabel.innerText = 'Priority';

  let priorityInput = document.createElement('select');
  priorityInput.classList.add('form-control');
  priorityInput.id = `edit-task-priority-${taskIndex}`;
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
  submitButton.addEventListener("click", function (event) {

    let projectList = JSON.parse(localStorage.getItem("projects"));
    let selectedProject = JSON.parse(localStorage.getItem("selected project"));
    let projectIndex = projectList.findIndex(projectElement => projectElement.title == selectedProject.title); 

    projectList[projectIndex].tasks[taskIndex].title = titleInput.value;
    projectList[projectIndex].tasks[taskIndex].description = descriptionInput.value;
    projectList[projectIndex].tasks[taskIndex].dueDate = dueDateInput.value;
    projectList[projectIndex].tasks[taskIndex].priority = priorityInput.value;
    
    selectedProject.tasks[taskIndex].title = titleInput.value;
    selectedProject.tasks[taskIndex].description = descriptionInput.value;
    selectedProject.tasks[taskIndex].dueDate = dueDateInput.value;
    selectedProject.tasks[taskIndex].priority = priorityInput.value;

    localStorage.setItem("projects", JSON.stringify(projectList));
    localStorage.setItem("selected project", JSON.stringify(selectedProject));

    const projectsColumn = document.querySelector(".project-list");
    const projectsList = JSON.parse(localStorage.getItem("projects")) || [];
    populateList(projectsColumn, projectsList, displayProject);

    let tasksColumn = document.querySelector(".task-list");
    let selectedProjectTasks = JSON.parse(localStorage.getItem("selected project")).tasks;
    populateList(tasksColumn, selectedProjectTasks, displayTask);
  });

  form.appendChild(titleFormGroup);
  form.appendChild(descriptionFormGroup);
  form.appendChild(dueDateFormGroup);
  form.appendChild(priorityFormGroup);
  form.appendChild(submitButton);

  return form;
};
