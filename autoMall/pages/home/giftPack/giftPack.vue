<template>
	<view class="container">
		<view class="topCon">
			<image src="https://baiyuechangxiong-pic.luobo.info/che/static/image/register/top.png" mode=""></image>
		</view>
		<view class="yhq">
			<view class="textCou">
				认证后即可领取优惠券
			</view>
			<view class="coupons">
				<view class="couponsItem" v-for="(item,index) in couponsList" :key='index'>
					<text class="title">${{item.dollars}}</text>
					<text class="money">满{{item.money}}元可使用</text>
					<text class="getC" @click="getCoupons">立即领取</text>
				</view>
			</view>
			<view class="approve">
				<image @click="toApprove" src="https://baiyuechangxiong-pic.luobo.info/che/static/image/register/approve.png"></image>
			</view>
		</view>
		<view class="task">
			<view class="uni-flex uni-row taskImg">
				<view class="text" style="-webkit-flex: 1;flex: 1;" @click="toShare('share')">
					<image src="https://baiyuechangxiong-pic.luobo.info/che/static/image/register/share.png"></image>
				</view>
				<view class="text" style="-webkit-flex: 1;flex: 1;" @click="toShare('testReport')">
					<image src="https://baiyuechangxiong-pic.luobo.info/che/static/image/register/testReport.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				couponsList:[{
					dollars: 15,
					money: 50,
					image: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/register/coupons.png'
				},{
					dollars: 15,
					money: 50,
					image: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/register/coupons.png'
				},{
					dollars: 15,
					money: 50,
					image: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/register/coupons.png'
				},{
					dollars: 15,
					money: 50,
					image: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/register/coupons.png'
				}]
			}
		},
		methods: {
			//试货页面
			getCoupons(e) {
				uni.navigateTo({
					url: '/pages/home/tryCargo/tryCargo'
				})
			},
			// 认证页面
			toApprove() {
				uni.navigateTo({
					url: '/pages/home/approve/approve',
					success() {
						id:'gif'
					}
				})
			},
			//分享任务&测试报告
			toShare(e) {
				if(e === 'share') {
					uni.navigateTo({
						url: '/pages/home/shareTask/shareTask'
					})
				}else {
					uni.navigateTo({
						url: '/pages/home/testReport/testReport'
					})
				}
			}
		} 
	}
</script>

<style lang="scss" scoped>
.container {
	.topCon {
		image {
			width: 750rpx;
			height: 710rpx;
		}
	}
	.yhq {
		width: 750rpx;
		// height: 670rpx;
		background: #FFFFFF;
		border-radius: 16rpx 16rpx 0 0;
		border-radius: 16rpx 16rpx 0rpx 0rpx;
		margin-top: -100rpx;
		.textCou {
			font-family: PingFangSC-Regular;
			font-weight: 400;
			font-size: 26rpx;
			color: #9F9F9F;
			text-align: center;
			margin: 40rpx auto;
			padding: 40rpx 0 10rpx;
		}
		.coupons {
			// width: 750rpx;
			background: #FFFFFF;
			border-radius: 16rpx 16rpx 0 0;
			border-radius: 16rpx 16rpx 0 0;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0 80rpx;
			.couponsItem {
				width: 244rpx;
				height: 168rpx;
				margin-bottom: 30rpx;
				text-align: center;
				background-image: url(https://baiyuechangxiong-pic.luobo.info/che/static/image/register/coupons.png);
				background-repeat:no-repeat;
				background-size: 100%;
				text {
					display: block;
					font-family: PingFangSC-Regular;
					font-weight: 400;
				}
				.title {
						font-size: 49rpx;
						color: #FFFFFF;
					}
					.money {
						font-size: 24rpx;
						color: #FFFFFF;
						margin-bottom: 25rpx;
					}
					.getC {
						font-size: 24rpx;
						color: #003488;
					}
			}
			
		}
		.approve {
			text-align: center;
			image {
				width: 341rpx;
				height: 131rpx;		
				margin: 30rpx auto 20rpx;
			}
		}
	}
	.task{
		margin: 30rpx 0 70rpx;
		text-align: center;
		.taskImg {
			image {
				width: 334rpx;
				height: 212rpx;
			}
		}
	}
	
}
</style>
