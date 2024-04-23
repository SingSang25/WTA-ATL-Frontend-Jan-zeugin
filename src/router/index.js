import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Settings from '@/views/Settings.vue'
import User from '@/views/User.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/settings', component: Settings },
    { path: '/user', component: User },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkActiveClass: "active",
})

export { router };