<!--<script lang="ts" setup>-->
<script setup>
import { NIcon, NScrollbar, NText } from 'naive-ui'
import { PauseCircleSharp } from '@vicons/ionicons5'
import { PlayCircleSharp } from '@vicons/ionicons5'
import { StopCircleSharp } from '@vicons/ionicons5'

</script>

<template>
  <footer class="footer-wrapper">
    <div class="contentStyle">
      <div>
        <img class="imgStyle" src="src/assets/illustration/tomatoImg.jpg"/>
      </div>
      <div class="timeStyle">
        <p v-show="studyTag">{{hourSet}} : {{minSet}} : {{secondSet}}</p>
        <p v-show="restTag">{{restHour}} : {{restSet}} : {{restSecShow}}</p>
        <p style="font-size: 20px;" v-show="textTagAfter">专注中···</p>
        <p style="font-size: 20px;" v-show="textTagBefore">开始专注学习吧！</p>
        <p style="font-size: 20px;" v-show="textTagPause">快来继续学习吧！</p>
        <p style="font-size: 20px;" v-show="restTag">先休息休息吧！</p>
      </div>
      <div>
        <n-icon class="imgRightStyle">
          <play-circle-sharp class="imgStyle2" style="margin-right: 1%" v-show="startTag" @click="start()"></play-circle-sharp>
          <pause-circle-sharp class="imgStyle2" style="margin-right: 1%" v-show="pauseTag" @click="stop()"></pause-circle-sharp>
          <stop-circle-sharp class="imgStyle2" style="margin-right: 1%" v-show="stopTag" @click="reSet()"></stop-circle-sharp>
          <play-circle-sharp class="imgStyle2" style="margin-right: 1%" v-show="restActionStartTag" @click="rest()"></play-circle-sharp>
          <stop-circle-sharp class="imgStyle2" style="margin-right: 1%" v-show="restActionStopTag" @click="stopRest()"></stop-circle-sharp>
        </n-icon>
<!--        <img class="imgStyle2" style="margin-right: 1%" v-show="startTag" @click="start()" src="src/assets/icon/start.png"/>
        <img class="imgStyle2" style="margin-right: 1%" v-show="pauseTag" @click="stop()" src="src/assets/icon/pauseButton.png"/>
        <img class="imgStyle2" style="margin-right: 1%" v-show="stopTag" @click="reSet()" src="src/assets/icon/stop.png"/>-->
      </div>
    </div>
    
  </footer>
</template>


