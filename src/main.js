import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import LottieVuePlayer from "@lottiefiles/vue-lottie-player";
Vue.config.productionTip = false

Vue.use(LottieVuePlayer);
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
