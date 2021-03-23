import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import { MdButton, MdContent, MdTabs, MdDatepicker, MdDialog, MdCard, MdField, MdLayout } from 'vue-material/dist/components'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Vuelidate from 'vuelidate'


// Vue.use(MdButton)
// Vue.use(MdContent)
// Vue.use(MdTabs)
// Vue.use(MdDatepicker)
// Vue.use(MdDialog)
// Vue.use(MdCard)
// Vue.use(MdField)
// Vue.use(MdLayout)
// Vue.use(Vuelidate)


Vue.use(VueMaterial)


// 

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
