import { createRouter, createWebHashHistory } from "vue-router";
import a1 from '@/views/aRouter/a1.vue'
//路由数组
const routes = [
  {
    path: '/',
    redirect: '/a1'
  },
  {
    //基本格式
    path: "/a1",
    name: "a1",
    component: a1,
    children: [
      {
        path: 'a2',
        name: 'a2',
        component: () => import(/* webpackChunkName: "a2" */ '@/views/aRouter/a2.vue')
      },
      {
        path: 'a3',
        name: 'a3',
        component: () => import(/* webpackChunkName: "a3" */ '@/views/aRouter/a3.vue')
      },
    ],
  },
  {
    //基本格式
    path: "/b1",
    name: "b1",
    component: import(/* webpackChunkName: "home" */ '@/views/bRouter/b1.vue'),
    children: [],
  },
];

//路由对象
const router = createRouter({
  // history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory

  history: createWebHashHistory(),

  routes, //上面的路由数组
});

//导出路由对象，在main.js中引用
export default router;
