import Vue from 'vue'
import App from './App.vue'
import Element from "element-ui";
import locale from 'element-ui/lib/locale/lang/en'
import '../style/theme/index.css'
import store from './store'
import 'chart.js'
import 'hchs-vue-charts'

Vue.use(window.VueCharts)


Vue.config.productionTip = false
Vue.use(Element, {locale})
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
