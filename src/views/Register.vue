<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div clas = "container">
    <main id = "main">
      <div class = "mainContent">
        <div class = "mainLeft">
          <div class="mainLogo">
            <div class="logoLeft">
              <img src="../assets/illustration/loginLogo.png" class="logoImgStyle">
            </div>
            <div class="logoRight">
              <span class="logoWordStyle">ToDo</span>
            </div>
          </div>
          <div class="mainWord">
            <span class="mainWordStyle">每一天都是有计划的一天</span>
          </div>
        </div>
        <div class = "mainRight">
          <div class="registerForm">
            <el-form>
              <el-form-item>
                <p class="registerWordSize">注册邮箱</p>
                <el-input class="inputSize" placeholder="请输入你的注册邮箱"></el-input>
              </el-form-item>
              <el-form-item>
                <p class="registerWordSize">注册手机号</p>
                <el-input class="inputSize" placeholder="请输入你的注册手机号"></el-input>
              </el-form-item>
              <el-form-item>
                <p class="registerWordSize">密码</p>
                <el-input class="inputSize" placeholder="请输入你的密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="registerButton">注册</el-button>
              </el-form-item>
            </el-form>
            <div class="returnMsg">
              <router-link to="/login">返回登录</router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


<style scoped>

a {
  color: #306fe0;
  text-decoration: none;
}

a:hover {
  color: #306fe0;
}

.mainLeft{
  height: 100vh;
  width: 50vw;
  background-color: #306fe0;
}

.mainContent{
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
}

.mainRight{
  height: 100vh;
  width: 50vw;
}

.mainLogo{
  width: 100%;
  height: 55%;
  display: flex;
}

.logoLeft{
  width: 40%;
}

.logoRight{
  width: 60%;
}

.logoImgStyle{
  width:60%;
  margin-left: 40%;
  margin-top: 55%;
}

.logoWordStyle{
  height: fit-content;
  width: fit-content;
  text-align: center;
  display: block;
  color: #FFFFFF;
  font-size: 120px;
  margin-top:42%;
  margin-left: 20%;
}

.mainWord{
  width: 100%;
  height: 45%;
}

.mainWordStyle{
  height: fit-content;
  width: fit-content;
  text-align: center;
  display: block;
  color: #FFFFFF;
  font-size: 35px;
  margin-top: 10%;
  margin-left: 28%;
}

.registerForm{
  width: 360px;
  padding: 40px;
  margin-top: 14%;
  margin-left: 25%;
}

.registerWordSize{
  font-size: 20px;
//margin: 0 0 20px;
  text-align: left;
  font-weight: bold;
}

.registerButton{
  width: 100%;
  margin-top: 10%;
  background-color: #306fe0;
  height: 40px;
}

.returnMsg{
  text-align: center;
  font-size: 13px;
}

.inputSize{
  height: 45px;
}



</style>