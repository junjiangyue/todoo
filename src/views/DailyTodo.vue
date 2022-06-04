<script>
export default {
     data(){
        return{
            index:'',
            ListIcon: new URL('../assets/icon/listmode.png', import.meta.url).href,
            TableIcon: new URL('../assets/icon/timetable-un.png', import.meta.url).href,
        }
    },
    methods:{
        saveIndex(index){
            window.sessionStorage.setItem('index',index)
            this.index=index;
            if(index == '/'){
                console.log(index)
                this.ListIcon=new URL('../assets/icon/listmode.png', import.meta.url).href;
                this.TableIcon=new URL('../assets/icon/timetable-un.png', import.meta.url).href
            }
            if(index == '/TimeTable'){
                console.log(index)
                this.TableIcon = new URL('../assets/icon/timetable.png', import.meta.url).href;
                this.ListIcon=new URL('../assets/icon/listmode-un.png', import.meta.url).href;
            }
            
        },
        getMission(missionID){
            console.log('父组件收到的消息：'+missionID)
        // 父组件传值
            this.$emit("mission",missionID);
        }
    },
    mounted(){
    },
    created(){
      this.index = window.sessionStorage.getItem('index')
    },
}
</script>
<template>
<div>
    <div class="shift">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true">
            <el-menu-item index="/" @click="saveIndex('/')"><img :src="ListIcon" style="margin-right: 0.5em;" />清单模式</el-menu-item>
            <el-menu-item index="/TimeTable"  @click="saveIndex('/TimeTable')"><img :src="TableIcon" style="margin-right: 0.5em;"/>课表模式</el-menu-item>
        </el-menu>
    </div>
    <div>
        <router-view name="modeShift" @mission="getMission"></router-view>
    </div>
</div>
</template>

<style scoped>
.router-link-active {
  text-decoration: none;
  background-color: #E5EFFF;
  border-radius: 10px;

}
a{
  text-decoration: none;
  color: #000;
}
</style>