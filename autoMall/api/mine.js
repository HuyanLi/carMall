import request from '@/utils/request'
//编辑用户
export const editUser = () => request(
	'/index.php/api/user/editUser',
	'POST'
) 
//我的仓库列表
export const warehouse = (data) => request(
	'/index.php/api/user/getMyGoodsList',
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