import Vue from 'vue'
// global css style
import './helper/style/reset.css'
import './helper/style/main.css'
import './helper/style/global.css'
import './helper/style/transitions.css'
// components
import App from './App.vue'

Vue.config.productionTip = false

export const bus = new Vue()
new Vue({ render: h => h(App) }).$mount('#app')
