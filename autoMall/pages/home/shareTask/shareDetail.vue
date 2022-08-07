<template>
	<view class="shareDetail">
		<view class="box">
			<rich-text :nodes="content"></rich-text>
			<view class="buton">
				<button type="default" open-type="share" @click="toShare">分享给好友</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:''
			}
		},
		onShow(){
			
		},
		methods:{
			toShare() {
				console.log('2222222222')
			},
			onShareAppMessage(res) {
			    	if (res.from === 'button') {
						// 来自页面内分享按钮
						console.log(res.target);
					}
					return {
						title: '棱接龙',//标题
						path: '/page/index/index',//可以指定动态路径
						imageUrl: 'https://cdn.uviewui.com/uview/swiper/1.jpg',//分享图
						desc: '描述'
					};
			  },
			// 分享给好友
			onShareAppMessage(options){
			　　var that = this;
			　　// 设置菜单中的转发按钮触发转发事件时的转发内容
			　　var shareObj = {
			　　　  title:'',        // 默认是小程序的名称(可以写slogan等)
			　　　　desc:'',// 小程序的描述
					path: '/pages/home/shareDetail/shareDetail',        // 默认是当前页面，必须是以‘/’开头的完整路径
			　　　　imageUrl: '', // 图片封面，本地文件路径、网络图片路，支持PNG及JPG，默认当前页面截图，显示图片长宽比是 5:4。
			　　　　success: function(res){
			　　　　　　// 转发成功之后的回调
			　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
							
			　　　　　　}
			　　　　},
			　　　　fail: function(){
			　　　　　　// 转发失败之后的回调
			　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
							console.log(res)
			　　　　　　　　// 用户取消转发
			　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
							console.log(res)
			　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
			　　　　　　}
			　　　　},
			　　}
			　　// 来自页面内的按钮的转发
			　　if( options.from == 'button' ){
			　　　　var eData = options.target.dataset;
			　　　　console.log( eData.id);     // shareBtn
			　　　　// 此处可以修改 shareObj 中的内容
			　　　　shareObj.path = '/pages/share/index'
			　　}
			　　// 返回shareObj
			　　return shareObj;
			},
		}
	}
</script>

<style lang="scss" scoped>
.shareDetail{
	margin: 0 auto;
	.box {
		margin: 25rpx 30rpx;
	}
	button {
		position: fixed;
		bottom: 40rpx;
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
	}
}
</style>
