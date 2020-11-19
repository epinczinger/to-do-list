import { Task, Project } from './logic';
import 'bootstrap/js/dist/collapse';


// SEED DATA - DELETE LATER
const task1 = new Task('Shopings', 'buy food for dinner', 'tomorrow', 'high');
const task2 = new Task('Fix car', 'fix flat wheel', 'today', 'high');
const task3 = new Task('Studying', 'read about physics', 'this week', 'medium');

const project1 = new Project(
  'Learn to play Guitar',
  'Get good enough at guitar that I can write and record an original song by the end of the year',
  '31st December 2020',
  'low',
);
const project2 = new Project(
  'Redecorate Room',
  'Give my bedroom a makeover with new paint, furniture and decorations',
  '30th November 2020',
  'medium',
);
const project3 = new Project(
  'Improve garden',
  'Do work on the garden to build vegetable plots and build a greenhouse',
  '1st February 2021',
  'medium',
);

export const seedTasks = [task1, task2, task3];
export const seedProjects = [project1, project2, project3];

// Function that will reveal card details on click.
// function expandCard(card) {
//   // We've been passed the card.

//   let cardBody = card.getElementsByClassName('card-body');

//   console.log(cardBody);

//   // cardBody.classList.toggle('d-none');

//   // Now, query to find the hidden section.

//     // How will we have the body be hidden to start with?

//   // Open it.
  
// }



// TASKS
export const displayTask = (task) => {
  const card = document.createElement('div');
  card.classList.add('card', 'my-2');

  const title = document.createElement('h4');
  title.classList.add('card-title', 'px-2', 'py-4');
  title.textContent = task.title;

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

  [title, body, priority, date].forEach((element) => {
    card.appendChild(element);
  });

  return card;
};

// PROJECTS
export const displayProject = (project) => {
  const card = document.createElement('div');
  card.classList.add('card', 'my-2');

  const title = document.createElement('h4');
  title.classList.add('card-title', 'px-2', 'py-4');
  title.textContent = project.title;

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
  [title].forEach((element) => {
    card.appendChild(element);
  });

  return card;
};

export const populateList = (listDestination, listArray, displayFunction) => {
  for (let i = 0; i < listArray.length; i += 1) {
    listDestination.appendChild(displayFunction(listArray[i]));
  }
};
