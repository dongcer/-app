import vue from 'vue';
import vuex from 'vuex';
vue.use(vuex);
const store = new vuex.Store({
  state: {
    islogin: false,
    videotype: 'f-'
  },
  mutations: {
    switch_islogin(state) { //这里的state对应着上面这个state
      state.islogin = true;
    },
    switch_isout(state) { //这里的state对应着上面这个state
      state.islogin = false;
    },
    switch_videotype(state,type) {
      state.videotype = type;
    }
  }
});
export default store;
