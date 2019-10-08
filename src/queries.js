const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'budget-db',
  password: 'postgres',
  port: 5432,
});

// TODO: dodawanie użytkownika

// TODO: odczytywanie budżetów
// TODO: odczytywanie subskrypcji dla konkretnego użytkownika
// TODO: odczytywanie pozycji dla konkretnego budżetu dla konkretnego użytkownika

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
}

const createUser = (request, response) => {
    const { username, password, display } = request.body;
  
    pool.query('INSERT INTO users (username, password, display) VALUES ($1, $2, $3) RETURNING id', [username, password, display], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    });
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { username, password, display } = request.body;
  
    pool.query(
      'UPDATE users SET username = $1, password = $2, display = $3 WHERE id = $4',
      [username, password, display, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(`User modified with ID: ${id}`);
      }
    )
};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    })
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}