<script>
import { NScrollbar } from 'naive-ui';
export default{
    data(){
        return {
            req:'',
            missionId:0,
            todolist:[],
            checklist:[],
            failedlist:[],
            futurelist:[],
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
                date2: '',}
        }
    },
    components: {
        NScrollbar
    },
    methods:{
        godetail(missionId){
            this.$emit("mission",missionId);
            //console.log(schemeId)
        },

        getDate(){
            var d = new Date();
            this.req = d.getFullYear().toString()+'/'+(d.getMonth()+1).toString()+'/'+d.getDate().toString()
            console.log(d)
            this.date =(d.getMonth()+1).toString()+"月"+d.getDate().toString()+"日";
        },
        getFailedList(){
            this.$axios({
                method:"get",
                url:"http://localhost:8080/mission/getUndoList",
                params:{
                    req:this.req
                }
            }).then(res=>{
                if(res.data.status==-1){
                    console.log(res)
                }
                else{
                     console.log(res)
                     for(var i=0;i<res.data.length;i++){
                        console.log(res.data[i].state)
                        if(res.data[i].schemeStartTime == null){
                            res.data[i].schemeStartTime=res.data[i].schemeDate.substring(6,7)+'月'+res.data[i].schemeDate.substring(9,10)+'日'
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
                    this.failedlist = res.data
                    this.$forceUpdate()
                }
            })
        },
        getFutureList(){
            this.$axios({
                method:"get",
                url:"http://localhost:8080/mission/getfFutureList",
                params:{
                    req:this.req
                }
            }).then(res=>{
                if(res.data.status==-1){
                    console.log(res)
                }
                else{
                     console.log(res)
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
                    this.futurelist = res.data
                    this.$forceUpdate()
                }
            })
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
                this.todolist = res.data
                }
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

        }
    },
    mounted(){
        this.getDate()
        this.getscheme()
        this.getFailedList()
        this.getFutureList()
    },
}
</script>

<template>
<div>
    <n-scrollbar style="max-height: 570px">
<div class="title">待办集</div>
<div class="input">
                <el-input v-model="mission" placeholder="添加日程到待办集"  @click="visible=true">
            <template #prefix>
            <el-icon :size="28"><CirclePlus /></el-icon>
            </template>
                </el-input>
            </div>
<div class="demo-collapse">
    <el-collapse v-model="activeNames" >
      <el-collapse-item  name="1" >
          <template #title >
          <div class="collapse-title">已过期</div>
        </template>
        <div class="course">
            <div v-for="(scheme) in failedlist" :key = "scheme.schemeId">
                <el-row class="scheme" @click="godetail(scheme.schemeId)">
                    <el-col :span="1">
                    <el-checkbox v-model = "complete" size="large"/>
                    </el-col>
                    <el-col :span="4" style="color:#EA3D2F">
                        {{scheme.schemeStartTime}}
                    </el-col>
                    <el-col :span="10">
                        {{scheme.schemeTitle}}
                    </el-col>
                    <el-col :span="4" class="label">
                        <el-tag v-if="scheme.tagName=='学习'">{{scheme.tagName}}</el-tag>
                        <el-tag type="success" v-if="scheme.tagName=='代码'||scheme.tagName=='软测'">{{scheme.tagName}}</el-tag>
                    </el-col>
                    <el-col :span="2">
                        ···
                    </el-col>
                </el-row>
            </div>
        </div>
      </el-collapse-item>


      <el-collapse-item name="2">
           <template #title >
          <div class="collapse-title">今日</div>
        </template>
        <div class="todo">
            
            <div v-if="nomission">今天没有任务</div>
            <div v-for="(scheme) in todolist" :key = "scheme.schemeId">
                <el-row class="scheme" @click="godetail(scheme.schemeId)">
                    <el-col :span="1">
                    <el-checkbox v-model = "complete" size="large"/>
                    </el-col>
                    <el-col :span="4" class="schemeTime">
                        {{scheme.schemeStartTime}}
                    </el-col>
                    <el-col :span="10">
                        {{scheme.schemeTitle}}
                    </el-col>
                    <el-col :span="4" class="label">
                        <el-tag v-if="scheme.tagName=='学习'">{{scheme.tagName}}</el-tag>
                        <el-tag type="success" v-if="scheme.tagName=='代码'||scheme.tagName=='软测'">{{scheme.tagName}}</el-tag>
                    </el-col>
                    <el-col :span="2">
                        ···
                    </el-col>
                </el-row>
            </div>
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
      </el-collapse-item>
      <el-collapse-item name="3">
          <template #title >
            <div class="collapse-title">以后</div>
            </template>
                <div class="check">
                 <div v-for="(scheme) in futurelist" :key = "scheme.schemeId">
                <el-row class="scheme" @click="godetail(scheme.schemeId)">
                    <el-col :span="1">
                    <el-checkbox v-model = "complete" size="large"/>
                    </el-col>
                    <el-col :span="4" class="schemeTime">
                        {{scheme.schemeStartTime}}
                    </el-col>
                    <el-col :span="10">
                        {{scheme.schemeTitle}}
                    </el-col>
                    <el-col :span="4" class="label">
                        <el-tag v-if="scheme.tagName=='学习'">{{scheme.tagName}}</el-tag>
                        <el-tag type="success" v-if="scheme.tagName=='代码'||scheme.tagName=='软测'">{{scheme.tagName}}</el-tag>
                    </el-col>
                    <el-col :span="2">
                        ···
                    </el-col>
                </el-row>
            </div>
    </div>
      </el-collapse-item>
            <el-collapse-item name="4">
          <template #title >
            <div class="collapse-title">没有日期</div>
            </template>
        <div class="check">
                <div class="checklist" v-for="(check) in checklist" :key = "check.checkId">
                    <el-row class="scheme">
                        <el-col :span="1">
                        <el-checkbox v-model = "complete" size="large"/>
                        </el-col>
                        <el-col :span="4" class="schemeTime">
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
    </n-scrollbar>
</div>
</template>

<style scoped>
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