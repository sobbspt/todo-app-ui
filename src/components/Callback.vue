<template>
    <div class="todo">
        <h1>This is an callback page {{ message }}</h1>
    </div>
</template>

<script>
    import VueCookie from 'cookie-in-vue'
    // import api from '../services/api'

    export default {
        name: 'callback',
        data: () => {
            return {
                'code': ''
            }
        },
        methods: {

        },
        mounted () {
            this.code = this.$route.query.code
            console.log('this.$route.query.code', this.$route.query.code)
            if (this.code !== '') {
                console.log('login success')

                // TODO :: get auth token by code
            } else {
                console.log('login failed')
            }
        }
    }
</script>

<style>

</style>