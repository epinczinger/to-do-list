import { createContent, updateLocalStorage } from './helpers';
import { refreshLists } from './dom';

export default function renderEditTaskForm(task, taskIndex) {
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
              const projectList = JSON.parse(localStorage.getItem('projects'));
              const selectedProj = JSON.parse(
                localStorage.getItem('selected project'),
              );
              const projectIndex = projectList.findIndex(proj => proj.title === selectedProj.title);
              const titleInput = document.getElementById(`edit-task-title-${taskIndex}`);
              const descriptionInput = document.getElementById(`edit-task-description-${taskIndex}`);
              const dueDateInput = document.getElementById(`edit-task-date-${taskIndex}`);
              const priorityInput = document.getElementById(`edit-task-priority-${taskIndex}`);

              [
                ['title', titleInput.value],
                ['description', descriptionInput.value],
                ['dueDate', dueDateInput.value],
                ['priority', priorityInput.value],
              ].forEach(arr => {
                [projectList[projectIndex], selectedProj].forEach(proj => {
                  proj.tasks[taskIndex][arr[0]] = arr[1];
                });
              });

              updateLocalStorage(
                [
                  ['projects', JSON.stringify(projectList)],
                  ['selected project', JSON.stringify(selectedProj)],
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
