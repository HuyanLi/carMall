const state = {
	userInfo: {},
	openId: null,
	approve: false,
	showNav: '1',
	type: 'sales',
	mobile: ''
}

const mutations = {
	userInfo(state, userInfo) {
		console.log(userInfo)
		state.userInfo = userInfo;
	},
	setApprove(state,app) {
		state.approve = app
	},
	setShowNav(state,nav) {
		state.showNav = nav
	},
	setOpenId(state,openId) {
		state.openId = openId
	},
	mobile(state,mobile) {
		state.mobile = mobile
	}
}
const actions = {
	userInfo: async ({ commit, state }, params) => {
		commit('userInfo', params)
	},
	setApprove: async({ commit, state },params) => {
		commit('approve', params)
	},
	setOpenId: async({ commit, state },params) => {
		commit('openId', params)
	},
	setMobile: async({ commit, state },params) => {
		commit('mobile', params)
	},
}

const getters = {} 

export default {
	state,
	// actions,
	getters,
	mutations,
}