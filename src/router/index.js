import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout";
import store from "@/store";
import { Message } from "element-ui";
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";
import cmsManageRoutes from "./cmsManage";
Vue.use(Router);
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/common/login/index"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/common/404"),
    hidden: true,
  },
  {
    path: "/example",
    component: Layout,
    redirect: "/example/table",
    name: "Example",
    meta: { title: "Example", icon: "el-icon-s-help" },
    children: [
      {
        path: "table",
        name: "Table",
        component: () => import("@/views/table/index"),
        meta: { title: "Table", icon: "table" },
      },
      {
        path: "tree",
        name: "Tree",
        component: () => import("@/views/tree/index"),
        meta: { title: "Tree", icon: "tree" },
      },
    ],
  },
  ...cmsManageRoutes,
  
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });
const router = createRouter();

// const whiteList = ["/login"]; // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title);
  next();
  // determine whether the user has logged in
  // const hasToken = getToken();

  // if (hasToken) {
  //   if (to.path === "/login") {
  //     next({ path: "/" });
  //   } else {
  //     const hasGetUserInfo = store.getters.name;
  //     if (hasGetUserInfo) {
  //       next();
  //     } else {
  //       try {
  //         // get user info
  //         await store.dispatch("user/getInfo");

  //         next();
  //       } catch (error) {
  //         store.commit("user/RESET_STATE");
  //         Message.error(error || "Has Error");
  //         next(`/login?redirect=${to.path}`);
  //       }
  //     }
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next();
  //   } else {
  //     next(`/login?redirect=${to.path}`);
  //   }
  // }
});

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
