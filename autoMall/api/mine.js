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