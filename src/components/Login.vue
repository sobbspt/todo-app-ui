<template>
    <div class="todo">
        <h1>This is an login page {{ message }}</h1>
    </div>
</template>

<script>
    import VueCookie from 'cookie-in-vue'
    // import api from '../services/api'

    export default {
        name: 'login',
        data: () => {
            return {
                'message': 'hi'
            }
        },
        methods: {
            guid() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }

                return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            }
        },
        mounted () {
            if (!VueCookie.get('access_token')) {
                // TODO :: Redirect to LINE login
                console.log('This is login component')
                var channelId = '1601887173'
                var callbackUrl = escape('https://todo-d976c.firebaseapp.com/callback')
                console.log('callbackUrl', callbackUrl)
                var state = this.guid()
                window.location.href = "https://access.line.me/dialog/oauth/weblogin?response_type=code&client_id=" + channelId + "&redirect_uri=" + callbackUrl + "&state=" + state
            }
            // else if () {
            //
            // }
        }
    }
</script>

<style>

</style>