import VueRounter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopContainer from './components/tabbar/ShopContainer.vue'
import newsList from './components/news/newsList.vue'
import newsInfo from './components/news/newsInfo.vue'
import NewsPicture from './components/pictures/NewsPicture.vue'
import PictureInfo from './components/pictures/PictureInfo.vue'

// 创建路由对象
var router = new VueRounter({
  // 配置路由规则
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: HomeContainer},
    {path: '/member', component: MemberContainer},
    {path: '/cart', component: ShopContainer},
    {path: '/search', component: SearchContainer},
    {path: '/home/newsList', component: newsList},
    {path: '/home/newsInfo/:id', component: newsInfo},
    {path: '/home/NewsPicture', component: NewsPicture},
    {path: '/home/photoinfo/:id', component: PictureInfo},
  ], 
  // 覆盖默认路由高亮的类
  linkActiveClass: 'mui-active'
})

//  把对象路由暴露出去
export default router