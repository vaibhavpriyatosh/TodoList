//Selectors

const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filterOption=document.querySelector('.filter-todo');

//Event Listner

document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('change',filterTodo);

//Functions

function addTodo(event){
    event.preventDefault(); 

    //todo div
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo=document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);
    //Adding to Local Storage
    saveLocalTodos(todoInput.value);
    //check mark button
    const completeButton=document.createElement('button');
    completeButton.innerHTML='<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    //trash mark button
    const trashButton=document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST

    todoList.appendChild(todoDiv);

    //clearing input

    todoInput.value="";
}
function deleteCheck(e){
    const item=e.target;
    const paren=item.parentElement;
    //trash-bin
    if(item.classList[0]==='trash-btn'){
        removeLocalTodos(paren.innerText);
        paren.classList.add("falling");
        paren.addEventListener('transitionend',function(){
            
            paren.remove();
        })
        // paren.remove();
    } 

    //check-mark
    if(item.classList[0]==='complete-btn'){
        paren.classList.toggle("completed");
    }

}
function filterTodo(e){
    const todos=todoList.childNodes;
    const tar=(e.target.value);
    
    todos.forEach(function(todo){
        
        switch(tar){
            case "all":
                todo.classList.remove("hidden");
                break;
            case "complete":
                if(todo.classList.contains('completed')){
                    todo.classList.remove("hidden");
                }else{
                    todo.classList.add("hidden");
                }
                break;
            case "uncomplete":
                if(!todo.classList.contains('completed')){
                    todo.classList.remove("hidden");
                }else{
                    todo.classList.add("hidden");
                }
                break;
            
        }
    });
}

function saveLocalTodos(todo){
    //checking for previous
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos)); 
}
function getTodos(e){
    //check if it is already not empty.
    
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
         //todo div
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo=document.createElement('li');
    newTodo.innerText=todo;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);
    
    //check mark button
    const completeButton=document.createElement('button');
    completeButton.innerHTML='<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    //trash mark button
    const trashButton=document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST

    todoList.appendChild(todoDiv);
        
    });
}
function removeLocalTodos(todo){

    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    let index=todos.indexOf(todo);

    todos.splice(index,1);

    localStorage.setItem("todos",JSON.stringify(todos));

}
//  localStorage.clear();
