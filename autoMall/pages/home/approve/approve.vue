<!-- 认证 -->
<template>
	<view class="approve">
		<view class="content">
			<uni-forms ref="baseForm" label-width='300rpx' :modelValue="approve" label-position="top">
				<uni-forms-item label="姓名" required>
					<uni-easyinput v-model="approve.member_id" placeholder="请输入您的姓名" />
				</uni-forms-item>
				<uni-forms-item label="企业名称" required>
					<uni-easyinput v-model="approve.company_name" placeholder="请输入企业名称" />
				</uni-forms-item>
				<uni-forms-item label="身份选择" required>
					<uni-section class='selectOption'>
					      <uni-data-select v-model="approve.identity" :localdata="range" @change="handleJob" ></uni-data-select>
					    </uni-section>
				</uni-forms-item>
				<uni-forms-item label="所在地" required>
					<uni-easyinput v-model="address" @tap="handleAddress" placeholder="请选择省/市/区" />
				</uni-forms-item>
				<uni-forms-item label="职业" required>
					<uni-easyinput v-model="approve.vocation" placeholder="请输入职业，如：总经理，销售" />
				</uni-forms-item>
				<uni-forms-item label="上传公司营业执照" required>
					<uni-file-picker v-if='uploadI' v-model="imageValue" fileMediatype="image" mode="grid" @select="select" @progress="progress" @success="success" @fail="fail" >
						<image class="uploadImg" src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mall/upload.png" mode=""></image>
					</uni-file-picker>
					<uni-file-picker v-if='!uploadI' v-model="imageValue" fileMediatype="image" mode="grid" @select="select" @progress="progress" @success="success" @fail="fail" >
						<image class="uploadImg" :src="approve.company_iamges" mode=""></image>
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
		<uni-data-picker v-if="pickerVisible" ref="picker" placeholder="请选择" popup-title="请选择所在地区" :localdata="addressList" v-model="address"
			@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
		</uni-data-picker>
	</view>
</template>

<script>
	import Dialog from '@/components/dialog.vue'
	import { addressList } from '@/components/address.js'
	import { approve } from '@/api/home.js'
	export default {
		components: {
			Dialog
		},
		data() {
			return {
				uploadI: true,
				successImg: '',
				alignmentFormData: {},
				approve: {},
				choose: true,
				cancleText:'返回',
				confirmText: '确定',
				dialogVisible: false,
				filesList: [],
				title: '',
				pickerVisible: false,
				addressList,
				address: '',
				status: '',
				range: [
					  { value: 1, text: "渠道贸易商" },
					  { value: 2, text: "终端门店" },
					],
				file: null,
			}
		},
		methods: {
			//选择身份
			handleJob(e) {
				let that = this
			},
			toService() {
				uni.navigateTo({
				})
			},
			// 获取上传状态
			async select(e){
				console.log('选择文件：',e)
				if(e.tempFilePaths&&e.tempFiles){
					this.file = e.tempFiles[0].file
					this.uploadImg()	
				}
			},
			uploadImg() {
				uni.uploadFile({
					url: 'https://carshop.duoka361.cn/index.php/api/common/upload', //这里为拼接的接口地址
					filePath: this.file.tempFilePath?this.file.tempFilePath:this.file.path,
					fileType: "image",
					formData: this.file,
					name: 'file',
					success: res => {
						this.uploadI = false
						// console.log(JSON.parse(res.data),'res')
						this.approve.company_iamges = JSON.parse(res.data).data.fullurl
						// 这里可以对返回的参数进行处理了
						// uni.showToast({ title: '上传成功', icon: "success" });
					},
					fail(err) {
						uni.showToast({ title: '上传失败', icon: "error" });
					}
				})
			},
			// 获取上传进度
			progress(e){
				console.log('上传进度：',e)
			},
			// 上传成功
			success(e){
				console.log('上传成功')
			},
			// 上传失败
			fail(e){
				console.log('上传失败：',e)
			},
			//下拉框选择
			onchange(e) {
				console.log('onchange:', e);
				let address = ''
				e.detail.value.forEach(i => {
					address+=i.text
				})
				this.address = address
				this.approve.province_id = e.detail.value[0].value
				this.approve.province_name =  e.detail.value[0].text
				this.approve.city_id =  e.detail.value[1].value
				this.approve.city_name =  e.detail.value[1].text
				this.approve.area_id = e.detail.value[2].value
				this.approve.area_name = e.detail.value[2].text
			},
			handleAddress() {
				this.pickerVisible = true
				this.$nextTick(() => {
					this.$refs.picker.show()
				})
			},
			onnodeclick(e) {
				console.log(e);
			},
			onpopupopened(e) {
				console.log('popupopened');
			},
			onpopupclosed(e) {
				this.pickerVisible = false
				console.log('popupclosed');
			},
			async toCommit() {
				this.approve.member_id = uni.getStorageSync("member_id");
				let data = await approve(this.approve)
				this.title='认证成功'
				this.dialogVisible = true
			},
			handleConfirm() {
				this.dialogVisible = false
				var pages = getCurrentPages();
				var prepage = pages[pages.length - 2]; //上一个页面
				prepage.$vm.showNext=false
				this.$store.state.user.approve = true
				this.$store.commit('user/approve', true);
				this.$store.state.user.showNav = '2'
				this.$store.commit('user/showNav', '2');
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
	 margin-bottom: 230rpx;
	 .content {
		 margin-top: 20rpx;
		 padding: 30rpx 30rpx 10rpx 30rpx;
		 background: #FFFFFF;
		 border-radius: 16rpx;
		 box-shadow: 0px 4rpx 28rpx 0px rgba(0, 0, 0, 0.12);
		 border-radius: 24rpx;
		 // margin-bottom: 24rpx;
		 font-size: 28rpx;
		 color: #999999;
		  ::v-deep .uni-section .uni-section-header {
			 padding: 0;
		 }
		 ::v-deep .uni-select__selector {
			 z-index: 99;
		 } 
		 .selectOption {
			 margin-bottom: 20rpx;
		 }
		.uploadImg {
			width: 158rpx;
			height: 158rpx;
		}
		
	}
	.bottom {
		width: 100%;
		background: #FFFFFF;
		// padding: 30rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		height: 210rpx;
		.title {
			line-height: 40rpx;
			margin-bottom: 34rpx;
			display: flex;
			flex-direction: row;
			margin: 30rpx 0 30rpx 30rpx;
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
			margin: 30rpx;
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
