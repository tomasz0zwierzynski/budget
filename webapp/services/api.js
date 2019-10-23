const getBudget = function (year, month) {
    $.get(`/api/get-budget/${year}/${month}`, data => {
        console.log(data);
    });
};

const getBudget0 = function (year, month) {
    if ( year === 2019 && month === 10 ) {
        return  {
            id: 1,
            user: { id: 1, username: 'tester', display: 'Tester' },
            month: 10,
            year: 2019,
            positions: [
                { id: 1, active: true, label: 'Label 1', description: 'Description 1', actual: 100, planned: 200 },
                { id: 2, active: true, label: 'Label 2', description: 'Description 2', actual: -100, planned: -300 },
                { id: 3, active: false, label: 'Label 3', description: 'Description 3', actual: 100, planned: 200 },
                { id: 4, active: false, label: 'Label 4', description: 'Description 4', actual: 100, planned: 200 }
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
            { id: 1, active: true, label: 'Wynagrodzenie', description: 'Description 1', quantity: 4000 },
            { id: 2, active: true, label: 'Mieszkanie', description: 'Description 2', quantity: -1600 },
            { id: 3, active: true, label: 'Jedzenie', description: 'Description 3', quantity: -1000 },
            { id: 4, active: true, label: 'Alkohol', description: 'Description 4', quantity: -400 }
        ]
    }
};

