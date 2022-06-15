<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { NScrollbar } from 'naive-ui'
import '@fullcalendar/core/vdom'
import FullCalendar, { CalendarOptions, EventInput } from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import zhLocale from '@fullcalendar/core/locales/zh-cn'
import rrulePlugin from '@fullcalendar/rrule'
import axios from 'axios'

const emits = defineEmits<{
  (e: 'click-date', date: Date): void
}>()

interface RawTodo {
  scheme_id: number
  scheme_title: string
  scheme_date: string  
  scheme_start_time: string
  scheme_end_time: string  
  priority: '1' | '2' | '3' | '4'
  repetition: number
  repetition_scope: 'daily' | 'weekly' | 'monthly' | 'yearly'
  scheme_description: string
  state: '0' | '1'
  tag_name: string
}

const todos = ref<EventInput[]>([])

// 颜色别名
const [ red, blue, yellow, purple, green ] = ['#B20000', '#0065C1', '#E5C100', '#E6EFFF', '#007505' ]

onBeforeMount(async () => {
  const res = await axios.get(`/api/alltodo`)
  res.data.forEach((todo: RawTodo) => {
    todos.value.push(parseTodo(todo))
  })
})

type Todo = Partial<EventInput>

// 解析数据库返回的todo为Calendar EventInput
function parseTodo (todo: RawTodo) {
  const result: Todo = {
    id: String(todo.scheme_id),
    title: todo.scheme_title
  }

  if (todo.scheme_date) {
    result.start = todo.scheme_date
  } else {
    result.start = todo.scheme_start_time
    if (todo.scheme_end_time) {
      result.end = todo.scheme_end_time
    }
  }

  switch (todo.priority) {
    case '1':
      result.color = red
      break
    case '2':
      result.color = blue
      break
    case '3':
      result.color = yellow
      break
    case '4':
      result.color = purple
      break
  }

  if (todo.state === '1') {
    result.color = green
  }

  if (todo.repetition) {
    result.rrule = {
      freq: todo.repetition_scope,
    }
  }

  console.log(result)

  return result
}

/* // 日期，ISO字符串(0时区)，去掉'T'以后的部分
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
] */

// 日历选项
const calendarOptions: CalendarOptions = {
  plugins: [
    dayGridPlugin,
    interactionPlugin,
    rrulePlugin
  ],
  initialView: 'dayGridMonth',
  headerToolbar: {
    start: 'prev',
    center: 'title',
    end: 'next'
  },
  locale: zhLocale,
  contentHeight: '64em',
  fixedWeekCount: true,
  initialEvents: todos.value,
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
      v-if="todos.length > 0"
      style="margin-right: 1em;"
      :options="calendarOptions"/>
  </n-scrollbar>
</template>

<style scoped lang="scss">
$blue-shallow: #E6EFFF;
$blue: #0065C1;
$blue-deep: #004889;

:deep(.fc-event-time) {
  width: 2.4rem;
}

:deep(.fc-button) {
  background-color: $blue;
  &:hover {
    background-color: $blue-deep;
  }
}

:deep(.fc-next-button:focus) {
  outline: none;
  box-shadow: none;
}

:deep(.fc-button-primary:focus) {
  box-shadow: none;
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