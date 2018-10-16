<template>
    <div class="discovery">
        <div class="discovery-tab-wrapper">
            <ul class="discovery-tab">
                <router-link tag="li" to="/discovery/recommend" class="dt-item">个性推荐</router-link>
                <router-link tag="li" to="/discovery/songList" class="dt-item">歌单</router-link>
                <router-link tag="li" to="/discovery/newDisc" class="dt-item">新碟上架</router-link>
                <router-link tag="li" to="/discovery/singer" class="dt-item">歌手</router-link>
                <router-link tag="li" to="/discovery/ranking" class="dt-item">排行榜</router-link>
            </ul>
        </div>
        <keep-alive exclude="DSongList">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: "Discovery"
    }
</script>

<style scoped>
    .discovery {
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #fafafc;
    }
    .discovery-tab-wrapper {
        border-bottom: 1px solid #ddd;
        box-sizing: border-box;
    }
    .discovery-tab {
        display: flex;
        justify-content: space-between;
        max-width: 700px;
        height: 50px;
        margin: 0 auto;
        padding: 0 20px;
    }
    .discovery-tab .dt-item {
        text-align: center;
        line-height: 66px;
        height: 100%;
        box-sizing: border-box;
        margin-top: 1px;
    }
    .discovery-tab .dt-item.router-link-active {
        color: #ec0000;
        border-bottom: 2px solid #ec0000;
    }
    .discovery-page {
        flex: 1;
        overflow: auto;
    }
</style>
