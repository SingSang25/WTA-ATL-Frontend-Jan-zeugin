import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Settings from '@/views/Settings.vue'
import SignUpm from '@/views/SignUp.vue'
import Blog from '@/views/Blog.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/settings', component: Settings },
    { path: '/signup', component: SignUpm },
    { path: '/blog', component: Blog },
    { path: '/blog/:id', component: Blog },
    { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkActiveClass: "active",
})

export { router };