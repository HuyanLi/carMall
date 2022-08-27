<!-- 测试报告 -->
<template>
	<view class="report">
		<view class="report-content">
			<image :src="bgcIMG" mode=""></image>
			<view class="report-content-text" v-for="(item,index) in questionList" :key='index'>
				<view class="report-content-text-item" v-if="item.type == 1">
					<text class="report-content-text-item-title">{{item.title}}</text>
					<uni-data-checkbox wrap="true" @change="changeAnswer" :v-model="value" :localdata="item.answer"></uni-data-checkbox>
				</view>
				<view class="report-content-text-item" v-if="item.type == 2">
					<text class="report-content-text-item-title">{{item.title}}</text>
					<uni-easyinput @blur='addinput(item)' type="text" v-model="item.text" placeholder="请输入" />
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
	import { getQuestion, addAnswer, registerGift} from '@/api/home.js'
	export default {
		components:{
			Dialog
		},
		data() {
			return {
				bgcIMG: '',
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
				confirmText: '确定',
				questionList: [],
				answer: null,
				value: '',
				text: '',
			}
		},
		onLoad(e) {
		},
		onShow() {
			//图片
			this.initRegisterGift()
			this.initQuestion()
			this.answer = new Map()
		},
		methods: {
			async initRegisterGift() {
				let data = await registerGift()
				this.bgcIMG = data.data.test_report_image
			},
			initQuestion() {
				getQuestion().then(res=>{
					res.data.rows.forEach(item=>{
						item.answer.forEach(e=>{
							e.id = item.id
							e.title = item.title
						})
					})
					this.questionList = res.data.rows
				})
			},
			changeAnswer(e) {
				this.answer.set(e.detail.data.id,e.detail.data)
			},
			addinput(e){
				this.answer.set(e.id,{
					id: e.id,
					title: e.title,
					text: e.text
				})
			},
			toGift() {
				uni.navigateTo({
					url: '/pages/home/checkWard/checkWard'
				})
			},
			commitRep() {
				console.log(Object.keys(this.answer),this.answer,this.questionList,'answer')
				if(Object.keys(this.answer).length < this.questionList.length) {
					uni.showToast({
						title: '请答完所有问题再提交',
					})
					return
				}else {
					let list = []
					this.answer.forEach((val,key)=>{
						list.push({
							question_id: val.id,
							question_title: val.title,
							answer: val.text
						})
					})
					let query = {
						member_id: uni.getStorageSync('member_id'),
						question: JSON.stringify(list)
					}
					addAnswer(query).then(res=>{
						uni.showToast({
							title: res.msg,
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1
							})
						},500)
					})
				}
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
	overflow-y: auto;
	background-color: #f8f8f8;
	&-content {
		// margin-bottom: 120rpx;
		// margin-bottom: 250rpx;
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
		// padding: 25rpx 0;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		height: 140rpx;
		button {
			width: 325rpx;
			height: 90rpx;
			line-height: 90rpx;
			border-radius: 8rpx;
			font-size: 24rpx;
			margin: 25rpx auto;
		}
		&-btn1 {
			background: #EDEDED;
			color: #202425;
			z-index: 999;
		}
		&-btn2 {
			background: #202425;
			color: #fff;
		}
	}
}
</style>
