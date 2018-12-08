<template>
    <div class="search-album" v-show="show">
        <ul class="album-list" v-show="showList">
            <li class="album-item" v-for="(item, index) in result" :class="{'bg': !(index % 2)}" @click="selectItem(item)">
                <div class="img-wrapper">
                    <img :src="item.picUrl">
                </div>
                <p class="album-name">{{item.name}}</p>
                <p class="artist">{{item.artist.name}}<span v-show="item.artist.alias.length">（{{item.artist.alias[0]}}）</span></p>
            </li>
        </ul>
        <load v-show="showLoad"></load>
        <no-result v-show="NoResult"></no-result>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import {searchMixin} from "../../common/js/mixin";

    export default {
        name: "SearchAlbum",
        mixins: [searchMixin],
        methods: {
            selectItem (item) {
                this.setNewDisc(item);
                this.$router.push({
                    path: '/album',
                    query: {
                        id: item.id
                    }
                });
            },
            _getSearch (timer) {
                this.getSearch(timer, 10, 'albums', 'albumCount');
            },
            ...mapMutations({
                setNewDisc: 'SET_NEW_DISC'
            })
        },
        watch: {
            currentType (newType) {
                this.show = newType.index === 1;
            }
        }
    }
</script>

<style scoped>
    .album-list {
        margin-top: 20px;
    }
    .album-item {
        display: flex;
        padding: 14px;
        align-items: center;
    }
    .album-item.bg {
        background-color: #f4f4f6;
    }
    .album-item:hover {
        background-color: #e8e8ea;
    }
    .img-wrapper {
        width: 59px;
        height: 50px;
        font-size: 0;
        background: url("./coverall.png") no-repeat 0 0;
        background-size: 100% 100%;
        flex: 0 0 59;
        margin-right: 20px;
    }
    .img-wrapper img {
        width: 50px;
        height: 50px;
    }
    .album-name {
        flex: 0 0 40%;
        font-size: 14px;
    }
    .artist {
        font-size: 12px;
        color: #999;
    }
</style>
