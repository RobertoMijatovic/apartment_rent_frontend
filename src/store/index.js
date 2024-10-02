import { createStore } from 'vuex';

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearToken(state) {
      state.token = '';
      localStorage.removeItem('token');
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
      // Set token in local storage for persistence
      localStorage.setItem('token', token);
    },
    clearToken({ commit }) {
      commit('clearToken');
      localStorage.removeItem('token');
    },
  },
  
});