<!-- 签约协议 -->
<template>
	<view class="signAggrement">
		<view class="box">
			<rich-text :nodes="content"></rich-text>
			<view class="sign">
			  <!-- <view class="paper">
			    <canvas class="mycanvas"
				  disable-scroll=false
				  canvas-id="mycanvas"
				  @touchstart="touchstart"
				  @touchmove="touchmove"
				  @touchend="touchend"></canvas>
			  </view> -->
			</view>
			<view class="btn">
				<!-- <button class="btn1" @click="addCart('购物车')">加入购物车</button> -->
				<button type="default" @click="addCart('/pages/store/moneyCertificates/moneyCertificates')">我已阅读并确认签署</button>
			</view>
		</view>
	</view>
</template>

<script>
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
				context1: '',
				writeTips: '签字区',
				writeTipsTrue: true,
				ctx: '', //绘图图像
				points: [], //路径点集合,
			};
		},
		onLoad(){
			var data = '<p><img src="https://public.haotiku.com/haotiku/videos/20220216/1644974733576.png" alt="" width="571" height="337" /></p><p>应用内集成的第三方SDK以及插件：<br />1.cn.jpush.android: 用来给用户推送应用内资讯信息以及消息通知。<br />2.com.alipay：用于app内会员支付信息费<br />3.com.umeng.commonsdk：用于微信 qq等第三方登录授权以及分享。<br />4.com.amap.api：高德地图用于发布职位定位，已经用户入职导航。</p>';
			data = data.replace(/\<img/g, "<img style='width: 100%;'")
			this.content= data;
			// id = option.id;
			//     type = option.type;
			    this.ctx = uni.createCanvasContext('mycanvas', this); //创建绘图对象
			    //设置画笔样式
			    this.ctx.lineWidth = 4;
			    this.ctx.lineCap = 'round';
			    this.ctx.lineJoin = 'round';
		},
		methods:{ 
			//确认并签署
			addCart() {
				uni.navigateTo({
					url
				})
			},
			//触摸开始，获取到起点
			touchstart: function (e) {
			  let startX = e.changedTouches[0].x;
			  let startY = e.changedTouches[0].y;
			  let startPoint = {
				X: startX,
				Y: startY
			  };
		 
			  /* **************************************************
							#由于uni对canvas的实现有所不同，这里需要把起点存起来
						 * **************************************************/
			  this.points.push(startPoint);
		 
			  //每次触摸开始，开启新的路径
			  this.ctx.beginPath();
			},
		 
			//触摸移动，获取到路径点
			touchmove: function (e) {
			  let moveX = e.changedTouches[0].x;
			  let moveY = e.changedTouches[0].y;
			  let movePoint = {
				X: moveX,
				Y: moveY
			  };
			  this.points.push(movePoint); //存点
			  let len = this.points.length;
			  if (len >= 2) {
				this.draw(); //绘制路径
			  }
			  tempPoint.push(movePoint);
			},
		 
			// 触摸结束，将未绘制的点清空防止对后续路径产生干扰
			touchend: function () {
			  this.points = [];
			},
		 
			/* ***********************************************	
					#   绘制笔迹
					#   1.为保证笔迹实时显示，必须在移动的同时绘制笔迹
					#   2.为保证笔迹连续，每次从路径集合中区两个点作为起点（moveTo）和终点(lineTo)
					#   3.将上一次的终点作为下一次绘制的起点（即清除第一个点）
					************************************************ */
			draw: function () {
			  let point1 = this.points[0];
			  let point2 = this.points[1];
			  this.points.shift();
			  this.ctx.moveTo(point1.X, point1.Y);
			  this.ctx.lineTo(point2.X, point2.Y);
			  this.ctx.stroke();
			  this.ctx.draw(true);
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
