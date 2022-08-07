<template>
	<view class="dialog" v-if="visible">
		<view class="dialog-content">
			<view class="dialog-title">{{title}}</view>
			<view class="dialog-btn">
				<text class="cancel" @tap="cancel">{{cancelText || '取消'}}</text>
				<text class="confirm" @tap="confirm">{{confirmText || '确定'}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			title: String,
			cancelText: String,
			confirmText: String,
			visible: Boolean
		},
		data() {
			return {
				
			}
		},
		methods: {
			cancel() {
				this.$emit('cancel')
			},
			confirm() {
				this.$emit('confirm')
			},
		}
	}
</script>

<style lang="scss" scoped>
.dialog {
	width: 100vw;
	height: 100vh;
	background: rgba(0,0,0,.5);
	position: fixed;
	left: 0;
	top: 0;
	z-index: 99;
	&-content {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate3d(-50%,-50%,0);
		width: 538rpx;
		height: 261rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 62rpx 63rpx 41rpx 44rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		&-title {
			font-weight: 600;
			color: #424242;
		}
		
		.cancel {
			color: #8A8A8A;
			position: absolute;
			left: 265rpx;
			bottom: 41rpx;
		}
		.confirm {
			color: #134488;
			position: absolute;
			right: 63rpx;
			bottom: 41rpx;
		}
	}
}
</style>
