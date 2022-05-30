<script>
export default {
     data(){
        return{
            courseData:[
                {
                    courseId:1,
                    courseTime:"8:00 - 9:35",
                    courseName:"用户交互技术"
                }
            ],
            todolist:[
                {
                    missionId:1,
                    missionTime:"10:00 - 11:35",
                    missionTitle:"写项目作业",
                    missionPriority:"极高",
                    missionState:1,
                    missionLabel:"学习"
                }
            ],
            checklist:[
                {
                    checkId:1,
                    checkTime:"10:00 - 11:35",
                    checkTitle:"写项目作业",
                    checkPriority:"极高",
                    checkState:1,
                    checkLabel:"学习"
                }
            ],
            today:'30',
            yesterday:'29',
            daybeforeyesterday:'28',
            tomorrow:'31',
            dayaftertomorrow:'1',
            date:'',
            activeNames:['1','2','3'],
        }
    },
     methods:{
        getDate(){
            var d = new Date();
            this.date =(d.getMonth()+1).toString()+"月"+d.getDate().toString()+"日";
            console.log(d.getDate());
            this.today=d.getDate();
        }
    },
    mounted(){
        this.getDate()
    }
}
</script>

<template>
<div class="Listmode">
        <el-row>
            <el-col :span="12">
            <div class="daypicker">
                <el-row class="row">
                    <el-col :span="4"><div>
                        <img src="@/assets/icon/leftarrow.png"/>
                    </div>
                    </el-col>
                    <el-col :span="3"><div>{{daybeforeyesterday}}</div>
                    </el-col>
                    <el-col :span="3"><div>{{yesterday}}</div></el-col>
                    <el-col :span="3"><div class="today">
                        <div>{{today}}</div></div>
                        </el-col>
                    <el-col :span="3"><div>{{tomorrow}}</div></el-col>
                    <el-col :span="3"><div>{{dayaftertomorrow}}</div></el-col>
                    <el-col :span="5"><div>
                        <img src="@/assets/icon/rightarrow.png"/>
                    </div></el-col>
                </el-row>
                </div>
            </el-col>
            <el-col :span="12" style="display:flex;align-items: center;">{{date}}，今天</el-col>
        </el-row>


    <div class="demo-collapse">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item  name="1" >
          <template #title >
          <div class="collapse-title">今日课程</div>
        </template>
        <div class="course">
            <div  v-for="(item) in courseData" :key="item.courseId">
            <el-row class="courseItem" >
                <el-col :span="4" class="courseTime">
                    {{item.courseTime}}
                </el-col>
                <el-col :span="19" class="courseName">
                    {{item.courseName}}
                </el-col>
            </el-row>
            </div>
        </div>
      </el-collapse-item>


      <el-collapse-item name="2">
           <template #title >
          <div class="collapse-title">我的日程</div>
        </template>
        <div class="todo">
            <div class="input">
                <el-input v-model="input4" class="w-50 m-2" placeholder="添加日程到今天">
            <template #prefix>
            <el-icon :size="28"><CirclePlus /></el-icon>
            </template>
        </el-input>
            </div>
            <div  v-for="(mission) in todolist" :key = "mission.missionId">
                <el-row class="mission">
                    <el-col :span="1">
                    <el-checkbox v-model = "complete" size="large"/>
                    </el-col>
                    <el-col :span="4">
                        {{mission.missionTime}}
                    </el-col>
                    <el-col :span="10">
                        {{mission.missionTitle}}
                    </el-col>
                    <el-col :span="4" class="label">
                        {{mission.missionLabel}}
                    </el-col>
                    <el-col :span="2">
                        ···
                    </el-col>
                </el-row>
            </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
          <template #title >
            <div class="collapse-title">每日打卡</div>
            </template>
        <div class="check">
                <div class="checklist" v-for="(check) in checklist" :key = "check.checkId">
                    <el-row class="mission">
                        <el-col :span="1">
                        <el-checkbox v-model = "complete" size="large"/>
                        </el-col>
                        <el-col :span="4">
                            {{check.checkTime}}
                        </el-col>
                        <el-col :span="10">
                            {{check.checkTitle}}
                        </el-col>
                        <el-col :span="4">
                            {{check.checkLabel}}
                        </el-col>
                        <el-col :span="2">
                            ···
                        </el-col>
                    </el-row>
                </div>
    </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</div>
</template>

<style scoped>

.courseItem{
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
}
.mission{
    height: 64px;
    display: flex;
    align-items: center;
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
    width: 22em;
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
    border-radius: 100px;
    width: 1.6em;
    height: 2em;
    display: flex;
    align-items: center;
    margin-left: 0.3em;
    padding-left: 0.4em;
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
</style>