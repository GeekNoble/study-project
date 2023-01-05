import './main.css'
// import './main.scss'

import logo from '../public/p1.jpeg'


import 'ant-design-vue/dist/antd.css'
// import '@arco-design/web-vue/dist/arco.css';

import router from './router'
import { createApp } from 'vue' // Vue 3.x 引入 vue 的形式
import App from './App.vue' // 引入 APP 页面组建

const app = createApp(App) // 通过 createApp 初始化 app

// import ArcoVue from '@arco-design/web-vue';
import { Button,Collapse, List, Progress } from 'ant-design-vue'

// import vue3PhotoPreview from 'vue3-photo-preview';  //全局注册可改成局部注册，这样首屏加载时不会加载相关代码
import 'vue3-photo-preview/dist/index.css';


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// app.use(ArcoVue)

// app.use(vue3PhotoPreview);


app.use(ElementPlus)
app.use(Button)
app.use(Collapse)
app.use(List)
app.use(Progress)
app.use(router)
app.mount('#app') // 将页面挂载到 root 节点


// module.exports = Author
