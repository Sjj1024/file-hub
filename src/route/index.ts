import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes:Array<RouteRecordRaw> = [
  {
    path:"/",
    component: ()=> import("@/layout/index.vue")
  },
  {
    path: "/regist",
    component:()=> import("@/views/login/index.vue")
  }
]


const router = createRouter({
  history:createWebHistory(),
  routes
})


export default router