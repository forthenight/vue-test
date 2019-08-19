<template>
	<div>
		<!-- 轮播图区域 -->
      <swiper :lunbotuList="lunbotu" :isfull="true"></swiper>
     <!-- 六宫格 -->
     <!-- <mt-swipe :auto="4000">
            <mt-swipe-item><img src="../../images/swipe/1.jpg"></mt-swipe-item>
            <mt-swipe-item><img src="../../images/swipe/2.jpg"></mt-swipe-item>
            <mt-swipe-item><img src="../../images/swipe/3.jpg"></mt-swipe-item>
            <mt-swipe-item><img src="../../images/swipe/4.jpg"></mt-swipe-item>
        </mt-swipe> -->
         <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
              <img src="../../images/menu1.png" alt="">
              <div class="mui-media-body">新闻资讯</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
              <img src="../../images/menu2.png" alt="">
              <div class="mui-media-body">图片分享</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
              <img src="../../images/menu3.png" alt="">
              <div class="mui-media-body">商品购买</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../images/menu4.png" alt="">
              <div class="mui-media-body">留言反馈</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../images/menu5.png" alt="">
              <div class="mui-media-body">视频专区</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../images/menu6.png" alt="">
              <div class="mui-media-body">联系我们</div></a></li>
  </ul> 


	</div>
</template>



<script>
  
  import { Toast } from "mint-ui";
  import swiper from "../subcomponents/swiper.vue";

  export default {
  	data() {
  		return{
  			lunbotu:[]   //保存轮播图的数组
  		};
  	},
  	created(){
  		this.getLunbotu();
  	},
  	methods:{
  		// getLunbotu(){
    //     //获取轮播图数据的方法
  		// 	this.$http.get("api/getlunbo").then(result => {
    //       //请求数据成功
  		// 		if (result.body.status === 0) {
  		// 			this.lunbotu = result.body.message;
  		// 		}else{
  		// 			Toast("加载轮播图失败!");
  		// 		}
  		// 	});
  		// }
      
      getLunbotu(){
        //获取轮播图数据的方法
        this.axios.get("api/getlunbo").then(res => {
          //请求数据成功
          if (res.data.status === 0) {
            this.lunbotu = res.data.message;
          }else{
            Toast("加载轮播图失败!");
          }
        });
      } 
  	},
    components:{
      swiper
    }
  }

	
</script>


<style lang="scss" scoped>
	

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  img {
    width: 60px;
    height: 60px;
  }

  .mui-media-body{
    font-size: 13px;
  }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>