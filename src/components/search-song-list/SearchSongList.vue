<template>
    <div class="search-song-list" v-show="show">
        songList
    </div>
</template>

<script>
    import get from '../../common/js/api'

    const DEFAULT_LIMIT = 30;
    export default {
        name: "SearchSongList",
        data () {
            return {
                show: false
            }
        },
        props: {
            songLists: {
                type: Array,
                default: () => []
            },
            currentType: {
                type: Object,
                default: {
                    index: 0,
                    code: 1
                }
            }
        },
        watch: {
            currentType (newType) {
                this.show = newType.index === 3;
            }
        }
    }
</script>

<style scoped>

</style>
