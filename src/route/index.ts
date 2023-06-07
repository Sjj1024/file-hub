import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes:Array<RouteRecordRaw> = [
  {
    path:"/",
    component:()=> import("@/views/login/index.vue")
  },
  {
    path: "/index",
    component: ()=> import("@/layout/index.vue")
  }
]


const router = createRouter({
  history:createWebHistory(),
  routes
})


export default router