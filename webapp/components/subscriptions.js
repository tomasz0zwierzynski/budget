Vue.component('subscription-position', {
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
                <button class="btn btn-outline-secondary btn-sm p-1"  type="button" v-if="labelEdit" v-on:click="labelProtoOkClick()"><i class="fas fa-check"></i></button>
            </div>
        </div>

    </td>

    <td class="w-25">

        <div class="form-control form-control-sm" v-bind:class="{ 'border-light': !position.active }" v-if="!quantityEdit" v-on:click="quantityClick()">
            <div v-bind:class="{ 'text-success': config.positive && position.active, 'text-danger': !config.positive && position.active, 'text-muted': !position.active }">
                {{position.quantity}}
            </div>
        </div>

        <div class="input-group input-group-sm" v-if="quantityEdit">
            <input ref="quantityInput" type="number" min="0" class="form-control form-control-sm p-1" v-on:keyup.enter="quantityProtoOkClick()" v-model="quantityProto">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary btn-sm p-1" type="button" v-on:click="quantityProtoOkClick()"><i class="fas fa-check"></i></button>
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
            quantityProto: this.position.quantity,
            quantityEdit: false
        };
    },
    methods: {
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
        quantityClick: function () {
            this.dismissEdit();
            this.quantityEdit = true;
            Vue.nextTick( () => {
                this.$refs.quantityInput.focus();
                this.$emit('editing');
            });
        },
        quantityProtoOkClick: function () {
            this.position.quantity = parseInt(this.quantityProto);
            this.quantityEdit = false;
            if ( !this.position.actual ) {
                this.position.actual = 0;
            }
            this.$emit('modified', this.position);
        },
        dismissEdit: function () {
            this.labelProto = this.position.label;
            this.labelEdit = false;
            this.actualProto = this.position.actual;
            this.actualEdit = false;
            this.quantityProto = this.position.quantity;
            this.quantityEdit = false;
        }
    }
});

Vue.component('subscription-positions', {
    template: /*html*/`
    <div>
    <table class="table table-responsive-md table-sm">
        <thead>
        <tr>
            <th scope="col"></th>
            <th scope="col">Tytuł</th>
            <th scope="col">Wartość</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>   
            <subscription-position
                ref="subscriptionPosition"
                v-for="(position, index) in positions"
                v-bind:key="position.id"
                v-bind:position="position"
                v-bind:config="getPositionConfig()"
                v-on:editing="$refs.subscriptionPosition.forEach( (b, i) => { if (index !== i) { b.dismissEdit(); } } ); $refs.newsubscriptionPosition.dismissEdit()"
                v-on:removed="positions.splice(index, 1)"
            ></subscription-position>
            <subscription-position
                ref="newsubscriptionPosition"
                v-bind:position="newPosition"
                v-bind:config="getPositionConfig()"
                v-on:modified="newPositionModified($event)"
                v-on:editing="$refs.subscriptionPosition.forEach( b => b.dismissEdit() )"
            ></subscription-position>
        </tbody>
    </table>     

    <div class="position-bottom mb-2">
    {{quantitySum}}
    </div>

</div>
    `,
    props: [ 'positions', 'config' ],
    data: function () {
        return {
            newPosition: { id: null, active: false, label: '', description: '', quantity: null }
        };
    },
    computed: {
        quantitySum: function () {
            let quantitySum = 0;
            this.positions.forEach( position => {
                if ( position.active ) {
                    quantitySum = quantitySum + parseInt(position.quantity);
                }
            });
            return quantitySum;
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
            if ( val.active && val.label.length > 0  && val.quantity > 0 ) {
                this.positions.push(val);
                this.newPosition = { id: null, active: false, label: '', description: '', quantity: null };
            }
        }
    }
});

const Subscriptions = { 
    template: /*html*/ `
    <div class="container-fluid">
        <h4> Subscription positions </h4>
        <div class="row">
            <div class="col-lg-6 mb-2">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Dochody</h5>
                        <subscription-positions
                            v-bind:positions="positivePositions"
                            v-bind:config="{ positive: true }"
                        ></subscription-positions>
                    </div>
                </div>
            </div> 
            <div class="col-lg-6 mb-2">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Koszty</h5>
                        <subscription-positions
                            v-bind:positions="negativePositions"
                            v-bind:config="{ positive: false }"
                        ></subscription-positions>
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
            negativeConfig: { positive: false },
        }
    }, // TODO: przyzapisywaniu do bazy pamietac, zeby negatywne zapisac z minusem
    created: function () {
        let positions = getSubscriptions0().positions;
        positions.forEach( pos => {
            if (pos.quantity >= 0) {
                this.positivePositions.push( pos );
            } else {
                this.negativePositions.push( pos );
            }
            pos.quantity = Math.abs(pos.quantity);
        });
    }
};