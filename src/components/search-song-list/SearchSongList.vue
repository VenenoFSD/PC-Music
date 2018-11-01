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
        methods: {
            getSearchSongList () {
                get('/search', {
                    keywords: this.query,
                    type: 1000,
                    limit: DEFAULT_LIMIT
                }).then((res) => {

                });
            }
        },
        props: {
            currentType: {
                type: Object,
                default: {
                    index: 0,
                    code: 1
                }
            },
            query: {
                type: String,
                default: ''
            }
        },
        watch: {
            currentType (newType) {
                this.show = newType.index === 3;
            },
            show (newShow) {
                if (newShow) {
                    this.getSearchSongList();
                }
            },
            query (newQuery) {
                if (this.show && newQuery.length) {
                    this.getSearchSongList();
                }
            }
        }
    }
</script>

<style scoped>

</style>
