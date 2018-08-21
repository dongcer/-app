// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import theme from 'muse-ui/lib/theme';
import Http from './services/index';
import global from './globalVariable/globalURL';
import crypto from 'crypto';
import VueCordova from 'vue-cordova';
Vue.use(MuseUI);
Vue.use(VueCordova);
theme.use('light');
Vue.prototype.$http = Http;
Vue.prototype.global_ = global;
Vue.prototype.crypto = crypto;
Vue.prototype.theme = theme;
Vue.config.productionTip = false;
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  let cordovaScript = document.createElement('script');
  cordovaScript.setAttribute('type', 'text/javascript');
  cordovaScript.setAttribute('src', 'cordova.js');
  document.body.appendChild(cordovaScript);
  document.addEventListener('deviceready', function () {
    //相当于生命周期开始，cordova.js已经加载
    new Vue({
      el: '#app',
      router,
      store,
      components: {
        'app': App
      },
      template: '<app/>'
    })
    //   window.navigator.splashscreen.hide()
  }, false);
} else {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: {
      'app': App
    },
    template: '<app/>'
  })
}
