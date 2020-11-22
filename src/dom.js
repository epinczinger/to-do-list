import 'bootstrap/js/dist/collapse';
import renderEditProjectForm from './editProjectForm';
import renderEditTaskForm from './editTaskForm';

// TASKS
export const displayTask = (task) => {
  const card = document.createElement('div');
  card.classList.add('card', 'my-2');

  const title = document.createElement('h4');
  title.classList.add('card-title', 'px-2', 'py-4');
  title.textContent = task.title;

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('btn', 'btn-secondary');
  deleteBtn.innerText = 'Delete Task';

  const selectedProjectTaskList = JSON.parse(localStorage.getItem('selected project')).tasks;
  const taskIndex = selectedProjectTaskList.findIndex(element => element.title == task.title);

  const editBtn = document.createElement('button');
  editBtn.classList.add('btn', 'btn-secondary');
  editBtn.innerText = 'Edit Task';
  editBtn.setAttribute('type', 'button');
  editBtn.setAttribute('data-toggle', 'collapse');
  editBtn.setAttribute('data-target', `#edit-form-task-${taskIndex}`);

  const form = renderEditTaskForm(task, taskIndex);

  deleteBtn.addEventListener('click', () => {
    deleteTask(task);
    const tasksColumn = document.querySelector('.task-list');
    const selectedProjectTasks = JSON.parse(localStorage.getItem('selected project')).tasks;
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

  [title, body, priority, date, deleteBtn, editBtn, form].forEach((element) => {
    card.appendChild(element);
  });

  return card;
};

// PROJECTS
export const displayProject = (project) => {
  const card = document.createElement('div');
  card.classList.add('card', 'my-2');

  const projectList = JSON.parse(localStorage.getItem('projects'));
  const titleList = projectList.map(project => project.title);
  const uniqueIdentifier = titleList.indexOf(project.title);
  card.setAttribute('data-attribute', uniqueIdentifier);

  const title = document.createElement('h4');
  title.classList.add('card-title', 'px-2', 'py-4');
  title.textContent = project.title;

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('btn', 'btn-secondary');
  deleteBtn.innerText = 'Delete Project';

  deleteBtn.addEventListener('click', () => {
    deleteProject(project);

    const projectsColumn = document.querySelector('.project-list');
    const projectsList = JSON.parse(localStorage.getItem('projects')) || [];

    populateList(projectsColumn, projectsList, displayProject);
  });

  const editBtn = document.createElement('button');
  editBtn.classList.add('btn', 'btn-secondary');
  editBtn.innerText = 'Edit Project';
  editBtn.setAttribute('type', 'button');
  editBtn.setAttribute('data-toggle', 'collapse');
  editBtn.setAttribute('data-target', `#edit-form-project-${uniqueIdentifier}`);

  const form = renderEditProjectForm(project, uniqueIdentifier);

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

  card.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
      const tasksColumn = document.querySelector('.task-list');
      let projects = JSON.parse(localStorage.getItem('projects'));
      let thisProject =
        projects[
          projects.findIndex(projectElement => project.title == projectElement.title)
        ];
      populateList(tasksColumn, thisProject.tasks, displayTask);
      localStorage.setItem('selected project', JSON.stringify(thisProject));
    }
  });

  [title, deleteBtn, editBtn, form].forEach((element) => {
    card.appendChild(element);
  });

  return card;
};

export const populateList = (listDestination, listArray, displayFunction) => {
  listDestination.innerHTML = '';

  for (let i = 0; i < listArray.length; i += 1) {
    listDestination.appendChild(displayFunction(listArray[i]));
  }
};

const deleteProject = (project) => {
  const projectsArray = JSON.parse(localStorage.getItem('projects'));
  const index = projectsArray.findIndex(projectElement => projectElement.title == project.title);

  const selectedProject = JSON.parse(localStorage.getItem('selected project'));
  if (selectedProject.title == projectsArray[index].title) {
    localStorage.setItem('selected project', JSON.stringify([]));

    // If the removed project was previously selected, remove the tasks from the task column;
    const tasksColumn = document.querySelector('.task-list');
    const tasks = [];
    populateList(tasksColumn, tasks, displayTask);
  }

  // Removing the project in the projects array is already implemented.
  projectsArray.splice(index, 1);
  localStorage.setItem('projects', JSON.stringify(projectsArray));
};

const deleteTask = (task) => {
  const selectedProject = JSON.parse(localStorage.getItem('selected project'));
  const tasksArray = selectedProject.tasks;

  const projects = JSON.parse(localStorage.getItem('projects'));

  const index = tasksArray.findIndex(
    (taskElement) => taskElement.title == task.title,
  );

  const projectIndex = projects.findIndex((projectElement) => projectElement.title == selectedProject.title);

  tasksArray.splice(index, 1);
  projects[projectIndex].tasks = tasksArray;

  selectedProject.tasks = tasksArray;

  localStorage.setItem('selected project', JSON.stringify(selectedProject));

  localStorage.setItem('projects', JSON.stringify(projects));
};
