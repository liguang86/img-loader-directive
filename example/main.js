import Vue from 'vue'
import App from './App.vue'
import ImgLoaderDirective from '../src/img-loader-directive'

Vue.config.productionTip = false
Vue.use(ImgLoaderDirective)

new Vue({
  render: h => h(App)
}).$mount('#app')
