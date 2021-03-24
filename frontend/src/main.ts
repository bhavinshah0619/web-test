import Vue from 'vue'
import App from './App.vue'
import router from './router'

// TODO: For production only pull in the component that are used.
// import { MdButton, MdContent, MdTabs, MdDatepicker, MdDialog, MdCard, MdField, MdLayout } from 'vue-material/dist/components'
import VueMaterial from 'vue-material'
import Vuelidate from 'vuelidate'
import format from 'date-fns/format'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

// TODO: For production only pull in the component that are used.
// Vue.use(MdButton)
// Vue.use(MdContent)
// Vue.use(MdTabs)
// Vue.use(MdDatepicker)
// Vue.use(MdDialog)
// Vue.use(MdCard)
// Vue.use(MdField)
// Vue.use(MdLayout)
// Vue.use(Vuelidate)

// change single option
Vue.use(VueMaterial);
// 

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
