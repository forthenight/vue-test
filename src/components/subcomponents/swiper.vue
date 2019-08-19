<template>
	<div>
		 <mt-swipe :auto="4000">
    
      <mt-swipe-item v-for="item in lunbotuList" :key="item.img">
      	  <img :src="item.img" :class="{ 'full':isfull }" alt="图片加载不出来！">
      </mt-swipe-item>
  
    </mt-swipe>
	</div>
</template>

<script>
	 export default {
	 	props:["lunbotuList", "isfull"]
	 }

</script>


<style lang="scss" scoped>
	.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>