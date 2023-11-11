const newTodoBtn = document.querySelector('.header__new-todo-btn');
const todoForm = document.querySelector('.header__todo-form');
const todoInput = document.querySelector('.header__todo-input');
const todoList = document.querySelector('.todo-list');

newTodoBtn.addEventListener('click', function () {
  todoForm.classList.remove('header__todo-form--hidden');
});

todoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (todoInput.value === '') {
    todoInput.classList.add('header__todo-input--error');
  } else {
    addTodo(todoInput.value);
    todoInput.value = '';
    todoInput.classList.remove('header__todo-input--error');
    todoForm.classList.add('header__todo-form--hidden');
  }
});

todoList.addEventListener('click', function (e) {
  if (e.target.tagName === 'P') {
    e.target.classList.toggle('todo-list__item--completed');
  } else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
  }
});

function addTodo(task) {
  const todoText = document.createElement('p');
  todoText.innerText = task;

  const deleteIcon = document.createElement('span');
  deleteIcon.className = 'material-icons todo-list__delete';
  deleteIcon.innerText = 'close';

  const newTodo = document.createElement('li');
  newTodo.classList.add('todo-list__item');
  newTodo.append(todoText, deleteIcon);
  todoList.append(newTodo);
}
