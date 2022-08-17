const state = {
	userInfo: {},
	openId: null,
	approve: false,
	showNav: '1',
	type: 'sales',
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
	setOpenId(state,nav) {
		state.openId = nav
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
}

const getters = {} 

export default {
	state,
	// actions,
	getters,
	mutations,
}