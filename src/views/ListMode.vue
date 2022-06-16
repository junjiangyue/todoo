<script>
import DatePicker from '@/components/public/DatePicker.vue';
import { NScrollbar } from 'naive-ui';
export default {
     data(){
        return{
            courseData:[
                {
                    courseId:1,
                    courseTime:"8:00 - 9:35",
                    courseName:"操作系统"
                },
                {
                    courseId:2,
                    courseTime:"15:30 - 17:05",
                    courseName:"中国传统插花艺术"
                },
                {
                    courseId:3,
                    courseTime:"19:00 - 21:25",
                    courseName:"概率论"
                }
            ],
            mission:"",
            todolist:[
            ],
            checklist:[],
            today:'30',
            yesterday:'16',
            daybeforeyesterday:'15',
            tomorrow:'18',
            dayaftertomorrow:'19',
            date:'',
            tomorrowdate:'',
            req:'',
            activeNames:['1','2','3'],
            visible:false,
            formLabelWidth:'140px',
            form:{
                name: '',
                describe:'',
                sub:'',
                priority: '',
                label:'',
                date1: '',
                date2: '',
                date:'2022/6/16',
                time1:'',
                time2:''
                }
        }
    },
    components: {
        NScrollbar
    },
     methods:{
        getDate(){
            var d = new Date();
            this.req = d.getFullYear().toString()+'/'+(d.getMonth()+1).toString()+'/'+d.getDate().toString()
            console.log(d)
            this.date =(d.getMonth()+1).toString()+"月"+d.getDate().toString()+"日";
            this.tomorrowdate =(d.getMonth()+1).toString()+"月"+(d.getDate()+1).toString()+"日";
            console.log(d.getDate());
            this.today=d.getDate();
            this.yesterday = this.today-1
            this.daybeforeyesterday = this.today-2
            this.tomorrow = this.today + 1
            this.dayaftertomorrow = this.today+2

        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        add(){
            console.log(this.form);
            this.visible = false;
            console.log(this.form.date1)
            console.log(this.form.date1[0])
            console.log(this.form.date1[1])
            var d=this.form.date
            if(d=="2022/6/16")var date = d
            else var date = d.getFullYear().toString()+'/'+(d.getMonth()+1).toString()+'/'+d.getDate().toString()
            if(this.form.date1!='')
            {
                var d=this.form.date1[0]
                var start = d.getFullYear().toString()+'/'+(d.getMonth()+1).toString()+'/'+d.getDate().toString()
                var e=this.form.date1[1]
                var end = e.getFullYear().toString()+'/'+(e.getMonth()+1).toString()+'/'+e.getDate().toString()
            }else{
                var start
                var end
            }
            this.$axios({
                method:"post",
                url:"http://localhost:8080/mission/addMission",
                params:{
                    scheme_title:this.form.name,
                    scheme_description:this.form.describe,
                    scheme_start_time:start,
                    scheme_end_time:end,
                    scheme_date:date,
                    priority:this.form.priority,
                    state:'0',
                    tag_name:this.form.tag_name,
                    user_id:2,
                    repetition:0
                }
            }).then(res=>{
                console.log(res)
                // 从后端重新获取用户当天的任务列表
            this.$axios({
                method:"get",
                url:"http://localhost:8080/mission/getList",
                params:{
                    req:this.req
                }
            }).then(res=>{
                if(res.data.status==-1){
                    
                }
                else{
                for(var i=0;i<res.data.length;i++){
                    if(res.data[i].state=="1"){
                        res.data.splice(i,1)
                        i=i-1
                        console.log("删除",res)
                    }
                }
                
                for(var i=0;i<res.data.length;i++){
                    console.log(res.data[i].state)
                    
                    if(res.data[i].schemeStartTime == null){
                        res.data[i].schemeStartTime='今天'
                    }
                    else{
                        var length = res.data[i].schemeStartTime.length
                       if(res.data[i].schemeEndTime!=null)
                                res.data[i].schemeStartTime = res.data[i].schemeStartTime.substring(length-8,length-3)+'-'+res.data[i].schemeEndTime.substring(length-8,length-3)
                            else{
                                res.data[i].schemeStartTime = res.data[i].schemeStartTime.substring(length-8,length-3)
                            }
                    }
                }
                this.todolist = res.data
                this.$forceUpdate()
                }
            })
            })

            
        },
        godetail(missionId){
            this.$emit("mission",missionId);
            //console.log(schemeId)
        },
        getscheme(){
            this.$axios({
                method:"get",
                url:"http://localhost:8080/mission/getList",
                params:{
                    req:this.req
                }
            }).then(res=>{
                if(res.data.status==-1){
                    
                }
                else{
                for(var i=0;i<res.data.length;i++){
                    if(res.data[i].state=="1"){
                        res.data.splice(i,1)
                        i=i-1
                        console.log("删除",res)
                    }
                }
                
                for(var i=0;i<res.data.length;i++){
                    console.log(res.data[i].state)
                    
                    if(res.data[i].schemeStartTime == null){
                        res.data[i].schemeStartTime='今天'
                    }
                    else{
                        var length = res.data[i].schemeStartTime.length
                        if(res.data[i].schemeEndTime!=null)
                                res.data[i].schemeStartTime = res.data[i].schemeStartTime.substring(length-8,length-3)+'-'+res.data[i].schemeEndTime.substring(length-8,length-3)
                            else{
                                res.data[i].schemeStartTime = res.data[i].schemeStartTime.substring(length-8,length-3)
                            }
                    }
                }
                this.todolist = res.data
                }
            })
            this.$axios({
                method:"get",
                url:"http://localhost:8080/mission/getCheckList",
                params:{
                    req:this.req
                }
            }).then(res=>{
                console.log(res)
                if(res.data.status==-1){
                    
                }
                else{
                    this.checklist = res.data
                }
            })

        },
        gotoToday(){
            this.today = this.today
        },
        gotoYesterday(){
            this.today = this.yesterday
        },
        getChildMsg(day){
            //console.log(day)
            day = day.substring(0,4)+'/'+day.substring(5,6) +'/'+ day.substring(7,9)
            console.log(day)
            this.$axios({
                method:"get",
                url:"http://localhost:8080/mission/getList",
                params:{
                    req:day
                }
            }).then(res=>{
                if(res.data.status==-1){
                }
                else{
                for(var i=0;i<res.data.length;i++){
                    if(res.data[i].state=="1"){
                        res.data.splice(i,1)
                        i=i-1
                        console.log("删除",res)
                    }
                }
                console.log(res)
                for(var i=0;i<res.data.length;i++){

                    if(res.data[i].schemeStartTime == null){
                        if(day==this.req) res.data[i].schemeStartTime='今天'
                        else res.data[i].schemeStartTime=day
                    }
                    else{
                        var length = res.data[i].schemeStartTime.length
                        if(res.data[i].schemeEndTime!=null)
                                res.data[i].schemeStartTime = res.data[i].schemeStartTime.substring(length-8,length-3)+'-'+res.data[i].schemeEndTime.substring(length-8,length-3)
                            else{
                                res.data[i].schemeStartTime = res.data[i].schemeStartTime.substring(length-8,length-3)
                            }
                    }
                    
                }
                this.todolist = res.data
                }
            })
        },
        changeTitle(id,changedtitle){
            this.$axios({
                method:"get",
                url:"http://localhost:8080/mission/changeMissionTitle",
                params:{
                    title:changedtitle,
                    missionID:id
                }
            }).then(res=>{
                console.log(res)
                this.$forceUpdate();
                })
        },
        changeState(state,id){
            console.log("状态",state)
            if(state==true){
                state='0'
            }
            if(state==false){
                state='1'
            }
            this.$axios({
                method:"get",
                url:"http://localhost:8080/mission/doneMission",
                params:{
                    state:state,
                    missionID:id
                }
            }).then(res=>{
                console.log(res)
                for(var i=0;i<this.todolist.length;i++){
                    if(this.todolist[i].schemeId==id){
                        this.todolist.splice(i,1)
                            this.$forceUpdate();
                    }
                }
                
            })
        },
        check(state){
            if(state==1||state==false){
                return true
            }else{
                return false
            }
        },
        deleteMission(id){
            this.$axios({
                method:"get",
                url:"http://localhost:8080/mission/deleteMission",
                params:{
                    missionID:id
                }
            }).then(res=>{
                console.log(res)
               this.$axios({
                method:"get",
                url:"http://localhost:8080/mission/getList",
                params:{
                    req:this.req
                }
            }).then(res=>{
                if(res.data.status==-1){
                    
                }
                else{
                for(var i=0;i<res.data.length;i++){
                    if(res.data[i].state=="1"){
                        res.data.splice(i,1)
                        i=i-1
                        console.log("删除",res)
                    }
                }
                
                for(var i=0;i<res.data.length;i++){
                    console.log(res.data[i].state)
                    
                    if(res.data[i].schemeStartTime == null){
                        res.data[i].schemeStartTime='今天'
                    }
                    else{
                        var length = res.data[i].schemeStartTime.length
                        if(res.data[i].schemeEndTime!=null)
                                res.data[i].schemeStartTime = res.data[i].schemeStartTime.substring(length-8,length-3)+'-'+res.data[i].schemeEndTime.substring(length-8,length-3)
                            else{
                                res.data[i].schemeStartTime = res.data[i].schemeStartTime.substring(length-8,length-3)
                            }
                    }
                }
                this.todolist = res.data
                 this.$forceUpdate();
                }
            })
                
            })
        },
        changeDate(id){
            this.$axios({
                method:"get",
                url:"http://localhost:8080/mission/changeMissionTime",
                params:{
                    scheme_date:'2022/6/17',
                    missionID:id
                }
            }).then(res=>{
                console.log(res)
                for(var i=0;i<this.todolist.length;i++){
                    if(this.todolist[i].schemeId==id){
                        this.todolist=this.todolist.splice(i,1)
                    }
                }
                this.$forceUpdate();
                })
        },
        changepriority(id){
            this.$axios({
                method:"get",
                url:"http://localhost:8080/mission/changeMissionPriority",
                params:{
                    priority:'1',
                    missionID:id
                }
            }).then(res=>{
                console.log(res)
                for(var i=0;i<this.todolist.length;i++){
                    if(this.todolist[i].schemeId==id){
                        this.todolist[i].priority='1'
                    }
                }
                this.$forceUpdate();
                })
        },
        changetag(id){
            this.$axios({
                method:"get",
                url:"http://localhost:8080/mission/changeMissionTag",
                params:{
                    tag:'生活',
                    missionID:id
                }
            }).then(res=>{
                console.log(res)
                for(var i=0;i<this.todolist.length;i++){
                    if(this.todolist[i].schemeId==id){
                        this.todolist[i].tag_name='生活'
                    }
                }
                this.$forceUpdate();
                })
        }
    },
    mounted(){
        this.getDate()
        this.getscheme()
    },
    components:{
        DatePicker
    }
}
</script>

<template>
<div class="Listmode">
<n-scrollbar style="max-height: 570px">
        <el-row>
            <el-col :span="24">
            <div class="daypicker">
                <DatePicker @day="getChildMsg" ></DatePicker>
                </div>
            </el-col>
        </el-row>


    <div class="demo-collapse">
    <el-collapse v-model="activeNames" >
      <el-collapse-item  name="1" >
          <template #title >
          <div class="collapse-title">今日课程</div>
        </template>
        <div class="course" style="margin-bottom:1em">
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
                <el-input v-model="mission" placeholder="添加日程到今天"  @click="visible=true">
            <template #prefix>
            <el-icon :size="28"><CirclePlus /></el-icon>
            </template>
        </el-input>
            </div>
            <div v-for="(scheme) in todolist" :key = "scheme.schemeId">
                <el-row class="scheme" @click="godetail(scheme.schemeId)">
                    <el-col :span="1">
                    <el-checkbox v-model = "scheme.state" @click="changeState(scheme.state,scheme.schemeId)" size="large"/>
                    </el-col>
                    <el-col :span="4" class="schemeTime">
                        {{scheme.schemeStartTime}}
                    </el-col>
                    <el-col :span="10">
                        <input class="input" v-model="scheme.schemeTitle" @change="changeTitle(scheme.schemeId,scheme.schemeTitle)"/>
                        <el-tooltip content="重要且紧急" placement="right" effect="light" class="important"><el-icon v-if="scheme.priority==1" color="#EA3D2F"><Flag /></el-icon></el-tooltip>
                        <el-tooltip content="重要不紧急" placement="right" effect="light" class="important"><el-icon v-if="scheme.priority==2" color="#F3AA18"><Flag /></el-icon></el-tooltip>
                        <el-tooltip content="不重要紧急" placement="right" effect="light" class="important"><el-icon v-if="scheme.priority==3" color="#2FA84F"><Flag /></el-icon></el-tooltip>
                    </el-col>
                    <el-col :span="4" class="label">
                        <el-tag v-if="scheme.tagName=='学习'">{{scheme.tagName}}</el-tag>
                        <el-tag type="success" v-if="scheme.tagName=='代码'||scheme.tagName=='生活'">{{scheme.tagName}}</el-tag>
                    </el-col>
                    <el-col :span="2">
                         <el-dropdown trigger="click">
                                <span class="el-dropdown-link">
                                <el-icon><MoreFilled /></el-icon>
                                </span>
                                <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item :icon="Plus">
                                    <div>
                                    修改时间
                                    </div>
                                    <div>
                                    <el-button @click="changeDate(scheme.schemeId)">明天</el-button>
                                    <el-button>选择时间</el-button>
                                    </div>
                                    </el-dropdown-item>
                                    <el-dropdown-item :icon="CirclePlusFilled">
                                    <div>重要程度</div>
                                    <div>
                                        <el-button>
                                        <el-icon  color="#EA3D2F" @click="changepriority(scheme.schemeId)"><Flag /></el-icon></el-button>
                                         <el-button><el-icon  color="#F3AA18"><Flag /></el-icon></el-button>
                                         <el-button> <el-icon  color="#2FA84F"><Flag /></el-icon></el-button>
                                          <el-button> <el-icon  color="#9E9E9E"><Flag /></el-icon></el-button>
                                    </div>
                                    </el-dropdown-item>
                                    <!-- <el-dropdown-item :icon="CirclePlus">
                                    <div>
                                    置顶
                                    </div></el-dropdown-item> -->
                                    <el-dropdown-item :icon="Check">
                                    <div>
                                    修改标签
                                    </div>
                                    <div > <el-tag style="margin-right:10px">学习</el-tag>
                                    <el-tag style="margin-right:10px" type="danger" @click="changetag(scheme.schemeId)">生活</el-tag>
                                    <el-tag type="success">运动</el-tag></div>
                                    </el-dropdown-item>
                                    <el-dropdown-item :icon="CircleCheck">
                                    <div @click="deleteMission(scheme.schemeId)">
                                    <el-icon><DeleteFilled /></el-icon>
                                    删除</div></el-dropdown-item>
                                </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                    </el-col>
                </el-row>
            </div>
        </div>

       <el-dialog  v-model="visible"  :before-close="handleClose">
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
                            <el-select placeholder="不重复">
                            <el-option style="color: #EA3D2F;" label="每天重复" value="4" />
                            <el-option style="color: #F3AA18;" label="每周重复" value="5" />
                            <el-option style="color: #2FA84F;" label="每月重复" value="6" />
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
      </el-collapse-item>
      <el-collapse-item name="3">
          <template #title >
            <div class="collapse-title">每日打卡</div>
            </template>
        <div class="check">
                <div class="checklist" v-for="(check) in checklist" :key = "check.checkId">
                    <el-row class="scheme">
                        <el-col :span="1">
                        <el-checkbox v-model = "complete" size="large"/>
                        </el-col>
                        <el-col :span="4" class="schemeTime">
                            {{check.repetitionScope}}
                        </el-col>
                        <el-col :span="10">
                            {{check.schemeTitle}}
                        </el-col>
                        <el-col :span="4">
                            <el-tag>{{check.tagName}}</el-tag>
                        </el-col>
                        <el-col :span="2">
                             <el-dropdown trigger="click">
                                <span class="el-dropdown-link">
                                <el-icon><MoreFilled /></el-icon>
                                </span>
                                <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item :icon="Plus">Action 1</el-dropdown-item>
                                    <el-dropdown-item :icon="CirclePlusFilled">
                                    Action 2
                                    </el-dropdown-item>
                                    <el-dropdown-item :icon="CirclePlus">Action 3</el-dropdown-item>
                                    <el-dropdown-item :icon="Check">Action 4</el-dropdown-item>
                                    <el-dropdown-item :icon="CircleCheck">Action 5</el-dropdown-item>
                                </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </el-col>
                    </el-row>
                </div>
    </div>
      </el-collapse-item>
    </el-collapse>
  </div>
  </n-scrollbar>
</div>
</template>

<style scoped>

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