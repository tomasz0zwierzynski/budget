const pool = require('./pool');

const getAllUsers = function () {
    return pool.query(
        'SELECT * FROM users ORDER BY id ASC'
    ).then(res => res.rows);
};

const getUserById = function (id) {
    return pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    ).then(res => res.rows);
};

const createUser = function (user) {
    const { username, password, display } = user;
    return pool.query(
        'INSERT INTO users (username, password, display) VALUES ($1, $2, $3) RETURNING id, username, password, display',
        [username, password, display]
    ).then( res => res.rows );
};

const updateUser = function (id, user) {
    const { username, password, display } = user;
    return pool.query(
        'UPDATE users SET username = $1, password = $2, display = $3 WHERE id = $4 RETURNING id, username, password, display',
        [username, password, display, id]
    ).then( res => res.rows );
};

const deleteUser = function (id) {
    return pool.query(
        'DELETE FROM users WHERE id = $1',
        [id]
    );
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}