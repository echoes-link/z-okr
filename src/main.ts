import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
// import 'ant-design-vue/dist/antd.css'
// import antd from 'ant-design-vue'
import {
  Button,
  Modal,
  Input,
  Popconfirm,
  InputNumber,
  Tooltip,
  Popover
} from 'ant-design-vue'

createApp(App)
  // .use(store)
  .use(router)
  // .use(antd)
  .use(Button)
  .use(Modal)
  .use(Input)
  .use(Popconfirm)
  .use(InputNumber)
  .use(Tooltip)
  .use(Popover)
  .mount('#app')
