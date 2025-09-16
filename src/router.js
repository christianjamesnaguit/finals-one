import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Admin from './pages/Admin.vue';
import Student from './pages/Student.vue';
import User from './pages/User.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/admin', name: 'Admin', component: Admin },
  { path: '/student', name: 'Student', component: Student },
  { path: '/user', name: 'User', component: User },
  { path: '/:catchAll(.*)', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
