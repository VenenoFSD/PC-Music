<template>
    <div class="login-wrapper">
        <h1 class="title">登录网易云音乐</h1>
        <div class="login">
            <div class="header">登录</div>
            <div class="input-wrapper">
                <input type="number" placeholder="请输入手机号" class="input" v-model="phoneNum">
                <input type="password" placeholder="请输入密码" class="input" v-model="password">
                <div class="login-btn" @click="login">登录</div>
            </div>
            <p class="remind" v-show="remindShow">{{remindText}}</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {mapMutations} from 'vuex'

    export default {
        name: "Login",
        data () {
            return {
                phoneNum: '',
                password: '',
                remindText: '',
                remindShow: false
            }
        },
        methods: {
            login () {
                if (!this.phoneNum.length || !this.password.length) {
                    this.remindUser();
                    return;
                }
                this.remindShow = false;
                this.remindText = '';
                let This = this;
                axios.get(`http://localhost:3000/login/cellphone?phone=${this.phoneNum}&password=${this.password}`).catch((err)  => {
                    if (err.response) {
                        This.remindUser('账号或密码错误！');
                    } else if (err.request) {  // console.log(err.request);
                    } else {}  // console.log('Error', err.message);
                    // console.log(err.config);
                }).then((res) => {
                    if (res !== undefined) {
                        this.setLoginInfo(res.data);
                        this.$router.push('/discovery');
                    }
                });
            },
            remindUser (err = '') {
                this.remindShow = true;
                if (err.length) {
                    this.remindText = err;
                    return;
                }
                if (!this.phoneNum.length) {
                    this.remindText = '请输入手机号码！';
                    return;
                }
                this.remindText = '请输入登录密码！';
            },
            ...mapMutations({
                setLoginInfo: 'SET_LOGIN_INFO'
            })
        }
    }
</script>

<style scoped>
    .login-wrapper {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 5;
        background-color: #ddd;
    }
    .title {
        text-align: center;
        color: #fff;
        font-size: 40px;
        margin-top: 100px;
    }
    .login {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        box-shadow: 0 0 10px #999;
        width: 460px;
        height: 280px;
        border-radius: 3px;
        overflow: hidden;
        color: #000;
        background: #fff;
    }
    .header {
        line-height: 46px;
        padding-left: 20px;
    }
    .input-wrapper {
        text-align: center;
        margin-top: 24px;
    }
    .input {
        width: 260px;
        line-height: 40px;
        border: 1px solid #ccc;
        padding-left: 16px;
        box-sizing: border-box;
        font-size: 14px;
        margin-bottom: 10px;
        border-radius: 3px;
    }
    .input::placeholder {
        color: #aaa;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
    }
    .login-btn {
        width: 260px;
        line-height: 40px;
        background: linear-gradient(to bottom, rgb(238, 51, 50), rgb(180, 48, 47));
        color: #fff;
        margin: 30px auto;
    }
    .login-btn:active {
        background: linear-gradient(to bottom, rgb(180, 48, 47), rgb(238, 51, 50));
    }
    .close {
        position: absolute;
        right: 20px;
        top: 8px;
        font-size: 20px;
    }
    .remind {
        color: rgb(227, 53, 52);
        position: absolute;
        left: 100px;
        bottom: 86px;
    }
</style>
