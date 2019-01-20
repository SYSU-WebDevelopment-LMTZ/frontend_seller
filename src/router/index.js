import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// ES6 特性 require.ensure
const index = r => require.ensure([], () => r(require("@/components/index")), 'index')
const login = r => require.ensure([], () => r(require("@/components/login")), 'login')
const merchantManage = r => require.ensure([], () => r(require("@/components/merchantManage")), 'merchant_manage')
const menuManage = r => require.ensure([], () => r(require("@/components/menuManage")), 'menu_manage')
const orders = r => require.ensure([], () => r(require("@/components/ordersManage")), "orders")
const businessData = r => require.ensure([], () => r(require("@/components/businessData")), "business_data")

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: index,
            children: [{
                    path: '',
                    name: 'indexpage',
                    component: merchantManage
                },
                {
                    path: '/merchantManage',
                    name: 'merchant_manage',
                    component: merchantManage
                },
                {
                    path: '/menuManage',
                    name: 'menu_manage',
                    component: menuManage
                },
                {
                    path: '/orders',
                    name: 'orders',
                    component: orders
                },
                {
                    path: '/data',
                    name: 'busindess_data',
                    component: businessData
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: login
        }
    ]
})