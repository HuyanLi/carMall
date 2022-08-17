export default{
    data(){
        return {
		    //设置默认的分享参数
            share:{
                title:'全局分享',
                path:'/pages/index/index?inviteCode='+uni.getStorageSync('myInviteCode'),
                imageUrl:'http://zxst-pic.oss-cn-beijing.aliyuncs.com/20211003/2a7e25ad866b43aaba0545a5c2508b67.png',
                desc:'全局分享描述',
                content:''
            }
        }
    },
    onShareAppMessage(res) {
        return {
            title:this.share.title,
            path:this.share.path,
            imageUrl:this.share.imageUrl,
            desc:this.share.desc,
            content:this.share.content,
            success(res){
                uni.showToast({
                    title:'分享成功'
                })
            },
            fail(res){
                uni.showToast({
                    title:'分享失败',
                    icon:'none'
                })
            }
        }
    },
	//2.分享到朋友圈
	onShareTimeline(res) {
		return {
			title: this.share.title,
			path: this.share.path,
			imageUrl: this.share.imageUrl,
			success(res){
			    uni.showToast({
			        title:'分享成功'
			    })
			},
			fail(res){
			    uni.showToast({
			        title:'分享失败',
			        icon:'none'
			    })
			}
		}
	}

}