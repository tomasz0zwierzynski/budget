Vue.component('budget-position', {
    template: `
        <div class="d-inline">
            <h5 v-if="position.active">V</h5>
            <h5 v-if="!labelEdit" v-on:dblclick="labelEdit=true"> {{position.label}} </h5>
            <input v-if="labelEdit" v-model="labelProto"> <button v-if="labelEdit" v-on:click="position.label = labelProto; labelProto = ''; labelEdit=false"> OK </button>
            <p> {{position.actual}} / {{position.planned}} </p>
        </div>
    `,
    props: [ 'position' ],
    data: function () {
        return {
            labelProto: '',
            labelEdit: false,
            actualEdit: false,
            plannedEdit: false
        };
    }
});

Vue.component('budget-positions', {
    template: `
        <div>
        <h4> Budget positions </h4>
        <budget-position
            v-for="position in positions"
            v-bind:key="position.id"
            v-bind:position="position"
            v-on:changed="childChanged($event)"
        ></budget-position>
        </div>
    `,
    props: [ 'positions' ],
    data: function () {
        return {

        };
    }
})

const Budgets = { 
    template: ` <div>
                <budget-positions
                    v-bind:positions="examplePositions"
                ></budget-positions></div> `,
    
    data: function () {
        return {
            examplePositions: [
            ]
        }
    },
    created: function () {
        this.examplePositions = getBudget0().positions;
    }
};