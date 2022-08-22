<template>
	<view class="service">
		<view class="service-content">
			<view class="">
				<text>常见问题</text>
			</view>
			<view class="service-text">
				<rich-text :nodes="content"></rich-text>
			</view>
		</view>
		<button type="default" open-type="contact" session-from="sessionFrom" @tap.stop="toShare">在线客服</button>
		<!-- tabBar -->
		<tab-bar :current="currentTabIndex" :tabbar='tabbar' :approve='approve' backgroundColor="#fbfbfb" color="#999" tintColor="#42b983" @click="tabClick"></tab-bar>
	</view>
</template>

<script>
	import { getQuestion } from '@/api/service.js'
	import { getBankInfo } from '@/api/store.js'
	export default {
		data() {
			return {
				currentTabIndex: 2,
				content: '',
				tabbar: uni.getStorageSync('tabbar')
			}
		},
		created() {
			this.initQuestion()
		},
		methods: {
			initQuestion() {
				getBankInfo().then(res=>{
					if(res.code === 1) {
						this.content = res.data.member_note
					}
				})
			},
			toShare(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
.service {
	padding-bottom: 100rpx;
	// padding-top: 124rpx;
	position: relative;
	width: 750rpx;
	&-content {
		padding: 30rpx;
		// height: 1132rpx;
		background: #FFFFFF;
		text {
			color: #424242;
			display: inline-block;
			// margin: 0 0 30rpx 0;
			font-weight: 600;
			font-size: 28rpx;
		}
	}
	&-text {
		width: 100%;
		height: 1100rpx;
	}
	button {
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
		margin: 40rpx auto 30rpx;
		position: fixed;
		bottom: 100rpx;
		left: 30rpx;
	}
}
</style>
