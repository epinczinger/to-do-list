import 'bootstrap/js/dist/collapse';
import { createContent, updateLocalStorage } from './helpers';

const domModule = {
  populateList: (listDestination, listArray, displayFunction) => {
    listDestination.innerHTML = '';
    for (let i = 0; i < listArray.length; i += 1) {
      listDestination.appendChild(displayFunction(listArray[i]));
    }
  },
  refreshLists: () => {
    const projectsColumn = document.querySelector('.project-list');
    const projectsList = JSON.parse(localStorage.getItem('projects')) || [];
    const tasksColumn = document.querySelector('.task-list');
    const selectedProjectTasks = JSON.parse(
      localStorage.getItem('selected project'),
    ).tasks;
    domModule.populateList(
      projectsColumn,
      projectsList,
      domModule.displayProject,
    );
    domModule.populateList(
      tasksColumn,
      selectedProjectTasks,
      domModule.displayTask,
    );
  },
  deleteProject: project => {
    const projectsArray = JSON.parse(localStorage.getItem('projects'));
    const selectedProject = JSON.parse(
      localStorage.getItem('selected project'),
    );
    const index = projectsArray.findIndex(
      projectElement => projectElement.title === project.title,
    );

    if (selectedProject.title === projectsArray[index].title) {
      updateLocalStorage([['selected project', JSON.stringify([])]]);
    }

    projectsArray.splice(index, 1);
    updateLocalStorage([['projects', JSON.stringify(projectsArray)]]);
  },
  displayProject: project => {
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
              const projects = JSON.parse(
                localStorage.getItem('projects'),
              );
              const index = projects.findIndex(
                element => project.title === element.title,
              );
              localStorage.setItem(
                'selected project',
                JSON.stringify(projects[index]),
              );
              domModule.refreshLists();
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
                domModule.deleteProject(project);
                domModule.refreshLists();
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

    const form = domModule.renderEditProjectForm(project, uniqueIdentifier);
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
  },
  deleteTask: task => {
    const selectedProject = JSON.parse(
      localStorage.getItem('selected project'),
    );
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
  },
  displayTask: task => {
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
                domModule.deleteTask(task);
                domModule.refreshLists();
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

    card.appendChild(domModule.renderEditTaskForm(task, taskIndex));

    return card;
  },
  renderEditTaskForm: (task, taskIndex) => {
    const form = createContent({
      element: 'form',
      classList: ['collapse'],
      id: `edit-form-task-${taskIndex}`,
      children: [
        {
          element: 'div',
          classList: ['form-group'],
          children: [
            {
              element: 'label',
              innerText: 'Title:',
            },
            {
              element: 'input',
              id: `edit-task-title-${taskIndex}`,
              type: 'text',
              value: task.title,
              classList: ['form-control'],
            },
          ],
        },
        {
          element: 'div',
          classList: ['form-group'],
          children: [
            {
              element: 'label',
              innerText: 'Description:',
            },
            {
              element: 'input',
              type: 'text',
              classList: ['form-control'],
              id: `edit-task-description-${taskIndex}`,
              value: task.description,
            },
          ],
        },
        {
          element: 'div',
          classList: ['form-group'],
          children: [
            {
              element: 'label',
              innerText: 'Due Date:',
            },
            {
              element: 'input',
              type: 'date',
              classList: ['form-control'],
              id: `edit-task-date-${taskIndex}`,
              value: task.dueDate,
            },
          ],
        },
        {
          element: 'div',
          classList: ['form-group'],
          children: [
            {
              element: 'label',
              innerText: 'Priority:',
            },
            {
              element: 'select',
              classList: ['form-control'],
              id: `edit-task-priority-${taskIndex}`,
              value: task.priority,
              children: [
                {
                  element: 'option',
                  textContent: 'Low',
                },
                {
                  element: 'option',
                  textContent: 'Medium',
                },
                {
                  element: 'option',
                  textContent: 'High',
                },
              ],
            },
          ],
        },
        {
          element: 'button',
          classList: ['btn', 'btn-primary'],
          type: 'button',
          innerText: 'Make Changes',
          eventListeners: [
            [
              'click',
              () => {
                const projectList = JSON.parse(
                  localStorage.getItem('projects'),
                );
                const selectedProj = JSON.parse(
                  localStorage.getItem('selected project'),
                );
                const projectIndex = projectList.findIndex(
                  proj => proj.title === selectedProj.title,
                );
                const titleInput = document.getElementById(
                  `edit-task-title-${taskIndex}`,
                );
                const descriptionInput = document.getElementById(
                  `edit-task-description-${taskIndex}`,
                );
                const dueDateInput = document.getElementById(
                  `edit-task-date-${taskIndex}`,
                );
                const priorityInput = document.getElementById(
                  `edit-task-priority-${taskIndex}`,
                );

                [
                  ['title', titleInput.value],
                  ['description', descriptionInput.value],
                  ['dueDate', dueDateInput.value],
                  ['priority', priorityInput.value],
                ].forEach(arr => {
                  [projectList[projectIndex], selectedProj].forEach(
                    proj => {
                      [, proj.tasks[taskIndex][arr[0]]] = arr;
                    },
                  );
                });

                updateLocalStorage([
                  ['projects', JSON.stringify(projectList)],
                  ['selected project', JSON.stringify(selectedProj)],
                ]);
                domModule.refreshLists();
              },
            ],
          ],
        },
      ],
    });
    return form;
  },
  renderEditProjectForm: (project, uniqueIdentifier) => {
    const form = createContent({
      element: 'form',
      classList: ['collapse'],
      id: `edit-form-project-${uniqueIdentifier}`,
      children: [
        {
          element: 'div',
          classList: ['form-group'],
          children: [
            {
              element: 'label',
              innerText: 'Title:',
            },
            {
              element: 'input',
              type: 'text',
              classList: ['form-control'],
              id: `project-${uniqueIdentifier}-input-title`,
              value: project.title,
            },
          ],
        },
        {
          element: 'div',
          classList: ['form-group'],
          children: [
            {
              element: 'label',
              innerText: 'Description:',
            },
            {
              element: 'input',
              type: 'text',
              classList: ['form-control'],
              id: `project-${uniqueIdentifier}-input-description`,
              value: project.description,
            },
          ],
        },
        {
          element: 'div',
          classList: ['form-group'],
          children: [
            {
              element: 'label',
              innerText: 'Due Date:',
            },
            {
              element: 'input',
              type: 'date',
              classList: ['form-control'],
              id: `project-${uniqueIdentifier}-input-date`,
              value: project.dueDate,
            },
          ],
        },
        {
          element: 'button',
          classList: ['btn', 'btn-primary'],
          type: 'button',
          innerText: 'Make Changes',
          eventListeners: [
            [
              'click',
              () => {
                const projectList = JSON.parse(localStorage.getItem('projects'));
                const selectedProject = JSON.parse(
                  localStorage.getItem('selected project'),
                );

                const titleInput = document.getElementById(
                  `project-${uniqueIdentifier}-input-title`,
                );
                const descriptionInput = document.getElementById(
                  `project-${uniqueIdentifier}-input-description`,
                );
                const dueDateInput = document.getElementById(
                  `project-${uniqueIdentifier}-input-date`,
                );

                [
                  ['title', titleInput.value],
                  ['description', descriptionInput.value],
                  ['dueDate', dueDateInput.value],
                ].forEach(arr => {
                  [projectList[uniqueIdentifier], selectedProject].forEach(proj => {
                    [, proj[arr[0]]] = arr;
                  });
                });

                updateLocalStorage(
                  [
                    ['projects', JSON.stringify(projectList)],
                    ['selected project', JSON.stringify(selectedProject)],
                  ],
                );
                domModule.refreshLists();
              },
            ],
          ],
        },
      ],
    });
    return form;
  },
};

export default domModule;