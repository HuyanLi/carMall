<template>
	<view>
		<button v-if="isLogin" open-type="getUserInfo" class="userLogin userLogin1" @click="getUserProfile"></button>
		<button v-if="isPhone" class="userLogin userLogin2" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></button>
		<button v-if="isMap" class="userLogin userLogin2" @tap="getAddress"></button>
	</view>
</template>

<script>
	import { getOpenIds, getUserInfo, addUser, getPhone, sendVerificationCode, bindPhone, getMemberInfo } from '@/api/user'
	export default {
		name:"auth",
		data() {
			return {
				isLogin: true,
				isPhone: false,
				isMap: false,
			};
		},
		created() {
			//适配iPhonex以上的底部
			var that = this;
			uni.getSystemInfo({
				success: (res) => {
					let model = ['X', 'XR', 'XS', '11', '12', '13', '14', '15'];
					// console.log('iphone',res)
					for (let i=0;i<=model.length;i++) {
						if(res.model.indexOf(model[i]) != -1 && res.model.indexOf('iPhone') != -1) {
			                 //向父组件传递tabbar高度
							that.bottomHight=66
							return
						}else {
							that.bottomHight=0
						}
					}
				}
			})
		},
		mounted() {
			this.getOpenId()
			this.getUserProfile()
			this.getPhoneNumber()
			this.getAddress()
			let member_id = uni.getStorageSync('member_id')
			if(member_id){
				this.isLogin = false;
				this.isPhone = false;
				this.isMap = false;
			}
		},
		methods:{
			//获取openId
			getOpenId() {
				uni.login({
					success: function(res) {
						getOpenIds({code: res.code}).then(res=>{
							uni.setStorageSync("openid",res.data.openid);
							uni.setStorageSync("session_key",res.data.session_key);
						})
					},
					fail: (res) => {
					}
				})
			},
			//获取用户信息
			getUserProfile() {
				uni.getUserProfile({
					//userInfo 获取用户信息
					lang: 'zh_CN',
					desc: '获取用户信息',
					success: userInfo => {
						console.log(userInfo)
						uni.setStorageSync("avatarUrl",userInfo.userInfo.avatarUrl);
						uni.setStorageSync("nickName",userInfo.userInfo.nickName);
						let avatarUrl = userInfo.userInfo.avatarUrl;
						let nickName = userInfo.userInfo.nickName;
						let openid = uni.getStorageSync("openid");
						getUserInfo({openid:openid}).then(res=>{
							if(res.code === '-1') {
								//未注册
								let query = {
									openid: openid,
									headimg: avatarUrl,
									nickname: nickName
								}
								addUser(query).then(data=>{
									uni.setStorageSync('userInfo',data.data)
									uni.setStorageSync("member_id",data.data.id);
									this.$store.commit('userInfo',data.data)
									uni.showToast({
										title: '添加成功'
									})
									this.isLogin = false
									this.isPhone = true
								})
							}else {
								//已注册
								uni.setStorageSync("member_id",res.data.id);
								uni.setStorageSync("userInfo",res.data);
								this.$store.commit('userInfo',res.data)
								console.log(this.$store.state.user,'iuyuiyi')
								this.isLogin = false
								this.isPhone = true
								this.isMap = false
							}
						})
					},
					fail: err => {
						console.log(err, 'err')
					}
				});
			},
			//获取用户手机号
			getPhoneNumber(e) {
				var _this = this
				let session_key=uni.getStorageSync("session_key");
				var encry = e.detail.encryptedData;
				var iv = e.detail.iv;
				// 不允许授权
				if (e.detail.errMsg !== "getPhoneNumber:ok") {
					console.log("没有授权")
					return;
				}
				let data = {
					sessionKey: session_key,
					encry: encry,
					iv: iv
				}
				getPhone(data).then(res=>{
					uni.showToast({
						title: '获取成功', 
					})
					uni.setStorageSync("mobile",res.data.phone.phoneNumber);
					this.$store.commit('mobile',res.data.phone.phoneNumber)
					console.log(this.$store.state.user,'iuyuiyi')
					_this.isPhone = false
					_this.isMap = true
					// location.reload()
				})
			},
			//获取用户位置
			getAddress() {
				uni.chooseLocation({
					success: (res) => {
						// console.log('位置名称：' + res.name);
						// console.log('详细地址：' + res.address);
						// console.log('纬度：' + res.latitude);
						// console.log('经度：' + res.longitude);
						_this.isMap = false
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.userLogin{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: transparent;
	}
	.userLogin1{
		z-index: 1000;
	}
	.userLogin2{
		z-index: 999;
	}
	.myPop99{
		position: relative;
		z-index: 1001;
	}
	.pops{
		width: 100%;
		height: 600rpx;
		background: white;
		overflow: hidden;
		border-radius: 24rpx;
		position: relative;
		.tpTxt{
			font-size: 34rpx;
			color: #333;
			line-height: 48rpx;
			margin-top: 50rpx;
			text-align: center;
		}
		.msgList{
			width: 530rpx;
			margin: 0 auto;
			margin-top: 40rpx;
			height: 100rpx;
			padding: 0 20rpx;
			line-height: 100rpx;
			background: #FFFFFF;
			box-shadow: 0px 4rpx 28rpx 0px rgba(0, 0, 0, 0.12);
			border-radius: 24rpx;
			font-size: 28rpx;
			color: #333;
			overflow: hidden;
			.myTxt{
				float: left;
				display: block;
				width: 150rpx;
			}
			.myIpt{
				display: block;
				width: 350rpx;
				height: 80rpx;
				line-height: 80rpx;
				float: left;
				margin-top: 10rpx;
				font-size: 28rpx;
				color: #333333;
				outline: none;
				border: 0;
			}
			.yzmIpt{
				width: 200rpx;
				float: left;
			}
			.yzmBtn{
				float: right;
				width: 150rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				background: linear-gradient(225deg, #0012B0 0%, #007AFF 100%);
				margin-top: 20rpx;
				border-radius: 10rpx;
				color: white;
				font-size: 24rpx;
			}
		
		}
		.popBtnBox{
			width: 670rpx;
			overflow: hidden;
			position: absolute;
			bottom: 80rpx;
			left: 0;
			right: 0;
			margin: 0 auto;
			.subBtn{
				float: right;
				width: 300rpx;
				height: 80rpx;
				line-height: 80rpx;
				background: linear-gradient(225deg, #0012B0 0%, #007AFF 100%);
				box-shadow: 0px 4rpx 12rpx 0px rgba(0, 18, 176, 0.47);
				border-radius: 24rpx;
				font-size: 28rpx;
				color: #FFFFFF;
				text-align: center;
			}
			.popLftBtn{
				border: 2rpx solid #003BB9;
				background: none;
				color: #003BB9;
				float: left;
				box-sizing: border-box;
			}
		}
	}
</style>