<template>
	<div class="photoinfo">
		<h3> {{ photoinfo.title }}</h3>
		<p class="subtitle">
			<span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
			<span>点击：{{ photoinfo.click }}次</span>
		</p>
		<hr>
		<!-- 缩略图 -->
		<div class="thumbs">
			<!-- <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src"> -->
			<!-- 插件更新，上面的方法写了会报错！ -->
			<vue-preview :slides="list"></vue-preview>
		</div>

		<!-- 图片区域 -->
		<div class="content" v-html="photoinfo.content"></div>
       

       <cmt-box :id="id"></cmt-box>

	</div>
</template>


<script>
	import	comment from "../subcomponents/comment.vue"

	export default {
		data(){
			return {
              id: this.$route.params.id,
              photoinfo: {},
              list: []
			};
		},
		created(){
			this.getPhotoInfo();
			this.getThumbs();
		},
		methods:{
			// getPhotoInfo() {
			// 	this.$http.get("api/getimageInfo/" + this.id)
			// 	.then( result => {
			// 		if (result.body.status === 0) {
			// 			this.photoinfo = result.body.message[0];
			// 		}
			// 	})
			// },
			// 
			getPhotoInfo() {
				this.axios.get("api/getimageInfo/" + this.id)
				.then( res => {
					if (res.data.status === 0) {
						this.photoinfo = res.data.message[0];
					}
				})
			},
			// getThumbs(){
			// 	this.$http.get("api/getthumimages/" + this.id).then( result => {
			// 		if (result.body.status === 0) {
			// 			result.body.message.forEach(item => {
			// 				item.w = 600;
			// 				item.h = 400;
			// 				item.msrc = item.src;
			// 			});
			// 			this.list = result.body.message;
			// 		}
			// 	})
			// }
			// 
			getThumbs(){
				this.axios.get("api/getthumimages/" + this.id).then( res => {
					if (res.data.status === 0) {
						res.data.message.forEach(item => {
							item.w = 600;
							item.h = 400;
							item.msrc = item.src;
						});
						this.list = res.data.message;
					}
				})
			}

		},
		components:{
				"cmt-box": comment
			}
	}
</script>


<style scoped lang="scss">
	

	.photoinfo{
		padding:3px;
		h3{
			color: #26a2ff;
			font-size: 15px;
			text-align: center;
			margin: 15px 0;
		}
		.subtitle{
			display: flex;
			justify-content: space-between;
			font-size: 13px;
		}
		.content{
			font-size: 13px;
			line-height: 30px;
		}
		.thumbs{
			//使用 scoped 后 父组件的样式将不会渗透到子组件中 
            //deep 深度选择器来解决这个问题
            /deep/ .my-gallery{
            	display:flex;
            	flex-warp:warp;
            	figure{
            		width:40%;
            		margin:5px;
            	  img{
				      width:100%;
				      box-shadow: 0 0 5px #999;
				      border-radius:5px;
			}
            	}
            }
			
		}
	}
</style>