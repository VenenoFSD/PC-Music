<template>
    <song-list-detail v-bind:backTo="false"></song-list-detail>
</template>

<script>
    import SongListDetail from '.././song-list-detail/SongListDetail'
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        name: "UserFavorite",
        methods: {
            getUserFavorite () {
                this.setSongList(this.userFavorite);
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
        },
        components: {
            SongListDetail
        }
    }
</script>

<style scoped>
</style>
