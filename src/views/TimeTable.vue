<template>
    <div class="course-table">
        <n-scrollbar style="max-height: 470px">
            <div class="course-table-content">
                
                 <div class="lastWeek" @click="getLastWeek">
                 上周

                </div>
                <div class="top" :style="{ width: courseWidth * weekTable.length + 'px' }">
               
                
                    <div v-for="item in weekTable" class="top-text" :style="{ width: courseWidth + 'px' }">{{ item }}
                    </div>
                   
                </div>
                <div class="nextWeek" @click="getNextWeek">
下周
                </div>
                
                    <div class="dates">
                        <template v-for="(item, index) of months">
                            <span class="w-first" v-if="index === 0" :key="index" >
                            </span>
                            <template v-else>
                                <span :key="index" class="w-day-item" :class="{ 'w-isCurDate': item && item.isCurDate }" :style="{ width: courseWidth + 'px' }">
                                    {{ `${item && item.isCurDate ? item && item.showDate + '(今天)' || '' : item &&
                                            item.showDate || ''}`
                                    }}
                                </span>
                            </template>
                        </template>
                    </div>
             

                <div class="main" :style="{
                    width: courseWidth * weekTable.length + 35 + 'px',
                    height: courseHeight * timeTable.length + 'px'
                }">
                    <div class="period">
                        <div v-for="item in timeTable" class="left-text" :style="{ height: courseHeight + 'px' }">

                            <text class="section">{{ item.section }}</text>
                            <text class="startTime">{{ item.startTime }}</text>
                            <text class="endTime">{{ item.endTime }}</text>
                        </div>
                    </div>
                    <!--课表-->
                    <div v-for="(item, index) in usualCourses">
                        <div class="kcb-item" @click="selectedCourseIndex = index; showUsualCourseDialog = true" :style="{
                            marginLeft: (item.day - 1) * courseWidth + 14 + 'px',
                        
                            marginTop: (item.period - 1) * 100 + 'px',
                            width: courseWidth - 20 + 'px',
                            height: item.length * 100 + 'px',
                            backgroundColor: colorArrays[index % 6]
                        }">
                            <div class="small-text">
                                <text class="course-name">{{ item.name }}</text>
                                <text class="teacher">{{ item.teacher }}</text>
                                <div class="position">


                                    <text class="building">{{ item.building }}</text>
                                    <text class="room">{{ item.room }}</text>

                                </div>
                            </div>

                        </div>
                    </div>
                    <!--空课程-->
                    <div v-for="(item, index) in emptyCourse">
                        <div class="empty-kcb-item" @click="addTodo" :style="{
                            marginLeft: (item.day - 1) * courseWidth + 14 + 'px',
                            marginTop: (item.period - 1) * 100 + 'px',
                            width: courseWidth - 20 + 'px',
                            height: item.length * 100 + 'px',
                            backgroundColor: '#FFFFFF'
                        }">
                            <div class="small-text">

                            </div>

                        </div>
                    </div>

                </div>
                <el-dialog v-model="visible" :before-close="handleClose">
                    <el-form :model="form">
                        <el-row>
                            <el-col :span="18">
                                <el-form-item>
                                    <input class="name" v-model="form.name" autocomplete="off" @keyup.enter="add"
                                        placeholder="    准备做什么？" />
                                </el-form-item>
                                <el-form-item>
                                    <input class="describe" v-model="form.describe" autocomplete="off"
                                        placeholder="    添加描述" />
                                </el-form-item>
                                <el-form-item>
                                    <div class="line">
                                        <img style="margin-left: 1em;" src="@/assets/icon/sub.png" />
                                        <input class="sub" v-model="form.sub" autocomplete="off"
                                            placeholder="    添加子任务" />
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                    <div class="line">
                                        <img style="margin-left: 1em;" src="@/assets/icon/label.png" />
                                        <span style="font-size:14px;padding:5px;">标签</span>
                                        <el-radio-group v-model="form.label" size="default">
                                            <el-radio-button label="学习"></el-radio-button>
                                            <el-radio-button label="生活"></el-radio-button>
                                            <el-radio-button label="工作"></el-radio-button>
                                            <el-radio-button label="休闲"></el-radio-button>
                                        </el-radio-group>
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                    <div class="line">
                                        <img style="margin-left: 1em;" src="@/assets/icon/priority.png" />
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
                            <el-col :span="6"
                                style="background-color:#EDEDED;border-radius: 0px 10px 0px 0px;border-left: solid 1px #E3E5E5;">
                                <div class="time">
                                    <div>
                                        <el-button class="thisday" autofocus="true" @click="form.date1 = date">{{ date }}/今天
                                        </el-button>
                                    </div>
                                    <div>
                                        <el-button class="thisday" @click="form.date1 = date">{{ date }}/明天</el-button>
                                    </div>
                                    <div>
                                        <el-button class="thisday">没有日期</el-button>
                                    </div>
                                    <div>
                                        <el-dropdown trigger="click">
                                            <span class="el-dropdown-link">
                                                选择时间段<el-icon class="el-icon--right">
                                                    <arrow-down />
                                                </el-icon>
                                            </span>
                                            <template #dropdown>
                                                <div class="block">
                                                    <el-date-picker v-model="form.date1" type="datetimerange"
                                                        range-separator="To" start-placeholder="开始时间"
                                                        end-placeholder="结束时间" />
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
                            <el-button style="border-radius: 10px;background-color: #367BF5;color: #fff;" @click="add">
                                确定</el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>

        </n-scrollbar>

    </div>
