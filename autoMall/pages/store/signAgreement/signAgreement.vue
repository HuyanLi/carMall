<!-- 签约协议 -->
<template>
	<view class="signAggrement">
		<view class="box">
			<rich-text :nodes="content"></rich-text>
			<view class="sign">
			  <view class="form">
					<view class="form-content">
						<canvas class="form-content__canvas" canvas-id="canvas_sign" @touchstart="touchstart"
							@touchmove="touchmove" @touchend="touchend" disable-scroll="true"></canvas>
					</view>
				</view>
			</view>
			<view class="btn">
				<!-- <button class="btn1" @click="addCart('购物车')">加入购物车</button> -->
				<button type="default" @click="addCart()">我已阅读并确认签署</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { editUser,getBankInfo } from '@/api/mine.js'
	var x = 20;
	var y = 20;
	var tempPoint = []; //用来存放当前画纸上的轨迹点
	var id = 0;
	var type = '';
	let that;
	let canvasw;
	let canvash;
	export default {
		data() {
			return {
				content: '',
				hasDraw: false,
				canvasCtx: '', //绘图图像
				points: [], //路径点集合
				hasSign: false,
				isInit: false,
				user:'',
				type:'',
				info: null,
				orderId: ''
			};
		},
		onLoad(e){
			    this.canvasCtx = uni.createCanvasContext('canvas_sign', this) //创建绘图对象
				//设置画笔样式
				this.canvasCtx.lineWidth = 6
				// 设置线条的端点样式
				this.canvasCtx.lineCap = 'round'
				// 设置线条的交点样式
				this.canvasCtx.lineJoin = 'round'
				console.log(e,'sign')
				this.orderId = e.orderId
		},
		created() {
			this.initContent()
		},
		methods:{ 
			initContent() {
				getBankInfo().then(res=>{
					this.content = res.data.authenticat_note
				})
			},
			touchstart: function(e) {
			    if (!this.isInit) {
			        this.isInit = true
			        // this.autographClick(1);
			    }
			    let startX = e.changedTouches[0].x
			    let startY = e.changedTouches[0].y
			    let startPoint = {
			        X: startX,
			        Y: startY
			    }
			    this.points.push(startPoint)
			    //每次触摸开始，开启新的路径
			    this.canvasCtx.beginPath()
			},
			addCart(e) {
				let that = this;
					uni.canvasToTempFilePath({
					canvasId: 'canvas_sign',
					success: function(res) {
						let query = {
							signing_image: res.tempFilePath,
							member_id: uni.getStorageSync('member_id')
						}
						console.log(res.tempFilePath,query,'0909') 
						//图片格式为base64，如果不是可上传七牛云，之后请求签名接口即可
						editUser(query).then(res=>{
							if(res.code == 1) {
								//走到这里就签名成功了
								uni.navigateTo({
									url:'/pages/store/moneyCertificates/moneyCertificates?orderId='+this.orderId
								})
								uni.showToast({
									title:res.msg,
									duration:2000
								})
							}else{
								// that.$u.toast(res.result.message)
							}
						})
					}
				})
			},
			//触摸移动，获取到路径点
			touchmove: function(e) {
			    let moveX = e.changedTouches[0].x
			    let moveY = e.changedTouches[0].y
			    let movePoint = {
			        X: moveX,
			        Y: moveY
			    }
			    this.points.push(movePoint) //存点
			    let len = this.points.length
			    if (len >= 2) {
			        this.draw() //绘制路径
			    }
			 
			},
		 
			// 触摸结束，将未绘制的点清空防止对后续路径产生干扰
			touchend: function() {
			    this.points = []
			    this.canvasCtx.draw(true)
			},
		 
			/* ***********************************************	
					#   绘制笔迹
					#   1.为保证笔迹实时显示，必须在移动的同时绘制笔迹
					#   2.为保证笔迹连续，每次从路径集合中区两个点作为起点（moveTo）和终点(lineTo)
					#   3.将上一次的终点作为下一次绘制的起点（即清除第一个点）
					************************************************ */
			draw: function() {
			    let point1 = this.points[0]
			    let point2 = this.points[1]
			    this.points.shift()
			    this.canvasCtx.moveTo(point1.X, point1.Y)
			    this.canvasCtx.lineTo(point2.X, point2.Y)
			    this.canvasCtx.stroke()
			    this.canvasCtx.draw(true)
			    this.hasSign = true
			},
		}
	}
</script>

<style lang="scss" .scoped>
.signAggrement {
	margin: 0 auto;
	width: 750rpx;
	background: #FFFFFF;
	.box {
		margin: 0 auto 100rpx;
		width: 690rpx;
		padding: 0 0 30rpx 0rpx;
		.sign {
			width: 690rpx;
			height: 238rpx;
			background: #EFEFEF;
			margin: 40rpx auto;
			.paper {
				height: 100%;
				width: 100%;
			}
		}
		.btn {
			width: 100%;
			background: #F6F6F6;
			position: fixed;
			bottom: 0rpx;
			left: 0rpx;
			padding: 30rpx 0;
			button {
				width: 690rpx;
				height: 90rpx;
				line-height: 90rpx;
				background-color: #202425;
				border-radius: 8rpx;
				font-size: 24rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}
	}
}
</style>
