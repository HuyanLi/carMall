<template>
	<view class="info">
		<view class="info-list">
			<view class="info-item">
				<text class="info-item-title">头像</text>
				<view class="info-item-content right">
					<image class="img" src="https://via.placeholder.com/100x100"/>
				</view>
			</view>
			<view class="info-item">
				<text class="info-item-title">用户名</text>
				<input class="info-item-content ipt" v-model="userName" type="text">
			</view>
			<view class="info-item">
				<text class="info-item-title">手机号</text>
				<input class="info-item-content ipt" v-model="tel" type="number">
			</view>
			<view class="info-item">
				<text class="info-item-title">地址</text>
				<input @tap="handleAddress" class="info-item-content ipt right" readonly v-model="address" type="text">
			</view>
			<view class="info-item">
				<text class="info-item-title">公司信息</text>
				<input class="info-item-content ipt" v-model="company" type="text">
			</view>
		</view>
		<uni-data-picker v-if="pickerVisible" ref="picker" placeholder="请选择" popup-title="请选择所在地区" :localdata="dataTree" v-model="address"
			@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
		</uni-data-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pickerVisible: false,
				tel: '13112345678',
				userName: '张三',
				address: '重庆重庆市渝中区郭守敬大道831号',
				company: '北京多咖科技有限公司',
				dataTree: [{
					text: "河北省",
					value: "1-0",
					children: [{
						text: "石家庄市",
						value: "1-1",
						children: [{
							text: "长安区",
							value: '1-1-1'
						},{
							text: "雨花区",
							value: '1-1-2'
						},{
							text: "桥东区",
							value: '1-1-3'
						},{
							text: "桥南区",
							value: '1-1-4'
						}]
					},
					{
						text: "保定市",
						value: "1-2"
					}]
				},
				{
					text: "山西省",
					value: "2-0",
					children: [{
						text: "太原市",
						value: "2-1"
					},
					{
						text: "大同市",
						value: "2-2"
					}]
				},
				{
					text: "辽宁省",
					value: "3-0",
					children: [{
						text: "沈阳市",
						value: "3-1"
					},
					{
						text: "朝阳市",
						value: "3-2"
					}]
				}]
			}
		},
		methods: {
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
			onchange(e) {
				console.log('onchange:', e);
				let address = ''
				e.detail.value.forEach(i => {
					address+=i.text
				})
				this.address = address
			}
 		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .selected-item-active{
		color: #7D0016;
		border: none;
	}
	.info {
		width: 100%;
		&-list {
			width: 100%;
			background: #ffffff;
			padding: 0 33rpx;
			box-sizing: border-box;
		}
		&-item {
			border-bottom: 1px solid #f6f6f6;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 33rpx 0;
			&-title {
				font-weight: 400;
				font-size: 28rpx;
				color: #000000;
				width: 120rpx;
			}
			&-content .img {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}
			.jt {
				width: 22rpx;
				height: 40rpx;
			}
			&-content {
				align-items: center;
				text-align: right;
				color: #999999;
			}
			&-content.ipt {
				flex: 1;
			}
		}
		.right {
			position: relative;
			padding-right: 30rpx;
		}
		.right::after {
			content: "";
			position: absolute;
			box-sizing: border-box;
			top: 50%;
			right: 10rpx;
			width: 14rpx;
			height: 14rpx;
			border-top: 2px solid #999999;
			border-right: 2px solid #999999;
			transform: rotate(45deg) translate3d(0, -50%, 0);
		}
	}
</style>
