<!-- 试货 -->
<template>
	<view class="tryGO">
		<view class="'topImg">
			<image :src="BGimage"></image>
		</view>
		<view class="goodsList">
			<view class="goodsItem" @click="toGoodsDetail(item)"  v-for="(item,index) in goodList" :key='index'>
				<view class="text">
					<image :src="item.image"></image>
				</view>
				<view class="fontText" style="-webkit-flex: 1;flex: 1;">{{item.title}}</view>
				<view class="money" style="-webkit-flex: 1;flex: 1;">￥{{item.price}}</view>
			</view>
		</view>
		<view class="tryGoods">
			<view class="shihuoLogo">
				<image src="https://carshop.duoka361.cn/images/static/image/home/sh.png" @click="toSH('sh')"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { goodsList } from '@/api/store.js'
	import { registerGift } from '@/api/home.js'
	export default {
		data() {
			return {
				sh: true,
				goodList: [],
				type: '1',
				BGimage: ''
			}
		},
		onShow(e) {
			//图片
			this.initRegisterGift()
			this.initGoods()
		},
		methods: {
			initRegisterGift() {
				registerGift().then(res=>{
					this.BGimage = res.data.trial_goods_image
				})
			},
			async initGoods() {
				let query = {
					brand_id: '',
					type: 2,
					page: 1
				}
				let data = await goodsList(query)
				this.goodList = data.data.rows
			},
			//商品詳情
			toGoodsDetail(item) {
				uni.navigateTo({
					url: '/pages/store/goodsDetail/goodsDetail?id=' + item.id
				})
			},
			toSH(e) {
				if(e == 'sh') {
					uni.navigateTo({
						url: '/pages/tabBar/mall/mall?type='+ e
					})
				}else {
					uni.navigateTo({
						url: '/pages/tabBar/mall/mall?type='+e
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
			border: 1px dashed #333;
			padding: 20rpx;
			image {
				width: 300rpx;
				height: 300rpx;
				// margin: 20rpx 0 30rpx;
			}
			.fontText {
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
			}
		}
	}
	.tryGoods {
		.shihuoLogo {
			position: fixed;
			right: 20rpx;
			bottom: 300rpx;
			image {
				width: 80rpx;
				height: 80rpx;
			}
		}
	}
}
</style>
