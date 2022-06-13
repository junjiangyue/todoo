<script lang="ts" setup>
import { EventInput } from '@fullcalendar/vue3'
import { ref, watch, computed, toRef } from 'vue'

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

// 事件数据
const events = ref<EventInput[]>([])

// 根据日期获取事件
let counter = 0
function getEvents () {
  // 调用接口：传入（用户ID，日期） 返回（当日所有事件）
  events.value.push(...[
    // mocks
    {
      id: String(counter++),
      title: '全天紧急不重要',
      color: '#E5C100'
    },
    {
      id: String(counter++),
      title: '全天重要不紧急',
      color: '#0065C1'
    },
    {
      id: String(counter++),
      title: '全天重要紧急',
      color: '#B20000'
    },
  ])
}

watch(dateRef, getEvents)

</script>>

<template>
  <section class="right-bar-wrapper">
    <div class="date-title">
      {{`${props.date.toLocaleDateString()} (${whichDay})`}}
    </div>
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
</style>