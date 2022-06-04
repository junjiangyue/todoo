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
            visible:false,
            formLabelWidth:'140px',
            form:{
                name: '',
                describe:'',
                sub:'',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''}
        }
    },
     methods:{
        getDate(){
            var d = new Date();
            this.date =(d.getMonth()+1).toString()+"月"+d.getDate().toString()+"日";
            console.log(d.getDate());
            this.today=d.getDate();
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        add(){
            console.log(this.form.name);
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
                <el-input v-model="input4" placeholder="添加日程到今天"  @click="visible=true">
            <template #prefix>
            <el-icon :size="28"><CirclePlus /></el-icon>
            </template>
        </el-input>
            </div>
            <div v-for="(mission) in todolist" :key = "mission.missionId">
                <el-row class="mission" @click="godetail">
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
                        <input class="sub" v-model="form.sub" autocomplete="off" placeholder="    添加子任务"/>
                        </div>
                    </el-form-item>
                    <el-form-item>
                         <div class="line">
                            <img style="margin-left: 1em;" src="@/assets/icon/priority.png"/>
                            <span style="font-size:14px;padding:5px;">重要程度</span>
                            <el-select v-model="form.region" placeholder="不重要不紧急">
                            <el-option label="Zone No.1" value="shanghai" />
                            <el-option label="Zone No.2" value="beijing" />
                            <el-option label="Zone No.1" value="shanghai" />
                            <el-option label="Zone No.2" value="beijing" />
                            <el-option label="Zone No.2" value="beijing" />
                            </el-select>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="6" style="background-color:#EDEDED;border-radius: 0px 10px 0px 0px;border-left: solid 1px #E3E5E5;">
                    <div class="time">
                    <div><el-button class="thisday">{{date}}/今天</el-button></div>
                    <div><el-button class="thisday">{{date}}/明天</el-button></div>
                    <div><el-button class="thisday">没有日期</el-button></div>
                    <div>
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                            选择时间段<el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </span>
                            <template #dropdown>
                                <div class="block">
                                    <el-date-picker
                                    v-model="value1"
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
    height: 48px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    cursor: pointer;
    width: 98%;
}
.mission:hover{
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
    height: 2.5em;
    width: 37em;
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
    width: 20em;
}
.thisday{
    border-radius: 10px;
    margin-bottom: 1em;
}
</style>