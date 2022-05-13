<script setup>
import { RouterLink } from 'vue-router'

</script>

<template>
  <section class="side-nav-wrapper">
    侧边栏
    <router-link to="/">我的一天</router-link>
    <router-link to="/calendar">日历</router-link>
    <router-link to="/todo-asset">待办集</router-link>
    <router-link to="/statistic">数据统计</router-link>
    <router-link to="/settings">设置</router-link>
  </section>
</template>

<style scoped>
.side-nav-wrapper {
  box-sizing: border-box;
  border: 1px solid black;
  border-top: none;
  font-size: 1rem;
  width: 16.2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>