<template>
	<view class="sale-relation">
		<view class="sale-relation-user">
			<img src="https://via.placeholder.com/42x42" />
			<view class="sale-relation-user-msg">
				<view class="sale-relation-user-msg-name">
					Latte今天喝拿铁
				</view>
				<view class="sale-relation-user-msg-title">
					代理商
				</view>
			</view>
		</view>
		<view class="contact">
			<view class="contact-state">
				<view class="contact-state-item" :class="index === activeIndex ? 'active' : ''" @tap="handleStateTap(index)" v-for="(item, index) in contactState" :key="index">{{item.title}}</view>
			</view>
			<view class="contact-swiper-wrap">
				<swiper class="swiper" duration="500" :current="current" @change="handleSwipeChange">
					<swiper-item>
						<view class="contact-item" v-for="(item, index) in contacts" :key="index">
							<img :src="item.img" />
							<view>
								<view class="contact-item-name">
									{{item.name}}
								</view>
								<view class="contact-item-date">
									{{item.date}}
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							2
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							3
						</view>
					</swiper-item>
				</swiper>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				current: 0,
				contactState: [{title: '平级代理商'},{title: '下级团长'},{title: '下级团员'}],
				contacts: [{
					img: 'https://via.placeholder.com/100x100',
					name: '用户名称',
					date: '2020-08-18 23:02:31'
				},{
					img: 'https://via.placeholder.com/100x100',
					name: '用户名称',
					date: '2020-08-18 23:02:31'
				},{
					img: 'https://via.placeholder.com/100x100',
					name: '用户名称',
					date: '2020-08-18 23:02:31'
				},{
					img: 'https://via.placeholder.com/100x100',
					name: '用户名称',
					date: '2020-08-18 23:02:31'
				}]
			}
		},
		methods: {
			handleStateTap(index) {
				this.activeIndex = index
				this.current = index
			},
			handleSwipeChange(e) {
				this.activeIndex = e.detail.current
			},
		}
	}
</script>

<style lang="scss" scoped>
.sale-relation {
	background: #f6f6f6;
	box-sizing: border-box;
	padding: 48rpx 32rpx;
	display: flex;
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	height: 100%;
	width: 100%;
	&-user {
		display: flex;
		flex-direction: row;
		img {
			width: 105rpx;
			height: 105rpx;
			border-radius: 50%;
		}
		&-msg {
			font-weight: 500;
			font-size: 36rpx;
			color: #313131;
			
			margin-left: 30rpx;
			&-title {
				background: #E9C585;
				border-radius: 18rpx;
				width: 107rpx;
				font-weight: 400;
				font-size: 22rpx;
				color: #134488;
				text-align: center;
			}
		}
		
	}
	.contact {
		margin-top: 40rpx;
		border-radius: 16rpx;
		height: 100%;
		width: 100%;
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		
		background: #ffffff;
		&-swiper-wrap {
			box-sizing: border-box;
			padding: 0 30rpx;
			flex: 1;
			swiper-item {
				box-sizing: border-box;
				padding: 28rpx;
			}
			.contact-item {
				height: 130rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				border-bottom: 2px solid #F5F7F8;;
			
				img {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}
				
				&-name {
					font-size: 30rpx;
					color: #1F1F1F;
				}
				
				&-date {
					font-size: 26rpx;
					color: #6D7278;
				}
				>view {
					flex: 1;
					margin-left: 27rpx;
					font-weight: 400;
				}
			}
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
}
</style>
