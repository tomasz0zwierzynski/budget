class Position {
    constructor(id, budgetid, title, description, planned, actual, priority, active ) {
        this.id = id;
        this.budgetid = budgetid;
        this.title = title;
        this.description = description;
        this.planned = planned;
        this.actual = actual;
        this.priority = priority;
        this.active = active;
    }
}

module.exports = Position;
