<template>
	<view class="body-view">
		<!-- 头部 -->
		<scroll-view class="top-menu-view" scroll-x="true" :scroll-left="scrollLeft">
			<block v-for="(menuTab,index) in menuTabs" :key="index">
				<view class="menu-topic-view" v-bind:id="'tabNum'+index" @click="swichMenu(index)">
					<view class="uni-flex uni-column" :class="[currentTab==index ? 'menu-topic-act' : 'menu-topic']">
						<image :src="menuTab.imgSrc" mode=""></image>
						<view class="menu-topic-txt">{{menuTab.name}}</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view class="uni-flex uni-row chooseBox">
			<view class="text uni-flex" style="align-items:center;">
				<text class="choseText">当前品牌 : <text class="chooseType">{{this.type}}</text></text>
			</view>
			<view class="text uni-flex detail" @click="toDetail"
				style="-webkit-flex: 1;flex: 1;-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;">
				<text class="choseText">品牌详情 </text>
				<image src="https://baiyuechangxiong-pic.luobo.info/che/static/image/mall/to.png"></image>
			</view>
		</view>
		<!-- 显示区域 -->
		<swiper :current="currentTab" class="swiper-box-list" duration="300" @change="swiperChange">
			<block v-for="(swiperDate,index1) in swiperDateList" :key="index1">
				<swiper-item>
					<scroll-view class="swiper-topic-list" scroll-y="true" @scrolltolower="loadMore(index1)">
						<block v-for="(swiperDate2,index2) in swiperDate" :key="index2">
							<view class="goodsList" @click="toGoodsDetail()">
								<view class="uni-flex uni-column goodsItem" v-for="(item,index) in goodsList"
									:key='index'>
									<view class="text">
										<image :src="item.imgSrc"></image>
									</view>
									<view class="text fontText" style="-webkit-flex: 1;flex: 1;">{{item.text}}</view>
									<view class="text money" style="-webkit-flex: 1;flex: 1;">￥{{item.money}}</view>
								</view>
							</view>
						</block>
					</scroll-view>
				</swiper-item>
			</block>
		</swiper>
		<!-- tabBar -->
		<tab-bar :current="currentTabIndex" :approve='approve' backgroundColor="#fbfbfb" color="#999" tintColor="#42b983" @click="tabClick"></tab-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				approve: true,
				currentTabIndex: 1,
				scrollLeft: 0,
				isClickChange: false,
				currentTab: 0,
				type: '',
				goodsList: [{
					imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
					text: '米家行车记录仪 GPS卫星全球定位 高清画面驱蚊器翁王企鹅驱蚊器王企鹅热污染',
					money: '2538.00'
				}, {
					imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
					text: '米家行车记录仪 GPS卫星全球定位 高清画面',
					money: '2538.00'
				}, {
					imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
					text: '米家行车记录仪 GPS卫星全球定位 高清画面地方',
					money: '111.00'
				}, {
					imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
					text: '米家行车记录仪 GPS卫星全球定位 高清画面让人',
					money: '222.00'
				}, {
					imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
					text: '米家行车记录仪 GPS卫星全球定位 高清画面驱蚊器',
					money: '33.00'
				}],
				// Tab分类标题
				menuTabs: [{
					imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
					name: '今日热点',
				}],
				// menuTabs: [{
				// 	imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png'),
				// 	name: '今日热点'
				// }, {
				// 	imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
				// 	name: '医疗'
				// }, {
				// 	imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
				// 	name: '交通'
				// }, {
				// 	imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
				// 	name: '住房'
				// }, {
				// 	imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
				// 	name: '社会保障'
				// }, {
				// 	imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
				// 	name: '教育'
				// }, {
				// 	imgSrc: 'https://baiyuechangxiong-pic.luobo.info/che/static/image/home/banner1.png',
				// 	name: '民生热点'
				// }],
				// Tab切换内容
				swiperDateList: [
					[],
					[],
					[],
					[],
					[],
					[],
					[]
				],
				// 接口列表模拟数据
				list: [{
						title: "2019“中国最好学科排名” 四川3所高校各有1个学科点入",
						hot: "热",
						type: "教育",
						time: "2016.11.21"
					},
					{
						title: "BW成都站2019有哪些b站up主嘉宾(时间+地点+门票)",
						hot: "",
						type: "民生热点",
						time: "2016.11.21"
					},
					{
						title: "成都：公积金贷款系统升级 最快15个工作日左右到账  最快15个工作日左右到账",
						hot: "",
						type: "住房",
						time: "2016.11.21"
					},
					{
						title: "成灌线刷天府通坐高铁预计 明年5月可实现",
						hot: "",
						type: "名生热点",
						time: "2016.11.21"
					},
					{
						title: "成都车主朋友注意!未安装ETC走成都绕城、成温邛...",
						hot: "",
						type: "交通",
						time: "2016.11.21"
					}
				],
			}
		},
		onLoad: function() {
			//初始化数据
			for (var i = 0; i < this.swiperDateList.length; i++) {
				this.getDateList(i);
			}
			this.menuTabs.forEach((v, i) => {
				if (i === 0) {
					this.type = v.name
				}
			})
			console.log(this.type, 1111111111111)
		},
		methods: {
			swichMenu: async function(current) { //点击其中一个 menu
				this.menuTabs.forEach((v, i) => {
					if (current === i) {
						this.type = v.name
					}
				})
				console.log(this.type, 111111222)
				if (this.currentTab == current) {
					return false;
				} else {
					this.currentTab = current;
					this.setScrollLeft(current);
				}
			},
			//品牌详情
			toDetail() {
				uni.navigateTo({
					url: '/pages/store/brandDetail/brandDetail'
				})
			},
			//商品詳情
			toGoodsDetail() {
				uni.navigateTo({
					url: '/pages/store/goodsDetail/goodsDetail'
				})
			},
			swiperChange: async function(e) {
				let index = e.target.current;
				this.setScrollLeft(index);
				this.currentTab = index;
			},
			setScrollLeft: async function(tabIndex) {
				let leftWidthSum = 0;
				for (var i = 0; i <= tabIndex; i++) {
					let nowElement = await this.getWidth('tabNum' + i);
					leftWidthSum = leftWidthSum + nowElement.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth;
				this.scrollLeft = leftWidthSum > winWidth ? (leftWidthSum - winWidth) : 0
			},
			getWidth: function(id) { //得到元素的宽高
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				})
			},
			loadMore: function(tabIndex) {
				console.log('正在加载更多数据。。。')
			},
			getDateList: function(tabIndex) {
				for (var i = 0; i < 1; i++) {
					var entity = this.menuTabs[tabIndex].name + (this.swiperDateList[tabIndex].length);
					this.swiperDateList[tabIndex].push(entity);
				}
			},

		},
	}
