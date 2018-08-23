<template>
    <div class="todo">
        <div class="overlay-dukdik" v-if="loading">
            <div class="loading-dukdik">
                <sync-loader :color=spinner.color></sync-loader>
            </div>
        </div>
    </div>
</template>

<script>
    import VueCookie from 'cookie-in-vue'
    import api from '../services/api'
    import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

    export default {
        name: 'callback',
        data: () => {
            return {
                'code': '',
                spinner: {
                    color: '#20a8d8'
                },
                loading: true
            }
        },
        components: {
            'SyncLoader': SyncLoader
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
    .overlay-dukdik {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 9999;
        opacity: 0.7;
        top: 0;
        left: 0;
        background-color: #000000;
    }

    .loading-dukdik {
        position: absolute;
        top: 50%;
        left: 50%
    }
</style>