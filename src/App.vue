<template>
    <div id="app">
        <div class="left-list"></div>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style scoped>
    #app {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    #app .left-list {
        position: relative;
        width: 230px;
        height: 100%;
        left: 0;
        background-color: #eee;
    }
</style>
