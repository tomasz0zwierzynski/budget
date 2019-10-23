Vue.component('budget-position', {
    template: /*html*/ `
        <tr>
            <th scope="w-auto row">
                <div class="form-check m-1">
                    <input class="form-check-input position-static" type="checkbox" v-model="position.active" v-on:change="$emit('modified', position)">
                </div>
            </th>
            <td class="w-50">

                <div class="form-control form-control-sm" v-bind:class="{ 'border-light': !position.active }" v-if="!titleEdit" v-on:click="titleClick()">
                    <div v-bind:class="{ 'text-muted': !position.active }">
                        {{position.title}}
                    </div>
                </div>

                <div class="input-group input-group-sm" v-if="titleEdit">
                    <input ref="titleInput" type="text" class="form-control form-control-sm" v-if="titleEdit" v-on:keyup.enter="titleProtoOkClick()" v-model="titleProto">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary btn-sm p-1"  type="button" v-if="titleEdit" v-on:click="titleProtoOkClick()"><i class="fas fa-check"></i></button>
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
                </div>

                <div class="input-group input-group-sm" v-if="actualEdit">
                    <input ref="actualInput" type="number" min="0" class="form-control form-control-sm p-1" v-on:keyup.enter="actualProtoOkClick()" v-model="actualProto">    
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary btn-sm p-1" type="button" v-on:click="actualProtoOkClick()"><i class="fas fa-check"></i></button>
                    </div>
                </div>
            </td>
            <td class="w-auto">
                <div class="mt-1" v-on:click="bumpActual()"> 
                    <i class="fas fa-level-up-alt text-light lightup-hover"></i>
                </div> 
            </td>
            <td class="w-20">

                <div class="form-control form-control-sm" v-bind:class="{ 'border-light': !position.active }" v-if="!plannedEdit" v-on:click="plannedClick()">
                    <div v-bind:class="{ 'text-success': config.positive && position.active, 'text-danger': !config.positive && position.active, 'text-muted': !position.active }">
                        {{position.planned}}
                    </div>
                </div>

                <div class="input-group input-group-sm" v-if="plannedEdit">
                    <input ref="plannedInput" type="number" min="0" class="form-control form-control-sm p-1" v-on:keyup.enter="plannedProtoOkClick()" v-model="plannedProto">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary btn-sm p-1" type="button" v-on:click="plannedProtoOkClick()"><i class="fas fa-check"></i></button>
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
            titleProto: this.position.title,
            titleEdit: false,
            actualProto: this.position.actual,
            actualEdit: false,
            plannedProto: this.position.planned,
            plannedEdit: false
        };
    },
    methods: { // TODO: dodać walidację
        titleClick: function () {
            this.dismissEdit();
            this.titleEdit = true;
            Vue.nextTick( () => {
                this.$refs.titleInput.focus();
                this.$emit('editing');
            });
        },
        titleProtoOkClick: function () {
            this.position.title = this.titleProto;
            this.titleEdit = false;
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
            this.position.planned = parseInt(this.plannedProto);
            this.plannedEdit = false;
            if ( !this.position.actual ) {
                this.position.actual = 0;
            }
            this.$emit('modified', this.position);
        },
        bumpActual: function () {
            this.position.actual = this.position.planned;
            this.actualProto = this.plannedProto;
        },
        dismissEdit: function () {
            this.titleProto = this.position.title;
            this.titleEdit = false;
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
        <table class="table table-responsive-md table-sm">
            <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">Tytuł</th>
                <th scope="col">Obecnie</th>
                <th scole="col"></th>
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
        {{actualSum}} / {{plannedSum}}
        </div>

    </div>
    `,
    props: [ 'positions', 'config' ],
    data: function () {
        return {
            newPosition: { id: null, active: false, title: '', description: '', actual: null, planned: null }
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
            if ( val.active && val.title.length > 0 && val.actual >= 0 && val.planned > 0 ) {
                this.positions.push(val);
                this.newPosition = { id: null, active: false, title: '', description: '', actual: null, planned: null };
            }
        }
    }
});

