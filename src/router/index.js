import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/lession',
    name: 'lession',
    component: () => import('../views/UserLession.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import('../views/TheCourses.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterPage.vue'),
  },
  {
    path: '/user/courses',
    name: 'user-course',
    component: () => import('../views/UserCourses.vue'),
  },
  { path: '/all-courses', name: 'all-courses', component: () => import('../views/AllCourses.vue') },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/UserProfile.vue'),
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/UserSetting.vue'),
  },
  {
    path: '/courses/:id',
    name: 'courses/:id',
    component: () => import('../views/Course.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
