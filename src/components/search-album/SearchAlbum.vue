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
        props: {
            albums: {
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
                this.show = newType.index === 1;
            }
        }
    }
</script>

<style scoped>

</style>
