<script setup lang="ts">
import { NScrollbar } from 'naive-ui'
import '@fullcalendar/core/vdom'
import FullCalendar, { CalendarOptions, EventInput } from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import zhLocale from '@fullcalendar/core/locales/zh-cn'

const emits = defineEmits<{
  (e: 'click-date', date: Date): void
}>()

// 日期，ISO字符串(0时区)，去掉'T'以后的部分
const yesterdayStr = new Date((new Date()).getTime() - 24 * 60 * 60 * 1000).toISOString().replace(/T.*$/, '')

const todayStr = new Date().toISOString().replace(/T.*$/, '')

const tommorrowStr = new Date((new Date()).getTime() + 24 * 60 * 60 * 1000).toISOString().replace(/T.*$/, '')

// 计数器
let counter = 0
// 事件(mock)，用color与textColor区分状态或优先级
const initialEvents: EventInput[] = [
  {
    id: String(counter++),
    title: '重要不紧急长事件',
    start: yesterdayStr,
    end: tommorrowStr,
    color: '#0065C1'    
  },
  {
    id: String(counter++),
    title: '已完成',
    start: yesterdayStr,
    color: '#007505'
  },
  {
    id: String(counter++),
    title: '定时不紧急不重要',
    start: todayStr + 'T12:00:00',
    color: '#E6EFFF'
  },
  {
    id: String(counter++),
    title: '全天紧急不重要',
    start: tommorrowStr,
    color: '#E5C100'
  },
  {
    id: String(counter++),
    title: '全天重要不紧急',
    start: tommorrowStr,
    color: '#0065C1'
  },
  {
    id: String(counter++),
    title: '全天重要紧急',
    start: tommorrowStr,
    color: '#B20000'
  },
]

// 日历选项
const calendarOptions: CalendarOptions = {
  plugins: [
    dayGridPlugin,
    interactionPlugin
  ],
  initialView: 'dayGridMonth',
  headerToolbar: {
    start: 'prev',
    center: 'title',
    end: 'next'
  },
  locale: zhLocale,
  contentHeight: '56em',
  fixedWeekCount: false,
  initialEvents: initialEvents,
  selectable: true,
  dateClick: (info) => {
    // 点击日期，切换右侧栏显示
    emits('click-date', info.date)
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
$blue-shallow: #E6EFFF;
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

:deep(.fc-daygrid-block-event) {
  background: none;
  border: none;
  border-radius: 15px;
  padding-left: .4rem;
}

:deep(.fc-event-title) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: 0.15px;  
  font-family: 'PingFang SC';
}

:deep(.fc-daygrid-event-dot) {
  border-color: $blue-shallow;
}

:deep(.fc-daygrid-day-frame) {
  height: 9.4rem;
}
</style>