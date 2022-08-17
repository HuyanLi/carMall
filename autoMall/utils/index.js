import { getOpenIds, getUserInfo } from '@/api/user'
import store from '@/store'
//获取微信code
export const getWXJsCode = () => {
	return new Promise((resolve, reject) => {
		uni.login({
			provider: 'weixin',
			success: res => {
				console.log(res)
				if (res.errMsg == "login:ok") {
					if (res.code) {
						resolve(res.code)
					} else {
						resolve('')
					}
				} else {
					uni.showModal({
						title: '登录失败',
						content: '系统异常，请联系管理员'
					});
				}
			},
			fail() {
				resolve('')
			}
		})
			
	})

}

//拉起授权
export const userInfo = () => {
	return new Promise((resolve, reject) => {
		uni.getUserProfile({
			desc: '登录后可同步数据',
			success: async (obj) => {
				resolve(obj)
			},
			fail: () => {
				uni.showToast({
					title: '授权已取消',
					icon: 'error',
					mask: true,
				});
			},
			complete: () => {
				
			},
		})
	})

}
//获取系统的用户信息 
export const getOpenId = () => {
	return new Promise((resolve, reject) => {
		userInfo().then(function(users){
			debugger
			getWXJsCode().then(async function(userCode){
				uni.showLoading();
				let { bindStatus, openId, accessToken, inviteCode } = await getOpenIds({ code: userCode });
				console.log('utils', openId)
				uni.setStorageSync('bindStatus',bindStatus);
				store.state.user.bindStatus = bindStatus;
				uni.setStorageSync('openId',openId);
				uni.setStorageSync('token',accessToken);
				uni.setStorageSync('myInviteCode',inviteCode);
				let datas = {
					'openId': openId,
					'encryptedData': users.encryptedData,
					'iv': users.iv,
				}
				let userInfos = await getUserInfo(datas);
				uni.setStorageSync('users',userInfos);
				if(accessToken){
					uni.hideLoading();
					resolve(true)
				}else{
					uni.hideLoading();
					resolve(false)
				}
			})
		})
	})
}
