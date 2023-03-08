import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import TodoApp from '@/views/TodoApp.vue'

const routes = [
  {
    name: 'index',
    path: '/', 
    component: () => Home,
  },
  {
    name: 'about',
    path: '/about',  
    component: () => About,
  },
  {
    name: 'todos',
    redirect: '/todos/all', 
    path: '/todos',  
    component: () => TodoApp,
    children: [
      {
        name: 'todos-filter', // : 사용 불가
        path: ':id' // : 다음부터 파라미터 적용하겠다 id로 params값이 들어감
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router