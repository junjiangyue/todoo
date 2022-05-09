# todoo

HCI-Final

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## 一些说明

\<script setup> 是组合式 API(Composition API)的写法，将其**改为\<script>**即可正常使用 Vue 2 的选项式 API(Options API)，但注意变化的特性()。

``` vue
<template>
  <button @click="increment">count is: {{ count }}</button>
</template>
 
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++;
    }
  },
  mounted() {
    console.log(`The initial count is ${this.count}.`);
  }
}
</script>
```

若要使用 Compostion API，即\<script setup>，请查阅：https://staging-cn.vuejs.org/guide/introduction.html，并在左侧栏将 API 风格偏好切换为'组合式'，下面是一些说明：

```vue
<script setup>
// <script setup>中的代码在组件初始化时会先全部执行一遍，可以大概视作created()钩子
// 引入后可以直接使用
import '@/components/XX.vue'

// 定义响应式数据(等效于Options API中的data()中定义的数据)，这些数据在更新后会引发组件更新
import { reactive, ref } from 'vue'
// reactive 只能用于对象
const counter = reactive({
	count: 0
})
// ref 可以用于任何类型的变量，但在<script>要通过.value访问
const userID = ref('1951001')
console.log(userID.value)

// Options API中method:定义的函数，可以在<script setup>中直接定义
function printCounter () {
	console.log(counter)
}

const printUserID = () => {
	// 注意ref数据通过.value访问
	console.log(userID.value)
}

// 使用宏defineProps和defineEmits定义props和emits
const props = defineProps({
	prop1: String,
	prop2: {
		required: true,
		type: Number
	}
})

const emits = defineEmits(['emit-one', 'emit-two'])

// computed 和 watch 需要引入API
import { computed , watch } from 'vue'
const userIdentity = computed(() => {
	if (userID.value.length > 0) {
		return 'Member'
	} else {
		return 'Visitor'
	}
})
watch(userID, () => {
	console.log(`userID changed to ${userID.value}`)
})

// 生命周期钩子同样需要引入
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated } from 'vue'
onMounted(() => {
	console.log(`Component is mounted.`)
})
</script>
```

下面的项目结构中，标注为**(删)**的是初始化项目自带的演示文件，在写代码时会先将文件全部删除(保留目录)；标注为**(改)**的在写代码时根据需要进行修改。

## 项目结构

```
todoo
├─ index.html // 项目入口
├─ package-lock.json
├─ package.json // 依赖配置
├─ public // 公共资源
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ App.vue	// Vue 入口(改)
│  ├─ assets	// 静态资源(删)
│  │  ├─ base.css
│  │  └─ logo.svg
│  ├─ components // 组件(删)
│  │  ├─ HelloWorld.vue
│  │  ├─ icons
│  │  │  ├─ IconCommunity.vue
│  │  │  ├─ IconDocumentation.vue
│  │  │  ├─ IconEcosystem.vue
│  │  │  ├─ IconSupport.vue
│  │  │  └─ IconTooling.vue
│  │  ├─ TheWelcome.vue
│  │  └─ WelcomeItem.vue
│  ├─ main.js // 入口文件(改)
│  ├─ router
│  │  └─ index.js
│  ├─ stores // 状态管理工具(改)
│  │  └─ counter.js
│  └─ views // 主体页面(删)
│     ├─ AboutView.vue
│     └─ HomeView.vue
└─ vite.config.js // 项目配置(改)

```
