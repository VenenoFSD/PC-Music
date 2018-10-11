<template>
    <div id="app">
        <div class="left-list-wrapper">
            <left-list></left-list>
        </div>
        <div class="right-page">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
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
        display: flex;
    }
    #app .right-page {
        flex: 1;
        border-left: 1px solid #ddd;
        overflow-x: hidden;
    }
</style>
