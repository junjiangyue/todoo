<script>
export default {
  props:['msg'],
  data(){
    return{
      today:'16',
      date:'2022年6月',
      startTime:'9:00',
      endTime:'10:00',
      missionDate:'今天',
      schemeStartTime:'',
      schemeEndTime:'',
      schemeTitle:'',
      schemeDescription:'描述',
      priority:'',
    }
  },
  methods:{
    getMission(){
      this.$axios({
        method:"get",
        url:"http://localhost:8080/mission/getMission",
        params:{
          req:this.msg,
        }
      }).then(res=>{
        console.log(res)
        this.schemeStartTime = res.data.schemeStartTime
        this.schemeEndTime = res.data.schemeEndTime
        this.schemeTitle = res.data.schemeTitle
        if(res.data.schemeDate!=null)this.missionDate=res.data.schemeDate
        if(res.data.schemeDescription!="")this.schemeDescription = res.data.schemeDescription
        this.priority = res.data.priority
      })
    }
  },
  mounted(){

  }
}
</script>>

<template>
  <section class="right-bar-wrapper">
    <div v-if="msg==-1||msg==null">
      <div class="illu">
        <img src="@/assets/illustration/welcome1.png"/>
      </div>
          <div class="welcome" style="display:inline">{{today}}</div>
          <div >{{date}}</div>

      <div>
        -
      </div>
      <div>开启今天的日程吧！</div>
    </div>
    <div v-if="msg!=-1&&msg!=null" class="todoInfo" :key="getMission()">
      <div class="head"><el-checkbox v-model = "complete" size="large"/>{{schemeTitle}}</div>
      <div class="description">
        <input v-model="schemeDescription" class="input"/> 
        </div>
      <div class="picture">
        <img class="pic" src="@/assets/illustration/illu.png"/>
        <div><span>“The best preparation for tomorrow is doing your best today.”</span></div>
        <div>对明天做好的准备就是今天做到最好</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.right-bar-wrapper {
  font-size: 1rem;
  width: 27.375em;
  box-sizing: border-box;
  border: 1px solid #C6CACC;
  border-top: none;  
  justify-self: flex-end;
  text-align: center;
}
.welcome{
  font-size:24px ;
  color: #367BF5;
}
.illu{
  margin-top: 5em;
}
.todoInfo{
  text-align: left;
  padding-left:0;
}
.head{
  border-bottom: solid 1px #C6CACC;
  padding-left: 5%;
}
.title{
  font-size: 16px;
  font-family: 'Abyssinica SIL';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.44px;
  padding-top: 10px;
  padding-left: 5%;
}
.description{
  color: #9E9E9E;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 5%;
}
.picture{
  width: 100%;
  text-align: center;
}
.pic{
  width: 16em;
  margin-top: 16em;
  margin-left: 5em;
}
.input{
    border: 0;
    BACKGROUND-COLOR: transparent;
}
input:focus{
    border: #367BF5 !important;
    outline: none;
}
</style>