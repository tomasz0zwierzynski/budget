class Position {
    constructor(id, budgetid, title, description, planned, actual, priority ) {
        this.id = id;
        this.budgetid = budgetid;
        this.title = title;
        this.description = description;
        this.planned = planned;
        this.actual = actual;
        this.priority = priority;
    }
}

module.exports = Position;
