<script lang="ts" setup>
import { EventInput } from '@fullcalendar/vue3'
import { ref, watch, computed, toRef, onBeforeMount } from 'vue'
import { NScrollbar, NButton, NIcon } from 'naive-ui'
import axios from 'axios'
import { PlusCircle } from '@vicons/fa'

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
      result.color = 'red'
      break
    case '2':
      result.color = 'blue'
      break
    case '3':
      result.color = 'yellow'
      break
    case '4':
      result.color = 'purple'
      break
  }

  if (todo.state === '1') {
    result.color = 'green'
  }

  return result
}

// 根据日期获取事件
async function getEvents () {
  events.value.length = 0
  const dateTmp = dateRef.value
  dateTmp.setHours(dateTmp.getHours() + 8)
  const dateStr = dateTmp.toISOString().replace(/T.*$/, '')
  // 调用接口：传入（用户ID，日期） 返回（当日所有事件）
  const res = await axios.get(`/api/datetodo/${dateStr}`)

  res.data.forEach((todo: RawTodo) => events.value.push(parseTodo(todo)))
}

onBeforeMount(getEvents)

watch(dateRef, getEvents)

const visible = ref(false)

const form = ref({
  name: '',
  describe: '',
  sub: '',
  priority: '',
  label: '',
  date1: '',
  date2: '',  
})

// 打开增加todo模态框
function openModal () {
  visible.value = true
}
</script>>

<template>
  <section class="right-bar-wrapper">
    <div class="date-title">
      {{`${props.date.toLocaleDateString()} (${whichDay})`}}
    </div>

    <n-scrollbar
      class="events-container"
      style="max-height: 36rem;">
      <div
        v-for="event in events"
        :class="['event-block', event.color]">
        {{event.title}}
      </div>
      <n-button
        class="add-button"
        text
        @click="openModal">
        <n-icon
          :size="36"
          color="#0065C1">
          <plus-circle/>
        </n-icon>
      </n-button>
    </n-scrollbar>
  </section>

  <el-dialog v-model="visible">
      <el-form :model="form" >
      <el-row>
          <el-col :span="18">
              <el-form-item>
                  <input class="name" v-model="form.name" autocomplete="off" @keyup.enter="add"  placeholder="    准备做什么？"/>
              </el-form-item>
              <el-form-item>
                  <input  class="describe" v-model="form.describe" autocomplete="off" placeholder="    添加描述"/>
              </el-form-item>
              <el-form-item>
                  <div class="line">
                  <img style="margin-left: 1em;" src="@/assets/icon/sub.png"/>
                  <input class="sub" v-model="form.sub" autocomplete="off" placeholder="    添加子任务"/>
                  </div>
              </el-form-item>
              <el-form-item >
                  <div class="line">
                  <img style="margin-left: 1em;" src="@/assets/icon/label.png"/>
                  <span style="font-size:14px;padding:5px;">标签</span>
                  <el-radio-group v-model="form.label" size="default">
                      <el-radio-button label="学习" ></el-radio-button>
                      <el-radio-button label="生活"></el-radio-button>
                      <el-radio-button label="工作"></el-radio-button>
                      <el-radio-button label="休闲"></el-radio-button>
                  </el-radio-group>
                  </div>
              </el-form-item>
              <el-form-item>
                    <div class="line">
                      <img style="margin-left: 1em;" src="@/assets/icon/priority.png"/>
                      <span style="font-size:14px;padding:5px;">重要程度</span>
                      <el-select v-model="form.priority" placeholder="不重要不紧急">
                      <el-option label="重要且紧急" value="1" />
                      <el-option label="重要不紧急" value="2" />
                      <el-option label="不重要紧急" value="3" />
                      <el-option label="不重要不紧急" value="4" />
                      </el-select>
                  </div>
              </el-form-item>
          </el-col>
          <el-col :span="6" style="background-color:#EDEDED;border-radius: 0px 10px 0px 0px;border-left: solid 1px #E3E5E5;">
              <div class="time">
              <div><el-button class="thisday" autofocus="true" @click="form.date1=date">{{date}}/今天</el-button></div>
              <div><el-button class="thisday"  @click="form.date1=date">{{date}}/明天</el-button></div>
              <div><el-button class="thisday">没有日期</el-button></div>
              <div>
                  <el-dropdown trigger="click">
                      <span class="el-dropdown-link">
                      选择时间段<el-icon class="el-icon--right"><arrow-down /></el-icon>
                      </span>
                      <template #dropdown>
                          <div class="block">
                              <el-date-picker
                              v-model="form.date1"
                              type="datetimerange"
                              range-separator="To"
                              start-placeholder="开始时间"
                              end-placeholder="结束时间"/>
                          </div>
                      </template>
                  </el-dropdown>
              </div>
              </div>
          </el-col>
      </el-row>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
          <el-button style="border-radius: 10px;" @click="visible = false">取消</el-button>
          <el-button style="border-radius: 10px;background-color: #367BF5;color: #fff;" @click="add">确定</el-button>
      </span>
      </template>
  </el-dialog>  
</template>

<style scoped lang="scss">
$red: #B20000;
$blue: #0065C1;
$yellow: #E5C100;
$purple: #E6EFFF;
$green: #007505;
$gray: #eee;
$carol: #9F85EC;

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
  margin-bottom: 1.5rem;
}

.events-container {
  display: flex;
  flex-direction: column;
}

.event-block {
  border-radius: .95rem;
  margin: 0 1rem;
  box-sizing: border-box;
  border: 1px solid $gray;
  color: white;
  text-align: left;
  padding: 0 .6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:not(:last-child) {
    margin-bottom: .3rem;
  }
}

.blue {
  background-color: $blue;
}

.red {
  background-color: $red;
}

.yellow {
  background-color: $yellow;
}

.green {
  background-color: $green;
}

.purple {
  background-color: $purple;
  color: $carol;
}

.add-button {
  margin-top: 1.2rem;
}

.title{
    font-size: 28px;
}
.el-input {
    width: 98%;
    height: 52px;
}
:deep().el-input__wrapper {
    --el-input-inner-height: calc(var(--el-input-height) - 2px);
    display: inline-flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    padding: 1px 11px;
    background-color: #EDEDED;
    background-image: none;
    border-radius: 10px;
    transition: var(--el-transition-box-shadow);
    box-shadow: 0 0 0 0px var(--el-input-border-color,var(--el-border-color)) inset;
}
:deep().el-collapse-item__header {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    /* or 150% */

    display: flex;
    align-items: center;
    letter-spacing: 0.44px;

    color: #212121;
    margin-top: 0.4em;
    margin-bottom: 4px;
    border-top: 0;
    border-bottom: 0;
}
.collapse-title {
    flex: 1 0 90%;
    order: 1;
}
:deep().el-collapse {
    border-top: 0;
    border-bottom: 0;
}
:deep().el-collapse-item__content {
    padding-bottom:14px;
}
:deep().el-dialog{
    border-radius: 10px;
}
:deep().el-dialog__body{
    padding-top: 0;
    padding: 0;
}
.el-form-item {
    display: flex;
    --font-size: 18px;
    margin-bottom: 0;
}
input:focus{
    border: #367BF5 !important;
    outline: none;
}
:deep().el-dialog__header {
    padding: 0;
    padding-bottom: 0;
    margin-right: 0;
    word-break: break-all;
}
.schemeTime{
    color: #367BF5;
}
.scheme{
    height: 48px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    cursor: pointer;
    width: 98%;
    font-size: 15px;
}
.scheme:hover{
    background-color: #E5EFFF;
    transition: all 0.4s; 
}
</style>