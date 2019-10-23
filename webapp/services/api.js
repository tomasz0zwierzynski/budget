const getBudget = function ( year, month ) {
    return $.get(`/api/get-budget/${year}/${month}`);
};

const getBudget0 = function (year, month) {
    if ( year === 2019 && month === 10 ) {
        return  {
            id: 1,
            user: { id: 1, username: 'tester', display: 'Tester' },
            month: 10,
            year: 2019,
            positions: [
                { id: 1, active: true, title: 'title 1', description: 'Description 1', actual: 100, planned: 200 },
                { id: 2, active: true, title: 'title 2', description: 'Description 2', actual: -100, planned: -300 },
                { id: 3, active: false, title: 'title 3', description: 'Description 3', actual: 100, planned: 200 },
                { id: 4, active: false, title: 'title 4', description: 'Description 4', actual: 100, planned: 200 }
            ]
        };
    } else {
        return null;
    }
};

const getSubscriptions0 = function () {
    return {
        id: 1,
        user: { id: 1, username: 'tester', display: 'Tester' },
        positions: [
            { id: 1, active: true, title: 'Wynagrodzenie', description: 'Description 1', quantity: 4000 },
            { id: 2, active: true, title: 'Mieszkanie', description: 'Description 2', quantity: -1600 },
            { id: 3, active: true, title: 'Jedzenie', description: 'Description 3', quantity: -1000 },
            { id: 4, active: true, title: 'Alkohol', description: 'Description 4', quantity: -400 }
        ]
    }
};

