<script>
export default {
  props:['msg'],
  data(){
    return{
      today:'30',
      date:'2022年5月',
    }
  },
  methods:{
    getTodoInfo(){
      
    }
  }
}
</script>>

<template>
<!-- 怎么样才能做到，不选中的时候显示这部分内容，选中的时候显示其他内容？ -->
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
    <div v-if="msg!=-1" class="todoInfo">
      任务详情{{msg}}
      <div>时间</div>
      <div>任务标题</div>
      <div>任务描述</div>
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
}
.illu{
  margin-top: 5em;
}
.todoInfo{
  text-align: left;
  padding-left:15%;
}
</style>