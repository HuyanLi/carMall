<template>
	<view class="sale-relation">
		<view class="sale-relation-user">
			<img :src="userInfo.head_img" />
			<view class="sale-relation-user-msg">
				<view class="sale-relation-user-msg-name">
					{{userInfo.nickname}}
				</view>
				<view class="sale-relation-user-msg-title">
					{{levelName}}
				</view>
			</view>
		</view>
		<view class="contact">
			<view class="contact-state">
				<view class="contact-state-item" :class="index === activeIndex ? 'active' : ''" @tap="handleStateTap(item,index)" v-for="(item, index) in contactState" :key="index">{{item.title}}</view>
			</view>
			<view class="contact-swiper-wrap">
				<swiper class="swiper" duration="500" :current="current" @change="handleSwipeChange">
					<swiper-item>
						<view class="empty" v-if="contacts.length == 0">
							暂无数据
						</view>
						<view v-else class="contact-item" v-for="(item, index) in contacts" :key="index">
							<img :src="item.head_img" />
							<view>
								<view class="contact-item-name">
									{{item.nickname}}
								</view>
								<view class="contact-item-date">
									{{item.agent_time}}
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="empty" v-if="contacts.length == 0">
							暂无数据
						</view>
						<view v-else class="contact-item" v-for="(item, index) in contacts" :key="index">
							<img :src="item.head_img" />
							<view>
								<view class="contact-item-name">
									{{item.nickname}}
								</view>
								<view class="contact-item-date">
									{{item.agent_time}}
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="empty" v-if="contacts.length == 0">
							暂无数据
						</view>
						<view v-else class="contact-item" v-for="(item, index) in contacts" :key="index">
							<img :src="item.head_img" />
							<view>
								<view class="contact-item-name">
									{{item.nickname}}
								</view>
								<view class="contact-item-date">
									{{item.agent_time}}
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
				
			</view>
		</view>
	</view>
</template>

<script>
	import { getRelationlist, getGrith } from '@/api/mine.js'
	export default {
		data() {
			return {
				activeIndex: 0,
				current: 0,
				type: '1',
				userInfo: uni.getStorageSync('userInfo'),
				contactState: [],
				contacts: [],
				levelName: ''
			}
		},
		onShow() {
			this.contacts = []
			if(this.userInfo.level_id == 1) {
				this.levelName = '代理商'
				this.contactState = [{title: '平级代理商',type: '1'},{title: '下级团长',type: '2'},{title: '下级团员',type:'3'}]
				this.initlist()
			}else if(this.userInfo.level_id == 2) {
				this.levelName = '团长'
				this.contactState = [{title: '下级团员',type: '1' }]
				this.initLevelSecord()
			}else if(this.userInfo.level_id == 3){
				this.levelName = '团员'
				this.contactState = [{title: '上级团长',type: '1'}]
				this.contacts.push(this.userInfo.agent)
			}else {
				this.levelName = ''
			}
		},
		methods: {
			initlist() {
				let query = {
					member_id: uni.getStorageSync('member_id'),
					level_id: this.type
				}
				getRelationlist(query).then(res=>{
					if(res.code == 1) {
						this.contacts = res.data.rows
					}
				})
			},
			initLevelSecord() {
				let query = {
					member_id: uni.getStorageSync('member_id'),
					level_id: 3
				}
				getGrith(query).then(res=>{
					this.contacts = res.data.rows
				})
			},
			handleStateTap(item,index) {
				this.type = item.type
				this.activeIndex = index
				this.current = index
				this.initlist()
			},
			handleSwipeChange(e) {
				this.activeIndex = e.detail.current
				this.current = this.activeIndex
				this.type = Number(this.current) + 1
				this.initlist()
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
			.empty {
				width: 100%;
				height: 100%;
				text-align: center;
				margin-top: 30rpx;
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
