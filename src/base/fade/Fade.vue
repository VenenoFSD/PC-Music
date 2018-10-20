<template>
    <transition>
        <slot></slot>
    </transition>
</template>

<script>
    export default {
        name: "Fade"
    }
</script>

<style scoped>
    .v-enter, .v-leave-to{
        opacity: 0;
        transform: translate3d(6%, 0, 0)
    }
    .v-enter-active, .v-leave-active{
        transition: all .5s;
    }
</style>
