<!-- 内容详情 -->
<template>
	<view class="articleDetail">
		<view class="text">
			<text class="text1">{{title}}</text>
			<text class="text2">{{date}}</text>
		</view>
		<view class="richBox">
			<rich-text :nodes="content"></rich-text>
		</view>
		<button v-if="showNext" class="nextBtn" @click="nextArticle"
		>查看下篇</button>
		<button v-else class="nextBtn" @click="backto"
		>返回列表</button>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="info" cancelText="暂不认证" confirmText="去认证" title=" " content="提交用户认证后即可浏览全部内容" @confirm="dialogConfirm"
				@close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import { content } from '@/api/home.js'
	export default {
		data() {
			return {
				content:'',
				title: '',
				date: '',
				showNext: true,
				id: '',
				data: null
			}
		},
		onLoad(option){
			this.id = option.content_id
			console.log(this.id)
			this.initContent(this.id)
		},
		methods: {
			async initContent(e) {
				let that = this
				console.log(that.id,'id')
				that.data = await content({content_id: e})
				that.title = that.data.data.title
				that.date = that.data.data.createtime
				var cont = that.data.data.upper_note;
				cont = cont.replace(/\<img/g, "<img style='width: 100%;'")
				that.content= cont;
			},
			nextArticle() {
				console.log(this.data,uni.getStorageSync('userInfo'))
				if(uni.getStorageSync('userInfo').is_authentication == 1) {
					this.$refs.alertDialog.open()
				}else {
					this.content = this.data.data.lower_note
					this.showNext = false
				}
			},
			backto() {
				var pages = getCurrentPages();
				var prepage = pages[pages.length - 2]; //上一个页面
				prepage.$vm.approve = true
				uni.navigateBack({
					delta:1
				})
			},
			dialogConfirm() {
				this.$refs.alertDialog.close()
				uni.navigateTo({
					url: '/pages/home/approve/approve'
				})
			},
			dialogClose() {
				this.$refs.alertDialog.close()
			}
		} 
	}
</script>

<style lang="scss" scoped>
.articleDetail {
	// width: 750rpx;
	padding: 30rpx;
	.text {
		.text1 {
			font-size: 44rpx;
			color: #000000;
			display: block;
			text-overflow: ellipsis;
			overflow: hidden;
			-webkit-line-clamp: 2;
			display: -webkit-box;
			-webkit-box-orient: vertical;
		}
		.text2 {
			margin: 30rpx auto;
			font-size: 24rpx;
			color: #999999;
			display: block;
		}
	}
	.richBox {
		overflow-y: auto;
		width: 100%;
		height: 100%;
		margin-bottom: 30rpx;
	}
	.nextBtn {
		position: fixed;
		bottom: 30rpx;
		left: 30rpx;
		margin: 0 auto;
		width: 690rpx;
		height: 90rpx;
		background: #202425;
		border-radius: 8rpx;
		color: #fff;
	}
	.popup-info {
		color: #fff;
		background-color: #f2f6fc;
	}
	.uni-button-color {
	    color: #134488;
	}
}
</style>
