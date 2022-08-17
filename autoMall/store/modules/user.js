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
	}
}
// const actions = {
// 	setStoreInfo: async ({ commit, state }, params) => {
// 		commit('UPDATE_STORE_INFO', params)
// 	},
// }

const getters = {} 

export default {
	state,
	// actions,
	getters,
	mutations,
}