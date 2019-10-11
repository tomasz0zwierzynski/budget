Vue.component('budget-position', {
    template: `
        <div>
            <h5 v-if="position.active">V</h5>
            <h5> {{position.label}} </h5>
            <p> {{position.actual}} / {{position.planned}} </p>
            <button v-on:click="$emit('changed', position)">
                Click
            </button>
        </div>
    `,
    props: [ 'position' ],
    data: function () {
        return {
        }
    }
});

const Budgets = { 
    template: ` <div>
                <budget-position
                    v-for="position in examplePositions"
                    v-bind:key="position.id"
                    v-bind:position="position"
                    v-on:changed="childChanged($event)"
                ></budget-position></div> `,
    data: function () {
        return {
            examplePositions: [
                { id: 1, active: true, label: 'Label 1', description: 'Description 1', actual: 100, planned: 200 },
                { id: 2, active: true, label: 'Label 2', description: 'Description 2', actual: 100, planned: 200 },
                { id: 3, active: false, label: 'Label 3', description: 'Description 3', actual: 100, planned: 200 },
                { id: 4, active: false, label: 'Label 4', description: 'Description 4', actual: 100, planned: 200 }
            ]
        }
    },
    methods: {
        childChanged: function (event) {
            console.log(event);
        }
    }
};