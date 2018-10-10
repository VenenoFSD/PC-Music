<template>
    <div id="app">
        <div class="left-list-wrapper">
            <left-list></left-list>
        </div>
    </div>
</template>

<script>
    import LeftList from './components/left-list/LeftList'
    export default {
        name: 'App',
        components: {
            LeftList
        }
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
    #app .left-list-wrapper {
        position: relative;
        height: 100%;
    }
</style>
