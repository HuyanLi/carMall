<!-- 分享任务 -->
<template>
	<view class="share">
		<view class="textList">
			<view class="uni-flex uni-row textItem" v-for="(item,index) in textList" :key='index'>
				<view class="text uni-flex" style="-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;">
					<image :src="item.image"></image>
				</view>
				<view class="uni-flex uni-column">
					<view class="text title" style="text-align: left;">
						{{item.title}}
					</view>
					<view class="text content">{{item.name}}</view>
					<view class="text" style="text-align: right;">
						<button class="btn" type="default" plain="true" @click="toDetail(item)">查看</button>
					</view>
				</view>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {contentList} from '@/api/home.js'
	export default {
		data() {
			return {
				textList:[]
			}
		},
		created() {
			this.initTestList()
		},
		methods: {
			async initTestList() {
				let query = {
					status: 1,
					page: 1
				}
				let data = await contentList(query)
				this.textList = data.data.rows
			},
			toDetail(e) {
				uni.navigateTo({
					url: '/pages/home/shareTask/shareDetail?id=' + e.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.share {
	width: 750rpx;
	// padding: 20rpx 30rpx;
	.textList{
		width: 690rpx;
		margin: 20rpx auto;
		.textItem{
			// height: 212rpx;
			background: #FFFFFF;
			margin-bottom: 20rpx;
			border-radius: 16rpx;
			image {
				margin: 30rpx 20rpx;
				width: 160rpx;
				height: 160rpx;
			}
			.title {
				font-family: PingFangSC-Semibold;
				font-weight: 600;
				font-size: 28rpx;
				color: #373737;
				margin: 20rpx 0;
				width: 469rpx;
			}
			.content {
				// margin: 20rpx 0;
				width: 469rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				font-size: 24rpx;
				color: #A6A6A6;
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
		}
	}
	.btn {
		margin-top: 10rpx;
		width: 147rpx;
		height: 54rpx;
		line-height: 54rpx;
		background: #202425;
		border-radius: 4rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		font-size: 24rpx;
		color: #FFFFFF;
		margin-right: 5rpx;
	}
}
</style>
