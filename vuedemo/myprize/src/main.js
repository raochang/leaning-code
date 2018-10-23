import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import 'common/stylus/index.styl'

import nativeAPI from 'nativeAPI'
import { cookie } from 'common/js/util'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  created() {
    this.checkLogin()
  },
  methods: {
    checkLogin() {
      let cookies = cookie.parse(document.cookie)
      if (
        !cookies['lpsust'] ||
        cookies['lpsust'] === 'null' ||
        cookies['lpsust'] === ''
      ) {
        if (nativeAPI && nativeAPI.showLogin) {
          nativeAPI.showLogin()
        }
      }
    }
  }
})
