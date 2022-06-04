<script lang="ts" setup>

const props = defineProps<{
  date: Date
}>()

</script>>

<template>
  <section class="right-bar-wrapper">
    {{props.date}}
  </section>
</template>

<style scoped>
.right-bar-wrapper {
  font-size: 1rem;
  width: 27.375em;
  box-sizing: border-box;
  border: 1px solid #C6CACC;
  border-top: none;  
  justify-self: flex-end;
  text-align: center;
}
</style>