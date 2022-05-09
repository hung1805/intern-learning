import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import store from '@/store/index.js';

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
    component: () => import('../views/courses/Course.vue'),
    // beforeEnter: (to, from, next) => {
    //   if (!store.state.user.accessToken) {
    //     next({ name: 'login' });
    //   } else next();
    // },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue'),
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterPage.vue'),
  },
  {
    path: '/user/courses',
    name: 'user-course',
    component: () => import('../views/user/UserCourses.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.state.user.accessToken) {
        alert('You have to login before seeing your courses');
        next({ name: 'login' });
      } else next();
    },
  },
  { path: '/all-courses', name: 'all-courses', component: () => import('../views/courses/AllCourses.vue') },

  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/user/UserSetting.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.state.user.accessToken) {
        alert('You have to login before changing your accout settings');
        next({ name: 'login' });
      } else next();
    },
  },
  {
    path: '/courses/:id',
    name: 'courses/:id',
    component: () => import('../views/courses/Course.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.state.user.accessToken) {
        next({ name: 'login' });
      } else next();
    },
  },
  {
    path: '/user/words',
    name: 'user-words',
    component: () => import('../views/user/UserWords.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.state.user.accessToken) {
        next({ name: 'login' });
      } else next();
    },
  },
  {
    path: '/importcsv',
    name: 'import-csv',
    component: () => import('../components/UploadFileCsv.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
