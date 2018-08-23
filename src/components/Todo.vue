<template>
    <div class="fluid container">
        <div class="col-md-12">
            <draggable class="list-group" element="ul" v-model="todo_array" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                <transition-group type="transition" :name="'flip-list'">
                    <li class="list-group-item" v-for="element in todo_array" :key="element.id">
                        <span>
                            <i :class="element.isDone? 'fa fa-check-square-o green' : 'fa fa-square-o'" @click="element.isDone = !element.isDone" aria-hidden="true"></i>
                            <i :class="element.isPinned? 'glyphicon glyphicon-pushpin red' : 'glyphicon glyphicon-pushpin light-gray '" @click="element.isPinned = !element.isPinned" aria-hidden="true"></i>
                            [ {{ formatDate(element.date) }} ]
                            {{element.taskName}}
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
    import api from "../services/api"
    import Vue from 'vue'

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
                // if (move) {
                //     this.sort()
                // }
                return move;
            },
            formatDate(dateStr) {
                var date = new Date(dateStr)
                return date.toDateString() + ' ' + date.toLocaleTimeString()
            },
            updateTodo(todoList) {
                api.put('/api/v1/users/' + this.userId + '/todos', todoList, { headers: {  } }).then(response => {
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
            },
            todo_array: {
                handler: function (newValue) {
                    console.log('changed')
                    var sortedTodoList = []

                    for (var i = 0; i < newValue.length; i++) {
                        newValue[i].order = i+1
                    }

                    for (var i = 0; i < newValue.length; i++) {
                        if (newValue[i].isPinned) {
                            sortedTodoList.push(newValue[i])
                        }
                    }

                    for (var i = 0; i < newValue.length; i++) {
                        if (!newValue[i].isPinned) {
                            sortedTodoList.push(newValue[i])
                        }
                    }

                    console.log('sortedTodoList', sortedTodoList)
                    console.log('newValue', newValue)

                    this.updateTodo(sortedTodoList)
                    return sortedTodoList
                },
                deep: true
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
        text-align: left;
    }
    .list-group-item i {
        cursor: pointer;
        padding: 10px;
    }
    .green {
        color: #079100;
    }
    .red {
        color: #ff0000;
    }
    .light-gray {
        color: #97949a;
    }
</style>