<script setup lang="ts">
import { ref } from 'vue'
import { NIcon, NScrollbar, NText } from 'naive-ui'
import { ChartArcs } from '@vicons/tabler'
import { CalendarCheckRegular } from '@vicons/fa'
import { ClockAlarm24Filled, ClipboardTaskListLtr20Regular } from '@vicons/fluent'
import CardBox from '../components/statistic/CardBox.vue'
import LineChart from '../components/statistic/LineChart.vue'

type Tab = 'yesterday' | 'tomato' | 'weekly'

// 激活tab
const activeTab = ref<Tab>('yesterday')

// tab标签
const tabItems = [
  {
    key: 'statistic',
    title: '数据复盘回顾',
    subtitle: 'Track your apps across devices',
    iconSize: 48,
    onClick: () => {
      return
    }
  },
  {
    key: 'yesterday',
    title: '昨日小结',
    subtitle: 'Report of Yesterday',
    iconSize: 36,
    onClick: () => {
      activeTab.value = 'yesterday'
    }
  },  
  {
    key: 'tomato',
    title: '番茄统计',
    subtitle: 'Tomato Stastics',
    iconSize: 36,
    onClick: () => {
      activeTab.value = 'tomato'
    }
  },  
    {
    key: 'weekly',
    title: 'Todo 周报',
    subtitle: 'Weekly Report',
    iconSize: 36,
    onClick: () => {
      activeTab.value = 'weekly'
    }
  },
]
</script>

<template>
  <!--顶部Tab-->
  <div class="tabs-container">
    <div
      v-for="item in tabItems"
      :class="['statistic-brand', item.key !== 'statistic' ? 'click' : '', item.key !== 'statistic' && item.key !== activeTab ? 'shallow' : '']"
      @click="item.onClick">
      <n-icon
        :size="item.iconSize"
        color="#78909C">
        <chart-arcs v-if="item.key === 'statistic'"/>
        <calendar-check-regular v-else-if="item.key === 'yesterday'"/>
        <clock-alarm24-filled v-else-if="item.key === 'tomato'"/>
        <clipboard-task-list-ltr20-regular v-else-if="item.key === 'weekly'"/>
      </n-icon>
      <div class="tab-title">
        <n-text class="zh-title">
          {{item.title}}
        </n-text>
        <n-text class="en-title">
          {{item.subtitle}}
        </n-text>
      </div>
    </div>
  </div>

  <n-scrollbar style="max-height: 37.2em;">
    <div class="bottom-container">
      <!--数据卡片-->
      <card-box :active-tab="activeTab" />

      <!--折线图-->
      <line-chart :active-tab="activeTab" />
    </div>
  </n-scrollbar>
</template>

<style scoped lang="scss">
$blue-grey: #78909C;
$dark: #5E6366;

.tabs-container {
  display: flex;
  gap: 7em;
  padding: 0 1em;
}

.statistic-brand {
  display: flex;
  align-items: center;
  gap: .6em;
}

.click {
  cursor: pointer;
}

.shallow {
  opacity: .6;
}

.tab-title {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.zh-title {
  font-family: 'PingFang SC';
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.44px;
}

.en-title {
  font-family: 'Roboto';
  font-size: .75rem;
  color: $dark;
  letter-spacing: 0.4px;
}

.bottom-container {
  box-sizing: border-box;
  padding: 3em;
  display: flex;
  flex-direction: column;
}

</style>