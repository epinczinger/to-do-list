import 'bootstrap/js/dist/collapse';
import renderEditProjectForm from './editProjectForm';
import renderEditTaskForm from './editTaskForm';
import { createContent, updateLocalStorage } from './helpers';

export const populateList = (listDestination, listArray, displayFunction) => {
  listDestination.innerHTML = '';
  for (let i = 0; i < listArray.length; i += 1) {
    listDestination.appendChild(displayFunction(listArray[i]));
  }
};

export function refreshLists() {
  const projectsColumn = document.querySelector('.project-list');
  const projectsList = JSON.parse(localStorage.getItem('projects')) || [];
  const tasksColumn = document.querySelector('.task-list');
  const selectedProjectTasks = JSON.parse(
    localStorage.getItem('selected project'),
  ).tasks;
  populateList(projectsColumn, projectsList, displayProject);
  populateList(tasksColumn, selectedProjectTasks, displayTask);
}

const deleteProject = project => {
  const projectsArray = JSON.parse(localStorage.getItem('projects'));
  const selectedProject = JSON.parse(localStorage.getItem('selected project'));
  const index = projectsArray.findIndex(
    projectElement => projectElement.title === project.title,
  );

  if (selectedProject.title === projectsArray[index].title) {
    updateLocalStorage([['selected project', JSON.stringify([])]]);
  }

  projectsArray.splice(index, 1);
  updateLocalStorage([['projects', JSON.stringify(projectsArray)]]);
};

export const displayProject = project => {
  const projectList = JSON.parse(localStorage.getItem('projects'));
  const titleList = projectList.map(project => project.title);
  const uniqueIdentifier = titleList.indexOf(project.title);

  const card = createContent({
    element: 'div',
    classList: ['card', 'my-2'],
    eventListeners: [
      [
        'click',
        event => {
          if (!['BUTTON', 'INPUT'].includes(event.target.tagName)) {
            const projects = JSON.parse(localStorage.getItem('projects'));
            const index = projects.findIndex(
              element => project.title === element.title,
            );
            localStorage.setItem(
              'selected project',
              JSON.stringify(projects[index]),
            );
            refreshLists();
          }
        },
      ],
    ],
    children: [
      {
        element: 'h4',
        classList: ['card-title', 'px-2', 'py-4'],
        textContent: project.title,
      },
      {
        element: 'button',
        classList: ['btn', 'btn-secondary'],
        textContent: 'Delete Project',
        eventListeners: [
          [
            'click',
            () => {
              deleteProject(project);
              refreshLists();
            },
          ],
        ],
      },
      {
        element: 'button',
        classList: ['btn', 'btn-secondary'],
        textContent: 'Edit Project',
        type: 'button',
        'data-toggle': 'collapse',
        'data-target': `#edit-form-project-${uniqueIdentifier}`,
      },
    ],
  });

  const form = renderEditProjectForm(project, uniqueIdentifier);
  card.appendChild(form);

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

  return card;
};

const deleteTask = task => {
  const selectedProject = JSON.parse(localStorage.getItem('selected project'));
  const projects = JSON.parse(localStorage.getItem('projects'));
  const tasksArray = selectedProject.tasks;
  const index = tasksArray.findIndex(
    taskElement => taskElement.title === task.title,
  );
  const projectIndex = projects.findIndex(
    projectElement => projectElement.title === selectedProject.title,
  );

  tasksArray.splice(index, 1);
  projects[projectIndex].tasks = tasksArray;
  selectedProject.tasks = tasksArray;

  updateLocalStorage([
    ['selected project', JSON.stringify(selectedProject)],
    ['projects', JSON.stringify(projects)],
  ]);
};

export const displayTask = task => {
  const selectedProjectTaskList = JSON.parse(
    localStorage.getItem('selected project'),
  ).tasks;
  const taskIndex = selectedProjectTaskList.findIndex(
    element => element.title === task.title,
  );

  const card = createContent({
    element: 'div',
    classList: ['card', 'my-2'],
    children: [
      {
        element: 'h4',
        classList: ['card-title', 'px-2', 'py-4'],
        textContent: task.title,
      },
      {
        element: 'p',
        classList: ['card-body'],
        textContent: task.description,
      },
      {
        element: 'strong',
        classList: ['card-body'],
        textContent: task.priority,
      },
      {
        element: 'small',
        classList: ['card-body'],
        textContent: task.dueDate,
      },
      {
        element: 'button',
        classList: ['btn', 'btn-secondary'],
        textContent: 'Delete Task',
        eventListeners: [
          [
            'click',
            () => {
              deleteTask(task);
              refreshLists();
            },
          ],
        ],
      },
      {
        element: 'button',
        classList: ['btn', 'btn-secondary'],
        textContent: 'Edit Task',
        type: 'button',
        'data-toggle': 'collapse',
        'data-target': `#edit-form-task-${taskIndex}`,
      },
    ],
  });

  card.appendChild(renderEditTaskForm(task, taskIndex));

  return card;
};
