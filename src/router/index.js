import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'daily-todo',
      component: () => import('@/views/DailyTodo.vue'),
      children:[
        {
          path:'/TimeTable',
          name:'TimeTable',
          components:{
            modeShift:()=> import('@/views/TimeTable.vue')
           }
        },
        {
          path:'',
          name:'ListMode',
          components:{
            modeShift:()=> import('@/views/ListMode.vue')
           }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('@/views/Calendar.vue')
    },
    {
      path: '/todo-asset',
      name: 'todo-asset',
      component: () => import('@/views/TodoAsset.vue')
    },
    {
      path: '/statistic',
      name: 'statistic',
      component: () => import('@/views/Statistic.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/Settings.vue')
    }
  ]
})

export default router
