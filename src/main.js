//入口文件
import Vue from 'vue'
//导入路由
// import Vue from '../node_modules/vue/dist/vue.js'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//每次刚进入网站，肯定会调用main.js，在刚调用的时候，先从本地存储中，把购物车的数据读出来，放到store中
var car = JSON.parse(localStorage.getItem('car')  || '[]')

var store = new Vuex.Store({
	state: {
		car: car
	},
	mutations: { //this.$store.commit('方法名称',按需导入唯一的参数)
		addToCar(state,goodsinfo) {
           var flag = false

           state.car.some(item => {
           	if (item.id == goodsinfo.id) {
           		item.count += parseInt(goodsinfo.count)
           		flag = true
           		return true
           	}
           })

           //如果最终循环完毕，得到的flag还是false，则把商品数据push到购物车中
           if (!flag) {
           	state.car.push(goodsinfo)
           }
           //每当更新car之后，把car数组存储到本地的localStorage中去
           localStorage.setItem('car',JSON.stringify(state.car))
		},
        updateGoodsInfo(state,goodsinfo) {
        	//修改购物车中商品的数量值
        	state.car.some(item => {
        		if (item.id == goodsinfo.id) {
        			item.count = parseInt(goodsinfo.count)
        			return true
        		}
        	})
        	//当修改完商品的数量，把最新的购物车数据，保存到本地存储
        	localStorage.setItem('car',JSON.stringify(state.car))
        },
         removeFormCar(state,id) {
         	//根据id从store中的购物车中删除对应的商品数据
         	state.car.some((item,i) => {
         		if (item.id == id) {
         			state.car.splice(i,1)
         			return true;
         		}
         	})
         	//将删除完毕后的最新数据同步到本地存储中
         	localStorage.setItem('car',JSON.stringify(state.car))
         },
        updateGoodsSelected(state, info) {
        	state.car.some(item => {
        		if (item.id == info.id) {
        			item.selected = info.selected
        		}
        	})
        	//把最新的所有购物车商品的状态保存到state中去
        }
	},
	getters:{ //this.$store.getters.***
      //相当于计算属性，也相当于filters
      getAllCount(state){
      	var c = 0;
      	state.car.forEach(item => {
      		c += item.count
      	})
      	return c
      },
      getGoodsCount(state){
      	var o ={}
      	state.car.forEach(item => {
      		o[item.id] = item.count
      	})
      	return o
      },
      getGoodsSelected(state){
      	var o = {}
      	state.car.forEach(item =>{
            o[item.id] = item.selected
        })
        return o
	  },
	    getGoodsCountAndAmount(state) {
		  var o = {
			count: 0,
			amount: 0
		}
		state.car.forEach(item => {
			if (item.selected) {
				o.count += item.count
				o.amount += item.price * item.count
			}
		})
		return o
	}
  }
})
//导入格式化时间的插件
import moment from 'moment'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
// 
// 定义全局的过滤器
Vue.filter('dateFormat',function(dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
	return moment(dataStr).format(pattern)
})
Vue.use(Mint)
// 导入vue-resource
// import VueResource from 'vue-resource'
// Vue.use(VueResource)
// //设置全局的请求根路径
// Vue.http.options.root = 'http://www.liulongbin.top:3005';

// //全局设置post表单数据格式组织形式
// Vue.http.options.emulateJOSN = true;

//导入axios包
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)
axios.defaults.baseURL = 'http://www.liulongbin.top:3005';


//导入MUI的样式
import './lib/mui/css/mui.min.css'
//导入MUI的扩展图标样式
import './lib/mui/css/icons-extra.css'

// import './css/main.css'

//按需导入mint-ui中的组件
// import {Header, Swipe, SwipeItem, Button } from 'mint-ui'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name,Swipe)
// Vue.component(SwipeItem.name,SwipeItem)
// Vue.component(Button.name,Button)

//安装图片预览插件
import Vuepreview from 'vue-preview'
Vue.use(Vuepreview)

// 导入app根组件
import app from './App.vue'
//导入自己的router路由模块
import router from './router.js'


var vm = new Vue({
	el:'#app',
	// render:function(createElements){
	// 	return createElements(login)
	// }
	// 返回render函数
	render: c => c(app),
	router,
	store
})