</template>
 
<script>
import { NScrollbar } from 'naive-ui';

import MyTools from "../utils/MyTools";

export default {
    name: "CourseTable",
    components: {
        NScrollbar
    },
    data() {
        return {
             weeks: [
        '时段', '周一', '周二', '周三', '周四', '周五', '周六', '周日',
      ],
      todayDate: '',
      months: [],
      curDate: "",
      nowDate: new Date(),
            fistDay: "",
            currentDate: '',
            currentDay: '',
            currentWeek: '',
            visible: false,
            showUsualCourseDialog: false,
            showPracticeCourseDialog: false,
            selectedCourseIndex: 0,
            formLabelWidth: '140px',
            form: {
                name: '',
                describe: '',
                sub: '',
                priority: '',
                label: '',
                date1: '',
                date2: '',
            },
            emptyCourse: [
                {
                    day: "1",
                    length: "1",

                    period: "5",

                },
                {
                    day: "1",
                    length: "1",

                    period: "8",

                },
                {
                    day: "1",
                    length: "1",

                    period: "9",

                },
                {
                    day: "1",
                    length: "1",

                    period: "10",

                },
                {
                    day: "1",
                    length: "1",

                    period: "13",

                },
                {
                    day: "1",
                    length: "1",

                    period: "14",

                },
                {
                    day: "2",
                    length: "1",

                    period: "1",

                },
                {
                    day: "2",
                    length: "1",

                    period: "2",

                },
                {
                    day: "2",
                    length: "1",

                    period: "5",
                },
                {
                    day: "2",
                    length: "1",
                    period: "6",

                },
                {
                    day: "2",
                    length: "1",

                    period: "7",

                },
                {
                    day: "2",
                    length: "1",
                    name: "",
                    period: "8",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "2",
                    length: "1",
                    name: "",
                    period: "9",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "2",
                    length: "1",
                    name: "",
                    period: "10",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "2",
                    length: "1",
                    name: "",
                    period: "11",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "2",
                    length: "1",
                    name: "",
                    period: "12",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "2",
                    length: "1",
                    name: "",
                    period: "13",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "2",
                    length: "1",
                    name: "",
                    period: "14",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "3",
                    length: "1",
                    name: "",
                    period: "3",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "3",
                    length: "1",
                    name: "",
                    period: "4",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "3",
                    length: "1",
                    name: "",
                    period: "5",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "3",
                    length: "1",
                    name: "",
                    period: "10",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "3",
                    length: "1",
                    name: "",
                    period: "11",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "3",
                    length: "1",
                    name: "",
                    period: "12",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "3",
                    length: "1",
                    name: "",
                    period: "13",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "3",
                    length: "1",
                    name: "",
                    period: "14",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "4",
                    length: "1",
                    name: "",
                    period: "3",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "4",
                    length: "1",
                    name: "",
                    period: "4",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "4",
                    length: "1",
                    name: "",
                    period: "5",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "4",
                    length: "1",
                    name: "",
                    period: "6",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "4",
                    length: "1",
                    name: "",
                    period: "7",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "4",
                    length: "1",
                    name: "",
                    period: "10",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "4",
                    length: "1",
                    name: "",
                    period: "14",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "5",
                    length: "1",
                    name: "",
                    period: "1",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "5",
                    length: "1",
                    name: "",
                    period: "5",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "5",
                    length: "1",
                    name: "",
                    period: "6",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "5",
                    length: "1",
                    name: "",
                    period: "7",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "5",
                    length: "1",
                    name: "",
                    period: "8",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "5",
                    length: "1",
                    name: "",
                    period: "9",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "5",
                    length: "1",
                    name: "",
                    period: "10",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "5",
                    length: "1",
                    name: "",
                    period: "11",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "5",
                    length: "1",
                    name: "",
                    period: "12",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "5",
                    length: "1",
                    name: "",
                    period: "13",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "5",
                    length: "1",
                    name: "",
                    period: "14",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "6",
                    length: "1",
                    name: "",
                    period: "1",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "6",
                    length: "1",
                    name: "",
                    period: "2",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "6",
                    length: "1",
                    name: "",
                    period: "3",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "6",
                    length: "1",
                    name: "",
                    period: "4",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "6",
                    length: "1",
                    name: "",
                    period: "5",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "6",
                    length: "1",
                    name: "",
                    period: "6",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "6",
                    length: "1",
                    name: "",
                    period: "7",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "6",
                    length: "1",
                    name: "",
                    period: "8",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "6",
                    length: "1",
                    name: "",
                    period: "9",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "6",
                    length: "1",
                    name: "",
                    period: "10",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "6",
                    length: "1",
                    name: "",
                    period: "11",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "6",
                    length: "1",
                    name: "",
                    period: "12",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "6",
                    length: "1",
                    name: "",
                    period: "13",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "6",
                    length: "1",
                    name: "",
                    period: "14",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "7",
                    length: "1",
                    name: "",
                    period: "1",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "7",
                    length: "1",
                    name: "",
                    period: "2",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "7",
                    length: "1",
                    name: "",
                    period: "3",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "7",
                    length: "1",
                    name: "",
                    period: "4",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "7",
                    length: "1",
                    name: "",
                    period: "5",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "7",
                    length: "1",
                    name: "",
                    period: "6",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                }, {
                    day: "7",
                    length: "1",
                    name: "",
                    period: "7",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                }, {
                    day: "7",
                    length: "1",
                    name: "",
                    period: "8",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                }, {
                    day: "7",
                    length: "1",
                    name: "",
                    period: "9",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                }, {
                    day: "7",
                    length: "1",
                    name: "",
                    period: "10",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                }, {
                    day: "7",
                    length: "1",
                    name: "",
                    period: "11",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                }, {
                    day: "7",
                    length: "1",
                    name: "",
                    period: "12",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                }, {
                    day: "7",
                    length: "1",
                    name: "",
                    period: "13",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                }, {
                    day: "7",
                    length: "1",
                    name: "",
                    period: "14",
                    building: "",
                    room: "",
                    teacher: "",
                    type: "一般课",
                    week: "1-17周",
                }
            ]
        }
    },
    props: {
        cardStatus: {
      type: Object,
      default: () => {
        return {
          1: {
            title: '已过期',
            color: '#9CADADB7'
          },
          2: {
            title: '进行中',
            color: '#FF6200'
          },
          3: {
            title: '未开始',
            color: '#3291F8'
          },
        }
      }
    },
    width: {
            type: Number,
            default: 1160
        },
        height: {
            type: Number,
            default: 635
        },
        usualCourses: {
            type: Array,
            default: () => [
                {
                    day: "1",
                    length: "2",
                    name: "普通物理（上）",
                    period: "1",
                    building: "复楼",
                    room: "213",
                    teacher: "伊正圣",
                    type: "一般课",
                    week: "1-17周",

                },
                {
                    day: "1",
                    length: "2",
                    name: "习近平新时代中国特色社会主义制度思想",
                    period: "3",
                    building: "复楼",
                    room: "202",
                    teacher: "祝华",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "1",
                    length: "2",
                    name: "高数",
                    period: "6",
                    building: "安楼",
                    room: "210",
                    teacher: "张银萍",
                    type: "一般课",
                    week: "1-17周",

                },
                {
                    day: "1",
                    length: "2",
                    name: "人工智能导论",
                    period: "11",
                    building: "广楼",
                    room: "209",
                    teacher: "张三",
                    type: "一般课",
                    week: "1-17周",

                },
                {
                    day: "2",
                    length: "2",
                    name: "高数",
                    period: "3",
                    building: "安楼",
                    room: "210",
                    teacher: "张银萍",
                    type: "一般课",
                    week: "1-17周",

                },
                {
                    day: "3",
                    length: "2",
                    name: "线性代数",
                    period: "1",
                    building: "安楼",
                    room: "204",
                    teacher: "李四",
                    type: "一般课",
                    week: "1-17周",

                },
                {
                    day: "3",
                    length: "2",
                    name: "习近平新时代中国特色社会主义",
                    period: "6",
                    building: "广楼",
                    room: "207",
                    teacher: "王二",
                    type: "一般课",
                    week: "1-17周",

                },

                {
                    day: "3",
                    length: "2",
                    name: "旅游地质学",
                    period: "8",
                    building: "安楼",
                    room: "209",
                    teacher: "翁达",
                    type: "一般课",
                    week: "1-17周",

                },

                {
                    day: "4",
                    length: "3",
                    name: "概率论",
                    period: "11",
                    building: "复楼",
                    room: "204",
                    teacher: "牛思丽",
                    type: "一般课",
                    week: "1-17周",

                },
                {
                    day: "4",
                    length: "2",
                    name: "操作系统",
                    period: "1",
                    building: "济事楼",
                    room: "403",
                    teacher: "张慧娟",
                    type: "一般课",
                    week: "1-17周",
                },
                {
                    day: "4",
                    length: "2",
                    name: "中国传统插花艺术",
                    period: "8",
                    building: "复楼",
                    room: "204",
                    teacher: "牛思丽",
                    type: "一般课",
                    week: "1-17周",

                },
                {
                    day: "5",
                    length: "3",
                    name: "Java EE",
                    period: "2",
                    building: "济事楼",
                    room: "404",
                    teacher: "Fanfan",
                    type: "一般课",
                    week: "1-17周",

                },





            ]
        },
        practiceCourses: {
            type: Array,
            default: () => []
        },
        weekTable: {
            type: Array,
            default: () => ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        timeTable: {
            type: Array,
            default: () => [
                { section: "第1节", startTime: "8:00", endTime: "8:45" },
                { section: "第2节", startTime: "8:50", endTime: "9:35" },
                { section: "第3节", startTime: "10:00", endTime: "10:45" },
                { section: "第4节", startTime: "10:50", endTime: "11:35" },
                { section: "午休", startTime: "11:35", endTime: "13:30" },
                { section: "第5节", startTime: "13:30", endTime: "14:15" },
                { section: "第6节", startTime: "14:20", endTime: "15:05" },
                { section: "第7节", startTime: "15:30", endTime: "16:15" },
                { section: "第8节", startTime: "16:20", endTime: "17:05" },
                { section: "晚餐", startTime: "17:50", endTime: "19:00" },
                { section: "第10节", startTime: "19:00", endTime: "19:45" },
                { section: "第11节", startTime: "19:50", endTime: "20:35" },
                { section: "第12节", startTime: "20:40", endTime: "21:25" },
                { section: "自习", startTime: "21:25", endTime: "24:00" },

            ]
        },
        colorArrays: {
            type: Array,
            default: () => ['#367BF5', '#F178B6', '#F3AA18', '#A5A6F6', '#B2DEE5', '#069697']
        }
    },
    computed: {
        courseWidth() {
            return Math.max((this.width - 35) / this.weekTable.length, 50)
        },
        courseHeight() {
            return 100
        },
        selectedCourse() {
            return this.usualCourses[this.selectedCourseIndex];
        }
    },
    created() {
        this.getWeekDate()
        
    },
    mounted(){
        
    this.getCurWeek()
    },
    methods: {
        addTodo() {
            this.visible = true;
        },
        add() {
            console.log("11111")
        },
        getWeekDate() {
            //获取当前时间
            let datetime = new Date();
            var year = datetime.getFullYear();
            var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
            var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
            console.log("now:", datetime)
            return `${year}-${month}-${date}`

        },
        /**
     * 获取 时间
     * @param time
     */
    getWeek(time) {
      const week = time.getDay() - 1;
      time = this.addDate(time, week * -1);
      this.curDate = new Date(time);
      for (let i = 0; i < 7; i++) {
        const {year, month, day} = MyTools.formatDate(i === 0 ? time : this.addDate(time, 1))
        this.months.push({
          date: `${year}-${month}-${day}`,
          showDate: `${month}-${day}`,
          timestamp: new Date(`${year}-${month}-${day}`).getTime()
        })
      }
      delete this.months[0];
      this.todayDate = `${this.months[1].date} ~ ${this.months[this.months.length - 1].date}`
    },
    /**
     * 处理日期
     * @param date
     * @param n
     * @returns {*}
     */
    addDate(date, n) {
      date.setDate(date.getDate() + n);
      return date;
    },
    /**
     * 上周
     */
    getLastWeek() {
      const date = this.addDate(this.curDate, -7),
          {year, month, day} = MyTools.formatDate(date),
          dateObj = {
            date: `${year}-${month}-${day}`,
            timestamp: new Date(`${year}-${month}-${day}`).getTime()
          }
      this.dealDate(date)
      this.$emit("changeWeek", dateObj)
    },
    /**
     * 本周
     */
    getCurWeek() {
      const {year, month, day} = MyTools.formatDate(new Date()),
          dateObj = {
            date: `${year}-${month}-${day}`,
            timestamp: new Date(`${year}-${month}-${day}`).getTime()
          }
      this.dealDate(new Date())
      this.$emit("changeWeek", dateObj)
    },
    /**
     * 下周
     */
    getNextWeek() {
      const date = this.addDate(this.curDate, 7),
          {year, month, day} = MyTools.formatDate(date),
          dateObj = {
            date: `${year}-${month}-${day}`,
            timestamp: new Date(`${year}-${month}-${day}`).getTime()
          }
      this.dealDate(date);
      this.$emit("changeWeek", dateObj)
    },
    /**
     * 显示当天日期状态
     * @param date
     */
    dealDate(date) {
      this.months = ['']
      this.getWeek(date);
      const curDate = MyTools.getCurDay()
      this.months.forEach(item => {
        item.isCurDate = item.date === curDate
      })
    },
    /**
     * 点击查看详情
     * @param row
     */
    handleDetail(row) {
      this.$emit("handleDetail", row)
    }
}
}
</script>
 
<style scoped>
.course-table {
    border-radius: 12px;
}

.top {
    display: flex;
    flex-direction: row;
    padding-left: 100px;
    background-color: #FFFFFF;
    color: #000000;
    margin-top: 10px;
    margin-bottom: 10px;
}

.top-text {
    width: 100px;
    height: 56px;
    font-family: 'Abyssinica SIL';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    justify-content: center;
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
    background-color: #F5F5F5;
}

.section {

    margin-top: 9px;
    font-family: 'Abyssinica SIL';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */

    display: flex;
    align-items: center;
    letter-spacing: 0.44px;

    color: #000000;


}

.startTime {
    margin-top: 14px;
}

.endTime {
    margin-top: 10px;
}

.main {
    height: 1200px;
    width: 1800px;
    display: flex;
    position: relative;
}



.kcb-item {
    position: absolute;
    height: 100px;
    justify-content: center;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-right: 10px;
}

.empty-kcb-item {
    position: absolute;
    height: 100px;
    justify-content: center;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-right: 10px;
}

.course-name {
    position: absolute;
    width: 90%;
    left: 8px;
    top: 5px;

}

.teacher {
    position: absolute;
    left: 14px;
    top: 70px;
}

.position {
    position: absolute;
    left: -10px;
    width: 160px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    top: 90px;
}

.name {
    border: 0px;
    height: 3.8em;
    width: 100%;
    background-color: #EDEDED;
    border-radius: 10px 0px 0px 0px;
}

.describe {
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: solid 1px #E0E0E0;
    height: 2.8em;
    width: 100%;
}

.line {
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: solid 1px #E0E0E0;
    height: 2.5em;
    width: 37em;
    display: flex;
    align-items: center
}

.sub {
    border: 0;
    height: 2.3em;
    width: 100%;
}

.time {
    display: inline-grid;
    justify-content: center;
    align-items: center;
    justify-items: stretch;
    align-content: center;
    margin-top: 3em;
    margin-bottom: 2em;
    width: 100%;

}

.thisday {
    border-radius: 10px;
    margin-bottom: 1em;
}

.schemeTime {
    color: #367BF5;
}

.building {}

.room {}

.period {
    background-color: #F5F5F5;
    color: #fff;
}

.small-text {
    margin-left: 10px;
    margin-right: 10px;
    font-family: 'Abyssinica SIL';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #fff;
    text-align: center;
}

.left-text {
    width: 96px;
    height: 100px;
    font-family: 'Abyssinica SIL';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    justify-content: center;
    flex-direction: column;
    display: flex;
    align-items: center;
    color: #000000;
}

.btn_practice_course {
    position: absolute;
    z-index: 110;
    top: 35px;
    right: 0px;
    width: 100px;
    height: 100px;
    line-height: 24px;
    background: #31c27c;
    border-radius: 50px;
    font-size: 24px;
    text-align: center;
    color: #fff;
    opacity: 0.7;
    padding: 12px;
}

.el-dialog .dialog-content {
    color: #000;
    line-height: 60px;

}

.el-dialog .dialog-content .tip {
    color: #000;
    line-height: 60px;
    text-align: center;
}

 
.course-week {
  width: 100%;
  border: 1px solid #ddd;
  padding: 1%;
  box-sizing: border-box;
}
.dates{
    display: flex;
    flex-direction: row;
    margin-left: 90px;
    margin-top:-30px;
    margin-bottom:20px;

}
w
.week-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 1%;
  box-sizing: border-box;
 
}
 
.week-top .week-btn-wrap {
  width: 200px;
  display: flex;
  justify-content: space-around;
  color: #409EFF;
}
 
.week-top .week-btn-wrap span {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
}
 
.week-top .w-today-date {
  font-weight: bold;
  font-size: 16px;
}
 
.week-top .w-choose-status {
  display: flex;
  justify-content: flex-end;
  width: 200px;
}
 
.w-first{
     color: #000;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left:10px;
  margin-right:1px;
}
 .w-day-item {
  color: #000;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  

}
 
.w-isCurDate {
  color: #FF2525 !important;
}
 
.lastWeek{
    position:absolute;
    color:#367BF5;
    left:60px;
    top:30px;

}
.nextWeek{
    position:absolute;
    right:5px;
    top:30px;
color:#367BF5;
}
</style>