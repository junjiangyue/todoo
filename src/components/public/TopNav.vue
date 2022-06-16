<script>
import { RouterLink } from 'vue-router'
import { HelpCircle } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

export default{
  methods:{
    gotoGithub(){
      window.open('https://github.com/junjiangyue/todoo', "_blank")
    }
  }
}
</script>

<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()

const toggleDark = useToggle(isDark)
</script>

<template>
  <header class="top-nav-wrapper">
    <img class="icon-left" src="@/assets/icon/logo.png"/>

    <div style="flex: 1;"></div>

    <div class="right-group">
      <div class="help" @click="gotoGithub" style="cursor:pointer">
        帮助
        <n-icon :size="24" color="#C6CACC">
          <help-circle/>
        </n-icon>
      </div>

      <div class="daylight" style="cursor:pointer" @click="toggleDark">
        白天模式
      </div>

      <img src="@/assets/icon/userpic.png" style="object-fit: scale-down;"/>
    </div>
  </header>
</template>

<style scoped lang="scss">
.top-nav-wrapper {
  box-sizing: border-box;
  align-items: center;
  font-size: 1rem;
  height: 4em;
  display: flex;
  width: 100%;
}

.icon-left {
  margin-left: 1rem;
  margin-top: 1rem;
}

.right-group {
  display: flex;
  gap: .8rem;
  margin-right: 1rem;
  align-items: center;
}

.router-link-active {
  text-decoration: none;
}

a {
  text-decoration: none;
  color: #000;
}

.daylight {
  box-sizing: border-box;
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
  border-radius: 10px;
  width: 6em;
  height: 2.5em;
  border: 1px solid rgba(54, 123, 245, 0.16);
  transition: box-shadow .5s ease;

  &:hover {
    box-shadow: 0px 4px 8px rgba(54, 123, 245, 0.16), 0px 2px 4px rgba(54, 123, 245, 0.24);
  }
}

.help {
  box-sizing: border-box;
  display: flex;
  background: #F7F9FA;
  border-radius: 10px;
  /* Gray · 80% */
  color: #5E6366;
  align-items:center;
  justify-content:center;
  font-size: .9rem;
  width: 6em;
  height: 2.5em;
  transition: background .4s ease-out;

  &:hover {
    background: #eee;
  }
}
</style>