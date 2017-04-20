import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/chanpin/Table.vue'
import Form from './views/chanpin/Form.vue'
import user from './views/chanpin/user.vue'
import Ruku from './views/cangku/ruku.vue'
import Kucun from './views/cangku/kucun.vue'
import echarts from './views/charts/echarts.vue'
import Dingdan from './views/dingdan/dingdan.vue'
let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '产品',
        iconCls: 'ivu-icon ivu-icon-bag', //图标样式class
        children: [
            { path: '/table', component: Table, name: '产品维护', index: 2 },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '仓库',
        iconCls: 'ivu-icon ivu-icon-android-home',
        children: [
            { path: '/ruku', component: Ruku, name: '入库管理', index: 3 },
            { path: '/kucun', component: Kucun, name: '库存查询' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '订单',
        iconCls: 'ivu-icon ivu-icon-ios-paper-outline',
        children: [
            { path: '/dingdan', component: Dingdan, name: '订单处理' },

        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;