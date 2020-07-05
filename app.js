// Selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

// Functions
function addTodo(event){
    // menghentikan aksi default button --PreventDefault.
    event.preventDefault();
    // Membuat div dengan class Todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Membuat li
    const newTodo = document.createElement('li');
    newTodo.innerHTML=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    
    // Save ke lokal
    saveLocalTodo(todoInput.value);

    // check mark button
    const btnCompleted = document.createElement('button');
    btnCompleted.innerHTML = '<i class="fas fa-check"></i>';
    btnCompleted.classList.add('complete-btn');
    todoDiv.appendChild(btnCompleted);
    // check trash button
    const btnTrash = document.createElement('button');
    btnTrash.innerHTML = '<i class="fas fa-trash"></i>';
    btnTrash.classList.add('trash-btn');
    todoDiv.appendChild(btnTrash);
    // Append to List
    todoList.appendChild(todoDiv);
    // Bersihkan text pada form input todo
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    if(item.classList[0] === "trash-btn"){
        // Mengambil Parent element berdasarkan item yang di click yaitu div todo
        const todo = item.parentElement;
        // animasi
        todo.classList.add('fall');

        // hapus data yang ada di local storage
        removeLocalTodos(todo);

        // Setelah animasi berjalan tambahkan lalu jalankan event transitionend lalu hapus todo
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
    }

    // Check mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
            break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
            break;
        }
    });
}

function saveLocalTodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
         // Membuat div dengan class Todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Membuat li
    const newTodo = document.createElement('li');
    newTodo.innerText=todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    
    // check mark button
    const btnCompleted = document.createElement('button');
    btnCompleted.innerHTML = '<i class="fas fa-check"></i>';
    btnCompleted.classList.add('complete-btn');
    todoDiv.appendChild(btnCompleted);
    // check trash button
    const btnTrash = document.createElement('button');
    btnTrash.innerHTML = '<i class="fas fa-trash"></i>';
    btnTrash.classList.add('trash-btn');
    todoDiv.appendChild(btnTrash);
    // Append to List
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}