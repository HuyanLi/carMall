import request from '@/utils/request'
//我的优惠券
export const getQuestion = (data) => request(
	'/index.php/api/index/getQuestionList',
	data,
	'POST'
) 