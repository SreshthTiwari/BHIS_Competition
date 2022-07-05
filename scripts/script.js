//code to display a random photograph, with photographer name
//create 2 arrays, one of all photographer names, and another with all photos from "images" file
const photoguys = []
photoguys[0] = "Aron Visuals"
photoguys[1] = "Roberto Nickson"
photoguys[2] = "Anna Shvetz"
const photos = []
photos[0] = "url(images/quotebg.png)"
photos[1] = "url(images/quotebg1.jpg)"
photos[2] = "url(images/quotebg2.jpg)"

//pick a random photo to display
const randomInt = (max, min) => Math.round(Math.random() * (max - min)) + min;
random = randomInt(0, 2)
document.body.style.backgroundImage = photos[random]

//display photographer's name
let photoguyname = document.getElementById("photoguy")
photoguyname.textContent = "Photo by " + photoguys[random]

//code to display time:
//get time element from html document
let timeelement = document.getElementById("time")

// get current time
const Time = ()=>{
  const d = new Date();
  const dd = [d.getHours(), d.getMinutes()].map((a)=>(a < 10 ? '0' + a : a));
  return dd.join(':');
};

function settime(){
  timeelement.textContent = Time();
}

// update time every 1000 milliseconds
setInterval(settime, 1000);

// code for generating random Quote:
//get quote and author elements
let quote = document.getElementById("quote");
let author = document.getElementById("author");

//fetch random quote from quotable.io and make it quote and author element values 
const urlforquote = "https://api.quotable.io/random";

let getQuote = () => {
  fetch(urlforquote)
    .then((data) => data.json())
    .then((item) => {
      quote.innerText = '" ' + item.content + '"';
      author.innerText = "- " + item.author;
    });
};

//get new quote every time quote is loaded
window.addEventListener("load", getQuote);

//code for main to do section
//get required elements from html document
const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box");
let editId,
isEditTask = false,

//check local storage for existing to-dos and add them to the list
todos = JSON.parse(localStorage.getItem("todo-list"));
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

//function for displaying to do on page
function showTodo(filter) {
    let liTag = "";
    if(todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all") {
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span>No tasks here</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");
function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}

//function for changing status (completed/pending) of each to do
function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

//functions to edit and delete tasks
function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
}
function deleteTask(deleteId, filter) {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
}

// clearing all items from localstorage and current list when "clearall" button is clicked
clearAll.addEventListener("click", () => {
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo()
});

// check if enter key is pressed and then add to do item
taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask) {
        if(!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
});