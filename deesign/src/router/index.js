import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home', roles: [1, 0] }
    }]
  },
  {
    path: '/users',
    component: Layout,
    redirect: '/users/list',
    alwaysShow: true,
    meta: { title: '用户管理', icon: 'users', roles: [1] },
    children: [{
      path: 'list',
      name: 'UsersList',
      component: () => import('@/views/users/list'),
      meta: { title: '用户列表', roles: [1] }
    }]
  },
  {
    path: '/figure',
    component: Layout,
    redirect: '/figure/list',
    alwaysShow: true,
    meta: { title: '花样库', icon: 'figure', roles: [1, 0] },
    children: [{
      path: 'list',
      name: 'FigureList',
      component: () => import('@/views/figureLibrary/list'),
      meta: { title: '花样列表', roles: [1, 0] }
    }]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    alwaysShow: true,
    meta: { title: '订单管理', icon: 'order', roles: [1, 0] },
    children: [{
      path: 'list',
      name: 'OrderList',
      component: () => import('@/views/order/list'),
      meta: { title: '订单列表', roles: [1, 0] }
    }]
  },
  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/list',
    alwaysShow: true,
    meta: { title: '财务管理', icon: 'finance', roles: [1] },
    children: [{
      path: 'list',
      name: 'FinanceList',
      component: () => import('@/views/finance/list'),
      meta: { title: '财务列表', roles: [1, 0] }
    }]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/seetting/index',
    alwaysShow: true,
    meta: { title: '设置', icon: 'finance', roles: [1] },
    children: [{
      path: 'seettingIndex',
      name: 'SettingIndex',
      component: () => import('@/views/accountCenter/index'),
      meta: { title: '个人设置', roles: [1] }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }

]

export const asyncRoutes = [

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

