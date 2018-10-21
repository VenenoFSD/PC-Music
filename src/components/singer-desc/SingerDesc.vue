<template>
    <div class="singer-desc">
        <h1 class="no-desc" v-show="!desc.length">暂无该歌手的详情</h1>
        <ul>
            <li v-for="item in desc" class="sd-item">
                <h2 class="title">{{item.ti}}</h2>
                <p class="desc">{{item.txt}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import get from "../../common/js/api";

    export default {
        name: "SingerDesc",
        data () {
            return {
                desc: []
            }
        },
        props: {
            singerId: {
                type: Number,
                default: 0
            },
            name: {
                type: String,
                default: ''
            }
        },
        methods: {
            getSingerDesc () {
                if (!this.singerId) {
                    return;
                }
                get('/artist/desc', {
                    id: this.singerId
                }).then((res) => {
                    this.desc = res.introduction;
                    if (res.briefDesc) {
                        this.desc.unshift({
                            ti: this.name + '简介',
                            txt: res.briefDesc
                        });
                    }
                });
            }
        },
        created () {
            this.getSingerDesc();
        }
    }
</script>

<style scoped>
    .singer-desc {
        padding: 0 26px 0 30px;
        overflow: auto;
    }
    .no-desc {
        text-align: center;
        font-size: 15px;
        color: #777;
        margin-top: 200px;
    }
    .sd-item {
        margin: 20px 0 36px 0;
        color: #000;
    }
    .sd-item .title {
        font-size: 15px;
        margin-bottom: 20px;
    }
    .sd-item .desc {
        text-indent: 30px;
        font-size: 12px;
        line-height: 24px;
    }
</style>
