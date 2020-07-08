import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '~/views/Home'
import About from '~/views/About'
import TodoApp from "~/views/todoApp";

Vue.use(VueRouter)

const routes = [
  //config
  {
    name: 'index',
    path: '/',  //사이트의 최상위 페이지다. http://my-site.com/
    component: Home
  },
  {
    name: 'about',
    path: '/about',  //사이트의 최상위 페이지다. http://my-site.com/
    component: About
  },
  {
    name: 'todos',
    redirect: '/todos/all', // 특정 페이지로 보내버림
    path: '/todos',  //사이트의 최상위 페이지다. http://my-site.com/
    component: TodoApp,
    //또 하나의 라우트객체
    children: [
      {
        name: 'todos-filter', // : 사용 불가
        path: ':id' // : 다음부터 파라미터 적용하겠다 id로 params값이 들어감
      }
    ]
  }
]

export default new VueRouter({
// https://router.vuejs.org/kr/guide/essentials/history-mode.html
//   mode: 'history',
  routes
})
