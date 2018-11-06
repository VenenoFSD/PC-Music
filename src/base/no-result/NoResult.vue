<template>
    <p class="no-result">{{text}}</p>
</template>

<script>
    export default {
        name: "NoResult",
        props: {
            text: {
                type: String,
                default: '暂无搜索结果'
            }
        }
    }
</script>

<style scoped>
    .no-result {
        text-align: center;
        font-size: 14px;
        color: #999;
        margin-top: 100px;
    }
</style>
