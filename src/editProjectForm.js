import { populateList, displayProject, displayTask } from './dom';

export default function renderEditForm(project, uniqueIdentifier) {
  const form = document.createElement('form');
  form.classList.add('collapse');
  form.id = `edit-form-project-${uniqueIdentifier}`;

  const titleFormGroup = document.createElement('div');
  titleFormGroup.classList.add('form-group');
  const titleLabel = document.createElement('label');
  titleLabel.innerText = 'Title:';
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.classList.add('form-control');
  titleInput.id = `project-${uniqueIdentifier}-input-title`;
  titleInput.value = project.title;
  titleFormGroup.appendChild(titleLabel);
  titleFormGroup.appendChild(titleInput);

  const descriptionFormGroup = document.createElement('div');
  descriptionFormGroup.classList.add('form-group');
  const descriptionLabel = document.createElement('label');
  descriptionLabel.innerText = 'Description:';
  const descriptionInput = document.createElement('input');
  descriptionInput.type = 'text';
  descriptionInput.classList.add('form-control');
  descriptionInput.id = `project-${uniqueIdentifier}-input-description`;
  descriptionInput.value = project.description;
  descriptionFormGroup.appendChild(descriptionLabel);
  descriptionFormGroup.appendChild(descriptionInput);

  const dueDateFormGroup = document.createElement('div');
  dueDateFormGroup.classList.add('form-group');
  const dueDateLabel = document.createElement('label');
  dueDateLabel.innerText = 'Due Date:';
  const dueDateInput = document.createElement('input');
  dueDateInput.type = 'date';
  dueDateInput.classList.add('form-control');
  dueDateInput.id = `project-${uniqueIdentifier}-input-date`;
  dueDateInput.value = project.dueDate;
  dueDateFormGroup.appendChild(dueDateLabel);
  dueDateFormGroup.appendChild(dueDateInput);

  const submitButton = document.createElement('button');
  submitButton.classList.add('btn', 'btn-primary');
  submitButton.type = 'button';
  submitButton.innerText = 'Make Changes';
  submitButton.addEventListener('click', (event) => {
    const projectList = JSON.parse(localStorage.getItem('projects'));
    const selectedProject = JSON.parse(localStorage.getItem('selected project'));

    projectList[uniqueIdentifier].title = titleInput.value;
    projectList[uniqueIdentifier].description = descriptionInput.value;
    projectList[uniqueIdentifier].dueDate = dueDateInput.value;

    selectedProject.title = titleInput.value;
    selectedProject.description = descriptionInput.value;
    selectedProject.dueDate = dueDateInput.value;

    localStorage.setItem('projects', JSON.stringify(projectList));
    localStorage.setItem('selected project', JSON.stringify(selectedProject));

    const projectsColumn = document.querySelector('.project-list');
    const projectsList = JSON.parse(localStorage.getItem('projects')) || [];
    populateList(projectsColumn, projectsList, displayProject);

    const tasksColumn = document.querySelector('.task-list');
    const selectedProjectTasks = JSON.parse(localStorage.getItem('selected project')).tasks;
    populateList(tasksColumn, selectedProjectTasks, displayTask);
  });

  form.appendChild(titleFormGroup);
  form.appendChild(descriptionFormGroup);
  form.appendChild(dueDateFormGroup);
  form.appendChild(submitButton);

  return form;
}
