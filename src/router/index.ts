import { createRouter, createWebHistory } from 'vue-router';
import View_Home from '../views/View_Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: View_Home
    }
  ]
});

export default router;
