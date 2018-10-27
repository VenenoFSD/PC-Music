<template>
    <fade>
        <div class="song-list-detail">
            fsdfsdffs
        </div>
    </fade>
</template>

<script>
    //  我喜欢的 / 歌单 / 排行榜
    import Fade from '../../base/fade/Fade'
    import {mapGetters} from 'vuex'

    export default {
        name: "SongListDetail",
        computed: {
            ...mapGetters([
                'songList'
            ])
        },
        components: {
            Fade
        }
    }
</script>

<style scoped>
    .song-list-detail {
        position: fixed;
        left: 210px;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        background-color: #fafafc;
        border-left: 1px solid #ddd;
        display: flex;
        flex-direction: column;
    }
</style>
