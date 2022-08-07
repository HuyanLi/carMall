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
	export default {
		data() {
			return {
				content:'',
				title: '无症状的高尿酸更可怕？医生：记住三招降尿酸，事半功倍！',
				date: '2022-09-21',
				showNext: true
			}
		},
		onLoad(option){
			var data = '<p><img src="https://public.haotiku.com/haotiku/videos/20220216/1644974733576.png" alt="" width="571" height="337" /></p><p>应用内集成的第三方SDK以及插件：<br />1.cn.jpush.android: 用来给用户推送应用内资讯信息以及消息通知。<br />2.com.alipay：用于app内会员支付信息费<br />3.com.umeng.commonsdk：用于微信 qq等第三方登录授权以及分享。<br />4.com.amap.api：高德地图用于发布职位定位，已经用户入职导航。</p>';
			data = data.replace(/\<img/g, "<img style='width: 100%;'")
			this.content= data;
			this.title = option.title
			this.date = option.date
		},
		onShow(e) {
			// console.log(e)
			// let pages = getCurrentPages();
			// console.log(pages,5555555)
			// let currPage = pages[pages.length-1];
			// if(currPage.data.address==undefined || currPage.data.detailAddress==''){
				
			// }else{
			// 	this.addressList = currPage.data.address
			// 	// this.address_id = currPage.data.detailAddress
			// }
		},
		methods: {
			nextArticle() {
				this.$refs.alertDialog.open()
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
		// position: fixed;
		// bottom: 30rpx;
		// left: 30rpx;
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
