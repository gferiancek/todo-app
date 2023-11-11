const newTodoBtn = document.querySelector('.header__new-todo-btn');
const todoForm = document.querySelector('.header__todo-form');
const todoInput = document.querySelector('.header__todo-input');
const todoList = document.querySelector('.todo-list');

let todos = [];
if (localStorage.todos !== undefined) {
  todos = JSON.parse(localStorage.todos);
}
for (let todo of todos) {
  createTodoElement(todo);
}

newTodoBtn.addEventListener('click', function () {
  todoForm.classList.replace('header__todo-form--hidden', 'header__todo-form--visible');
});

todoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (todoInput.value.trim() === '') {
    todoInput.classList.add('header__todo-input--error');
  } else {
    let todo = {
      id: crypto.randomUUID(),
      task: todoInput.value,
      isChecked: false,
    };
    createTodoElement(todo);
    saveTodo(todo);
    todoInput.value = '';
    todoInput.classList.remove('header__todo-input--error');
    todoForm.classList.replace('header__todo-form--visible', 'header__todo-form--hidden');
  }
});

todoList.addEventListener('click', function (e) {
  switch (e.target.tagName) {
    case 'LI':
      // <li> firstChild is <label>
      updateTodo(e.target.firstChild);
      break;
    case 'INPUT':
      // <input> parentElement is <label>
      updateTodo(e.target.parentElement);
      break;
    case 'SPAN':
      // <span> previousElementSibling is <label>
      deleteTodo(e.target.dataset.id);
      e.target.parentElement.remove();
      break;
  }
});

function createTodoElement(todo) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('todo-list__item-checkbox');
  checkbox.checked = todo.isChecked;

  const label = document.createElement('label');
  label.innerText = todo.task;
  label.classList.add('todo-list__item-label');
  label.prepend(checkbox);
  if (todo.isChecked) {
    label.classList.add('todo-list__item--completed');
  }

  const deleteIcon = document.createElement('span');
  deleteIcon.className = 'material-icons todo-list__delete';
  deleteIcon.innerText = 'close';

  // <label> needs id for updateTodo. Since we pass in the label to update its class, it makes sense for it to have todo.id.
  label.dataset.id = todo.id;
  // deleteIcon needs the id for deleteTodo. Easier to additonally set it here then grab it from the label later.
  deleteIcon.dataset.id = todo.id;

  const todoElement = document.createElement('li');
  todoElement.append(label, deleteIcon);
  todoElement.classList.add('todo-list__item');

  todoList.append(todoElement);
}

function saveTodo(todo) {
  todos.push(todo);
  localStorage.todos = JSON.stringify(todos);
}

function deleteTodo(id) {
  let index = todos.findIndex((todo) => todo.id === id);
  todos.splice(index, 1);
  localStorage.todos = JSON.stringify(todos);
}

function updateTodo(label) {
  label.classList.toggle('todo-list__item--completed');
  let index = todos.findIndex((todo) => todo.id === label.dataset.id);
  todos[index].isChecked = !todos[index].isChecked;
  localStorage.todos = JSON.stringify(todos);
}
