<template>
  <div>
    <!-- 顶部滑动条 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
            {{ item.title }}
          </a>
        </div>
      </div>
    </div>

    <!-- 图片列表 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+ item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>


<script>

	import mui from "../../lib/mui/js/mui.min.js";
  import { Toast } from "mint-ui";
	export	default{
		data() {
    return {
      cates: [], //所有分类
      list: [] //图片列表
    };
  },
  
  created() {
    this.getimgcategory();
    this.getPhotoListByCateId(0); //默认进入页面 请求全部列表的图片
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    });
  },
		methods:{
			// getimgcategory(){
			// 	this.$http.get("api/getimgcategory")
			// 	.then(result => {
			// 		if (result.body.status === 0) {
			// 			result.body.message.unshift({
			// 				title:"全部",id: 0 });
   //          this.cates = result.body.message;
			// 		}
			// 	});
			// },
			// getPhotoListByCateId(id) {
			// 	this.$http.get("api/getimages/" + id)
			// 	.then(result => {
			// 		if (result.body.status === 0) {
			// 			this.list = result.body.message;
   //          if (result.body.message.length === 0) {
   //         Toast({
   //            message: "对不起,暂无图片列表",
   //            position: "middle",
   //            duration: 500
   //          });
   //          }
			// 		}
			// 	})
			// }
      
      getimgcategory(){
        this.axios.get("api/getimgcategory")
        .then(res => {
          if (res.data.status === 0) {
            res.data.message.unshift({
              title:"全部",id: 0 });
            this.cates = res.data.message;
          }
        });
      },
      getPhotoListByCateId(id) {
        this.axios.get("api/getimages/" + id)
        .then(res => {
          if (res.data.status === 0) {
            this.list = res.data.message;
            if (res.data.message.length === 0) {
           Toast({
              message: "对不起,暂无图片列表",
              position: "middle",
              duration: 500
            });
            }
          }
        })
      }
		}
	}
</script>


<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>
