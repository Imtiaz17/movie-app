import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isLoading: false,
		dataState: "",
	},
	mutations: {
		SET_IS_LOADING(state, isLoading) {
			state.isLoading = isLoading;
		},
		SET_DATA_STATE(state, dataState) {
			state.dataState = dataState;
		},
	},
	actions: {
		setIsLoading({ commit }, isLoading) {
			commit("SET_IS_LOADING", isLoading);
		},
		setDataState({ commit }, dataState) {
			commit("SET_DATA_STATE", dataState);
		},
	},
})