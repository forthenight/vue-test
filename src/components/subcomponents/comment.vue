<template>
	<div class="cmt-container">
		
		<h3>发表评论</h3>
		<hr>
		<textarea placeholder="请输入要评论的内容（最多120字）" maxlength="120" v-model="msg"></textarea>
   <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
        	<div class="cmt-item" v-for="(item, i) in comments" :key="item.add_tiem">
        		<div class="cmt-title">
        			第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
        		</div>
        		<div class="cmt-body">
        			{{ item.content === '' ? '此用户很懒，什么都没留下': item.content }}
        		</div>
        	</div>
        </div>
   <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>

	</div>
</template>

<script>
	import { Toast } from "mint-ui";
	export default{
		data(){
			return{
				pageIndex:1, //默认展示第一页数据
				comments:[],  //所有的评论数据
                msg: ''
			}
		},
		created(){
			this.getComments();
		},
		methods:{
            // getComments(){  //获取评论数据的方法
            // 	this.$http.get("api/getcomments/" + this.id +"?pageindex=" + this.pageIndex)
            // 	.then(result => {
            // 		if (result.body.status === 0) {
            //             //用数组的concat方法拼接评论页
            //             this.comments = this.comments.concat(result.body.message);
            // 		}else{
            // 			Toast("获取评论数据失败");
            // 		}
            // 	})
            // },
            // 
            getComments(){  //获取评论数据的方法
                this.axios.get("api/getcomments/" + this.id +"?pageindex=" + this.pageIndex)
                .then(res => {
                    if (res.data.status === 0) {
                        //用数组的concat方法拼接评论页
                        this.comments = this.comments.concat(res.data.message);
                    }else{
                        Toast("获取评论数据失败");
                    }
                })
            },
             getMore(){
             	this.pageIndex++;
             	this.getComments();
             },
            // postComment(){
            //     if (this.msg.trim().length === 0) {
            //         return Toast("评论不能为空!");
            //     }
            //     this.$http.post("api/postcomment/" + this.$route.params.id,{
            //         user_name: '匿名用户', 
            //         add_time: Date.now(), 
            //         content: this.msg.trim()
            //     })
            //     .then(function(result){
            //         if (result.body.status === 0) {
            //             var cmt = {
            //              user_name: '匿名用户', 
            //              add_time: Date.now(), 
            //              content: this.msg.trim()
            //               };
            //             this.comments.unshift(cmt);
            //             this.msg = '';
            //         }
            //     })
            // }
            // 
               postComment(){
                if (this.msg.trim().length === 0) {
                    return Toast("评论不能为空!");
                }
                this.axios.post("api/postcomment/" + this.$route.params.id,{
                    user_name: '匿名用户', 
                    add_time: Date.now(), 
                    content: this.msg.trim()
                })
                .then(res => {
                    if (res.data.status === 0) {
                        var cmt = {
                         user_name: '匿名用户', 
                         add_time: Date.now(), 
                         content: this.msg.trim()
                          };
                        this.comments.unshift(cmt);
                        this.msg = '';
                    }
                })
            }   
		},
		props:["id"]
	}
</script>


<style lang="scss" scoped>
	.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
}
.cmt-item{
    font-size: 13px;
}
.cmt-title{
    line-height: 30px;
    background-color: #ccc;
}
.cmt-body{
    line-height: 35px;
    text-indent: 2em;
}
.cmt-list{
    margin: 10px 0;
}
</style>