Vue.component('month-select', {
    template: /*html*/ `
    <div class="form-group form-group-sm row">
        <div class="col-4">
            <select class="form-control form-control-sm" ref="monthSelect" v-on:change="monthChanged($event)">
                <option v-for="month in months"> {{month.n}}: {{month.name}} </option>
            </select>
        </div>

        <div class="col-4">
            <select class="form-control form-control-sm" ref="yearSelect" v-on:change="yearChanged($event)">
                <option v-for="year in years"> {{year}} </option>
            </select>
        </div>

        <div class="col-4 input-group input-group-sm">
            <div class="input-group-prepend">
                <button class="btn btn-outline-secondary btn-sm" type="button" v-on:click="left()"><i class="fas fa-angle-left"></i></button>
            </div>
            <div class="form-control form-control-sm text-center">
                    {{selected.month}}.{{selected.year}}
            </div>
            <div class="input-group-append">
                <button class="btn btn-outline-secondary btn-sm" type="button" v-on:click="right()"><i class="fas fa-angle-right"></i></button>
            </div>
        </div>
    </div>
    `,
    props: ['selected'],
    data: function () {
        return {
            months: [
                { name: 'Styczeń', n: 1 }, { name: 'Luty', n: 2 }, { name: 'Marzec', n: 3 }, { name: 'Kwiecień', n: 4 }, { name: 'Maj', n: 5 }, { name: 'Czerwiec', n: 6 },
                { name: 'Lipiec', n: 7 }, { name: 'Sierpień', n: 8 }, { name: 'Wrzesień', n: 9 }, { name: 'Październik', n: 10 }, { name: 'Listopad', n: 11 }, { name: 'Grudzień', n: 12 }
            ],
            years: Array.from( Array(20), (x, index) => 2019 + index * 1)
        };
    },
    methods: {
        left: function () {
            if ( this.selected.month > 1 ) {
                this.selected.month--;
            } else {
                if ( this.selected.year > 2019 ) {
                    this.selected.month = 12;
                    this.selected.year--;
                }
            }
            this.updateSelects();
            this.$emit('modified', this.selected);
        },
        right: function () {
            if ( this.selected.month < 12 ) {
                this.selected.month++;
            } else {
                if ( this.selected.year < 2038 ) {
                    this.selected.month = 1;
                    this.selected.year++;
                }
            }
            this.updateSelects();
            this.$emit('modified', this.selected);
        },
        monthChanged: function (event) {
            this.selected.month = parseInt(event.target.value);
            this.$emit('modified', this.selected);
        },
        yearChanged: function (event) {
            this.selected.year = parseInt(event.target.value);
            this.$emit('modified', this.selected);
        },
        updateSelects: function () {
            this.$refs.yearSelect.value = this.selected.year;
            this.$refs.monthSelect.value = this.months[this.selected.month - 1].n + ': ' + this.months[this.selected.month - 1].name;
        }
    },
    mounted: function () {
        this.updateSelects();
    }
});

const Budgets = { 
    template: /*html*/ `
    <div class="container-fluid">
        <h4> Budget positions </h4>
        <div class="row">
            <div class="col-lg-6 mb-2">
                <month-select v-bind:selected="currentMonth" v-on:modified="monthChanged($event)"></month-select>
            </div>
        </div>
        <div v-if="budgetPresent" class="row">
            <div class="col-lg-6 mb-2">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Wpływy</h5>
                        <budget-positions
                            v-bind:positions="positivePositions"
                            v-bind:config="{ positive: true }"
                        ></budget-positions>
                    </div>
                </div>
            </div> 
            <div class="col-lg-6 mb-2">
                <div class="card h-100">
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
        <div v-if="!budgetPresent" class="row">
            Budget is not present
        </div>
    </div>
    `,
    data: function () {
        return {
            positivePositions: [],
            negativePositions: [],
            positiveConfig: { positive: true },
            negativeConfig: { positive: false },
            currentMonth: { year: 2025, month: 6 },
            budgetPresent: false
        }
    }, // TODO: przyzapisywaniu do bazy pamietac, zeby negatywne zapisac z minusem
    created: function () {
        let now = new Date();
        this.currentMonth = { year: now.getFullYear(), month: now.getMonth() + 1}
        this.loadBudget( now.getFullYear(), now.getMonth() + 1 );
    },
    methods: {
        monthChanged: function ( month ) {
            this.loadBudget( month.year, month.month );
        },
        loadBudget: function ( year, month ) {
            getBudget( year, month ).then( budget => {
                if ( budget ) {
                    let positions = budget.positions;
                    this.positivePositions = [];
                    this.negativePositions = [];
                    positions.forEach( pos => {
                    if (pos.planned >= 0) {
                        this.positivePositions.push( pos );
                    } else {
                        this.negativePositions.push( pos );
                    }
                    pos.planned = Math.abs(pos.planned);
                    pos.actual = Math.abs(pos.actual);
                    });
                    this.budgetPresent = true;
                } else {
                    this.budgetPresent = false;
                }
            } ).catch( err => {
                this.budgetPresent = false;
            } );
        }
    }
};