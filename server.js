const express = require('express');

// console.log(express);

const app = express();
const PORT = 7000;

let todos = [
  { id: 1, content: 'javascript', completed: false },
  { id: 2, content: 'CSS', completed: false },
  { id: 3, content: 'HTML', completed: false },
];

app.use(express.static('public')); // 우선순위가 더 높음
app.use(express.json());

// router
app.get('/todos', (req, res) => {
  res.send(todos.sort((todo1, todo2) => todo2.id - todo1.id));
});

app.post('/todos', (req, res) => {
  const todo = req.body;
  todos = [todo, ...todos];
  console.log(req.body);
  res.send('xxxx');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});
