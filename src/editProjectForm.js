import { populateList, displayProject, displayTask } from "./dom";

export default function renderEditForm(project, uniqueIdentifier) {

  let form = document.createElement('form');
  form.classList.add('collapse');
  form.id = `edit-form-project-${uniqueIdentifier}`;

  let titleFormGroup = document.createElement('div');
  titleFormGroup.classList.add('form-group');
  let titleLabel = document.createElement('label');
  titleLabel.innerText = 'Title:';
  let titleInput =  document.createElement('input');
  titleInput.type = 'text';
  titleInput.classList.add('form-control');
  titleInput.id = `project-${uniqueIdentifier}-input-title`;
  titleInput.value = project.title;
  titleFormGroup.appendChild(titleLabel);
  titleFormGroup.appendChild(titleInput);

  let descriptionFormGroup = document.createElement('div');
  descriptionFormGroup.classList.add('form-group');
  let descriptionLabel = document.createElement('label');
  descriptionLabel.innerText = 'Description:';
  let descriptionInput =  document.createElement('input');
  descriptionInput.type = 'text';
  descriptionInput.classList.add('form-control');
  descriptionInput.id = `project-${uniqueIdentifier}-input-description`;
  descriptionInput.value = project.description;
  descriptionFormGroup.appendChild(descriptionLabel);
  descriptionFormGroup.appendChild(descriptionInput);

  let dueDateFormGroup = document.createElement('div');
  dueDateFormGroup.classList.add('form-group');
  let dueDateLabel = document.createElement('label');
  dueDateLabel.innerText = 'Due Date:';
  let dueDateInput =  document.createElement('input');
  dueDateInput.type = 'date';
  dueDateInput.classList.add('form-control');
  dueDateInput.id = `project-${uniqueIdentifier}-input-date`;
  dueDateInput.value = project.dueDate;
  dueDateFormGroup.appendChild(dueDateLabel);
  dueDateFormGroup.appendChild(dueDateInput);

  let submitButton = document.createElement('button');
  submitButton.classList.add('btn', 'btn-primary');
  submitButton.type = 'button';
  submitButton.innerText = 'Make Changes';
  submitButton.addEventListener('click', function (event) {
    let projectList = JSON.parse(localStorage.getItem('projects'));
    let selectedProject = JSON.parse(localStorage.getItem('selected project'));

    projectList[uniqueIdentifier].title = titleInput.value;
    projectList[uniqueIdentifier].description = descriptionInput.value;
    projectList[uniqueIdentifier].dueDate = dueDateInput.value;

    selectedProject.title = titleInput.value;
    selectedProject.description = descriptionInput.value;
    selectedProject.dueDate = dueDateInput.value;

    localStorage.setItem('projects', JSON.stringify(projectList));
    localStorage.setItem('selected project', JSON.stringify(selectedProject));

    const projectsColumn = document.querySelector(".project-list");
    const projectsList = JSON.parse(localStorage.getItem("projects")) || [];
    populateList(projectsColumn, projectsList, displayProject);

    let tasksColumn = document.querySelector(".task-list");
    let selectedProjectTasks = JSON.parse(localStorage.getItem('selected project')).tasks;
    populateList(tasksColumn, selectedProjectTasks, displayTask);
  });

  form.appendChild(titleFormGroup);
  form.appendChild(descriptionFormGroup);
  form.appendChild(dueDateFormGroup);
  form.appendChild(submitButton);

  return form;
};
