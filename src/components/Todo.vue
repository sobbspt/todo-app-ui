<template>
    <div class="todo">
        <h1>Hi {{ name }}</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ali...</p>
    </div>
</template>

<script>
    import VueCookie from 'cookie-in-vue'
    import lineapi from '../services/lineapi'

    export default {
        name: 'todo',
        data: () => {
            return {
                name: '',
                profile_image: ''
            }
        },
        methods: {
            getProfile () {
                lineapi.get('/profile', { headers: { 'Authorization': 'Bearer ' + VueCookie.get('access_token') } }).then((response) => {
                    if (response.status === 200) {
                        console.log('user profile', response.data)
                        this.name = response.data.displayName
                        this.profile_image = response.data.pictureUrl
                    }
                }, (error) => {
                    console.log(error)
                    alert()
                })
            }
        },
        mounted () {
            console.log('This is ToDo component')
            if (VueCookie.get('access_token')) {
                this.getProfile()
            } else if (VueCookie.get('refresh_token')) {
                // TODO :: refresh token
                console.log('Has refresh_token')
            } else {
                console.log('No token')
                this.$router.push('/login')
            }
        }
    }
</script>

<style>

</style>