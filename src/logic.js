export function Task(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.complete = false;
}

export function Project(title, description, dueDate, priority, tasks = []) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.tasks = tasks;
  this.addTask = (newTask) => {
    this.tasks.push(newTask);
  };
}

const projectForm = document.getElementById('project-form');
const taskForm = document.getElementById('task-form');

const taskFormSubmitButton = taskForm.getElementsByClassName('btn', 'btn-primary')[0];
const projectFormSubmitButton = projectForm.getElementsByClassName('btn', 'btn-primary')[0];

function processForm(form) {
  // Take each input from the form and use it to create a new project.
  let newProjectTitle = document.getElementById('project-input-title').value;
  let newProjectDescription = document.getElementById('project-input-description').value;
  let newProjectDueDate = document.getElementById('project-input-date').value;

  document.getElementById('project-input-title').value = '';
  document.getElementById('project-input-description').value = '';
  document.getElementById('project-input-date').value = '';

  let newProject = new Project(newProjectTitle, newProjectDescription, newProjectDueDate);
  
  
  // console.log(newProject.title);

  // We need to convert an object into a string to save it into localStorage

  // And convert it back

  localStorage.setItem('newProject', 'string');

  let retrievedProject = localStorage.getItem('newProject');

  console.log(retrievedProject);

  // console.log(newProject.title);
}

projectFormSubmitButton.addEventListener('click', function(event) {
  processForm(this.parentElement)
});