<script>


  export default{
    data(){
      return{
        hourSet:'',
        minSet:'',
        secondSet:'',
        restHour:'',
        restSet:'',
        restSecShow:'',
        restIntervalSet:'',
        restIntervalSecSet:'',
        time:0,
        restTime:0,
        textTagAfter:false,
        textTagBefore:true,
        textTagPause:false,
        startTag:true,
        pauseTag:false,
        stopTag:false,
        restTag:false,
        restActionStartTag:false,
        restActionStopTag:false,
        studyTag:true
      }
    },

    mounted() {
      this.setTime();
    },

    methods:{
      start(){
        const _this = this;
        let restTemp = parseInt(_this.restIntervalSecSet);
        this.time=setInterval(function(){
          let hour = parseInt(_this.hourSet);
          let min = parseInt(_this.minSet);
          let sec = parseInt(_this.secondSet);
          if(restTemp>0){
            if(sec===0){
              if(min===0){
                if(hour===0){
                  clearInterval(_this.time);
                  _this.setTime();
                  _this.textTagBefore=true;
                  _this.textTagAfter=false;
                  _this.textTagPause=false;
                  _this.startTag=true;
                  _this.pauseTag=false;
                  _this.stopTag=false;
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
            restTemp--;
          }
          else{
            clearInterval(_this.time);
            _this.studyTag=false;
            _this.textTagAfter=false;
            _this.pauseTag=false;
            _this.stopTag=false;
            _this.restTag=true;
            _this.restActionStartTag=true;
          }
        },1000);
        this.textTagAfter=true;
        this.textTagBefore=false;
        this.textTagPause=false;
        this.startTag=false;
        this.pauseTag=true;
        this.stopTag=true;
        this.restActionStopTag=false;
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
        this.setTime();
        this.textTagBefore=true;
        this.textTagAfter=false;
        this.textTagPause=false;
        this.startTag=true;
        this.pauseTag=false;
        this.stopTag=false;
      },

      rest(){
        const _this = this;
        this.restTime=setInterval(function(){
        let hour = parseInt(_this.restHour);
        let min = parseInt(_this.restSet);
        let sec = parseInt(_this.restSecShow);
        if(sec===0){
          if(min===0){
            if(hour===0){
              clearInterval(_this.restTime);
              _this.restTag=false;
              _this.studyTag=true;
              _this.textTagPause=true;
              _this.startTag=true;
              _this.pauseTag=false;
              _this.stopTag=false;
            }
            else{
              hour--;
              min=59;
              sec=59;
              _this.restHour=hour>9?hour:"0"+hour;
              _this.restSet=min;
              _this.restSecShow=sec;
            }
          }
          else{
            min--;
            sec=59;
            _this.restSet=min>9?min:"0"+min;
            _this.restSecShow=sec;
          }
        }
        else{
          sec--;
          _this.restSecShow=sec>9?sec:"0"+sec;;
        }
        },1000);
        this.restActionStartTag=false;
        this.restActionStopTag=true;
      },

      stopRest(){
        clearInterval(this.restTime);
        this.restActionStopTag=false;
        this.restTag=false;
        this.studyTag=true;
        this.textTagPause=true;
        this.startTag=true;
        this.pauseTag=false;
        this.stopTag=false;
      },

      setTime(){
        if(localStorage.getItem("Hour")==null){
          this.hourSet='01';
        }
        else{
          this.hourSet=localStorage.getItem("Hour");
        }
        if(localStorage.getItem("Min")==null){
          this.minSet='30';
        }
        else{
          this.minSet=localStorage.getItem("Min");
        }
        if(localStorage.getItem("Sec")==null){
          this.secondSet='00';
        }
        else{
          this.secondSet=localStorage.getItem("Sec");
        }

        if(localStorage.getItem("restHour")==null){
          this.restHour='00';
        }
        else{
          this.restHour=localStorage.getItem("restHour");
        }
        if(localStorage.getItem("restMin")==null){
          this.restSet='05';
        }
        else{
          this.restSet=localStorage.getItem("restMin");
        }
        if(localStorage.getItem("restSec")==null){
          this.restSecShow='00';
        }
        else{
          this.restSecShow=localStorage.getItem("restSec");
        }

        let secNum = 0;

        if(localStorage.getItem("IntervalHour")==null){

        }
        else{
          secNum+=Number.parseInt(localStorage.getItem("IntervalHour"))*60*60;
        }
        if(localStorage.getItem("IntervalMin")==null){
          this.restIntervalSet='25';
          secNum+=25*60;
        }
        else{
          this.restIntervalSet=localStorage.getItem("IntervalMin");
          secNum+=Number.parseInt(localStorage.getItem("IntervalMin"))*60;
        }
        if(localStorage.getItem("IntervalSec")==null){

        }
        else{
          secNum+=Number.parseInt(localStorage.getItem("IntervalSec"));
        }

        this.restIntervalSecSet=secNum;
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
  margin-left: 20em;
  width: fit-content;
  height: fit-content;
  display: flex;
}

.imgStyle2{
  width: 5em;
  height: 5em;
  margin-top: 2em;
  color: #EA3D2F;
}

/*.imgStyleStop{
  width: 5em;
  height: 5em;
  margin-top: 2em;
  color: #EA3D2F;
}

.imgStylePause{
  width: 5em;
  height: 5em;
  margin-top: 2em;
  color: #EA3D2F;
}*/

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