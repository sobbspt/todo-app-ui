import Vue from 'vue'
import App from './App.vue'
// other imports removed for brevity
import router from './router.js'

/* eslint-disable */
new Vue({
    router,               // Add this line
    render: h => h(App)
}).$mount('#app')