/* 引入vue和主页 */
import Vue from 'vue'
import App from './App.vue'

/* 实例化一个vue */
new Vue({
  el: '#app',
  render: root => root(App)
})
