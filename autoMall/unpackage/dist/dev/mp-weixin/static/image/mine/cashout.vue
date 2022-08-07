<template>
	<view class="cashout">
		<view class="bg"></view>
		<view class="cashout-content">
			<view class="cashout-content-top">
				<text>提现金额</text>
				<text class="link">提现记录</text>
			</view>
			<view class="cashout-content-input">
				<text class="bigfont">¥</text>
				<input type="number" v-model="count"/>
				<view class="cashout-content-input-button" @tap="handleOutAll">全部提现</view>
			</view>
			<view class="cashout-content-balance">
				当前余额：{{balance}}元
			</view>
			<view class="cashout-content-footer">
				<view class="cashout-content-footer-title">提现至</view>
				<view class="cashout-content-footer-content">
					<view>
						<img class="size33" src="../../static/image/mine/wechat.png" />
						<text class="we">微信</text>
						<text class="name">微微一笑很倾城</text>
					</view>
					<img class="size30" src="../../static/image/mine/duigou.png" />
				</view>
			</view>
			<view class="cashout-button">
				提现
			</view>
		</view>
		<view class="cashout-footer">
			提现即表示同意<text>《车后市场分销协议》</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				balance: '3200.00',
				count: '',
			}
		},
		methods: {
			handleOutAll() {
				this.count = this.balance
			},
		}
	}
</script>

<style lang="scss" scoped>
.cashout {
	position: relative;
	.bg {
		height: 220rpx;
		background: linear-gradient(0deg, #FFFFFF, #003488);
		transform: translate3d(0,-3rpx,0);
	}
	.link {
		color: #134488;
		text-decoration: underline; 
		font-size: 24rpx;
	}
	.bigfont {
		font-weight: Bold;
		font-size: 82rpx;
		color: #333333;
	}
	.size33 {
		width: 33rpx;
		height: 33rpx;
	}
	.size30 {
		width: 30rpx;
		height: 30rpx;
	}
	&-footer {
		width: 450rpx;
		font-weight: 400;
		font-size: 26rpx;
		color: #000000;
		position: fixed;
		left: 50%;
		bottom: 60rpx;
		transform: translate3d(-50%, 0, 0);
		text-align: center;
		text {
			color: #134488;
		}
	}
	&-button {
		height: 88rpx;
		background: #202425;
		border-radius: 8rpx;
		font-weight: 400;
		font-size: 28rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 88rpx;
		margin-top: 64rpx;
	}
	&-content {
		width: 90%;
		height: 658rpx;
		margin: 0 auto;
		transform: translate3d(0,-185rpx,0);
		background: #ffffff;
		border-radius: 16rpx;
		padding: 44rpx 38rpx 31rpx 30rpx;
		box-sizing: border-box;
		&-top {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			font-size: 26rpx;
			font-weight: 400;
		}
		&-input {
			display: flex;
			flex-direction: row;
			align-items: baseline;
			justify-content: space-between;
			border-bottom: 1px solid #CFCFCF;
			&-button {
				width: 130rpx;
				height: 54rpx;
				background: #134488;
				border-radius: 4rpx;
				line-height: 54rpx;
				font-weight: 400;
				font-size: 24rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}
		
		&-balance {
			font-weight: 400;
			font-size: 26rpx;
			color: #000000;
			margin-top: 40rpx;
		}
		&-footer {
			margin-top: 109rpx;
			&-title {
				font-weight: 600;
				font-size: 32rpx;
				color: #333333;
			}
			&-content {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				>view {
					display: flex;
					flex-direction: row;
					align-items: center;
					font-weight: 400;
					font-size: 26rpx;
					.we {
						margin-left: 13rpx;
						color: #000000;
					}
					.name {
						margin-left: 20rpx;
						color: #666666
					}
				}
			}
			
		}
	}
	
}
</style>
