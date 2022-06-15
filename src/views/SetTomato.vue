<template>
  <div class="all">

    <div class="item">
      <div>
        <span class="titleWord"><img :src="ListIcon" style="margin-right: 0.5em;">时间设置</span>
      </div>
      <div class="informationContent">
        <el-form>
          <el-form-item>
            <p class="WordSize">小时</p>
            <el-input v-model.number="this.hourSet" class="inputSize" placeholder="请设置小时，默认1小时30分钟"></el-input>
          </el-form-item>
          <el-form-item>
            <p class="WordSize">分钟</p>
            <el-input v-model.number="this.minSet" class="inputSize" placeholder="请设置分钟，默认1小时30分钟"></el-input>
          </el-form-item>
          <el-form-item>
            <p class="WordSize">秒</p>
            <el-input v-model.number="this.secSet" class="inputSize" placeholder="请设置秒，默认1小时30分钟"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="item">
      <div>
        <span class="titleWord"><img :src="ListIcon" style="margin-right: 0.5em;">休息时间设置</span>
      </div>
      <div class="informationContent">
        <el-form>
          <el-form-item>
            <p class="WordSize">小时</p>
            <el-input v-model.number="this.restHour" class="inputSize" placeholder="请设置小时，默认5分钟"></el-input>
          </el-form-item>
          <el-form-item>
            <p class="WordSize">分钟</p>
            <el-input v-model.number="this.restMin" class="inputSize" placeholder="请设置分钟，默认5分钟"></el-input>
          </el-form-item>
          <el-form-item>
            <p class="WordSize">秒</p>
            <el-input v-model.number="this.restSec" class="inputSize" placeholder="请设置秒，默认5分钟"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="item">
      <div>
        <span class="titleWord"><img :src="ListIcon" style="margin-right: 0.5em;">休息间隔设置</span>
      </div>
      <div class="informationContent">
        <el-form>
          <el-form-item>
            <p class="WordSize">小时</p>
            <el-input v-model.number="this.intervalHour" class="inputSize" placeholder="请设置小时，默认25分钟"></el-input>
          </el-form-item>
          <el-form-item>
            <p class="WordSize">分钟</p>
            <el-input v-model.number="this.intervalMin" class="inputSize" placeholder="请设置分钟，默认25分钟"></el-input>
          </el-form-item>
          <el-form-item>
            <p class="WordSize">秒</p>
            <el-input v-model.number="this.intervalSec" class="inputSize" placeholder="请设置秒，默认25分钟"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>

  <div>
    <el-button type="primary" class="infoButton" @click="storeTomatoTime()">保存</el-button>
  </div>

</template>

<script>


export default {
  data(){
    return{
      ListIcon: new URL('../assets/icon/rightarrow2.png', import.meta.url).href,
      hourSet:'',
      minSet:'',
      secSet:'',
      restHour:'',
      restMin:'',
      restSec:'',
      intervalHour:'',
      intervalMin:'',
      intervalSec:''
    }
  },
  methods:{

    storeTomatoTime(){
      if(Number.isNaN(Number.parseInt(this.hourSet))||Number.isNaN(Number.parseInt(this.minSet))||Number.isNaN(Number.parseInt(this.secSet))
          ||Number.isNaN(Number.parseInt(this.restHour))||Number.isNaN(Number.parseInt(this.restMin))||Number.isNaN(Number.parseInt(this.restSec))
          ||Number.isNaN(Number.parseInt(this.intervalHour))||Number.isNaN(Number.parseInt(this.intervalMin))||Number.isNaN(Number.parseInt(this.intervalSec))){
        this.$message({
          message:"请正确输入数字！",
          type:"warning"
        })
      }
      else{
        if(Number.parseInt(this.minSet)>59||Number.parseInt(this.secSet)>59
            ||Number.parseInt(this.restMin)>59||Number.parseInt(this.restSec)>59
            ||Number.parseInt(this.intervalMin)>59||Number.parseInt(this.intervalSec)>59)
        {
          this.$message({
            message:"请正确输入数字！",
            type:"warning"
          })
        }
        else{
          localStorage.setItem("Hour",Number.parseInt(this.hourSet)>9?Number.parseInt(this.hourSet):"0"+Number.parseInt(this.hourSet));
          localStorage.setItem("Min",Number.parseInt(this.minSet)>9?Number.parseInt(this.minSet):"0"+Number.parseInt(this.minSet));
          localStorage.setItem("Sec",Number.parseInt(this.secSet)>9?Number.parseInt(this.secSet):"0"+Number.parseInt(this.secSet));

          localStorage.setItem("restHour",Number.parseInt(this.hourSet)>9?Number.parseInt(this.hourSet):"0"+Number.parseInt(this.hourSet));
          localStorage.setItem("restMin",Number.parseInt(this.minSet)>9?Number.parseInt(this.minSet):"0"+Number.parseInt(this.minSet));
          localStorage.setItem("restSec",Number.parseInt(this.secSet)>9?Number.parseInt(this.secSet):"0"+Number.parseInt(this.secSet));

          localStorage.setItem("IntervalHour",Number.parseInt(this.hourSet)>9?Number.parseInt(this.hourSet):"0"+Number.parseInt(this.hourSet));
          localStorage.setItem("IntervalMin",Number.parseInt(this.minSet)>9?Number.parseInt(this.minSet):"0"+Number.parseInt(this.minSet));
          localStorage.setItem("IntervalSec",Number.parseInt(this.secSet)>9?Number.parseInt(this.secSet):"0"+Number.parseInt(this.secSet));

          this.$message({
            message:"修改成功！",
            type:"success"
          })
        }
      }

    }

  }
}
</script>

<style scoped>

.all{
  display: flex;
  width: 100%;
}

.item{
  width: 30%;
}

.titleWord{
  height: fit-content;
  width: fit-content;
  text-align: left;
  display: block;
  font-size: 25px;
  margin-top: 3%;
}


.WordSize{
  font-size: 20px;
  margin-left: 5%;
  margin-top: 2%;
  text-align: center;
  font-weight: bold;
  width: 70px;
}

.informationContent{
  height: 35vh;
  width: 40vw;
  display: inline;
  background-color: #757575;
  margin-left: 10%;
}

.inputSize {
  height: 45px;
  width: 50%;
  margin-left: 3%;
}

.infoButton{
  width: 10%;
  background-color: #FFFFFF;
  height: 40px;
  color: #409EFF;
  border-color: #409EFF;
  border-width: 1px;
  margin-left: 35%;
  margin-top: 5%;
}


</style>