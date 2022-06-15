<template>
    <div class="course-table">
        <el-scrollbar style="height: 100%">
            <div class="course-table-content">
                <div class="top" :style="{ width: courseWidth * weekTable.length + 'px' }">
                    <div v-for="item in weekTable" class="top-text" :style="{ width: courseWidth + 'px' }">{{ item }}
                    </div>
                </div>
                <div class="main" :style="{
                    width: courseWidth * weekTable.length + 35 + 'px',
                    height: courseHeight * timeTable.length + 'px'
                }">
                    <div class="period">
                        <div v-for="item in timeTable" class="left-text" :style="{ height: courseHeight + 'px' }">
                        
                        <text class="section">{{item.section }}</text>
                        <text class="startTime">{{item.startTime }}</text>
                        <text class="endTime">{{item.endTime }}</text>
                        </div>
                    </div>
                    <!--课表-->
                    <div v-for="(item, index) in usualCourses">
                        <div class="kcb-item"
                            @click="selectedCourseIndex = index; showUsualCourseDialog = true" :style="{
                                marginLeft: (item.day - 1) * courseWidth +14+ 'px',
                                
                                marginTop: (item.period - 1) * 100 + 'px',
                                width: courseWidth-20 + 'px',
                                height: item.length * 100 + 'px',
                                backgroundColor: colorArrays[index % 6]
                            }">
                            <div class="small-text">
                                <text class="name">{{item.name}}</text>
                                           <text class="teacher">{{item.teacher}}</text>
                                <div class="position">
                     
                               
                                  <text class="building">{{item.building}}</text>
                                  <text class="room">{{item.room}}</text>
                               
                                </div>
                            </div>

                        </div>
                    </div>
                   
                </div>
            </div>
        </el-scrollbar>

     
        <el-dialog title="课程信息" :visible.sync="showUsualCourseDialog" width="30%" center>
            <div class="dialog-content">
                <div v-if="typeof (selectedCourse) != 'undefined'">
                    <div>课程名称： {{ selectedCourse.name }}</div>
                    <div>上课时间： {{ selectedCourse.week + ' ' +
                            '第' + selectedCourse.period +
                            '-' + (Number(selectedCourse.period) + Number(selectedCourse.length) - 1) + '节'
                    }}</div>
                    <div>上课教师： {{ selectedCourse.teacher }}</div>
                    <div>上课地点： {{ selectedCourse.room }}</div>
                </div>
                <div v-else class="tip">本学期没有课哦</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showUsualCourseDialog = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
 
<script>
export default {
    name: "CourseTable",
    data() {
        return {
            showUsualCourseDialog: false,
            showPracticeCourseDialog: false,
            selectedCourseIndex: 0
        }
    },
    props: {
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
                { section:"第1节",startTime:"8:00",endTime:"8:45"},
                { section:"第2节",startTime:"8:50",endTime:"9:35"},
                { section:"第3节",startTime:"10:00",endTime:"10:45"},
                { section:"第4节",startTime:"10:50",endTime:"11:35"},
                { section:"午休",startTime:"11:35",endTime:"13:30"},
                { section:"第5节",startTime:"13:30",endTime:"14:15"},
                { section:"第6节",startTime:"14:20",endTime:"15:05"},
                { section:"第7节",startTime:"15:30",endTime:"16:15"},
                { section:"第8节",startTime:"16:20",endTime:"17:05"},
                { section:"晚餐",startTime:"17:50",endTime:"19:00"},
                { section:"第10节",startTime:"19:00",endTime:"19:45"},
                { section:"第11节",startTime:"19:50",endTime:"20:35"},
                { section:"第12节",startTime:"20:40",endTime:"21:25"},
                { section:"自习",startTime:"21:25",endTime:"24:00"},

            ]
        },
        colorArrays: {
            type: Array,
            default: () => ['#367BF5', '#F178B6', '#F3AA18', '#A5A6F6', '#B2DEE5','#069697']
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

    },
    mounted() {

    },
    methods: {

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
    margin-right:10px;
    background-color: #F5F5F5;
}
.section{
   
    margin-top:9px;
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
.startTime{
    margin-top: 14px;
}

.endTime{
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
    margin-right:10px;
}
.name{
position: absolute;
width:90%;
left:8px;
top: 5px;

}
.teacher{
position:absolute;
left:14px;
top:70px;
}
.position{
    position:absolute;
    left:-10px;
width: 160px;
display:flex;
flex-direction: row;
justify-content: space-around;
top:90px;
}

.building{

}
.room{

}

.period {
    background-color:#F5F5F5;
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
    color:#000000;
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
</style>