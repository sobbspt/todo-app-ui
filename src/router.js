import Vue from 'vue'
import Router from 'vue-router'
import Todo from './components/Todo.vue'
import Login from './components/Login.vue'
import Callback from './components/Callback.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            redirect: '/todo'
        },
        {
            path: '/todo',
            name: 'todo',
            component: Todo
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/callback',
            name: 'callback',
            component: Callback
        }
    ]
})