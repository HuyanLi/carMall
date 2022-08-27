<!-- 拼团活动 -->
<template>
	<view class="groupA">
		<view class="box">
			<rich-text :nodes="content"></rich-text>
			<button type="default" @click="toShare">去签约</button>
		</view>
	</view>
</template>

<script>
	import { getptStep } from '@/api/store.js'
	export default {
		data() {
			return {
				content: '',
				data: null,
				allNum: 0,
			}
		},
		onLoad(e){
			this.initContent()
			if(e) {
				this.data = e.data
				this.allNum = e.allNum
			}
		},
		methods: {
			initContent() {
				getptStep().then(res=>{
					this.content = res.data.activity_note
				})
			},
			toShare() {
				uni.navigateTo({
					url: '/pages/store/confirmOrder/confirmOrder?data=' + this.data +'&allNum=' +this.allNum 
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.groupA {
	margin: 0 auto 120rpx;
	width: 750rpx;
	background-color: #f8f8f8;
	.box {
		padding: 30rpx;
		button {
			position: fixed;
			bottom: 30rpx;
			left: 30rpx;
			width: 690rpx;
			height: 90rpx;
			line-height: 90rpx;
			background-color: #202425;
			border-radius: 8rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			font-size: 24rpx;
			color: #FFFFFF;
			letter-spacing: 0;
			text-align: center;
		}
	}
}
</style>
