import request from '@/utils/request'
//获取openid
export const getOpenIds = (data) => request(
	'/index.php/api/user/getOpenid',
	data,
	'POST'
)//get不传

//获取电话
export const getPhone = (data) => request(
	'/index.php/api/user/getPhone',
	data,
	'POST'
) 

//获取用户信息
export const getUserInfo = (data) => request(
	'/index.php/api/user/getUserInfo',
	data,
	'POST'
) 
//添加用户
export const addUser = (data) => request(
	'/index.php/api/user/addUser',
	data,
	'POST'
) 

//绑定手机号
export const bindPhone = (data) => request(
	'/api/wx/api/bindPhone',
	data,
	'POST',
	'application/json'
)

//我的信息  
export const getMemberInfo = (data) => request(
	'/api/member/findMemberInfo',
	data,
	'GET',
	'application/json'
)

//修改我的信息  
export const editMemberInfo = (data) => request(
	'/api/member/saveNickNameAndHeidPic',
	data,
	'POST',
	'application/json'
)

