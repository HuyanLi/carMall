<template>
	<view class="mine">
		<view class="top-bg" :class="authentication ? 'blue' : ''">
			<view id="head" class="head" :style="'padding-top:' + statusBarHeight + 'px'">我的</view>
			<view class="info">
				<view class="info-img">
					<image @tap="handleInfoView" class="img" src="https://baiyuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png">
				</view>
				<view class="info-content">
					<view>
						<text class="info-name">Latte今天喝拿铁</text>
						<image class="info-title" src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/tuanzhang.png">
					</view>
					<view class="info-invit-code">邀请码：S4SDF7</view>
				</view>
				<image @tap="handleInfo" class="edit" :src="authentication ? 'https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/editWhite.png' : 'https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/edit.png'"/>
			</view>
		</view>

		
		<view class="order">
			<view class="order-title">
				<view class="order-mine">我的订单</view>
				<view class="order-all" @tap="handleAllOrder">全部订单<image class="order-all-img" src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/mineRight.png"/></view>
			</view>
			<view class="order-content">
				<view v-for="(item, index) in order" :key="index" @tap="handleOrder(index)" class="order-item">
					<image class="order-image" :src="item.img">
					<view class="order-name">{{item.name}}</view>
				</view>
			</view>
		</view>
		
		<view class="wallet" @tap="handleTool('/pages/mine/wallet')">
			<view class="wallet-title">我的钱包</view>
			<view class="wallet-money">11634.00</view>
			<view class="wallet-btn" @tap="handleAllOrder">可提现<image class="order-all-img" src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/mineRight.png"/></view>
			<img class="coins" src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/coins.png"/>
		</view>
		
		<view class="tool">
			<view class="tool-title">
				<view class="tool-mine">常用工具</view>
			</view>
			<view class="tool-content">
				<view v-for="(item, index) in tool" :key="index" class="tool-item" @tap="handleTool(item.url)">
					<image class="tool-image-small" :src="item.img">
					<view class="tool-name">{{item.name}}</view>
				</view>
			</view>
		</view>
		<!-- tabBar -->
		<tab-bar :current="currentTabIndex" backgroundColor="#fbfbfb" color="#999" tintColor="#42b983" @click="tabClick"></tab-bar>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				authentication: true,
				statusBarHeight: 0,
				currentTabIndex: 3,
				order: [
					{
						img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/daifk.png',
						name: '待付款',
					},
					{
						img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/daifh.png',
						name: '待发货',
					},
					{
						img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/daish.png',
						name: '待收货',
					},
					{
						img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/daipj.png',
						name: '待评价',
					},
				],
				tool: [
					{
						img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/zhanneixin.png',
						name: '站内信',
						url: '/pages/mine/message'
					},
					{
						img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/wodequanyi.png',
						name: '我的权益',
					},
					{
						img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/shouhuodizhi.png',
						name: '收货地址',
						url: '/pages/store/shipAddress/shipAddress'
					},
					{
						img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/lianxikefu.png',
						name: '联系客服',
					},
					{
						img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/lianxikefu.png',
						name: '我的钱包',
						url: '/pages/mine/wallet'
					},
					{
						img: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/lianxikefu.png',
						name: '我的仓库',
						url: '/pages/mine/warehouse'
					},
				]
			}
		},
		
		onLoad() {
			const _this = this
			wx.getSystemInfo({
			  success(res) {
				  _this.statusBarHeight = res.statusBarHeight;
			  },
			});
		},
		
		methods: {
			handleInfo() {
				uni.navigateTo({
					url: "/pages/mine/infoEdit"
				})
			},
			handleInfoView() {
				uni.navigateTo({
					url: "/pages/mine/info"
				})
			},
			handleAllOrder() {
				uni.navigateTo({
					url: "/pages/mine/orderList?activeIndex=0"
				})
			},
			handleOrder(index) {
				uni.navigateTo({
					url: `/pages/mine/orderList?activeIndex=${index+1}`
				})
			},
			handleTool(url) {
				uni.navigateTo({
					url
				})
			}
 		}
	}
</script>

<style lang="scss" scoped>
.mine {
	padding-bottom: 120rpx;
	padding-top: 164rpx;
	position: relative;
}

.edit {
	width: 30rpx;
	height: 28rpx;
	position: absolute;
	right: 80rpx;
	top: 50%;
	transform: translate3d(0,-50%,0);
}

.wallet {
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	padding: 0 0 0 30rpx !important;
	.coins {
		width: 154rpx;
		height: 135rpx;
	}
	&-title {
		font-weight: 500;
		font-size: 30rpx;
		color: #000000;
	}
	&-money {
		font-weight: 500;
		font-size: 42rpx;
		color: #7D0016;
	}
	
	&-btn {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-weight: 400;
		font-size: 24rpx;
		color: #999999;
	}
}

.top-bg {
    background: url('https://baiyuechangxiong-pic.luobo.info/che/static/image/mine/mineBackground.png');
    background-position: center top;
    background-size: cover;
	width: 100%;
    height: 418rpx;
    box-sizing: content-box;
	position: absolute;
	left: 0;
	top: 0;
}
.top-bg.blue {
	background: #003488;
	color: #ffffff;
	.head {
		color: #ffffff;
	}
}
.head {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 88rpx;
  text-align: center;
  line-height: 88rpx;
  font-size: 36rpx;
  font-weight: 500;
  color: #000000;
  box-sizing: content-box;
  z-index: 8000;
  background: transparent;
}
.info {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-left: 50rpx;
	margin-top: 168rpx;
	position: relative;
	&-img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		border: 5rpx solid #ffffff;
		overflow: hidden;
		.img {
			width: 100%;
			height: 100%;
		}
	}
	&-content {
		flex: 1;
		margin-left: 15rpx;
	}
	&-name {
		font-weight: 500;
		font-size: 36rpx;
	}
	&-title {
		width: 107rpx;
		height: 35rpx;
		margin-left: 17rpx;
	}
}

.order, .tool, .wallet {
	transform: translate3d(0,120rpx,0);
	margin: 20rpx 30rpx 0;
	border-radius: 16rpx;
	background: #ffffff;
	padding: 36rpx 0;
	z-index: 9999;
	&-title {
		height: 64rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 31rpx;
		line-height: 64rpx;
	}
	&-mine {
		color: #000000;
		font-size: 30rpx;
		font-weight: 500;
	}
	&-all {
		color: #777777;
		font-size: 26rpx;
		font-weight: 400;
		display: flex;
		flex-direction: row;
		align-items: center;
		&-img {
			width: 15rpx;
			height: 25rpx;
			margin-left: 6rpx;
			display: block;
		}
	}
	&-item {
		width: 25%;
		text-align: center;
	}
	&-content {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	
	&-image {
		width: 58rpx;
		height: 58rpx;
		margin-top: 28rpx;
	}
	&-image-small {
		width: 42rpx;
		height: 42rpx;
		margin-top: 50rpx;
	}
	&-name {
		font-weight: 400;
		font-size: 28rpx;
		color: #1A1A1A;
	}
}

</style>
