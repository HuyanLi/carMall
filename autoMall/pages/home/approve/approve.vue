<!-- 认证 -->
<template>
	<view class="approve">
		<view class="content">
			<uni-forms ref="baseForm" label-width='300rpx' :modelValue="alignmentFormData" label-position="top">
				<uni-forms-item label="姓名" required>
					<uni-easyinput v-model="baseFormData.name" placeholder="请输入您的姓名" />
				</uni-forms-item>
				<uni-forms-item label="企业名称" required>
					<uni-easyinput v-model="baseFormData.age" placeholder="请输入企业名称" />
				</uni-forms-item>
				<uni-forms-item label="身份选择" required>
					<uni-easyinput v-model="baseFormData.age" placeholder="请选择身份" />
				</uni-forms-item>
				<uni-forms-item label="所在地" required>
					<uni-easyinput v-model="baseFormData.age" placeholder="请选择省/市/区" />
				</uni-forms-item>
				<uni-forms-item label="职业" required>
					<uni-easyinput v-model="baseFormData.age" placeholder="请输入职业，如：总经理，销售" />
				</uni-forms-item>
				<uni-forms-item label="上传公司营业执照" required>
					<uni-file-picker>
						<image class="uploadImg" src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mall/upload.png" mode=""></image>
					</uni-file-picker>
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="bottom">
			<view class="title">
				<image v-if="choose" src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mall/choose.png"></image>
				<view v-if="!choose" class="text"></view>
				<text>提交即代表您同意</text>
				<text class="approveT">《认证协议》</text>
			</view>
			<view class="btnList">
				<button class="btn1" type="default" @click="toService">联系客服</button>
				<button class="btn2" type="default" @click="toCommit" >提交</button>
			</view>
		</view>
		<Dialog class="dialog" :cancleText='cancleText' :confirmText='confirmText' :title="title"  :visible="dialogVisible" @cancel="handleCancel" @confirm="handleConfirm"/>
	</view>
</template>

<script>
	import Dialog from '@/components/dialog.vue'
	export default {
		components: {
			Dialog
		},
		data() {
			return {
				alignmentFormData: {},
				choose: true,
				cancleText:'返回',
				confirmText: '确定',
				dialogVisible: false,
				filesList: [],
				title: ''
			}
		},
		methods: {
			toService() {
				uni.navigateTo({
				})
			},
			toCommit() {
				this.title='认证成功'
				this.dialogVisible = true
			},
			handleConfirm() {
				this.dialogVisible = false
				var pages = getCurrentPages();
				var prepage = pages[pages.length - 2]; //上一个页面
				prepage.$vm.showNext=false
				prepage.$vm.beforeapprove=true
				prepage.$vm.approve=true
				uni.navigateBack({
					delta: 1
				})
			},
			handleCancel(){
				this.dialogVisible = false
				this.dialogVisible = false
			}
		}
	}
</script>

<style lang="scss" scoped>
 .approve{
	 width: 750rpx;
	 .content {
		 margin-top: 20rpx;
		 padding: 30rpx;
		 background: #FFFFFF;
		 border-radius: 16rpx;
		 box-shadow: 0px 4rpx 28rpx 0px rgba(0, 0, 0, 0.12);
		 border-radius: 24rpx;
		 // margin-bottom: 24rpx;
		 font-size: 28rpx;
		 color: #999999;
		.uploadImg {
			width: 158rpx;
			height: 158rpx;
		}
		
	}
	.bottom {
		background: #FFFFFF;
		padding: 30rpx;
		.title {
			line-height: 40rpx;
			margin-bottom: 34rpx;
			display: flex;
			flex-direction: row;
			.text {
				width: 36rpx;
				height: 36rpx;
				border: 1px solid #999;
				border-radius: 50%;
				display: inline-block;
				margin-right: 15rpx;
				line-height: 40rpx;
			}
			.approveT {
				color: #134488;
				
			}
			image {
				width: 36rpx;
				height: 36rpx;
				margin-right: 15rpx;
			}
		}
		.btnList {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			button {
				width: 331rpx;
				float: left;
			}
			.btn1 {
				background: #EDEDED;
				color: #202425;
			}
			.btn2 {
				background-color: #202425;
				color: #fff;
			}
		}
	}
 }
</style>
