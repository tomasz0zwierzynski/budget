const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const db = require('./src/queries');

app.use(express.static(__dirname + '/webapp') );
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/webapp/main.html');
});

app.get('/users', db.getUsers);

app.get('/users/:id', db.getUserById);

app.post('/users', db.createUser);

app.put('/users/:id', db.updateUser);

app.delete('/users/:id', db.deleteUser);

const budgetRepo = require('./src/repos/budgets');

app.get('/api/get-budget/:year/:month', (request, response) => {
    const year = parseInt(request.params.year);
    const month = parseInt(request.params.month);

    budgetRepo.getBudgetById(2).then( res => {
        response.json(res);
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});