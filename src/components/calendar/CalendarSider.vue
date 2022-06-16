<script lang="ts" setup>
import { EventInput } from '@fullcalendar/vue3'
import { ref, watch, computed, toRef } from 'vue'
import { NScrollbar } from 'naive-ui'
import axios from 'axios'

const props = defineProps<{
  date: Date
}>()

const dateRef = toRef(props, 'date')

// 星期
const whichDay = computed(() => {
  switch (props.date.getDay()) {
    case 0: 
      return '日'
    case 1:
      return '一'
    case 2:
      return '二'
    case 3:
      return '三'
    case 4:
      return '四'
    case 5:
      return '五'
    case 6:
      return '六'
  }
})

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

type Todo = Partial<EventInput>

// 事件数据
const events = ref<Todo[]>([])

// 颜色
const [ red, blue, yellow, purple, green ] = ['#EA3D2F', '#367BF5', '#E5C100', '#E6EFFF', '#007505' ]

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

  return result
}

// 根据日期获取事件
async function getEvents () {
  events.value.length = 0
  const dateStr = dateRef.value.toISOString().replace(/T.*$/, '')
  // 调用接口：传入（用户ID，日期） 返回（当日所有事件）
  const res = await axios.get(`/api/datetodo/${dateStr}`)

  res.data.forEach((todo: RawTodo) => events.value.push(parseTodo(todo)))

  console.log(events)
}

watch(dateRef, getEvents)

</script>>

<template>
  <section class="right-bar-wrapper">
    <div class="date-title">
      {{`${props.date.toLocaleDateString()} (${whichDay})`}}
    </div>
    <n-scrollbar
      class="events-container"
      style="max-height: 36rem;">
      <div v-for="event in events">
        {{event.title}}
      </div>
    </n-scrollbar>
  </section>
</template>

<style scoped>
.right-bar-wrapper {
  font-size: 1rem;
  width: 20.5em;
  box-sizing: border-box;
  border: 1px solid #C6CACC;
  border-top: none;  
  justify-self: flex-end;
  text-align: center;
}

.date-title {
  font-family: 'PingFang SC';
  font-size: 1.5rem;
  letter-spacing: 0.44px;
}

.events-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>