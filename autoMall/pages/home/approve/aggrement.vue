<!-- 认证协议 -->
<template>
	<view class="aggrement">
		<rich-text v-if="content !== ''" :nodes="content"></rich-text>
		<view  v-else> 暂无数据 </view>
	</view>
</template>

<script>
	import { registerGift } from '@/api/home.js'
	export default {
		data() {
			return {
				content: ''
			}
		},
		onShow() {
			this.initcontent()
		},
		methods: {
			initcontent() {
				registerGift().then(res=>{
					this.content = res.data.authenticat_note
				})
			}
		}
	}
</script>

<style>
.aggrement {
	/* width: 100%; */
	/* height: 100%; */
	background: #fff;
	padding: 30rpx;
	text-align: center;
}
</style>
