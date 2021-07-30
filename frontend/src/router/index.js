import { createRouter, createWebHashHistory } from "vue-router"

import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Account from '../views/AccountPage.vue'
import Posts from '../views/Posts.vue';
import AllPosts from '../posts/AllPosts.vue';
import NewPost from '../posts/NewPost.vue';
import OnePost from '../posts/OnePost.vue';
import ModifPost from '../posts/ModifPost.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/allPosts",
    name: "AllPosts",
    component: AllPosts,
  },
  {
    path: "/newPost",
    name: "NewPost",
    component: NewPost,
  },
  {
    path: "/commentaires/:id",
    name: "Onepost",
    component: OnePost,
  },
  {
    path: "/modifPost/:id",
    name: "ModifPost",
    component: ModifPost,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
