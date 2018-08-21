<template>
    <div class="todo">
        <h1>This is an callback page {{ message }}</h1>
    </div>
</template>

<script>
    import VueCookie from 'cookie-in-vue'
    import api from '../services/api'

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
                api.post('api/v1/auth',
                    {
                        code: this.code
                    },
                    {}
                ).then((response) => {
                    console.log(response.data.data)
                    VueCookie.set('access_token', response.data.data.access_token, response.data.data.expires_in)
                    VueCookie.set('refresh_token', response.data.data.refresh_token, response.data.data.expires_in + (10 * 24 * 60 * 60))
                    this.$router.push('/todo')
                })
            } else {
                console.log('login failed')
                alert('login failed')
            }
        }
    }
</script>

<style>

</style>