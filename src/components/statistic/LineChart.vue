<script lang="ts" setup>
import { NIcon } from 'naive-ui'
import { ArrowTrending20Filled } from '@vicons/fluent'
import { onMounted } from 'vue'
import * as echarts from 'echarts/core'
import { LineChart, LineSeriesOption } from 'echarts/charts'
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

// 注册必须的组件
echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

// 工作量图表选项
const workOptions: ECOption = {
  tooltip: {
    triggerOn: 'mousemove',
    trigger: 'item'
  },  
  xAxis: {
    data: ['25 Apr', '26 Apr', '27 Apr', '28 Apr', '29 Apr', '30 Apr', '1 May']
  },
  yAxis: {},
  series: [
    {
      data: [1, 3, 4, 5, 7, 8, 9],
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#43B5F4',
        width: 2,
      },
      itemStyle: {
        color: '#43B5F4',
      },
      tooltip: {
        valueFormatter: value => `${value} Events`
      }
    }
  ],
  grid: {
    top: 20,
    bottom: 20
  }  
}

// 番茄钟图表选项
const tomatoOptions: ECOption = {
  tooltip: {
    triggerOn: 'mousemove',
    trigger: 'item'
  },
  xAxis: {
    data: ['25 Apr', '26 Apr', '27 Apr', '28 Apr', '29 Apr', '30 Apr', '1 May']
  },
  yAxis: {},
  series: [
    {
      data: [1, 3, 4, 5, 7, 8, 9],
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#FF6666',
        width: 2,
      },
      itemStyle: {
        color: '#FF6666',
      },
      tooltip: {
        valueFormatter: value => `${value} Clocks`
      }      
    }
  ],
  grid: {
    top: 20,
    bottom: 20
  }
}

onMounted(() => {
  // 绘制图表
  const workChart = echarts.init(document.getElementById('chart1')) 
  workChart.setOption(workOptions)

  const tomatoChart = echarts.init(document.getElementById('chart2'))
  tomatoChart.setOption(tomatoOptions)
})

</script>

<template>
  <div class="chart-container">
    <div class="chart-box">
      <div class="chart-title">
        <n-icon
          size="30"
          color="#78909C">
          <arrow-trending20-filled/>
        </n-icon>
        <div class="text-part">
          <p class="title-text">工作量趋势</p>
          <p class="subtitle-text">展示前7天的工作量趋势</p>
        </div>
      </div>

      <div class="chart-frame">
        <div class="chart-duration">
          25 Apr 2022 - 1 Mar 2022
        </div>
        <div
          class="chart"
          id="chart1"/>
      </div>
    </div>

    <div class="chart-box">
      <div class="chart-title">
        <n-icon
          size="30"
          color="#78909C">
          <arrow-trending20-filled/>
        </n-icon>
        <div class="text-part">
          <p class="title-text">番茄专注时长 (小时)</p>
          <p class="subtitle-text">展示了前7天的番茄专注时长趋势</p>
        </div>
      </div>

      <div class="chart-frame">
        <div class="chart-duration">
          25 Apr 2022 - 1 Mar 2022
        </div>
        <div
          class="chart"
          id="chart2"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$grey: #EEE;
$dark: rgba(0, 0, 0, 0.56);
$black: #2A2A2A;

p {
  margin:  0;
}

.chart-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 2em;
}

.chart-box {
  font-size: 1rem;
  box-sizing: border-box;
  border: 1px solid $grey;
  border-radius: 1em;
  width: 31em;
  height: 20em;
  padding: .6em 0; 
  display: flex;
  flex-direction: column;
  transition: box-shadow .4s ease-out;
  &:hover {
    box-shadow:  0 6px 12px -2px rgba(50,50,93,0.25), 0 3px 7px -3px rgba(0,0,0,0.3);
  }
}

.chart-title {
  align-self: flex-start;
  display: flex;
  margin-left: 1em;
  gap: .8em;
}

.text-part {
  display: flex;
  flex-direction: column;
}

.title-text {
  font-family: 'PingFang SC';
  font-size: 1.375rem;
  font-weight: 400;
  line-height: 1.5em;
  letter-spacing: 1.5px;
  text-align: left;
}

.subtitle-text {
  margin-top: .2em;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: .75rem;
  line-height: 1.06em;
  color: $dark;  
}

.chart-duration {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: .8rem;
  line-height: 1rem;
  color: $black;
  margin-left: 1rem;  
}

.chart-frame {
  margin-top: 1em;
}

.chart {
  font-size: 1rem;
  width: 30.5em;
  height: 14em;
}


</style>