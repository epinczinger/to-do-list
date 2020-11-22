import "bootstrap/js/dist/collapse";
import renderEditProjectForm from "./editProjectForm";
import renderEditTaskForm from "./editTaskForm";
import { createContent } from "./helpers";

export const populateList = (listDestination, listArray, displayFunction) => {
  listDestination.innerHTML = "";
  for (let i = 0; i < listArray.length; i += 1) {
    listDestination.appendChild(displayFunction(listArray[i]));
  }
};

export function refreshLists() {
  let projectsColumn = document.querySelector(".project-list");
  let projectsList = JSON.parse(localStorage.getItem("projects")) || [];
  let tasksColumn = document.querySelector(".task-list");
  let selectedProjectTasks = JSON.parse(
    localStorage.getItem("selected project")
  ).tasks;
  populateList(projectsColumn, projectsList, displayProject);
  populateList(tasksColumn, selectedProjectTasks, displayTask);
}

export const displayTask = task => {
  let selectedProjectTaskList = JSON.parse(
    localStorage.getItem("selected project")
  ).tasks;
  let taskIndex = selectedProjectTaskList.findIndex(
    element => element.title === task.title
  );

  let card = createContent({
    element: "div",
    classList: ["card", "my-2"],
    children: [
      {
        element: "h4",
        classList: ["card-title", "px-2", "py-4"],
        textContent: task.title
      },
      {
        element: "p",
        classList: ["card-body"],
        textContent: task.description
      },
      {
        element: "strong",
        classList: ["card-body"],
        textContent: task.priority
      },
      {
        element: "small",
        classList: ["card-body"],
        textContent: task.dueDate
      },
      {
        element: "button",
        classList: ["btn", "btn-secondary"],
        textContent: "Delete Task",
        eventListeners: [
          [
            'click',
            () => {
              deleteTask(task);
              refreshLists();
            }
          ]
        ]
      },
      {
        element: "button",
        classList: ["btn", "btn-secondary"],
        textContent: "Edit Task",
        type: "button",
        "data-toggle": "collapse",
        "data-target": `#edit-form-task-${taskIndex}`
      }
    ]
  });

  card.appendChild(renderEditTaskForm(task, taskIndex));

  return card;
};

export const displayProject = project => {
  const projectList = JSON.parse(localStorage.getItem("projects"));
  const titleList = projectList.map(project => project.title);
  const uniqueIdentifier = titleList.indexOf(project.title);

  let card = createContent({
    element: 'div',
    classList: ['card', 'my-2'],
    eventListeners: [
      [
        'click',
        (event) => {
          if (event.target.tagName !== "BUTTON") {
            const projects = JSON.parse(localStorage.getItem("projects"));
            let index = projects.findIndex(projectElement => project.title === projectElement.title)
            localStorage.setItem("selected project", JSON.stringify(projects[index]));
            refreshLists();
          }
        }
      ]
    ],
    children: [
      {
        element: 'h4',
        classList: ['card-title','px-2','py-4'],
        textContent: project.title
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
            }
          ]
        ]
      },
      {
        element: 'button',
        classList: ['btn', 'btn-secondary'],
        textContent: 'Edit Project',
        type: 'button',
        "data-toggle": "collapse",
        "data-target": `#edit-form-project-${uniqueIdentifier}`
      }
    ]
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

const deleteProject = project => {
  const projectsArray = JSON.parse(localStorage.getItem("projects"));
  const index = projectsArray.findIndex(
    projectElement => projectElement.title === project.title
  );

  const selectedProject = JSON.parse(localStorage.getItem("selected project"));
  if (selectedProject.title === projectsArray[index].title) {
    localStorage.setItem("selected project", JSON.stringify([]));

    // If the removed project was previously selected, remove the tasks from the task column;
    const tasksColumn = document.querySelector(".task-list");
    const tasks = [];
    populateList(tasksColumn, tasks, displayTask);
  }

  // Removing the project in the projects array is already implemented.
  projectsArray.splice(index, 1);
  localStorage.setItem("projects", JSON.stringify(projectsArray));
};

const deleteTask = task => {
  const selectedProject = JSON.parse(localStorage.getItem("selected project"));
  const tasksArray = selectedProject.tasks;

  const projects = JSON.parse(localStorage.getItem("projects"));

  const index = tasksArray.findIndex(
    taskElement => taskElement.title === task.title
  );

  const projectIndex = projects.findIndex(
    projectElement => projectElement.title === selectedProject.title
  );

  tasksArray.splice(index, 1);
  projects[projectIndex].tasks = tasksArray;

  selectedProject.tasks = tasksArray;

  localStorage.setItem("selected project", JSON.stringify(selectedProject));

  localStorage.setItem("projects", JSON.stringify(projects));
};
