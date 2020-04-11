let todos = [];

const $inputTodo = document.querySelector('.input-todo');
const $todos = document.querySelector('.todos');

// ID 제작
const makeId = () => (todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1);

const render = () => {
  let html = '';

  todos.forEach(todo => {
    html += `<li id="${todo.id}" class="todo-item">
    <input id="ck-${todo.id}" class="checkbox" type="checkbox" ${todo.completed ? 'checked' : ''}>
    <label for="ck-${todo.id}">${todo.content}</label>
    <i class="remove-todo far fa-times-circle"></i>
  </li>`;
  });

  $todos.innerHTML = html;
};


const ajax = (() => {
  const req = (method, url, payload) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error(xhr.status));
      }
    };
  });
  return { // 객체(매소드)를 리턴 함
    get(url) {
      req('GET', url);
    },
    post(url, payload) {
      req('POST', url, payload);
    },
  };
})();


const getTodos = () => {
  ajax.get('/todos')
    .then(_todos => { todos = _todos; })
    .then(render);
};

window.onload = getTodos;

/*
// input key-up 이벤트
$inputTodo.onkeyup = e => {
  const content = $inputTodo.value.trim();
  const payload = { id: makeId(), content, completed: false };
  if (e.keyCode !== 13 || content === '') return;

  ajax.post('/todos', payload)
    .then();
  $inputTodo.value = '';
};
*/
