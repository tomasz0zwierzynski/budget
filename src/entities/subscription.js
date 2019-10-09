class Subscription {
    constructor(id, userid, title, description, quantity, active, priority) {
        this.id = id;
        this.userid = userid;
        this.title = title;
        this.description = description;
        this.quantity = quantity;
        this.active = active;
        this.priority = priority;
    }
}

module.exports = Subscription;
