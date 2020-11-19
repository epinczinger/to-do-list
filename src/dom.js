import { Task, Project } from './logic';
import 'bootstrap/js/dist/collapse';

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
  
  let projectList = JSON.parse(localStorage.getItem('projects'));
  let titleList = projectList.map(project => project.title);
  let uniqueIdentifier = titleList.indexOf(project.title);
  card.setAttribute('data-attribute', uniqueIdentifier);

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

  // ADD EVENT LISTENER TO CARD THAT CHANGES THE DISPLAY OF THE TASK COLUMN

  // When we click a card, we want to run populateList on the task column with arguments:
  // location = taskColumn
  // list = project['selectedProject'].tasks
  // displayFunction = displayTask

  card.addEventListener('click', function(event) {
    let tasksColumn = document.querySelector('.task-list');
    populateList(tasksColumn, project.tasks, displayTask);

    let previousSelection = document.getElementsByClassName('selected-project');\

    console.log (typeof )
    
    // previousSelection.forEach( function(element) {
    //   element.classList.remove('selected-project');
    // });


    previousSelection.forEach( element => element.classList.remove('selected-project'));
    this.classList.add('selected-project');

    // GIVE EACH CARD A DATA-ATTRIBUTE ------------------------------------------------------------ DONE
    // WHEN SELECTED, GIVE THE CARD A 'SELECTED CLASS'   ------------------------------------------ DONE
    // CREATE A NEW PROJECT. 
    // QUERYSELECTOR('.SELECTED'). 
    // TAKE THAT ELEMENT'S DATA-ATTRIBUTE AND USE IT TO LOCATE THE PROJECT IN THE PROJECTS ARRAY.
  });


  [title].forEach((element) => {
    card.appendChild(element);
  });

  return card;
};


export const populateList = (listDestination, listArray, displayFunction) => {

  listDestination.innerHTML = "";
  
  for (let i = 0; i < listArray.length; i += 1) {
    listDestination.appendChild(displayFunction(listArray[i]));
  }

};
