import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isLoading: false,
		dataState: "",
		searchInput: "",
	},
	mutations: {
		SET_IS_LOADING(state, isLoading) {
			state.isLoading = isLoading;
		},
		SET_DATA_STATE(state, dataState) {
			state.dataState = dataState;
		},
		SET_SEARCH_INPUT(state, searchInput) {
			state.searchInput = searchInput;
		},
	},
	actions: {
		setIsLoading({ commit }, isLoading) {
			commit("SET_IS_LOADING", isLoading);
		},
		setDataState({ commit }, dataState) {
			commit("SET_DATA_STATE", dataState);
		},
		setSearchInput({ commit }, searchInput) {
			commit("SET_SEARCH_INPUT", searchInput);
		},
	},
})