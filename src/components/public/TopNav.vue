<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="top-nav-wrapper">
     顶栏
     <router-link to="/login">注销</router-link>
  </header>
</template>

<style scoped>
.top-nav-wrapper {
  box-sizing: border-box;
  border: 1px solid #000;
  font-size: 1rem;
  height: 4em;
  display: flex;
  justify-content: space-around;
}
</style>