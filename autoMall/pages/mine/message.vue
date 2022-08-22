<template>
	<view class="message">
		<view class="message-state">
			<view class="message-state-item" :class="index === activeIndex ? 'active' : ''" @tap="handleStateTap(item,index)" v-for="(item, index) in messageState" :key="index">{{item.title}}</view>
		</view>
		<view class="message-swiper-wrap">
			<swiper class="swiper" duration="500" :current="current" @change="handleSwipeChange">
				<swiper-item>
					<view class="swiper-item">
						<view class="message-item" v-for="(item, index) in messageList" :key="index">
							<view class="message-item-title">
								{{item.name}}
							</view>
							<view class="message-item-date">
								{{item.createtime}}
							</view>
							<view class="message-item-content">
								{{item.note}}
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<view class="message-item" v-for="(item, index) in messageList" :key="index">
							<view class="message-item-title">
								{{item.name}}
							</view>
							<view class="message-item-date">
								{{item.createtime}}
							</view>
							<view class="message-item-content">
								{{item.note}}
							</view>
						</view>
					</view>
				</swiper-item>
				
			</swiper>
			
		</view>
	</view>
</template>

<script>
	import { getInfoList } from '@/api/mine.js'
	export default {
		data() {
			return {
				current: 0,
				activeIndex: 0,
				messageState: [{title: '系统消息',type: '1'},{title: '后台通知',type:'2'}],
				messageList: [],
				type: ''
			}
		},
		created() {
			this.initInfo()
		},
		methods: {
			initInfo(){
				let query = {
					member_id: uni.getStorageSync('member_id'),
					type: this.type
				}
				getInfoList(query).then(res=>{
					if(res.code === 0) {
						this.messageList = res.data.rows
					}else {
						this.messageList = res.data.rows
					}
				})
			},
			handleStateTap(e,i) {
				this.messageList = []
				this.activeIndex = i
				this.current = i
				this.type = e.type
				this.initInfo()
			},
			handleSwipeChange(e) {
				this.activeIndex = e.detail.current
			},
		}
	}
</script>

<style lang="scss" scoped>
.message {
	height: 100%;
	width: 100%;
	display: flex;
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	&-swiper-wrap {
		box-sizing: border-box;
		padding: 0 30rpx;
		flex: 1;
	}
	&-state {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 83rpx;
		line-height: 83rpx;
		box-sizing: border-box;
		background: #ffffff;
		&-item {
			flex: 1;
			text-align: center;
			font-weight: 400;
			font-size: 26rpx;
			color: #4C4C4C;
			height: 100%;
		}
		
		.active {
			font-weight: 600;
			font-size: 32rpx;
			color: #333333;
			position: relative;
			&:after {
				content: '';
				display: block;
				width: 40rpx;
				height: 6rpx;
				background: #333333;
				border-radius: 3rpx;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translate3d(-50%, 0, 0);
			}
		}
	}
	.swiper {
		height: 100%;
		swiper-item {
			overflow-y: scroll;
			&::-webkit-scrollbar{display:none}
		}
	}
}

.message-item {
	margin-top: 20rpx;
	background: #ffffff;
	border-radius: 16rpx;
	box-sizing: border-box;
	padding: 30rpx;
	font-size: 24rpx;
	&-title {
		font-size: 28rpx;
		color: #303030;
	}
	&-date {
		color: #a8a8a8;
		margin-top: 3rpx;
	}
	&-content {
		color: #666666;
		margin-top: 18rpx;
	}
}
</style>
