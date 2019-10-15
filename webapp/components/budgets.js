Vue.component('budget-position', {
    template: /*html*/ `
        <tr>
            <th scope="w-auto row">
                <div class="form-check m-1">
                    <input class="form-check-input position-static" type="checkbox" v-model="position.active">
                </div>
            </th>
            <td class="w-75">

                <div class="input-group input-group-sm" v-if="labelEdit">
                    <input ref="labelInput" type="text" class="form-control form-control-sm" v-if="labelEdit" v-on:keyup.enter="labelProtoOkClick()" v-model="labelProto">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary btn-sm"  type="button" v-if="labelEdit" v-on:click="labelProtoOkClick()"><i class="fas fa-check"></i></button>
                    </div>
                </div>

                <div class="form-control form-control-sm" v-if="!labelEdit" v-on:click="labelClick()"> {{position.label}} </div>

            </td>
            <td class="w-20">

                <div class="form-control form-control-sm" v-if="!actualEdit" v-on:click="actualClick()"> {{Math.abs(position.actual)}} </div>

            </td>
            <td class="w-20">

                <div class="form-control form-control-sm"> {{Math.abs(position.planned)}} </div>
                
            </td>
        </tr>
    `,
    props: [ 'position' ],
    data: function () {
        return {
            labelProto: this.position.label,
            labelEdit: false,
            actualProto: this.position.actual,
            actualEdit: false,
            plannedProto: this.position.planned,
            plannedEdit: false
        };
    },
    methods: {
        labelClick: function () {
            this.labelEdit = true;
            Vue.nextTick( () => {
                this.$refs.labelInput.focus();
                this.$emit('editing');
            });
        },
        labelProtoOkClick: function () {
            this.position.label = this.labelProto;
            this.labelEdit = false;
        },
        actualClick: function () {

        },
        dismissEdit: function () {
            this.labelProto = this.position.label;
            this.labelEdit = false;
            this.actualProto = this.position.actual;
            this.actualEdit = false;
            this.plannedProto = this.position.planned;
            this.plannedEdit = false;
        }
    }
});

Vue.component('budget-positions', {
    template: /*html*/ `
    <table class="table table-sm">
        <thead>
        <tr>
            <th scope="col"></th>
            <th scope="col">Tytuł</th>
            <th scope="col">Obecnie</th>
            <th scope="col">Wartość</th>
        </tr>
        </thead>
        <tbody>   
            <budget-position
                ref="budgetPosition"
                v-for="(position, index) in positions"
                v-bind:key="position.id"
                v-bind:position="position"
                v-on:editing="$refs.budgetPosition.forEach( (b, i) => {if (index !== i) { b.dismissEdit(); } } )"
            ></budget-position>
        </tbody>
    </table>
    `,
    props: [ 'positions' ],
    data: function () {
        return {
        };
    }
})

const Budgets = { 
    template: /*html*/ `
    <div class="container-fluid">
        <h4> Budget positions </h4>
        <div class="row">
            <div class="col-md-6">
                <div class="card mb-2">
                    <div class="card-body">
                        <h5 class="card-title">Wpływy</h5>
                        <budget-positions
                            v-bind:positions="positivePositions"
                        ></budget-positions>
                    </div>
                </div>
            </div> 
            <div class="col-md-6">
                <div class="card mb-2">
                    <div class="card-body">
                        <h5 class="card-title">Wypływy</h5>
                        <budget-positions
                            v-bind:positions="negativePositions"
                        ></budget-positions>
                    </div>
                </div>
            </div>    
        </div>
    </div>
    `,
    data: function () {
        return {
            positivePositions: [],
            negativePositions: []
        }
    },
    created: function () {
        let positions = getBudget0().positions;
        positions.forEach( pos => {
            if (pos.actual >= 0) {
                this.positivePositions.push( pos );
            } else {
                this.negativePositions.push( pos );
            }
        });
    }
};