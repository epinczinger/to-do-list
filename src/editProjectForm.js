import { refreshLists } from './dom';
import { createContent, updateLocalStorage } from './helpers';

export default function renderEditProjectForm(project, uniqueIdentifier) {
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
                  proj[arr[0]] = arr[1];
                });
              });

              updateLocalStorage(
                [
                  ['projects', JSON.stringify(projectList)],
                  ['selected project', JSON.stringify(selectedProject)],
                ],
              );
              refreshLists();
            },
          ],
        ],
      },
    ],
  });
  return form;
}
