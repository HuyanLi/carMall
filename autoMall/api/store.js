import request from '@/utils/request'
//我的优惠券
export const myCoupon = (data) => request(
	'/index.php/api/user/getMyCouponList',
	data,
	'POST'
) 
//获取品牌列表
export const bransList = () => request(
	'/index.php/api/goods/getBrandList',
	'POST'
) 
//获取商品列表
export const goodsList = (data) => request(
	'/index.php/api/goods/getGoodsList',
	data,
	'POST'
) 
//获取商品详情
export const goodsDetail = (data) => request(
	'/index.php/api/goods/getGoodsInfo',
	data,
	'POST'
) 
//添加购物车
export const addShopCart = (data) => request(
	'/index.php/api/cart/addCart',
	data,
	'POST'
) 
//购物车列表
export const shopList = (data) => request(
	'/index.php/api/cart/cartList',
	data,
	'POST'
) 
//删除/修改购物车
export const editShopCart = (data) => request(
	'/index.php/api/cart/editCart',
	data,
	'POST'
)
//拼团购物车
export const addCollageCart = (data) => request(
	'/index.php/api/cart/addCollageCart',
	data,
	'POST'
)
//领券结算
export const getOrderPrice = (data) => request(
	'/index.php/api/order/getOrderPrice',
	data,
	'POST'
)
//城市三级联动
export const getCity = (data) => request(
	'/index.php/api/index/getCity',
	data,
	'POST'
)
//查询收货列表
export const getAddress = (data) => request(
	'/index.php/api/address/getAddressList',
	data,
	'POST'
)
//添加收货地址
export const addAddress = (data) => request(
	'/index.php/api/address/addAddress',
	data,
	'POST'
)
//修改收货地址
export const editAddress = (data) => request(
	'/index.php/api/address/editAddress',
	data,
	'POST'
)
//删除收货地址
export const deleteAddress = (data) => request(
	'/index.php/api/address/delAddress',
	data,
	'POST'
)
//设置默认地址
export const setDefault = (data) => request(
	'/index.php/api/address/editDefaultAddress',
	data,
	'POST'
)
//获取拼团详情
export const getptList = (data) => request(
	'/index.php/api/index/getCollageInfo',
	data,
	'POST'
)
//获取商城设置
export const getBankInfo = (data) => request(
	'/index.php/api/index/getShopSet',
	data,
	'POST'
)
//获取用户的默认地址
export const getDefault = (data) => request(
	'/index.php/api/address/getDefaultAddress',
	data,
	'POST'
)
//添加订单
export const addOrder = (data) => request(
	'/index.php/api/order/addOrder',
	data,
	'POST'
)