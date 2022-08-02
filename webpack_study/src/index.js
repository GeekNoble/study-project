import './main.css'
// import './main.scss'

import logo from '../public/p1.jpeg'

// const img = new Image()
// img.src = logo

// document.getElementById('imgBox').appendChild(img)

import 'ant-design-vue/dist/antd.css'
// import '@arco-design/web-vue/dist/arco.css';

import router from './router'
import { createApp } from 'vue' // Vue 3.x 引入 vue 的形式
import App from './App.vue' // 引入 APP 页面组建

const app = createApp(App) // 通过 createApp 初始化 app

// import ArcoVue from '@arco-design/web-vue';
import { Button,Collapse, List, Progress } from 'ant-design-vue'

// app.use(ArcoVue)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

app.use(ElementPlus)
app.use(Button)
app.use(Collapse)
app.use(List)
app.use(Progress)
app.use(router)
app.mount('#app') // 将页面挂载到 root 节点


// module.exports = Author
