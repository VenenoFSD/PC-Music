<template>
    <div class="confirm" v-show="showConfirm">
        <div class="confirm-box">
            <p class="title">确认清除搜索历史记录？</p>
            <div class="btn-wrapper">
                <span class="btn clear" @click.stop="confirm">清除</span>
                <span class="btn cancel" @click.stop="hide">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Confirm",
        data () {
            return {
                showConfirm: false
            }
        },
        methods: {
            show () {
                this.showConfirm = true;
            },
            hide () {
                this.showConfirm = false;
            },
            confirm () {
                this.showConfirm = false;
                this.$emit('confirm');
            }
        }
    }
</script>

<style scoped>
    .confirm {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 5;
        background-color: rgba(255,255,255,.7);
    }
    .confirm-box {
        width: 360px;
        height: 160px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        box-shadow: 0 0 10px #999;
        background-color: #fff;
    }
    .title {
        font-size: 15px;
        margin: 40px 0 0 20px;
    }
    .btn-wrapper {
        position: absolute;
        right: 20px;
        bottom: 16px;
    }
    .btn {
        line-height: 30px;
        padding: 5px 28px;
        margin-left: 6px;
    }
    .btn.clear {
        background-color: #bc2f2d;
        color: #fff;
    }
    .btn.cancel {
        border: 1px solid #bc2f2d;
        padding: 4px 27px;
        color: #bc2f2d;
    }
</style>
