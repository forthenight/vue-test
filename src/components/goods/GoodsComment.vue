<template>
	<div>
		<cmt-box :id="$route.params.id"></cmt-box>
	</div>
</template>

<script>

	import cmtbox from "../subcomponents/comment.vue";
	export default {
		components: {
           "cmt-box":cmtbox
		}
	}
</script>
<style>
	
</style>