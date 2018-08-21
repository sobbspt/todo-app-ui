<template>
    <div class="todo">
        <h1>This is an about page {{ message }}</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ali...</p>
    </div>
</template>

<script>
    import VueCookie from 'cookie-in-vue'
    // import api from '../services/api'

    export default {
        name: 'app',
        data: () => {
            return {
                message: '123'
            }
        },
        methods: {

        },
        mounted () {
            if (!VueCookie.get('token')) {
                // TODO :: Redirect to LINE login
                this.$router.push('/login')
            }
            // else if () {
            //
            // }
        }
    }
</script>

<style>

</style>