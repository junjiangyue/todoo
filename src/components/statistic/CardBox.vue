<script lang="ts" setup>

const props = defineProps<{
  // 激活tab
  activeTab: string
}>()

// 卡片items
const cardItems = [
  {
    title: '事件工作量',
    value: '15',
    extraUp: '相比前天',
    extraDown: '+4',
    style: {
      backgroundColor: '#069697',
    }
  },
  {
    title: '番茄专注时长',
    value: '2.4h',
    extraUp: '相比前天',
    extraDown: '+0.6h',
    style: {
      backgroundColor: '#FF6666',
    }
  },
  {
    title: '番茄收成',
    value: '6',
    extraUp: '相比前天',
    extraDown: '+2',
    style: {
      backgroundColor: '#FF6600',
    }
  },  
  {
    title: '事件达成数',
    value: '4',
    extraUp: '相比前天',
    extraDown: '+0',
    style: {
      backgroundColor: '#0065C1',
    }
  },  
]
</script>

<template>
  <div class="cards-container">
    <div
      v-for="item in cardItems"
      class="card-wrapper"
      :style="item.style">
      <div class="card-title">
        {{item.title}}
      </div>
      <div class="sub-part">
        <p class="card-value">
          {{item.value}}
        </p>
        <div class="card-extra">
          <p>{{item.extraUp}}</p>
          <p>{{item.extraDown}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
p {
  margin: 0;
}

.cards-container {
  display: flex;
  justify-content: space-around;
}

.card-wrapper {
  box-sizing: border-box;
  padding: 1em;
  font-family: 'PingFang SC';
  font-size: 1rem;
  border-radius: 1em;
  width: 13.25em;
  height: 8.5em;
  display: flex;
  flex-direction: column;
  color: white;
  overflow: auto;
  transition: box-shadow .4s ease-out;
  &:hover {
    box-shadow:  0 6px 12px -2px rgba(50,50,93,0.25), 0 3px 7px -3px rgba(0,0,0,0.3);
  }
}

.card-title {
  font-size: 1.375rem;
  letter-spacing: .15px;
  align-self: flex-start;
}

.sub-part {
  display: flex;
  align-items: flex-end;
  flex-grow: 1;
  gap: 1em;
}

.card-value {
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 2.625em;  
}

.card-extra {
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'PingFang SC';
  font-size: .8125em;
  letter-spacing: 0.15px;    
  font-style: normal;
  font-weight: 400;    
  line-height: 1.8em;
}

</style>