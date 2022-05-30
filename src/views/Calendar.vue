<script setup lang="ts">
import { NScrollbar } from 'naive-ui'
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const calendarOptions = {
  plugins: [ dayGridPlugin, interactionPlugin ],
  initialView: 'dayGridMonth',
  headerToolbar: {
    start: 'prev',
    center: 'title',
    end: 'next'
  }
}
</script>

<template>
  <n-scrollbar
    style="max-height: 40rem;">
    <full-calendar
      style="margin-right: 1em;"
      :options="calendarOptions"/>
  </n-scrollbar>
</template>

<style scoped lang="scss">

</style>