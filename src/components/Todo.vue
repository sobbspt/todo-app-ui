<template>
    <div class="fluid container">
        <div class="col-md-12">
            <draggable class="list-group" element="ul" v-model="todo_array" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                <transition-group type="transition" :name="'flip-list'">
                    <li class="list-group-item" v-for="element in todo_array" :key="element.order">
                        <span>
                            <i :class="element.isDone? 'fa fa-check-square-o green' : 'fa fa-square-o'" @click="doneHandler(element)" aria-hidden="true"></i>
                            [ {{ formatDate(element.date) }} ]
                            {{element.taskName}}
                            <i :class="element.isPinned? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click="pinnedHandler(element)" aria-hidden="true"></i>
                        </span>

                    </li>
                </transition-group>
            </draggable>
        </div>
    </div>
</template>

<script>
    import VueCookie from 'cookie-in-vue'
    import lineapi from '../services/lineapi'
    import draggable from 'vuedraggable'
    import api from "../services/api";

    export default {
        name: 'todo',
        data: () => {
            return {
                name: '',
                profile_image: '',
                userId: '',
                todo_array: [],
                editable: true,
                isDragging: false,
                delayedDragging: false
            }
        },
        components: {
            draggable
        },
        methods: {
            onMove({ relatedContext, draggedContext }) {
                const relatedElement = relatedContext.element;
                const draggedElement = draggedContext.element;
                var move = ((!relatedElement || !relatedElement.isPinned) && !draggedElement.isPinned)
                if (move) {
                    this.sort()
                }
                return move;
            },
            formatDate(dateStr) {
                var date = new Date(dateStr)
                return date.toDateString() + ' ' + date.toLocaleTimeString()
            },
            doneHandler(todo) {
                todo.isDone = !todo.isDone
                this.updateTodo(todo)
            },
            pinnedHandler(todo) {
                todo.isPinned = !todo.isPinned
                this.updateTodo(todo)
            },
            updateTodo(todo) {
                api.put('/api/v1/users/' + this.userId + '/todos/' + todo.id, todo, { headers: {  } }).then(response => {
                    console.log(response.data)
                }, (error) => {
                    alert('Cannot update')
                })
            },
            getTodoList() {
                var vm = this
                api.get('/api/v1/users/' + this.userId + '/todos', { headers: { 'Authorization': 'Bearer ' + VueCookie.get('access_token') } }).then((response) => {
                    vm.todo_array = response.data.data
                }, (error) => {
                    console.log(error)
                    alert('Cannot get todo list')
                })
            },
            sort() {
                this.todo_array = this.todo_array
                console.log('sorted')
            }
        },
        mounted () {
            var vm = this
            console.log('This is ToDo component')
            if (VueCookie.get('access_token')) {
                lineapi.get('/profile', { headers: { 'Authorization': 'Bearer ' + VueCookie.get('access_token') } }).then((response) => {
                    if (response.status === 200) {
                        console.log('user profile', response.data)
                        vm.name = response.data.displayName
                        vm.profile_image = response.data.pictureUrl
                        vm.userId = response.data.userId
                        vm.getTodoList()
                    }
                }, (error) => {
                    console.log(error)
                    alert('Cannot get user profile')
                })
            } else if (VueCookie.get('refresh_token')) {
                // TODO :: refresh token
                console.log('Has refresh_token')
            } else {
                console.log('No token')
                this.$router.push('/login')
            }
        },
        computed: {
            dragOptions() {
                return {
                    animation: 0,
                    group: "description",
                    disabled: !this.editable,
                    ghostClass: "ghost"
                };
            },
        },
        watch: {
            isDragging(newValue) {
                if (newValue) {
                    this.delayedDragging = true;
                    return;
                }
                this.$nextTick(() => {
                    this.delayedDragging = false;
                });
            }
        }
    }
</script>

<style>
    .flip-list-move {
        transition: transform 0.5s;
    }
    .no-move {
        transition: transform 0s;
    }
    .ghost {
        opacity: 0.5;
        background: #c8ebfb;
    }
    .list-group {
        min-height: 20px;
    }
    .list-group-item {
        cursor: move;
    }
    .list-group-item i {
        cursor: pointer;
    }
    .green {
        color: #079100;
    }
</style>