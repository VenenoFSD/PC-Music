<template>
    <div class="search-singer" v-show="show">
        <ul class="singer-list" v-show="showList">
            <li class="sl-item" v-for="(item, index) in result" :class="{'bg': !(index % 2)}" @click="selectItem(item)">
                <img :src="item.img1v1Url" class="img">
                <p class="name">{{item.name}}<span v-if="item.trans" class="trans">（{{item.trans}}）</span></p>
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
        name: "SearchSinger",
        mixins: [searchMixin],
        methods: {
            selectItem (item) {
                this.setSinger(item);
                this.$router.push({
                    path: '/singer',
                    query: {
                        id: item.id
                    }
                });
            },
            _getSearch (timer) {
                this.getSearch(timer, 100, 'artists', 'artistCount');
            },
            ...mapMutations({
                setSinger: 'SET_SINGER'
            })
        },
        watch: {
            currentType (newType) {
                this.show = newType.index === 2;
            }
        }
    }
</script>

<style scoped>
    .singer-list {
        margin-top: 20px;
        font-size: 13px;
    }
    .sl-item {
        display: flex;
        align-items: center;
        padding: 10px;
    }
    .sl-item.bg {
        background-color: #f4f4f6;
    }
    .sl-item:hover {
        background-color: #e8e8ea;
    }
    .img {
        width: 50px;
        height: 50px;
        flex: 0 0 50px;
        margin-right: 20px;
    }
    .trans {
        color: #999;
    }
</style>
