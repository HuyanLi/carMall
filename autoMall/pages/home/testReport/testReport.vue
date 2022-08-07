<!-- 测试报告 -->
<template>
	<view class="report">
		<view class="report-content">
			<image src="https://baiyuechangxiong-pic.luobo.info/che/static/image/home/rrr.png" mode=""></image>
			<view class="report-content-text">
				<view class="report-content-text-item">
					<text class="report-content-text-item-title">一、加油时的#98、#95、#92有什么区别？</text>
					<uni-data-checkbox wrap="true" v-model="radio1" :localdata="sex"></uni-data-checkbox>
				</view>
				<view class="report-content-text-item">
					<text class="report-content-text-item-title">二、填写选项题样式</text>
					<uni-easyinput v-model="style1" placeholder="请输入" />
					<uni-easyinput v-model="style1" placeholder="请输入" />
				</view>
				<view class="report-content-text-item">
					<text class="report-content-text-item-title">三、题目名称文字占位题目名称文字占位题目名称文字占位题目名称文字占位</text>
					<uni-data-checkbox v-model="radio1" :localdata="sex"></uni-data-checkbox>
				</view>
			</view>
		</view>
		<view class="report-btnList">
			<button class="report-btnList-btn1" type="default" @click="toGift">查看奖励</button>
			<button class="report-btnList-btn2" type="default" @click="commitRep">提交报告</button>
		</view>
		<Dialog :title="title" :confirmText='confirmText' :cancleText='cancleText' :visible="dialogVisible" @cancel="handleCancel" @confirm="handleConfirm"/>
	</view>
</template>

<script>
	import Dialog from '@/components/dialog.vue'
	export default {
		components:{
			Dialog
		},
		data() {
			return {
				radio1: 2,
				sex: [{
					text: '没什么区别',
					value: 0
				}, {
					text: '有很大区别',
					value: 1
				}, {
					text: '不清楚',
					value: 2
				}],
				style1: '',
				style2: '',
				dialogVisible: false,
				title: '提交成功',
				cancleText: '返回',
				confirmText: '确定'
			}
		},
		methods: {
			toGift() {
				uni.navigateTo({
					url: '/pages/home/checkWard/checkWard'
				})
			},
			commitRep() {
				this.dialogVisible = true
			},
			handleCancel() {
				this.dialogVisible = false 
			},
			handleConfirm(){
				this.dialogVisible = false 
			}
		} 
	}
</script>

<style lang="scss" scoped>
::v-deep.report {
	width: 750rpx;
	height: 100%;
	// margin-bottom: 140rpx;
	&-content {
		// margin-bottom: 120rpx;
		margin-bottom: 160rpx;
		image {
			width: 750rpx;
			height: 406rpx;
		}
		&-text {
			// width: 750rpx;
			// height: 1084px;
			background: #FFFFFF;
			padding: 30rpx;
			&-item {
				margin-bottom: 30rpx;
				padding: 0 30rpx;
				&-title {
					font-weight: 600;
					font-size: 30rpx;
					color: #373737;
				}
				.uni-easyinput {
					margin-top: 30rpx;
				}
				.uni-data-checklist .checklist-group {
				    display: flex;
				    flex-direction: column !important;
				    flex-wrap: wrap;
				}
				.uni-data-checklist .checklist-group .checklist-box {
				    display: flex;
				    flex-direction: row;
				    align-items: center;
				    position: relative;
				    margin: 38rpx 0 0 0;
				    margin-right: 25rpx;
				}
			}
			
		}
	}
	&-btnList {
		// height: 140rpx;
		// line-height: 140rpx;
		background: #FFFFFF;
		box-shadow: 0 -1px 4px 0 rgba(234,234,234,0.50);
		border-radius: 8rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		padding: 25rpx 0;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		button {
			width: 325rpx;
			height: 90rpx;
			line-height: 90rpx;
			border-radius: 8rpx;
			font-size: 24rpx;
		}
		&-btn1 {
			background: #EDEDED;
			color: #202425;
		}
		&-btn2 {
			background: #202425;
			color: #fff;
		}
	}
}
</style>
