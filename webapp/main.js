const routes = [
    { path: '/dashboard', component: Dashboard },
    { path: '/budgets', component: Budgets },
    { path: '/subscriptions', component: Subscriptions },
    { path: '/settings', component: Settings },
    { path: '*', component: NotFound }
];

const router = new VueRouter({
    routes: routes
});

var user;

const app = new Vue({
    router: router,
    created: function () {
        this.$router.push('/dashboard');

        user = { id: 2, username: 'tester', display: 'Tester' };
    }
}).$mount('#app');
