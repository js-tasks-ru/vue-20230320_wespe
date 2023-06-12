import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../services/authService.js';

const router = createRouter({
  history: createWebHistory('/05-vue-router/05-AuthGuard'),
  routes: [
    {
      path: '/',
      alias: '/meetups',
      component: () => import('../views/PageMeetups.vue'),
    },
    {
      path: '/login',
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageLogin.vue'),
      beforeEnter: () => {
        if (isAuthenticated()) return { path: '/' }
      },
    },
    {
      path: '/register',
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageRegister.vue'),
      beforeEnter: () => {
        if (isAuthenticated()) return { path: '/' }
      },
    },
    {
      path: '/meetups/create',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageCreateMeetup.vue'),
      beforeEnter: (to) => {
        if (!isAuthenticated()) {
          return { path: '/login', query: { from: to.path } }
        }
      },
    },
    {
      path: '/meetups/:meetupId(\\d+)/edit',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageEditMeetup.vue'),
      beforeEnter: (to) => {
        if (!isAuthenticated()) {
          return { path: '/login', query: { from: to.path } }
        }
      },
    },
  ],
});

export { router };
