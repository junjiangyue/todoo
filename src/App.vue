<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import TopNav from './components/public/TopNav.vue'
import LeftBar from './components/public/LeftBar.vue'
import TodoSider from './components/public/TodoSider.vue'
import CalendarSider from './components/calendar/CalendarSider.vue'
import TomatoNav from './components/public/TomatoNav.vue'

// 不显示右侧边栏的路由
const excludeRightBar = ['/todo-asset', '/settings/theme', '/login', '/statistic', '/TimeTable','/register','/settings/personalInformation']
// 不显示顶、左侧边栏的路由
const excludeTopLeft = ['/login','/register']
// 不显示番茄钟底边栏的路由
const excludeTomatoBar = ['/login', '/register', '/settings/theme', '/settings/personalInformation']

// 选中日期
const currDate = ref(new Date())

// click-date handler
function handleClickDate (date) {
  currDate.value = date
}

const getMission = v => {
      console.log('app.vue收到的:',v);
      missionID.value = v;
      console.log('app.missionID:',missionID.value);
    }
const missionID = ref();
</script>

<template>
  <!--顶栏-->
  <top-nav v-show="!excludeTopLeft.includes($route.path)"/>

  <article :class="['low-wrapper', excludeTopLeft.includes($route.path) ? 'full-wrapper' : '']">

    <!--左侧边栏-->
    <left-bar v-show="!excludeTopLeft.includes($route.path)"/>

    <!--中心内容-->
    <section :class="['center-content', excludeTopLeft.includes($route.path) ? 'full-content' : '']">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" @click-date="handleClickDate" @mission="getMission"/>
        </keep-alive>
      </router-view>

      <!--番茄钟栏-->
      <tomato-nav v-if="!excludeTomatoBar.includes($route.path)"/>
    </section>

    <!--右侧边栏-->
    <todo-sider
      v-if="!excludeRightBar.includes($route.path) && $route.path === '/'"
      :msg="missionID"/>
    <calendar-sider
      v-else-if="!excludeRightBar.includes($route.path) && $route.path === '/calendar'"
      :date="currDate"/>
    
  </article>
</template>

<style>
body {
  padding: 0;
  margin: 0;
  font-family: 'PingFang SC'
}
</style>

<style scoped>
.low-wrapper {
  display: flex;
  font-size: 1rem;
  height: calc(100vh - 4em);
  justify-content: space-around;
}

.full-wrapper {
  height: 100vh;
}

.center-content {
  flex-grow: 1;
  margin: .3em .4em;
  box-sizing: border-box;
  position: relative;
}

.full-content {
  margin: 0;
  border: none;
}
</style>