</script>
<style lang="scss" scoped>
	/* Tab切换 */
	.body-view {
		// padding-bottom: 120rpx;
		height: 100%;
		width: 100%;
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		align-items: flex-start;
		justify-content: center;
	}

	.top-menu-view {
		display: flex;
		white-space: nowrap;
		width: 100%;
		background-color: #FFFFFF;
		// height: 86upx;
		border-top: 1px solid #d8dbe6;
		border-bottom: 1px solid #d8dbe6;
	}

	.top-menu-view .menu-topic-view {
		display: inline-block;
		white-space: nowrap;
		// height:86upx ;
		position: relative;

		image {
			width: 135rpx;
			height: 135rpx;
			margin: 20rpx auto;
		}
	}

	.top-menu-view .menu-topic-view .menu-topic {
		margin-left: 30rpx;
		margin-right: 10rpx;
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top-menu-view .menu-topic-view .menu-topic:first-child {
		margin-left: 30upx;
	}

	.top-menu-view .menu-topic-view:last-child .menu-topic {
		margin-right: 80upx;
	}

	.top-menu-view .menu-topic-view .menu-topic .menu-topic-txt {
		// font-size: 30upx;
		color: #303133;
		margin-bottom: 30rpx;
	}

	.top-menu-view .menu-topic-view .menu-topic .menu-topic-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
	}

	.top-menu-view .menu-topic-view .menu-topic .menu-topic-bottom .menu-topic-bottom-color {
		width: 40upx;
		height: 4upx;
	}

	.top-menu-view .menu-topic-view .menu-topic-act {
		margin-left: 30upx;
		margin-right: 10upx;
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		font-size: 24rpx;
		color: #757575;
	}

	.top-menu-view .menu-topic-view:last-child .menu-topic-act {
		margin-right: 30rpx;
	}

	.top-menu-view .menu-topic-view .menu-topic-act .menu-topic-txt {
		font-family: PingFangSC-Regular;
		font-weight: 400;
		font-size: 28rpx;
		color: #000000;
	}

	.top-menu-view .menu-topic-view .menu-topic-act .menu-topic-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.top-menu-view .menu-topic-view .menu-topic-act .menu-topic-bottom .menu-topic-bottom-color {
		width: 40upx;
		height: 6upx;
		background: #3d7eff;
	}

	.swiper-box-list {
		flex: 1;
		width: 100%;
		height: auto;
		margin-bottom: 120rpx;
		// background-color: #FFFFFF;
	}
	.swiper-topic-list {
		height: 100%;
		width: 100%;
		padding-bottom: 120rpx;
	}
	.chooseBox {
		width: 750rpx;
		background: #FFFFFF;
		padding: 35rpx 30rpx;
		.chooseText {
			font-family: PingFangSC-Regular;
			font-weight: 400;
			font-size: 24rpx;
			color: #333333;
		}

		.chooseType {
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			font-size: 28rpx;
			color: #333333;
			margin-left: 20rpx;
		}

		.detail {
			margin-right: -330rpx;

			.choseText {
				// margin-right: 30rpx;
			}

			image {
				width: 20rpx;
				height: 20rpx;
				margin-left: 10rpx;
			}
		}
	}

	.goodsList {
		border-radius: 16rpx;
		margin: -10rpx 30rpx 200rpx;
		height: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin: 20rpx 30rpx;
		justify-content: space-between;
		.goodsItem {
			// padding: 20rpx 18rpx;
			width: 48%;
			background-color: #fff;
			margin-bottom: 20rpx;
			.text {
				width: 300rpx;
				margin: 20rpx auto 30rpx;
			}
			image {
				width: 300rpx;
				height: 300rpx;
				// margin: 20rpx 20rpx 30rpx;
			}

			.fontText {
				font-family: PingFangSC-Regular;
				font-weight: 400;
				font-size: 26rpx;
				color: #231F20;
				line-height: 36rpx;
				margin: 0 0 0 20rpx;
				//文本超出部分以...形式展示
				text-overflow: -o-ellipsis-lastline;
				//整体超出部分隐藏
				overflow: hidden;
				//文本超出部分以...形式展示，同第一行样式代码
				text-overflow: ellipsis;
				//display 块级元素展示
				display: -webkit-box;
				//设置文本行数为2行
				-webkit-line-clamp: 2;
				//设置文本行数为2行
				line-clamp: 2;
				//从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
				-webkit-box-orient: vertical;
			}

			.money {
				font-family: PingFangSC-Regular;
				font-weight: 400;
				font-size: 30rpx;
				color: #ED1C24;
				text-align: justify;
				margin-left: 20rpx;
			}
		}
	}
</style>
