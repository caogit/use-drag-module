/*
 * @Description: 😎
 * @Version: 2.0
 * @Autor: 曹老板
 * @Date: 2021-12-01 09:12:01
 * @LastEditors: 曹老板
 * @LastEditTime: 2021-12-24 10:46:38
 */

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
