import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'ant-design-vue/dist/antd.css'
import { Button, Modal, Input, Popconfirm, InputNumber } from 'ant-design-vue'

createApp(App)
  .use(store)
  .use(router)
  .use(Button)
  .use(Modal)
  .use(Input)
  .use(Popconfirm)
  .use(InputNumber)
  .mount('#app')
