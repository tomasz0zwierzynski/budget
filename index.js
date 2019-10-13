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
const userRepo = require('./src/repos/users');
const positionsRepo = require('./src/repos/positions');

app.get('/api/get-budget/:year/:month', (request, response) => {
    const year = parseInt(request.params.year);
    const month = parseInt(request.params.month);

    // TODO: from header token get user!
    // userRepo.getUserById(2).then( res => {
        
    // });

    // TODO: poładnić tą metodę
    budgetRepo.getBudgetByUserMonthYear(1, month, year).then( budget => {        
        
        positionsRepo.getPositonsByBudget( budget[0].id ).then( positions => {
            response.json(
                {
                    id: budget[0].id,
                    user: {},
                    month: month,
                    year: year,
                    positions: positions
                }
            );
        }).catch( err => {
            response.status(404).send(err);
        });
    }).catch( err0 => {
        response.status(404).send(err0);  
    });

});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});
