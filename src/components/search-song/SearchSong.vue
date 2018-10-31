<template>
    <div class="search-song" v-show="show">
        song
    </div>
</template>

<script>
    import get from '../../common/js/api'

    const DEFAULT_LIMIT = 30;
    export default {
        name: "SearchSongs",
        data () {
            return {
                show: true
            }
        },
        props: {
            songs: {
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
                this.show = newType.index === 0;
            }
        }
    }
</script>

<style scoped>

</style>
