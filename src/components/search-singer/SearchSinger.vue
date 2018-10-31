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
        props: {
            singers: {
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
                this.show = newType.index === 2;
            }
        }
    }
</script>

<style scoped>

</style>
