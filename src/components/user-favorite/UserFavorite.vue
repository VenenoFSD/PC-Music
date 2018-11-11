<template>
    <div class="user-favorite">
        <router-view></router-view>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        name: "UserFavorite",
        methods: {
            getUserFavorite () {
                this.setSongList(this.userFavorite);
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.$router.push({
                        path: '/userFavorite/songList',
                        query: {
                            id: this.userFavorite.id,
                            title: '歌单',
                            desc: 'user'
                        }
                    });
                }, 20);
            },
            ...mapMutations({
                setSongList: 'SET_SONG_LIST'
            })
        },
        created () {
            this.getUserFavorite();
        },
        computed: {
            ...mapGetters([
                'userFavorite'
            ])
        }
    }
</script>

<style scoped>
</style>
