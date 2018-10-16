<template>
    <div class="d-singer-wrapper">
        <div class="d-singer">
            <div class="singer-tag-wrapper">
                <div class="singer-tag">
                    <h2 class="tag-title">{{sLang.title}}：</h2>
                    <ul class="tag-list">
                        <li v-for="(item, index) in sLang.lists" class="tl-item" @click="langSelect(index)" :class="{'active': item === currentLang}">{{item.name}}</li>
                    </ul>
                </div>
                <div class="singer-tag">
                    <h2 class="tag-title">{{sSort.title}}：</h2>
                    <ul class="tag-list">
                        <li v-for="(item, index) in sSort.lists" class="tl-item" @click="sortSelect(index)" :class="{'active': item === currentSort}">{{item.name}}</li>
                    </ul>
                </div>
                <div class="singer-tag">
                    <h2 class="tag-title">{{sFilter.title}}：</h2>
                    <ul class="tag-list">
                        <li v-for="(item, index) in sFilter.lists" class="tl-item" @click="filterSelect(index)" :class="{'active': item === currentFilter}">{{item}}</li>
                    </ul>
                </div>
            </div>
            <div class="singer-list-wrapper">
                <div class="singer-list-title">
                    <h1 class="title">{{currentSinger}}</h1>
                    <p class="back" v-show="showBack" @click="back">所有热门歌手 >></p>
                </div>
                <div class="singer-list">
                    <ul>
                        <li v-for="item in singerList">{{item.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const REQUEST_COUNT = 48;
    import axios from 'axios'
    export default {
        name: "DSinger",
        data () {
            return {
                sLang: {
                    title: '语种',
                    lists: [
                        {
                            name: '华语',
                            code: '100'
                        },
                        {
                            name: '欧美',
                            code: '200'
                        },
                        {
                            name: '日本',
                            code: '600'
                        },
                        {
                            name: '韩国',
                            code: '700'
                        },
                        {
                            name: '其他',
                            code: '400'
                        },
                    ]
                },
                sSort: {
                    title: '分类',
                    lists: [
                        {
                            name: '男歌手',
                            code: '1'
                        },
                        {
                            name: '女歌手',
                            code: '2'
                        },
                        {
                            name: '乐队组合',
                            code: '3'
                        }
                    ]
                },
                sFilter: {
                    title: '筛选',
                    lists: ['热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']
                },
                currentLang: {},
                currentSort: {},
                currentFilter: '热门',
                singerList: [],
                offset: 0
            }
        },
        methods: {
            firstGet () {
                axios.get(`http://localhost:3000/top/artists?limit=${REQUEST_COUNT}`).then((res) => {
                    if (res.data && res.data.code === 200) {
                        this.singerList = res.data.artists;
                    }
                });
            },
            changeGet () {
                let initial = this.currentFilter === '热门' ? '' : this.currentFilter;
                axios.get(`http://localhost:3000/artist/list?limit=${REQUEST_COUNT}&cat=${this.requestCode}&initial=${initial}`).then((res) => {
                    if (res.data && res.data.code === 200) {
                        this.singerList = res.data.artists;
                    }
                });
            },
            langSelect (index) {
                this.currentLang = this.sLang.lists[index];
                if (this._isEmptyObject(this.currentSort)) {  //  第一次进入页面
                    this.currentSort = this.sSort.lists[0];
                    this.changeGet();
                }
            },
            sortSelect (index) {
                this.currentSort = this.sSort.lists[index];
                if (this._isEmptyObject(this.currentLang)) {
                    this.currentLang = this.sLang.lists[0];
                    this.changeGet();
                }
            },
            filterSelect (index) {
                if (this._isEmptyObject(this.currentLang)) {
                    this.currentLang = this.sLang.lists[0];
                    this.currentSort = this.sSort.lists[0];
                }
                this.currentFilter = this.sFilter.lists[index];
            },
            back () {
                this.currentLang = {};
                this.currentSort = {};
                if (this.currentFilter === '热门') {
                    this.firstGet();
                } else {
                    this.currentFilter = '热门';
                }
            },
            _isEmptyObject (obj) {
                for (let item in obj) {
                    return false;
                }
                return true;
            }
        },
        computed: {
            currentSinger () {
                if (this._isEmptyObject(this.currentLang)) {
                    return '所有热门歌手';
                } else {
                    return this.currentLang.name + this.currentSort.name;
                }
            },
            showBack () {
                return !(this._isEmptyObject(this.currentLang));
            },
            requestCode () {
                if (this._isEmptyObject(this.currentLang)) {
                    return '';
                }
                return this.currentLang.code + this.currentSort.code;
            }
        },
        watch: {
            currentLang (newSort, oldSort) {
                if (this._isEmptyObject(newSort) || this._isEmptyObject(oldSort)) {  //  返回全部热门页面或者第一次进入页面的情况
                    return;
                }
                this.changeGet();
            },
            currentSort (newSort, oldSort) {
                if (this._isEmptyObject(newSort) || this._isEmptyObject(oldSort)) {
                    return;
                }
                this.changeGet();
            },
            currentFilter () {
                this.changeGet();
            }
        },
        created () {
            this.firstGet();
        }
    }
</script>

<style scoped>
    .d-singer-wrapper {
        flex: 1;
        overflow: auto;
    }
    .d-singer {
        max-width: 1200px;
        margin: 0 auto;
        padding: 30px 20px 0 20px;
        transform: translate3d(4px, 0, 0);
    }
    .singer-tag, .tag-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    .singer-tag {
        margin-bottom: 16px;
    }
    .singer-tag:last-child {
        margin-bottom: 0;
    }
    .tag-title {
        font-size: 12px;
        color: #4c4c4c;
        margin-right: 6px;
    }
    .tl-item {
        font-size: 12px;
        height: 12px;
        line-height: 12px;
        color: #999;
        padding: 0 12px;
        border-right: 1px solid #e0e0e0;
    }
    .tl-item:first-child {
        padding-left: 0;
    }
    .tl-item:last-child {
        padding-right: 0;
        border: none;
    }
    .tl-item.active {
        color: #e20000;
    }
    .singer-list-title {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin: 40px 0 30px 0;
    }
    .singer-list-title .title {
        font-size: 20px;
    }
    .singer-list-title .back {
        font-size: 12px;
        color: #999;
    }
</style>
