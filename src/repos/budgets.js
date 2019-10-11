const pool = require('./pool');

const getAllBudgets = function () {
    return pool.query(
        'SELECT * FROM budgets ORDER BY id ASC'
    ).then(res => res.rows);
};

const getBudgetById = function (id) {
    return pool.query(
        'SELECT * FROM budgets WHERE id = $1',
        [id]
    ).then(res => res.rows);
};

const createBudget = function (budget) {
    const { userid, month } = budget;
    return pool.query(
        'INSERT INTO budgets (userid, month) VALUES ($1, $2) RETURNING id, userid, month',
        [userid, month]
    ).then( res => res.rows );
};

const updateBudget = function (id, budget) {
    const { userid, monthy } = budget;
    return pool.query(
        'UPDATE budgets SET userid = $1, month = $2 WHERE id = $3 RETURNING id, userid, month',
        [userid, month, id]
    ).then( res => res.rows );
};

const deleteBudget = function (id) {
    return pool.query(
        'DELETE FROM budgets WHERE id = $1',
        [id]
    );
}

module.exports = {
    getAllBudgets,
    getBudgetById,
    createBudget,
    updateBudget,
    deleteBudget
}