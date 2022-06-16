<script>
import { RouterLink } from 'vue-router'
export default{
  methods:{
    gotoGithub(){
      window.open('https://github.com/junjiangyue/todoo',"_blank")
    }
  }
}
</script>

<template>
  <header class="top-nav-wrapper">
    <div>
      <el-row>
        <el-col :span="20">
          <img class="icon-left" src="@/assets/icon/logo.png"/>
        </el-col>
        <el-col :span="4">
          <div class="right">
            <el-row>
              <el-col :span="9">
              <div class="help" @click="gotoGithub" style="cursor:pointer">
                帮助
                <img src="@/assets/icon/help-circle.png"/>
              </div>
              </el-col>
              <el-col :span="9"><div class="daylight" style="cursor:pointer">
                白天模式
              </div></el-col>
              <el-col :span="4"><img src="@/assets/icon/userpic.png"/></el-col>
              
            </el-row>
          </div>
        </el-col>
     </el-row>
     </div>
     
  </header>
</template>

<style scoped>
.top-nav-wrapper {
  box-sizing: border-box;
  border: 0px solid #000;
  font-size: 1rem;
  height: 4em;
}
.icon-left{
  margin-left: 1em;
  margin-top: 0.5em;
}
.router-link-active {
  text-decoration: none;
}
a{
  text-decoration: none;
  color: #000;
}
.daylight{
  color: #367BF5;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.75px;
  display:flex;
  align-items:center;
  justify-content:center;
  /* White Base */
  background: #FFFFFF;
  /* Shadow Blue · 4dp */
  box-shadow: 0px 4px 8px rgba(54, 123, 245, 0.16), 0px 2px 4px rgba(54, 123, 245, 0.24);
  border-radius: 10px;
  width: 6em;
  height: 2.5em;

}
.right{
  margin-top: 0.5em;
  
}
.help{
  display: flex;
  background: #F7F9FA;
  border-radius: 10px;
  /* Gray · 80% */
  color: #5E6366;
  align-items:center;
  justify-content:center;
  width: 6em;
  height: 2.5em;
}
</style>