Vue.component('budget-position', {
    template: `
        <tr>
            <th scope="row">
                <h5 v-if="position.active">V</h5>
            </th>
            <td>
            <h5 v-if="!labelEdit" v-on:dblclick="labelEdit=true"> {{position.label}} </h5>
            <input v-if="labelEdit" v-model="labelProto"> <button v-if="labelEdit" v-on:click="position.label = labelProto; labelProto = ''; labelEdit=false"> OK </button>
            </td>
            <td>
            <p> {{position.actual}} </p>
            </td>
            <td>
            <p> {{position.planned}} </p>
            </td>
        </tr>
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
        <div class="row">
            <div class="col-12">
            <h4> Budget positions </h4>
            <table class="table">
            <thead>
    <tr>
      <th scope="col">Active</th>
      <th scope="col">Label</th>
      <th scope="col">Actual</th>
      <th scope="col">Planned</th>
    </tr>
    </thead>
             <tbody>   
                <budget-position
                v-for="position in positions"
                v-bind:key="position.id"
                v-bind:position="position"
                v-on:changed="childChanged($event)"
                ></budget-position>
                </tbody>
        </table>
        </div>
        </div>
    `,
    props: [ 'positions' ],
    data: function () {
        return {

        };
    }
})

const Budgets = { 
    template: ` <div class="container">
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