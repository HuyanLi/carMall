// //1.md5是从数据交互安全考虑进行加密 , 如不需要可不用使用
// import md5 from './md5.js' //文件可从网上下载 放在utils文件夹下
// const baseUrl = 'https://baiyuechangxiong-api.luobo.info' //正式环境地址 需要更换成自己项目请求正式环境地址
const baseUrl = 'https://carshop.duoka361.cn' //测试环境地址  需要更换成自己项目请求测试环境地址
let timestamp = Math.round(new Date().getTime() / 1000).toString() //当前时间戳
// let secret = 'c8bef9c31576a5e7c48dcb27a558cb8c'
// let sign = md5(secret + timestamp) //MD5加密字符串
import { getWXJsCode, userInfo, getOpenId } from '@/utils'

import { getOpenIds } from '@/api/user'

//封装请求Promise模式请求
export default function request(url, params, method = 'GET',contentType) {
    return new Promise((reslove, reject) => {
        uni.request({
            url: baseUrl + url,
            method: method || 'GET',
            header: {//可根据需要自行添加或删除参数
				'Content-Type': contentType || 'application/x-www-form-urlencoded',
                'timestamp': timestamp,
                'access-token':uni.getStorageSync('token'),
				'openId': uni.getStorageSync('openId'),
            },
            data: params || {},
            success: (res) => {
				// console.log(res)
				var datas = res.data;
                if (datas.code == '1') {
                    reslove(datas);
                } else if(datas.code == '0') {
					reslove(datas);
				} else if(datas.code == '-1') {
					reslove(datas);
				}else if (datas.code == '30000') {//统一处理状态码 状态码根据自己项目设置即可
					getWXJsCode().then(async function(userCode){
						console.log('token失效重新静默授权')
						uni.showLoading();
						let { bindStatus, openId, accessToken } = await getOpenIds({ code: userCode });
						console.log('request',openId)
						uni.setStorageSync('bindStatus',bindStatus);
						uni.setStorageSync('openId',openId);
						uni.setStorageSync('token',accessToken);
						// setInterval(() => {
							uni.hideLoading();
							// 页面重载
							const pages = getCurrentPages()
							// 声明一个pages使用getCurrentPages方法
							const curPage = pages[pages.length - 1]
							// 声明一个当前页面
							curPage.onLoad(curPage.options) // 传入参数
							curPage.onShow()
							curPage.onReady()
							// clearInterval()
						// }, 1000)
					})
                }else if(datas.code == '500'){
					// console.log(datas)
					reslove(datas) 
				} else if (datas.code !== '1' && datas.code !== '30000'&& datas.code !== '500' && datas.code !== '0') {//统一处理状态码 状态码根据自己项目设置即可
					uni.showToast({
                        title: datas.message || '系统错误',
                        icon: 'none',
                        duration: 2000
                    });
                    reject(datas.message || '系统错误');
                }
            },
            fail: (msg) => {
                reject(msg || '请求失败');
            }
        })
    });
}
