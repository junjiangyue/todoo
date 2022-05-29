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
            ]
        }
    },
     methods:{
        getDate(){

        }
    },
    mounted(){
        this.getDate()
    }
}
</script>

<template>
<div class="Listmode">
    <div class="daypicker">
        <el-row class="row">
            <el-col :span="4"><div>
                <img src="@/assets/icon/leftarrow.png"/>
            </div>
            </el-col>
            <el-col :span="3"><div>1</div>
            </el-col>
            <el-col :span="3"><div>2</div></el-col>
            <el-col :span="3"><div>3</div></el-col>
            <el-col :span="3"><div>4</div></el-col>
            <el-col :span="3"><div>5</div></el-col>
            <el-col :span="5"><div>
                <img src="@/assets/icon/rightarrow.png"/>
            </div></el-col>
        </el-row>
    </div>
    <div class="course">
        <div class="headline2"><img src="@/assets/icon/downarrow.png"/>今日课程</div>
        <div  v-for="(item) in courseData" :key="item.courseId">
        <el-row class="courseItem" >
            <el-col :span="4" class="courseTime">
                {{item.courseTime}}
            </el-col>
            <el-col :span="16" class="courseName">
                {{item.courseName}}
            </el-col>
        </el-row>
        </div>
    </div>
    <div class="todo">
        <div class="headline2"><img src="@/assets/icon/downarrow.png"/>我的日程</div>
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
    <div class="check">
        <div class="headline2"><img src="@/assets/icon/downarrow.png"/>每日打卡</div>
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
</div>
</template>

<style scoped>
.headline2{

    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    /* or 150% */

    display: flex;
    align-items: center;
    letter-spacing: 0.44px;

    color: #212121;
    margin-top: 1em;
    margin-bottom: 10px;

}
.courseItem{
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
    width: 95%;
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
    border-radius: var(--el-input-border-radius,var(--el-border-radius-base));
    transition: var(--el-transition-box-shadow);
    box-shadow: 0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;
}
</style>