import { Task, Project } from './logic';
import 'bootstrap/js/dist/collapse';

// TASKS
export const displayTask = (task) => {
  const card = document.createElement('div');
  card.classList.add('card', 'my-2');

  const title = document.createElement('h4');
  title.classList.add('card-title', 'px-2', 'py-4');
  title.textContent = task.title;

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('btn', 'btn-secondary');
  deleteBtn.innerText = 'Delete Task'

  deleteBtn.addEventListener('click', function() {
    deleteTask(task);
    
    let tasksColumn = document.querySelector(".task-list");
    let selectedProjectTasks = JSON.parse(localStorage.getItem('selected project')).tasks;

    populateList(tasksColumn, selectedProjectTasks, displayTask);

  });

  // CONTENT WE WANT TO BE HIDDEN AT FIRST
  const body = document.createElement('p');
  body.classList.add('card-body');
  body.textContent = task.description;

  const priority = document.createElement('strong');
  priority.classList.add('card-body');
  priority.textContent = task.priority;

  const date = document.createElement('small');
  date.classList.add('card-body');
  date.textContent = task.dueDate;

  [title, body, priority, date, deleteBtn].forEach((element) => {
    card.appendChild(element);
  });

  return card;
};

// PROJECTS
export const displayProject = (project) => {
  const card = document.createElement('div');
  card.classList.add('card', 'my-2');
  
  let projectList = JSON.parse(localStorage.getItem('projects'));
  let titleList = projectList.map(project => project.title);
  let uniqueIdentifier = titleList.indexOf(project.title);
  card.setAttribute('data-attribute', uniqueIdentifier);

  const title = document.createElement('h4');
  title.classList.add('card-title', 'px-2', 'py-4');
  title.textContent = project.title;

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add("btn", "btn-secondary");
  deleteBtn.innerText = "Delete Project";

  deleteBtn.addEventListener("click", function () {
    deleteProject(project);

    const projectsColumn = document.querySelector(".project-list");
    const projectsList = JSON.parse(localStorage.getItem("projects")) || [];

    populateList(projectsColumn, projectsList, displayProject);
  });

  const editBtn = document.createElement("button");
  editBtn.classList.add("btn", "btn-secondary");
  editBtn.innerText = "Edit Project";
  editBtn.setAttribute('type', 'button');
  editBtn.setAttribute('data-toggle', 'collapse');
  editBtn.setAttribute('data-target', `#edit-form-project-${uniqueIdentifier}`);

  const editForm = `
  <form class="collapse" id="edit-form-project-${uniqueIdentifier}">
    <div class="form-group">
      <label>
        Title:
                </label>
      <input 
        type='text' 
        class="form-control" 
        id='project-${uniqueIdentifier}-input-title'
        value='${project.title ? project.title : ''}'
        ></input>
    </div>
    <div class="form-group">
      <label>
        Description:
                </label>
      <input 
        type='text' 
        class="form-control" 
        id='project-${uniqueIdentifier}-input-description'
        value='${project.description ? project.description : ''}'
        ></input>
    </div>
    <div class="form-group">
      <label>
        Due Date:
                </label>
      <input 
        type='text' 
        class="form-control" 
        id='project-${uniqueIdentifier}-input-date'
        value='${project.date ? project.date : ''}'
        </input>
    </div>
    <button class="btn btn-primary" type="button">Create Project!</button>
  </form>
  `

  // CONTENT WE WANT TO BE HIDDEN AT FIRST
  // const body = document.createElement('p');
  // body.classList.add('card-body');
  // body.textContent = project.description;

  // const priority = document.createElement('strong');
  // priority.classList.add('card-body');
  // priority.textContent = project.priority;

  // const date = document.createElement('small');
  // date.classList.add('card-body');
  // date.textContent = project.dueDate;
  // , body, priority, date

  // ADD EVENT LISTENER TO CARD THAT CHANGES THE DISPLAY OF THE TASK COLUMN

  // When we click a card, we want to run populateList on the task column with arguments:
  // location = taskColumn
  // list = project['selectedProject'].tasks
  // displayFunction = displayTask

  card.addEventListener('click', function(event) {
    if (event.target != deleteBtn && event.target != editBtn) {
      let tasksColumn = document.querySelector(".task-list");
      populateList(tasksColumn, project.tasks, displayTask);

      localStorage.setItem("selected project", JSON.stringify(project));
    }
  });

  [title, deleteBtn, editBtn].forEach((element) => {
    card.appendChild(element);
  });

  editBtn.insertAdjacentHTML('afterend', editForm);

  return card;
};


export const populateList = (listDestination, listArray, displayFunction) => {

  listDestination.innerHTML = "";
  
  for (let i = 0; i < listArray.length; i += 1) {
    listDestination.appendChild(displayFunction(listArray[i]));
  }

};

const deleteProject = (project) => {
  let projectsArray = JSON.parse(localStorage.getItem('projects'));
  let index = projectsArray.findIndex(projectElement => projectElement.title == project.title);

  let selectedProject = JSON.parse(localStorage.getItem('selected project'));
  if (selectedProject.title == projectsArray[index].title) {
    localStorage.setItem('selected project', JSON.stringify([]));

    // If the removed project was previously selected, remove the tasks from the task column;
    let tasksColumn = document.querySelector(".task-list");
    let tasks = [];
    populateList(tasksColumn, tasks, displayTask);
  }

  // Removing the project in the projects array is already implemented.
  projectsArray.splice(index, 1);
  localStorage.setItem('projects', JSON.stringify(projectsArray));
};

const deleteTask = (task) => {

  let selectedProject = JSON.parse(localStorage.getItem("selected project"));
  let tasksArray = selectedProject.tasks;

  let projects = JSON.parse(localStorage.getItem('projects'));
  
  let index = tasksArray.findIndex(
    (taskElement) => taskElement.title == task.title
  );
  
  let projectIndex = projects.findIndex((projectElement) => projectElement.title == selectedProject.title);

  tasksArray.splice(index, 1);
  projects[projectIndex].tasks = tasksArray;

  selectedProject.tasks = tasksArray;

  localStorage.setItem('selected project', JSON.stringify(selectedProject));

  localStorage.setItem('projects', JSON.stringify(projects));

};
