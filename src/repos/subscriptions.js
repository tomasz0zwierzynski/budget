const pool = require('./pool');

const getAllSubscriptions = function () {
    return pool.query(
        'SELECT * FROM subscriptions ORDER BY id ASC'
    ).then(res => res.rows);
};

const getSubscriptionById = function (id) {
    return pool.query(
        'SELECT * FROM subscriptions WHERE id = $1',
        [id]
    ).then(res => res.rows);
}

const createSubscription = function (subscription) {
    const { userid, title, description, quantity, active, priority } = subscription;
    return pool.query(
        'INSERT INTO subscriptions (userid, title, description, quantity, active, priority ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, userid, title, description, quantity, active, priority ',
        [userid, title, description, quantity, active, priority ]
    ).then( res => res.rows );
};

const updateSubscription = function (id, subscription) {
    const { userid, title, description, quantity, active, priority } = subscription;
    return pool.query(
        'UPDATE subscriptions SET userid = $1, title = $2, description = $3, quantity = $4, active = $5, priority = $6 WHERE id = $7 RETURNING  id, userid, title, description, quantity, active, priority',
        [userid, title, description, quantity, active, priority, id ]
    ).then( res => res.rows );
};

const deleteSubscription = function (id) {
    return pool.query(
        'DELETE FROM subscriptions WHERE id = $1',
        [id]
    );
};


module.exports = {
    getAllSubscriptions,
    getSubscriptionById,
    createSubscription,
    updateSubscription,
    deleteSubscription
}