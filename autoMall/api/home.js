import request from '@/utils/request'
//首页轮播图
export const slideShow = () => request(
	'/index.php/api/index/indexBanner',
	'POST'
) 
//内容分类列表
export const contentType = () => request(
	'/index.php/api/index/getContentCategoryList',
	'POST'
) 
//内容列表
export const contentList = (data) => request(
	'/index.php/api/index/getContentList',
	data,
	'POST'
)
//获取内容详情
export const content = (data) => request(
	'/index.php/api/index/getContentInfo',
	data,
	'POST'
)
//上传营业执照
export const uploadLicense = (data) => request(
	'/index.php/api/common/upload',
	data,
	'POST'
)
//认证
export const approve = (data) => request(
	'/index.php/api/index/addAuthentication',
	data,
	'POST'
)
//注册礼包
export const registerGift = () => request(
	'/index.php/api/index/getShopSet',
	'POST'
)
//认证赠送优惠
export const approveCoupon = () => request(
	'/index.php/api/index/getAuthenticationCouponList',
	'POST'
)
//首页订单
export const orderData = (data) => request(
	'/index.php/api/order/getSigningNum',
	data,
	'POST'
)
//获取测试报告列表
export const getQuestion = (data) => request(
	'/index.php/api/index/getQuestionList',
	data,
	'POST'
)
//提交题目
export const addAnswer = (data) => request(
	'/index.php/api/index/addQuestionAnswer',
	data,
	'POST'
)
//获取签约设置
export const getQY = () => request(
	'/index.php/api/index/getSigningSet',
	'POST'
)