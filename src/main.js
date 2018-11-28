// 入口文件
import Vue from 'vue'
// 导入并注册路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)  

//  导入App组件
import app from './App.vue'

import VueResource from 'vue-resource'
Vue.use(VueResource)

// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'

// 全局处理编码为 application/json 格式的请求 
Vue.http.options.emulateJSON = true;

// 按需导入 mint-ui 中的 Header组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUi from 'mint-ui'
Vue.use(MintUi)
import 'mint-ui/lib/style.css'

// 导入 mui
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 导入自己的 router.js 模块
import router from './router.js'

// 定义全局过滤器
// Vue.filter('dateFormat', (dateStr, pattern="") => {
//   var dt = new Date(dateStr)

//   var year = dt.getFullYear()
//   var month = dt.getMonth() + 1
//   var day = dt.getDate()

//   if(pattern.toLowerCase() == 'yyyy-mm-dd') {
//     return `${year}-${month}-${day}`
//   } else {
//     var hour = dt.getHours()
//     var minu = dt.getMinutes()
//     var sec = dt.getSeconds()
//     return `${year}-${month}-${day} ${hour}:${minu}:${sec}`
//   }
// })

// 导入node里面的moment模块而不是自己定义过滤器
import moment from 'moment'

Vue.filter('dateFormat', (dataStr, pattern="YYYY-MM-DD HH:MM:SS") => {
  return moment(dataStr).format(pattern)
})

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router
})