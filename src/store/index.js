import { createStore } from 'vuex';

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = '';
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
      localStorage.setItem('token', token); 
    },
    clearToken({ commit }) {
      commit('clearToken');
      localStorage.removeItem('token');
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token; 
    },
    getToken(state) {
      return state.token;
    },
  },
});
