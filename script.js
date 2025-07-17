// localStorage için kullanılacak anahtar
const STORAGE_KEY = 'todoListItems';

// --- EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', loadTodos);
const list = document.getElementById('list');
list.addEventListener('click', handleListClick);

// --- DOM ELEMENT SELECTION ---
const taskInput = document.getElementById('task');
const successToast = new bootstrap.Toast(document.getElementById('liveToastSuccess'));
const errorToast = new bootstrap.Toast(document.getElementById('liveToastError'));


// --- CORE FUNCTIONS ---
function newElement() {
    const taskValue = taskInput.value.trim();
    if (taskValue) { // taskValue boş değilse true döner
        createLiElement(taskValue, false);
        saveTodos();
        successToast.show();
    } else {
        errorToast.show();
    }
    taskInput.value = "";
}

function handleListClick(event) {
    const targetEl = event.target;
    if (targetEl.tagName === 'LI') {
        targetEl.classList.toggle('checked');
    } else if (targetEl.classList.contains('close')) {
        targetEl.parentElement.remove();
    }
    saveTodos();
}


// --- HELPER & STORAGE FUNCTIONS ---
function createLiElement(text, isChecked) {
    const li = document.createElement('li');
    li.textContent = text;
    if (isChecked) {
        li.classList.add('checked');
    }
    const span = document.createElement('span');
    span.className = 'close';
    span.textContent = '\u00D7';
    li.appendChild(span);
    list.appendChild(li);
}

function saveTodos() {
    const todos = [];
    list.querySelectorAll('li').forEach(li => {
        todos.push({
            text: li.childNodes[0].nodeValue.trim(),
            checked: li.classList.contains('checked')
        });
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (todos) {
        todos.forEach(todo => {
            createLiElement(todo.text, todo.checked);
        });
    }
}