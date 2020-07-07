import Vue from 'vue'
import App from './App'

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: h => h(App) // https://css-tricks.com/what-does-the-h-stand-for-in-vues-render-method/
})
/*
new Vue({
  el: '#app',
  // render : (h) => h(App) //매개변수가 하나만 있을때는 괄호 없어도 됨
  render: h => h(App)//매개변수가 하나만 있을때는 괄호 없어도 됨
  // render : (h) => {    return h(App)  }
  // render (craeteElement) {
  //    return createElement(App)
  // }
})
*/
