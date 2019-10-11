const getBudget = function (year, month) {
    $.get(`/api/get-budget/${year}/${month}`, data => {
        console.log(data);
    });
};