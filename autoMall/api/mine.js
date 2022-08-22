import request from '@/utils/request'
//编辑用户
export const editUser = (data) => request(
	'/index.php/api/user/editUser',
	data,
	'POST'
) 
//我的消息列表
export const getInfoList = (data) => request(
	'/index.php/api/user/msgList',
	data,
	'POST'
) 

//我的订单列表
export const getOrderList = (data) => request(
	'/index.php/api/order/getOrderList',
	data,
	'POST'
) 
//我的订单详情
export const getOrderInfo = (data) => request(
	'/index.php/api/order/getOrderInfo',
	data,
	'POST'
) 
//取消订单
export const cancleOrder = (data) => request(
	'/index.php/api/order/cancelOrder',
	data,
	'POST'
) 
//确认收货
export const confirmOrder = (data) => request(
	'/index.php/api/order/confirmReceiptOrder',
	data,
	'POST'
) 

//我的仓库列表
export const warehouse = (data) => request(
	'/index.php/api/user/getMyGoodsList',
	data,
	'POST'
)
//仓库出库
export const outMemberGoods = (data) => request(
	'/index.php/api/user/outMemberGoods',
	data,
	'POST'
)
//库存记录
export const goodsHistory = (data) => request(
	'/index.php/api/user/getMyOutGoodsLogList',
	data,
	'POST'
)
//库存筛选
export const fliterHistory = (data) => request(
	'/index.php/api/user/getMyOutGoodsList',
	data,
	'POST'
)
//我的出入库详情
export const getMyOutGoodsLogList = (data) => request(
	'/index.php/api/user/getMyOutGoodsLogList',
	data,
	'POST'
)
//分销订单
export const getFXlist = (data) => request(
	'/index.php/api/user/getMyCommissionOrderList',
	data,
	'POST'
)
//分销关系
export const getRelationlist = (data) => request(
	'/index.php/api/user/getMySubordinateList',
	data,
	'POST'
)
//余额明细
export const yeList = (data) => request(
	'/index.php/api/user/getMyCommissionPriceList',
	data,
	'POST'
)
//提现记录
export const txList = (data) => request(
	'/index.php/api/user/getMyCommissionCashList',
	data,
	'POST'
)
//提现
export const userGet = (data) => request(
	'/index.php/api/user/cashMoney',
	data,
	'POST'
)
