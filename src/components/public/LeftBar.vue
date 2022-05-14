<script setup>
import { RouterLink } from 'vue-router'

</script>

<template>
  <section class="side-nav-wrapper">
    <router-link to="/">
      <div class="daily">
        <el-row :gutter="20">
          <el-col :span="6"><img class="icon-left" src="@/assets/icon/daily.png"/></el-col>
            <el-col :span="18">
              <h4>我的一天</h4>
              <p class="body">Daily todo</p>
            </el-col>
        </el-row>
      </div>
    </router-link>
    <router-link to="/calendar">
      <div class="daily">
        <el-row :gutter="20">
            <el-col :span="6"><img class="icon-left" src="@/assets/icon/calendar.png"/></el-col>
              <el-col :span="18">
                <h4>日历</h4>
                <p class="body">Calendar</p>
              </el-col>
          </el-row>
        </div>
    </router-link>
    <router-link to="/todo-asset">
      <div class="daily">
        <el-row :gutter="20">
            <el-col :span="6"><img class="icon-left" src="@/assets/icon/daily.png"/></el-col>
              <el-col :span="18">
                <h4>待办集</h4>
                <p class="body">Todo Asset</p>
              </el-col>
          </el-row>
      </div>
    </router-link>
    <router-link to="/statistic">
      <div class="daily">
      <el-row :gutter="20">
          <el-col :span="6"><img class="icon-left" src="@/assets/icon/daily.png"/></el-col>
            <el-col :span="18">
              <h4>数据统计</h4>
              <p class="body">Statistics</p>
            </el-col>
        </el-row>
        </div>
    </router-link>
    <router-link to="/settings">
      <div class="daily">
      <el-row :gutter="20">
          <el-col :span="6"><img class="icon-left" src="@/assets/icon/daily.png"/></el-col>
            <el-col :span="18">
              <h4>设置</h4>
              <p class="body">Settings</p>
            </el-col>
        </el-row>
        </div>
    </router-link>
  </section>
</template>

<style scoped>
.side-nav-wrapper {
  box-sizing: border-box;
  border: 0px solid black;
  border-top: none;
  font-size: 1rem;
  width: 16.25em;
  display: flex;
  padding-left: 3em;
  flex-direction: column;
  gap: 1em;
  margin-top: 6em;
}
.router-link-active {
  text-decoration: none;
  background-color: #E5EFFF;
  border-radius: 10px;

}
a{
  text-decoration: none;
  color: #000;
}
.daily{
  display:flex;
  align-items:center;
  margin-top: 0em;
  width: 211px;
  height: 56px;
  padding-left: 1.2em;
}
.icon-left{
  margin-top: 0.5em;
}
</style>