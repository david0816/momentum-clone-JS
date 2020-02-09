const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function lineToDo(event) {
  const checkbox = event.target;
  const li = checkbox.parentNode;
  const span = li.children[1];
  const SHOWING_LINE = "showing-line";
  span.classList.add(SHOWING_LINE);
}

function deleteToDo(event) {
  const btn = event.target;
  const removeli = btn.parentNode;
  toDoList.removeChild(removeli);
  const cleanToDos = toDos.filter(function(toDo) {
    console.log(toDo.id, removeli.id);
    return toDo.id !== parseInt(removeli.id);
    // parseInt() -> string을 숫자로 변환
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const input = document.createElement("input");
  const newId = toDos.length + 1;
  input.type = "checkbox";
  input.addEventListener("click", lineToDo);
  delBtn.innerText = "✕";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(delBtn);

  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  toDoInput.value = "";
  paintToDo(currentValue);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function something(todo) {
      paintToDo(todo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
