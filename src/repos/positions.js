const pool = require('./pool');

const getAllPositions = function () {
    return pool.query(
        'SELECT * FROM positions ORDER BY id ASC'
    ).then(res => res.rows);
};

const getPositionById = function (id) {
    return pool.query(
        'SELECT * FROM positions WHERE id = $1',
        [id]
    ).then(res => res.rows);
};

const getPositonsByBudget = function (budgetid) {
    return pool.query(
        'SELECT * FROM positions WHERE budgetid = $1',
        [budgetid]
    ).then( res => res.rows);
};

const createPosition = function (position) {
    const { budgetid, title, description, planned, actual, priority, active } = position;
    return pool.query(
        'INSERT INTO positions (budgetid, title, description, planned, actual, priority, active ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, budgetid, title, description, planned, actual, priority, active ',
        [budgetid, title, description, planned, actual, priority, active ]
    ).then( res => res.rows );
};

const updatePosition = function (id, position) {
    const { budgetid, title, description, planned, actual, priority } = position;
    return pool.query(
        'UPDATE positions SET budgetid = $1, title = $2, description = $3, planned = $4, actual = $5, priority = $6, active = $7 WHERE id = $8 RETURNING  id, budgetid, title, description, planned, actual, priority, active',
        [budgetid, title, description, planned, actual, priority, active, id ]
    ).then( res => res.rows );
};

const deletePosition = function (id) {
    return pool.query(
        'DELETE FROM positions WHERE id = $1',
        [id]
    );
};


module.exports = {
    getAllPositions,
    getPositionById,
    createPosition,
    updatePosition,
    deletePosition,
    getPositonsByBudget
}