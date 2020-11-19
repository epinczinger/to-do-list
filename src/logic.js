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
  let newProjectTitle = document.getElementById("project-input-title").value;
  let newProjectDescription = document.getElementById(
    "project-input-description"
  ).value;
  let newProjectDueDate = document.getElementById("project-input-date").value;

  document.getElementById("project-input-title").value = "";
  document.getElementById("project-input-description").value = "";
  document.getElementById("project-input-date").value = "";

  let newProject = new Project(
    newProjectTitle,
    newProjectDescription,
    newProjectDueDate
  );

  // Acces projects saved on local storage and parse them into JS object and save into projectList

  let projectsList = JSON.parse(localStorage.getItem("projects")) || [];

  // Push new project into projectsList

  projectsList.push(newProject);

  // And convert it back the projectsList using Stringify

  // Set localStorage projectsList to the new list with added project
  
  localStorage.setItem("projects", JSON.stringify(projectsList));
}


projectFormSubmitButton.addEventListener('click', function(event) {
  processForm(this.parentElement)
});
