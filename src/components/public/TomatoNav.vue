<script lang="ts" setup>

</script>

<template>
  <footer class="footer-wrapper">
    <div class="contentStyle">
      <div>
        <img class="imgStyle" src="src/assets/illustration/tomatoImg.jpg"/>
      </div>
      <div class="timeStyle">
        <p>{{hourSet}} : {{minSet}} : {{secondSet}}</p>
        <p style="font-size: 20px;" v-show="textTagAfter">专注中···</p>
        <p style="font-size: 20px;" v-show="textTagBefore">开始专注学习吧！</p>
        <p style="font-size: 20px;" v-show="textTagPause">快来继续学习吧！</p>
      </div>
      <div class="imgRightStyle">
        <img class="imgStyle2" style="margin-right: 1%" v-show="startTag" @click="start()" src="src/assets/icon/start.png"/>
        <img class="imgStyle2" style="margin-right: 1%" v-show="pauseTag" @click="stop()" src="src/assets/icon/pauseButton.png"/>
        <img class="imgStyle2" style="margin-right: 1%" v-show="stopTag" @click="reSet()" src="src/assets/icon/stop.png"/>
      </div>
    </div>
    
  </footer>
</template>

<script>
  export default{
    data(){
      return{
        hourSet:'01',
        minSet:'30',
        secondSet:'00',
        hourInt:'1',
        minInt:'30',
        secInt:'0',
        time:0,
        textTagAfter:false,
        textTagBefore:true,
        textTagPause:false,
        startTag:true,
        pauseTag:false,
        stopTag:false
      }
    },
    methods:{
      start(){
        const _this = this;
        this.time=setInterval(function(){
          let hour = parseInt(_this.hourSet);
          let min = parseInt(_this.minSet);
          let sec = parseInt(_this.secondSet);
          console.log(hour);
          console.log(min);
          console.log(sec);
          if(sec===0){
            if(min===0){
              if(hour===0){
              }
              else{
                hour--;
                min=59;
                sec=59;
                _this.hourSet=hour>9?hour:"0"+hour;
                _this.minSet=min;
                _this.secondSet=sec;
              }
            }
            else{
              min--;
              sec=59;
              _this.minSet=min>9?min:"0"+min;
              _this.secondSet=sec;
            }
          }
          else{
            sec--;
            _this.secondSet=sec>9?sec:"0"+sec;;
          }
        },1000);
        this.textTagAfter=true;
        this.textTagBefore=false;
        this.textTagPause=false;
        this.startTag=false;
        this.pauseTag=true;
        this.stopTag=true;
      },

      stop(){
        clearInterval(this.time);
        this.textTagAfter=false;
        this.textTagPause=true;
        this.startTag=true;
        this.pauseTag=false;
      },

      reSet(){
        clearInterval(this.time);
        this.hourSet='01';
        this.minSet='30';
        this.secondSet='00';
        this.textTagBefore=true;
        this.textTagAfter=false;
        this.textTagPause=false;
        this.startTag=true;
        this.pauseTag=false;
        this.stopTag=false;
      }

    }
  }
</script>

<style scoped lang="scss">
$bg: #F6F1D7;

.imgStyle{
  width: 8em;
  height: 8em;
}

.imgRightStyle{
  margin-left: 25%;
  display: flex;
}

.imgStyle2{
  width: 5em;
  height: 5em;
  margin-top: 2em;
}

.footer-wrapper {
  box-sizing: border-box;
  position: absolute;
  background-color: $bg;
  bottom: -.3rem;
  left: -.4rem;
  right: -.4rem;
  /*height: 4rem;*/
  z-index: 10;
  height: fit-content;
}

.contentStyle{
  display: flex;
}

.timeStyle{
  font-size: 30px;
  margin-left: 30%;
  color: #EA3D2F;
  text-align: center;
  font-family: "PingFang SC",cursive;
}

</style>