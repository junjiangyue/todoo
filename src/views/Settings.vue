<script setup>

</script>

<template>
  <div>
      <el-menu :default-active="$route.path" router mode="horizontal">
        <el-menu-item index="/settings/theme">
          <span slot="title">主题</span>
        </el-menu-item>
        <el-menu-item index="/settings/personalInformation">
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="/settings/tomatoSet">
          <span slot="title">番茄钟设置</span>
        </el-menu-item>
      </el-menu>
  </div>
  <div>

      <router-view></router-view>

  </div>
</template>

<script>

</script>

<style scoped>


</style>