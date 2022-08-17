<!-- 试货、签约 -->
<template>
	<view class="tryGO">
		<view class="'topImg">
			<image v-if="sh" src="https://baiyuechangxiong-pic.luobo.info/che/static/image/home/shihuo.png"></image>
			<image v-else src="https://baiyuechangxiong-pic.luobo.info/che/static/image/home/qyImage.png"></image>
		</view>
		<view class="goodsList">
			<view class="goodsItem"  v-for="(item,index) in goodList" :key='index'>
				<view class="text">
					<image :src="item.imgSrc"></image>
				</view>
				<view class="fontText" style="-webkit-flex: 1;flex: 1;">{{item.text}}</view>
				<view class="money" style="-webkit-flex: 1;flex: 1;">￥{{item.money}}</view>
			</view>
		</view>
		<view class="tryGoods">
			<view class="shihuoLogo">
				<image v-if="sh" src="https://baiyuechangxiong-pic.luobo.info/che/static/image/home/sh.png" @click="toSH('sh')"></image>
				<image v-else src="https://baiyuechangxiong-pic.luobo.info/che/static/image/home/qyLogo.png" @click="toSH('qy')"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sh: true,
				goodList: [{
					imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
					text: '米家行车记录仪 GPS卫星全球定位 高清画面驱蚊器翁王企鹅驱蚊器王企鹅热污染',
					money: '2538.00'
				},{
					imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
					text: '米家行车记录仪 GPS卫星全球定位 高清画面',
					money: '2538.00'
				},{
					imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
					text: '米家行车记录仪 GPS卫星全球定位 高清画面地方',
					money: '111.00'
				},{
					imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
					text: '米家行车记录仪 GPS卫星全球定位 高清画面让人',
					money: '222.00'
				},{
					imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
					text: '米家行车记录仪 GPS卫星全球定位 高清画面驱蚊器',
					money: '33.00'
				}]
			}
		},
		onLoad(data) {
			if(data.shihuo === 'sh') {
				this.sh = true
			}else if(data.shihuo === 'qy'){
				this.sh = false
			}
		},
		methods: {
			toSH(e) {
				if(e == 'sh') {
					uni.navigateTo({
						url: '/pages/tabBar/mall/mall'
					})
				}else {
					uni.navigateTo({
						url: '/pages/tabBar/mall/mall'
					})
				}
				
			},
		}
	}
</script>

<style lang="scss" scoped>
.tryGO {
	width: 750rpx;
	background: #FFFFFF;
	// height: 100%;
	// margin-bottom: 100rpx;
	.topImg {
		image {
			width: 750rpx;
			height: 500rpx;
		}
	}
	.goodsList {
		border-radius: 16rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 30rpx 30rpx 100rpx;
		.goodsItem {
			// padding: 20rpx 18rpx 25rpx;
			image {
				width: 300rpx;
				height: 300rpx;
				margin: 20rpx 20rpx 30rpx;
			}
			.fontText {
				margin-left: 20rpx;
				width: 296rpx;
				display: block;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				font-size: 26rpx;
				color: #231F20;
				line-height: 36rpx;
				//文本超出部分以...形式展示
				text-overflow: -o-ellipsis-lastline;
				//整体超出部分隐藏
				overflow: hidden;
				//文本超出部分以...形式展示，同第一行样式代码
				text-overflow: ellipsis;
				//display 块级元素展示
				display: -webkit-box;
				//设置文本行数为2行
				-webkit-line-clamp: 2;
				//设置文本行数为2行
				line-clamp: 2;
				//从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
				-webkit-box-orient: vertical;
			}
			.money {
				font-family: PingFangSC-Regular;
				font-weight: 400;
				font-size: 30rpx;
				color: #ED1C24;
				text-align: justify;
				margin-left: 20rpx;
			}
		}
	}
	.tryGoods {
		.shihuoLogo {
			position: fixed;
			right: 20rpx;
			bottom: 300rpx;
			image {
				width: 80px;
				height: 80px;
			}
		}
	}
}
</style>
