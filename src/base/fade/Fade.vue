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
    .v-enter{
        opacity: 0;
        transform: translate3d(10%, 0, 0)
    }
    .v-enter-active{
        transition: all .5s;
    }
</style>
