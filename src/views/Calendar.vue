<script setup lang="ts">
import { onMounted } from 'vue'
import { NScrollbar } from 'naive-ui'
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import zhLocale from '@fullcalendar/core/locales/zh-cn'

const calendarOptions = {
  plugins: [ dayGridPlugin, interactionPlugin ],
  initialView: 'dayGridMonth',
  headerToolbar: {
    start: 'prev',
    center: 'title',
    end: 'next'
  },
  locale: zhLocale
}

onMounted(() => {
  // 日历标题格式化
  const title = Array.from(document.querySelectorAll('.fc-toolbar-title'))[0]
  title.innerHTML = title.innerHTML.replace('年', ' 年 ').replace('月', ' 月')
})
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
$blue: #0065C1;
$blue-deep: #004889;

:deep(.fc-button) {
  background-color: $blue;
  &:hover {
    background-color: $blue-deep;
  }
}

:deep(.fc-col-header-cell-cushion) {
  color: $blue;
  font-weight: normal;
}

:deep(.fc-toolbar-title) {
  letter-spacing: 2px;
  font-weight: normal;
}
</style>