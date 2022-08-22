<!-- 认证 -->
<template>
	<view class="approve">
		<view class="content">
			<uni-forms ref="baseForm" label-width='300rpx' :modelValue="approve" label-position="top">
				<uni-forms-item label="姓名" required>
					<uni-easyinput v-model="approve.name" placeholder="请输入您的姓名" />
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
					<uni-easyinput @focus.prevent="handleAddress" v-model="approve.address" placeholder="请选择地区" />
				</uni-forms-item>
				<uni-forms-item label="职业" required>
					<uni-easyinput v-model="approve.vocation" placeholder="请输入职业，如：总经理，销售" />
				</uni-forms-item>
				<uni-forms-item label="上传公司营业执照" required>
					<uni-file-picker  v-model="imageValue" fileMediatype="image" mode="grid" @select="selectImg" @progress="progress" @success="success" @fail="fail" >
						<image class="uploadImg" src="https://carshop.duoka361.cn/images/static/image/mall/upload.png" mode=""></image>
					</uni-file-picker>
					<!-- <uni-file-picker v-if='!uploadI' v-model="imageValue" fileMediatype="image" mode="grid" @select="selectImg" @progress="progress" @success="success" @fail="fail" >
						<image class="uploadImg" :src="approve.company_iamges" mode=""></image>
					</uni-file-picker> -->
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="bottom">
			<view class="title">
				<image v-if="choose" src="https://carshop.duoka361.cn/images/static/image/mall/choose.png"></image>
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
		<uni-popup ref="pupop" type="bottom">
			<view class="popup">
				<view class="picker-btn">
					<view class="left" @click="cancel">取消</view>
					<view class="right" @click="confirm">确定</view>
				</view>
				<picker-view :indicator-style="indicatorStyle" :value="valueArr" @change="bindChange">
					<picker-view-column>
						<view class="item" v-for="(item,index) in province" :key="index">{{item.name}}</view>
					</picker-view-column>
					<picker-view-column v-if="province[valueArr[0]]">
						<view class="item" v-for="(item,index) in province[valueArr[0]].children" :key="index">{{item.name}}</view>
					</picker-view-column>
					<picker-view-column v-if="province[valueArr[0]]">
						<view class="item" v-for="(item,index) in province[valueArr[0]].children[valueArr[1]].children" :key="index">{{item.name}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Dialog from '@/components/dialog.vue'
	import { addressList } from '@/components/address.js'
	import { approve } from '@/api/home.js'
	import { getCity } from '@/api/store.js'
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
				select:"请选择地区",
				id:'',
				valueArr: [0, 0, 0], // 用于判断当前滑动的是哪一列
				province: [], // 数据列表
				city: [],
				area: [],
				province_name: '',
				city_name: '',
				area_name: '',
				status: '',
				range: [
					  { value: 1, text: "渠道贸易商" },
					  { value: 2, text: "终端门店" },
					],
				file: null,
			}
		},
		created() {
			this.initCity()
		},
		methods: {
			// 选择身份
			handleJob(e) {
				console.log(e)
				let that = this
				this.approve.identity = e
			},
			toService() {
				uni.navigateTo({
				})
			},
			// 获取上传状态
			async selectImg(e){
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
			initCity() {
				getCity().then(res=>{
					this.province = res.data
					console.log(this.province)
					this.loadCity(this.province[0].id)
				})
				
			},
			loadCity(pid) {
				const query = {
					parent_id: pid
				}
				getCity(query).then(res =>{
					this.city = res.data;
					// this.area = res.data;
					if (this.province[this.valueArr[0]].children === undefined) {
						this.$set(this.province[this.valueArr[0]], 'children', [])
						res.data.forEach(item => {
							this.province[this.valueArr[0]].children.push(item)
						})
						this.loadArea(this.province[this.valueArr[0]].children[this.valueArr[1]].id)
					}
					console.log(this.province)
				})
			},
			loadArea(pid) {
				const query = {
					parent_id: pid
				}
				getCity(query).then(res => {
					this.area = res.data;
					if (this.province[this.valueArr[0]].children[this.valueArr[1]].children === undefined) {
						this.$set(this.province[this.valueArr[0]].children[this.valueArr[1]], 'children', [])
						res.data.forEach(item => {
							this.province[this.valueArr[0]].children[this.valueArr[1]].children.push(item)
						})
					}
				})
				console.log(this.province)
			},
			bindChange(e) {
				const val = e.detail.value;
				if (this.valueArr[0] !== val[0]) {
					this.province_name = this.province[val[0]].name
					this.province_id = this.province[val[0]].id
					this.loadCity(this.province[val[0]].id)
				} else if (this.valueArr[1] !== val[1]) {
					console.log(this.province[val[0]].children[val[1]].name,89898)
					this.city_name = this.province[val[0]].children[val[1]].name,
					this.loadArea(this.province[val[0]].children[val[1]].id)
					this.city_id = this.province[val[0]].children[val[1]].id
				}
				this.valueArr = val
			},
			handleAddress() {
				let that = this
				// that.$refs.address.setAttribute('readonly', 'readonly');
				that.$refs.pupop.open('bottom')
			},
			confirm(e) {
				this.area.forEach((item,index)=>{
					if(this.valueArr[2] === index) {
						this.area_name = item.name
						this.area_id = item.id
					}
				})
				this.approve.address = this.province_name + this.city_name + this.area_name
				this.$refs.pupop.close()
			},
			cancel() {
				this.$refs.pupop.close()
			},
			async toCommit() {
				this.approve.member_id = uni.getStorageSync("member_id");
				this.approve.province_id = this.province_id
				this.approve.city_id = this.city_id
				this.approve.area_id = this.area_id
				this.approve.province_name = this.province_name
				this.approve.city_name = this.city_name
				this.approve.area_name = this.area_name
				this.invitation_code = uni.getStorageSync('userInfo').invitation_code
				let data = await approve(this.approve)
				if(data.code === 0) {
					uni.showToast({
						title: data.msg
					})
					uni.navigateTo({
						url: '/pages/tabBar/home/home'
					})
				}else {
					this.title= data.msg
					this.dialogVisible = true
					
					uni.navigateTo({
						url: '/pages/tabBar/home/home'
					})
				}
			},
			handleConfirm() {
				this.dialogVisible = false
				var pages = getCurrentPages();
				var prepage = pages[pages.length - 2]; //上一个页面
				prepage.$vm.showNext = false
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
	
/deep/ .uni-easyinput {
			.is-disabled {
				background-color: #ffffff !important;
				color: #333 !important;
			}
		}
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
	.popup {
		height: fit-content;
		width: 100%;
		background: #fff;
		bottom: 0;
		position: fixed;
	}
	
	.picker-btn {
		display: flex;
		height: 100upx;
		width: 100%;
		line-height: 100upx;
		background: #fff;
		font-size: 34upx;
		z-index: 1;
		border-bottom: 1rpx solid #f8f8f8;
	
		.left {
			flex: 1;
			color: #0076FF;
			padding-left: 40upx;
			box-sizing: border-box;
		}
	
		.right {
			flex: 1;
			text-align: right;
			padding-right: 40upx;
			color: #FE4533;
			box-sizing: border-box;
		}
	}
	
	picker-view {
		width: 100%;
		height: 500rpx;
		display: relative;
	}
	.item {
		line-height: 100rpx;
		text-align: center;
	}
 }
</style>
