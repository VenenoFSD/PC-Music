<template>
    <div class="song-list">
        {{currentTag}}
    </div>
</template>

<script>

    export default {
        name: "SongList",
        props: {
            currentTag: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>

</style>
