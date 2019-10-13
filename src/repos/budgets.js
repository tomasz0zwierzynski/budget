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
    ).then( res => res.rows );
};

const getBudgetByUserMonthYear = function (userid, month, year) {
    return pool.query(
        'SELECT * FROM budgets WHERE userid = $1 AND month = $2 AND year = $3',
        [userid, month, year]
    ).then( res => res.rows );
}

const createBudget = function (budget) {
    const { userid, month } = budget;
    return pool.query(
        'INSERT INTO budgets (userid, month, year) VALUES ($1, $2) RETURNING id, userid, month, year',
        [userid, month]
    ).then( res => res.rows );
};

const updateBudget = function (id, budget) {
    const { userid, month, year } = budget;
    return pool.query(
        'UPDATE budgets SET userid = $1, month = $2, year = $3 WHERE id = $4 RETURNING id, userid, month, year',
        [userid, month, year, id]
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
    deleteBudget,
    getBudgetByUserMonthYear
}