import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        imgLoadNum: 0
    },
    mutations: {
        upDataImg(state) {
            state.imgLoadNum += 1;
        }
    },
    actions: {
        upDataImg(state) {
            state.commit('upDataImg');
        }
    }

})