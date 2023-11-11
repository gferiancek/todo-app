const newTodoBtn = document.querySelector('.header__new-todo-btn');
newTodoBtn.addEventListener('click', function () {
  todoForm.classList.replace('header__todo-form--hidden', 'header__todo-form--visible');
});

const todoForm = document.querySelector('.header__todo-form');
const todoInput = document.querySelector('.header__todo-input');
todoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (todoInput.value.trim() === '') {
    todoInput.classList.add('header__todo-input--error');
  } else {
    addTodo(todoInput.value);
    todoInput.value = '';
    todoInput.classList.remove('header__todo-input--error');
    todoForm.classList.replace('header__todo-form--visible', 'header__todo-form--hidden');
  }
});

const todoList = document.querySelector('.todo-list');
todoList.addEventListener('click', function (e) {
  switch (e.target.tagName) {
    case 'LI':
      // we could manually toggle the checked state and item--completed class, but it seemed easier to just click the label.
      e.target.firstChild.click();
      break;
    case 'INPUT':
      e.target.parentElement.classList.toggle('todo-list__item--completed');
      break;
    case 'SPAN':
      e.target.parentElement.remove();
      break;
  }
});

function addTodo(task) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('todo-list__item-checkbox');

  const label = document.createElement('label');
  label.innerText = task;
  label.classList.add('todo-list__item-label');
  label.prepend(checkbox);

  const deleteIcon = document.createElement('span');
  deleteIcon.className = 'material-icons todo-list__delete';
  deleteIcon.innerText = 'close';

  const newTodo = document.createElement('li');
  newTodo.append(label, deleteIcon);
  newTodo.classList.add('todo-list__item');
  todoList.append(newTodo);
}
