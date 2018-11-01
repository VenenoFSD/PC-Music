<template>
    <div class="search-singer" v-show="show">
        singer
    </div>
</template>

<script>
    import get from '../../common/js/api'

    const DEFAULT_LIMIT = 30;
    export default {
        name: "SearchSinger",
        data () {
            return {
                show: false
            }
        },
        methods: {
            getSearchSinger () {
                get('/search', {
                    keywords: this.query,
                    type: 100,
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
                this.show = newType.index === 2;
            },
            show (newShow) {
                if (newShow) {
                    this.getSearchSinger();
                }
            },
            query (newQuery) {
                if (this.show && newQuery.length) {
                    this.getSearchSinger();
                }
            }
        }
    }
</script>

<style scoped>

</style>
