import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router);

const Home = () => import('@/views/Home.vue');
const Category = () => import('@/views/Category.vue');
const Profile = () => import('@/views/Profile.vue');
const Shopcart = () => import('@/views/Shopcart.vue');

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/category',
            name: 'Category',
            component: Category
        },
        {
            path: '/shopcart',
            name: 'shopcart',
            component: Shopcart
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
    ],
    mode: 'history',
})