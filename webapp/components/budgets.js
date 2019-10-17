Vue.component('budget-position', {
    template: /*html*/ `
        <tr>
            <th scope="w-auto row">
                <div class="form-check m-1">
                    <input class="form-check-input position-static" type="checkbox" v-model="position.active" v-on:change="$emit('modified', position)">
                </div>
            </th>
            <td class="w-60">

                <div class="form-control form-control-sm" v-bind:class="{ 'border-light': !position.active }" v-if="!labelEdit" v-on:click="labelClick()">
                    <div v-bind:class="{ 'text-muted': !position.active }">
                        {{position.label}}
                    </div>
                </div>

                <div class="input-group input-group-sm" v-if="labelEdit">
                    <input ref="labelInput" type="text" class="form-control form-control-sm" v-if="labelEdit" v-on:keyup.enter="labelProtoOkClick()" v-model="labelProto">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary btn-sm"  type="button" v-if="labelEdit" v-on:click="labelProtoOkClick()"><i class="fas fa-check"></i></button>
                    </div>
                </div>

            </td>
            <td class="w-20">

                <div class="input-group input-group-sm"  v-if="!actualEdit">
                    <div class="form-control form-control-sm" v-bind:class="{ 'border-light': !position.active }" v-on:click="actualClick()">
                        <div v-bind:class="{ 'text-success': config.positive && position.active, 'text-danger': !config.positive && position.active, 'text-muted': !position.active }">    
                            {{position.actual}}
                        </div>
                    </div>
                    <div class="input-group-append" v-bind:class="{ 'border-light': !position.active }">
                        <button class="btn btn-outline-secondary btn-sm" type="button" v-bind:class="{ 'border-light': !position.active }" v-on:click="bumpActual()"><i class="fas fa-level-up-alt"></i></button>
                    </div>
                </div>

                <div class="input-group input-group-sm" v-if="actualEdit">
                    <input ref="actualInput" type="number" min="0" class="form-control form-control-sm" v-on:keyup.enter="actualProtoOkClick()" v-model="actualProto">    
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary btn-sm" type="button" v-on:click="actualProtoOkClick()"><i class="fas fa-check"></i></button>
                    </div>
                </div>
            </td>
            <td class="w-20">

                <div class="form-control form-control-sm" v-bind:class="{ 'border-light': !position.active }" v-if="!plannedEdit" v-on:click="plannedClick()">
                    <div v-bind:class="{ 'text-success': config.positive && position.active, 'text-danger': !config.positive && position.active, 'text-muted': !position.active }">
                        {{position.planned}}
                    </div>
                </div>

                <div class="input-group input-group-sm" v-if="plannedEdit">
                    <input ref="plannedInput" type="number" min="0" class="form-control form-control-sm" v-on:keyup.enter="plannedProtoOkClick()" v-model="plannedProto">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary btn-sm" type="button" v-on:click="plannedProtoOkClick()"><i class="fas fa-check"></i></button>
                    </div>
                </div>
            </td>
            <td class="w-auto">
                <div class="mt-1" v-on:click="$emit('removed')"> 
                    <i class="fas fa-trash text-light lightup-hover"></i>
                </div>
            </td>
        </tr>
    `,
    props: [ 'position', 'config' ],
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
    methods: { // TODO: dodać walidację
        labelClick: function () {
            this.dismissEdit();
            this.labelEdit = true;
            Vue.nextTick( () => {
                this.$refs.labelInput.focus();
                this.$emit('editing');
            });
        },
        labelProtoOkClick: function () {
            this.position.label = this.labelProto;
            this.labelEdit = false;
            this.$emit('modified', this.position);
        },
        actualClick: function () {
            this.dismissEdit();
            this.actualEdit = true;
            Vue.nextTick( () => {
                this.$refs.actualInput.focus();
                this.$emit('editing');
            });
        },
        actualProtoOkClick: function () {
            if ( this.actualProto > this.position.planned ) {
                this.position.planned = this.actualProto;
                this.plannedProto = this.actualProto;
            }
            this.position.actual = this.actualProto;
            this.actualEdit = false;
            this.$emit('modified', this.position);
        },
        plannedClick: function () {
            this.dismissEdit();
            this.plannedEdit = true;
            Vue.nextTick( () => {
                this.$refs.plannedInput.focus();
                this.$emit('editing');
            });
        },
        plannedProtoOkClick: function () {
            this.position.planned = this.plannedProto;
            this.plannedEdit = false;
            this.$emit('modified', this.position);
        },
        bumpActual: function () {
            this.position.actual = this.position.planned;
            this.actualProto = this.plannedProto;
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
    <div>
        <table class="table table-sm">
            <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">Tytuł</th>
                <th scope="col">Obecnie</th>
                <th scope="col">Wartość</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>   
                <budget-position
                    ref="budgetPosition"
                    v-for="(position, index) in positions"
                    v-bind:key="position.id"
                    v-bind:position="position"
                    v-bind:config="getPositionConfig()"
                    v-on:editing="$refs.budgetPosition.forEach( (b, i) => { if (index !== i) { b.dismissEdit(); } } ); $refs.newBudgetPosition.dismissEdit()"
                    v-on:removed="positions.splice(index, 1)"
                ></budget-position>
                <budget-position
                    ref="newBudgetPosition"
                    v-bind:position="newPosition"
                    v-bind:config="getPositionConfig()"
                    v-on:modified="newPositionModified($event)"
                    v-on:editing="$refs.budgetPosition.forEach( b => b.dismissEdit() )"
                ></budget-position>
            </tbody>
        </table>

        <div class="position-bottom mb-2">
            Suma: {{actualSum}} Total: {{plannedSum}}
        </div>

    </div>
    `,
    props: [ 'positions', 'config' ],
    data: function () {
        return {
            newPosition: { id: null, active: false, label: '', description: '', actual: null, planned: null }
        };
    },
    computed: {
        actualSum: function () {
            let actualSum = 0;
            this.positions.forEach( position => {
                if ( position.active ) {
                    actualSum = actualSum + parseInt(position.actual);
                }
            });
            return actualSum;
        },
        plannedSum: function () {
            let plannedSum = 0;
            this.positions.forEach( position => {
                if ( position.active ) {
                    plannedSum = plannedSum + parseInt(position.planned);
                }
            });
            return plannedSum;
        }
    },
    methods: {
        getPositionConfig: function () {
            if ( this.config.positive ) {
                return { positive: true };
            } else {
                return { positive: false };
            }
        },
        newPositionModified: function (val) {
            if ( val.active && val.label.length > 0 && val.actual > 0 && val.planned > 0 ) {
                this.positions.push(val);
                this.newPosition = { id: null, active: false, label: '', description: '', actual: null, planned: null };
            }
        }
    }
});

const Budgets = { 
    template: /*html*/ `
    <div class="container-fluid">
        <h4> Budget positions </h4>
        <div class="row">
            <div class="col-lg-6">
                <div class="card mb-2 h-100">
                    <div class="card-body">
                        <h5 class="card-title">Wpływy</h5>
                        <budget-positions
                            v-bind:positions="positivePositions"
                            v-bind:config="{ positive: true }"
                        ></budget-positions>
                    </div>
                </div>
            </div> 
            <div class="col-lg-6">
                <div class="card mb-2 h-100">
                    <div class="card-body">
                        <h5 class="card-title">Wypływy</h5>
                        <budget-positions
                            v-bind:positions="negativePositions"
                            v-bind:config="{ positive: false }"
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
            negativePositions: [],
            positiveConfig: { positive: true },
            negativeConfig: { positive: false }
        }
    }, // TODO: przyzapisywaniu do bazy pamietac, zeby negatywne zapisac z minusem
    created: function () {
        let positions = getBudget0().positions;
        positions.forEach( pos => {
            if (pos.planned >= 0) {
                this.positivePositions.push( pos );
            } else {
                this.negativePositions.push( pos );
            }
            pos.planned = Math.abs(pos.planned);
            pos.actual = Math.abs(pos.actual);
        });
    }
};