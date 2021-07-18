import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router);

const Home = () => import('@/views/home/Home.vue');
const Category = () => import('@/views/category/Category.vue');
const Profile = () => import('@/views/profile/Profile.vue');
const Shopcart = () => import('@/views/shopcart/Shopcart.vue');

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