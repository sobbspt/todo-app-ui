import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import Sortable from 'vue-sortable'
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/less/font-awesome.less";


Vue.use(Sortable)

// eslint-disable-next-line
new Vue({
    router,               // Add this line
    render: h => h(App)
}).$mount('#app')