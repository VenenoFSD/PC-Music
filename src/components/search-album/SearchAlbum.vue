<template>
    <div class="search-album" v-show="show">
        album
    </div>
</template>

<script>
    import get from '../../common/js/api'

    const DEFAULT_LIMIT = 30;
    export default {
        name: "SearchAlbum",
        data () {
            return {
                show: false
            }
        },
        methods: {
            getSearchAlbum () {
                get('/search', {
                    keywords: this.query,
                    type: 10,
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
                this.show = newType.index === 1;
            },
            show (newShow) {
                if (newShow) {
                    this.getSearchAlbum();
                }
            },
            query (newQuery) {
                if (this.show && newQuery.length) {
                    this.getSearchAlbum();
                }
            }
        }
    }
</script>

<style scoped>

</style>
