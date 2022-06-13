<script>
export default {
  props:['msg'],
  data(){
    return{
      today:'17',
      date:'2022年6月',
      startTime:'9:00',
      endTime:'10:00',
      missionDate:'今天',
    }
  },
  methods:{
    
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
    <div v-if="msg!=-1&&msg!=null" class="todoInfo">
      <div class="head"><el-checkbox v-model = "complete" size="large"/>{{missionDate}},{{startTime}}-{{endTime}}</div>
      <div class="title">任务标题</div>
      <div class="description">描述</div>
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
  color: #5B94F6;
  font-size:24px ;
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
</style>