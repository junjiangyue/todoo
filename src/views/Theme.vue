<script setup>

</script>

<template>
  <div>
    <div>
      <span class="titleWord"><img :src="ListIcon" style="margin-right: 0.5em;">纯色系列</span>
    </div>
    <div>
      <ul class="ulStyle">
        <li v-for="(theme, index) in themeListColor" class="liStyle" div v-on:click="addClassColor(index)" :class="currentColor==index? 'select':''">
            <img :src="theme.themeImg" style="width: 150px; height: 150px;">
          <div>
            <p align="center">{{theme.text}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <span class="titleWord"><img :src="ListIcon" style="margin-right: 0.5em;">季节系列</span>
    </div>
    <div>
      <ul class="ulStyle">
        <li v-for="(theme, index) in themeListSeason" class="liStyle" div v-on:click="addClassSeason(index)" :class="currentSeason==index? 'select':''">
          <img :src="theme.themeImg" style="width: 150px; height: 150px;">
          <div>
            <p align="center">{{theme.text}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import defaultTheme from'../assets/illustration/default.png'
import nightTheme from'../assets/illustration/night.png'
import springTheme from'../assets/illustration/spring.png'
import summerTheme from'../assets/illustration/summer.png'

export default {
  data() {
    return {
      currentColor:-1,
      currentSeason:-1,
      ListIcon: new URL('../assets/icon/rightarrow2.png', import.meta.url).href,
      themeListColor: [
        {
          text: "默认",
          themeImg: defaultTheme
        },
        {
          text: "夜间",
          themeImg:nightTheme
        }
      ],
      themeListSeason: [
        {
          text: "春季",
          themeImg: springTheme
        },
        {
          text: "夏季",
          themeImg: summerTheme
        }
      ]
    };
  },
  methods: {
    addClassColor:function(index){
      this.currentColor=index;
      this.currentSeason=-1;
      console.log(this.current);
    },
    addClassSeason:function(index){
      this.currentSeason=index;
      this.currentColor=-1;
      console.log(this.current);
    }
  }



};
</script>


<style scoped>


.titleWord{
  height: fit-content;
  width: fit-content;
  text-align: left;
  display: block;
  font-size: 25px;
  margin-top: 2%;
}

.ulStyle{
  display:inline;
  white-space:nowrap;
}

.liStyle{
  list-style: none;
  display: inline-block;
  margin: 3% 3% 3% 3%;
  float: left;
}

.select {

  position: relative;

  width:150px;

  height:150px;

  margin: 3% 3% 3% 3%;

  text-align: center;

  /*line-height: 93px;*/

  color: #4ABE84;

  background-color: #fff;

  /*box-shadow:0px 2px 7px 0px rgba(85,110,97,0.35);*/
  /*border-radius:7px;*/

  border:1px solid rgba(74,190,132,1);

}

.select:before {

  content: '';

  position: absolute;

  right: 0;

  bottom: 0;

  border: 17px solid #4ABE84;

  border-top-color: transparent;

  border-left-color: transparent;

}

.select:after {

  content: '';

  width: 5px;

  height: 12px;

  position: absolute;

  right: 6px;

  bottom: 6px;

  border: 2px solid #fff;

  border-top-color: transparent;

  border-left-color: transparent;

  transform: rotate(45deg);

}

</style>
