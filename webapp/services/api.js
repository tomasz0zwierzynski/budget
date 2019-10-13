const getBudget = function (year, month) {
    $.get(`/api/get-budget/${year}/${month}`, data => {
        console.log(data);
    });
};

const getBudget0 = function (year, month) {
    return  {
        id: 1,
        user: { id: 1, username: 'tester', display: 'Tester' },
        month: 10,
        year: 2019,
        positions: [
            { id: 1, active: true, label: 'Label 1', description: 'Description 1', actual: 100, planned: 200 },
            { id: 2, active: true, label: 'Label 2', description: 'Description 2', actual: 100, planned: 200 },
            { id: 3, active: false, label: 'Label 3', description: 'Description 3', actual: 100, planned: 200 },
            { id: 4, active: false, label: 'Label 4', description: 'Description 4', actual: 100, planned: 200 }
        ]
    };
}


