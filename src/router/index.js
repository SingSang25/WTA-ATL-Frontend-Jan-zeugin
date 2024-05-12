import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Settings from '@/views/Settings.vue'
import SignUpm from '@/views/SignUp.vue'
import Blog from '@/views/Blog.vue'
import BlogVisuel from '@/views/BlogVisuel.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/settings', component: Settings },
    { path: '/signup', component: SignUpm },
    { path: '/blogs/create', component: Blog },
    { path: '/blogs/edit/:id', component: Blog },
    { path: '/blogs/:id', component: BlogVisuel },
    { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkActiveClass: "active",
})

export { router };