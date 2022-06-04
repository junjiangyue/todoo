<script setup>
import { RouterView } from 'vue-router'
import TopNav from './components/public/TopNav.vue'
import LeftBar from './components/public/LeftBar.vue'
import RightBar from './components/public/RightBar.vue'
import { ref, reactive, toRefs } from "vue";
// 不显示右侧边栏的路由
const excludeRightBar = ['/todo-asset', '/settings', '/login', '/statistic', '/TimeTable']
// 不显示顶、左侧边栏的路由
const excludeTopLeft = ['/login']
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
          <component :is="Component"  @mission="getMission"/>
        </keep-alive>
      </router-view>
    </section>

    <!--右侧边栏-->
    <right-bar v-if="!excludeRightBar.includes($route.path)" :msg="missionID"/>
    
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
}

.full-content {
  margin: 0;
  border: none;
}
</style>
