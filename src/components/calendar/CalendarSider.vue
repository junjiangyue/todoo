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

const req = ''

const form = ref({
  name: '',
  describe: '',
  sub: '',
  priority: '',
  label: '',
  date1: '',
  date2: '',  
})

function add () {
  visible.value = false

  let d = form.date
  if (d == "2022/6/16") {
    let date = d
  } else {
    let date = d.getFullYear().toString()+'/'+(d.getMonth()+1).toString()+'/'+d.getDate().toString()
  }
  if (form.date1 != '') {
      let d = form.date1[0]
      let start = d.getFullYear().toString()+'/'+(d.getMonth()+1).toString()+'/'+d.getDate().toString()
      let e = form.date1[1]
      let end = e.getFullYear().toString()+'/'+(e.getMonth()+1).toString()+'/'+e.getDate().toString()
  } else {
    let start
    let end
  }
  axios({
      method: "post",
      url: "http://localhost:8080/mission/addMission",
      params: {
        scheme_title: form.name,
        scheme_description: form.describe,
        scheme_start_time: start,
        scheme_end_time: end,
        scheme_date: date,
        priority: form.priority,
        state: '0',
        tag_name: form.tag_name,
        user_id: 2,
        repetition: 0
      }
  }).then(res=>{
      // 从后端重新获取用户当天的任务列表
    axios({
      method:"get",
      url:"http://localhost:8080/mission/getList",
      params: {
        req: req
      }
    })
  })
}

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

  <el-dialog  v-model="visible">
      <el-form :model="form" >
      <el-row>
          <el-col :span="18">
              <el-form-item>
                  <input class="name" v-model="form.name" autocomplete="off" @keyup.enter="add"  placeholder="    准备做什么？"/>
              </el-form-item>
              <el-form-item>
                  <input  class="describe" v-model="form.describe" autocomplete="off" placeholder="    添加描述"/>
              </el-form-item>
              <!-- <el-form-item>
                  <div class="line">
                  <img style="margin-left: 1em;" src="@/assets/icon/sub.png"/>
                  <input class="sub" v-model="form.sub" autocomplete="off" placeholder="    添加子任务"/>
                  </div>
              </el-form-item> -->
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
                      <el-option style="color: #EA3D2F;" label="重要且紧急" value="1" />
                      <el-option style="color: #F3AA18;" label="重要不紧急" value="2" />
                      <el-option style="color: #2FA84F;" label="不重要紧急" value="3" />
                      <el-option label="不重要不紧急" value="4" />
                      </el-select>
                  </div>
              </el-form-item>
                <el-form-item>
                    <div class="line">
                      <img style="margin-left: 1em;" src="@/assets/icon/rep.svg"/>
                      <span style="font-size:14px;padding:5px;">设置重复</span>
                      <el-select v-model="form.priority" placeholder="不重复">
                      <el-option style="color: #EA3D2F;" label="每天重复" value="1" />
                      <el-option style="color: #F3AA18;" label="每周重复" value="2" />
                      <el-option style="color: #2FA84F;" label="每月重复" value="3" />
                      </el-select>
                  </div>
              </el-form-item>
          </el-col>
          <el-col :span="6" style="background-color:#fff;border-radius: 0px 10px 0px 0px;border-left: solid 1px #E3E5E5;">
              <div class="time">
                  <div style="margin-bottom:10px">
                  <el-date-picker
                          v-model="form.date"
                          type="date"
                          placeholder="今天">
                      </el-date-picker>
                  </div>
                  <div style="margin-bottom:10px">
                  <el-time-picker
                      v-model="form.time1"
                      :picker-options="{
                      selectableRange: '18:30:00 - 20:30:00'
                      }"
                      placeholder="开始时间">
                  </el-time-picker>
                  </div>
                  <div style="margin-bottom:10px">
                  <el-time-picker
                      v-model="form.time2"
                      :picker-options="{
                      selectableRange: '18:30:00 - 20:30:00'
                      }"
                      placeholder="结束时间">
                  </el-time-picker>
                  </div>
                  <div >
                      <el-dropdown trigger="click">
                          <span class="el-dropdown-link">
                          <el-button class="thisday">长期任务<el-icon class="el-icon--right"><arrow-down /></el-icon></el-button>
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
$red: #EA3D2F;
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

.courseItem{
    width: 100%;
    height: 3.2em;
    display: flex;
    align-items: center;
    font-size: 14px;

}
.scheme{
    height: 48px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    cursor: pointer;
    width: 98%;
    font-size: 15px;
    border-bottom: #e8e8e8 solid 0.5px;
}
.scheme:hover{
    background-color: #E5EFFF;
    transition: all 0.4s; 
}

.courseTime{
    height: 64px;
    background: #E6EFFF;
    border-radius: 10px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    padding-left: 1em;
}
.courseName{
    /* lightblue2 */
    height: 64px;
    background: #E6EFFF;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding-left: 1em;
}
:deep().el-checkbox.el-checkbox--large .el-checkbox__inner {
    width: 20px;
    height: 20px;
}
:deep().el-checkbox__inner::after {
    box-sizing: content-box;
    content: "";
    border: 2px solid var(--el-checkbox-checked-icon-color);
    border-left: 0;
    border-top: 0;
    height: 10px;
    left: 6px;
    position: absolute;
    top: 1px;
    transform: rotate(45deg) scaleY(0);
    width: 4px;
    transition: transform .15s ease-in 50ms;
    transform-origin: center;
}
.Listmode{
    background-color: #fff;
}
.daypicker{
    margin-top: 1em;
    margin-bottom: 1em;
    background-color: #EDEDED;
    border-radius: 30px;
    height: 2.5em;
    width: 28em;
    text-align: center;
}
.row{
    height: 2.5em;
    display: flex;
    align-items: center;
    color: #757575;
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
.today{
    background-color: #367BF5;
    color: #fff;
    border-radius: 10px;
    width: 1.6em;
    height: 2em;
    display: flex;
    align-items: center;
    margin-left: 0.3em;
    padding-left: 0.4em;
}
:deep().el-collapse-item__header {
    font-weight: 400;
    font-size: 18px;
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
.name{
    border: 0px;
    height: 3.8em;
    width: 100%;
    background-color: #EDEDED;
    border-radius: 10px 0px 0px 0px;
}
.describe{
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: solid 1px #E0E0E0;
    height: 2.8em;
    width: 100%;
}
.line{
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: solid 1px #E0E0E0;
    height: 2.5em;
    width: 37em;
    display: flex;
    align-items: center
}
.sub{
    border: 0;
    height: 2.3em;
    width: 100%;
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
.time{
    display: inline-grid;
    justify-content: center;
    align-items: center;
    justify-items: stretch;
    align-content: center;
    margin-top: 3em;
    margin-bottom: 2em;
    width: 100%;

}
:deep().el-scrollbar {
    overflow: hidden;
    position: relative;
    height: 5em;
}
:deep().el-range-editor.el-input__inner {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    margin-top: 3em;
    margin-bottom: 3em;
}
.thisday{
    border-radius: 10px;
    margin-bottom: 1em;
    width: 150px;
    background-color: #E0E0E0;
    color: rgb(129, 127, 127);
}
:deep().el-collapse-item__header{
    height: 1.7em;
}
.schemeTime{
    color: #367BF5;
}
:deep().el-date-editor {
    --el-date-editor-width: 150px;

}
.input{
    border: 0;
    BACKGROUND-COLOR: transparent;
}
</style>