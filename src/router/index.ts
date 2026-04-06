import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import AddPage from "../views/AddPage.vue";
import ListPage from "../views/ListPage.vue";
import DetailPage from "@/views/DetailPage.vue";
import ApiTest from "@/views/ApiTest.vue";
import PostPage from "@/views/PostPage.vue";
import ElementDemo from "@/views/ElementDemo.vue";
import ProfileDemo from "@/views/ProfileDemo.vue";
import ComposableDemo from "@/views/ComposableDemo.vue";
import LifecycleDemo from "@/views/LifecycleDemo.vue";
import DirectiveDemo from "@/views/DirectiveDemo.vue";

const routes = [
    {
        path:'/',
        name:'home',
        component: HomePage
    },
    {
        path:'/add',
        name:'add',
        component: AddPage
    },
    {
        path:'/list',
        name:'list',
        component: ListPage
    },
    {
        path:'/detail/:id',
        name:'DetailPage',
        component: DetailPage
    },
    {
        path:'/apitest',
        name:'apitest',
        component: ApiTest
    },
    {
        path:'/postpage/:id',
        name:'postpage',
        component: PostPage
    },
    {
        path:'/element',
        name:'element',
        component: ElementDemo
    },
    {
        path:'/profile',
        name:'profile',
        component: ProfileDemo
    },
    {
        path:'/composableDemo',
        name:'composableDemo',
        component: ComposableDemo
    },
    {
        path:'/lifecycleDemo',
        name:'lifecycleDemo',
        component:LifecycleDemo
    },
    {
        path:'/directiveDemo',
        name:'directiveDmeo',
        component:DirectiveDemo
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router