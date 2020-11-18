import './style/style.scss'

function Task(title, description, dueDate, priority) {
  this.title = title
  this.description = description
  this.dueDate = dueDate
  this.priority = priority
}

// Test code to check whether task details can be outputted into the DOM.

let task1 = new Task('Task1', 'The first task', '1st December 2020', 'High Priority');

let content = document.querySelector('.content');

let taskCard = document.createElement('div');
taskCard.classList.add('card', 'card-body');
taskCard.innerText = `${task1.title} ${task1.description} ${task1.dueDate} ${task1.priority}`;

content.appendChild(taskCard);
