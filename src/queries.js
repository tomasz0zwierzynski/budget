const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'budget-db',
  password: 'postgres',
  port: 5432,
});

const usersRepo = require('./repos/users');

// TODO: dodawanie użytkownika

// TODO: odczytywanie budżetów
// TODO: odczytywanie subskrypcji dla konkretnego użytkownika
// TODO: odczytywanie pozycji dla konkretnego budżetu dla konkretnego użytkownika

const getUsers = (request, response) => {
    usersRepo.getAllUsers().then( res => {
        response.status(200).json(res);
    });
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    usersRepo.getUserById(id).then( res => {
        response.status(200).json(res);  
    });
}

const createUser = (request, response) => {
    const { username, password, display } = request.body;
  
    usersRepo.createUser(request.body).then( res => {
        response.status(201).send(`User added with ID: ${res[0].id}`);
    });

};


const updateUser = (request, response) => {
    const id = parseInt(request.params.id);

    usersRepo.updateUser(id, request.body).then( res => {
        response.status(200).send(`User modified with ID: ${res[0].id}`);
    });
};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);
    usersRepo.deleteUser(id).then( res => {
        response.status(200).send(`User deleted with ID: ${id}`);
    });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}