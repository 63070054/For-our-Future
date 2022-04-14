import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:newsName',
      name: 'news',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NewsView.vue')
    },
    {
      path: '/:profileName',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/:uniName',
      name: 'university',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UniversityView.vue')
    },
    {
      path: '/addUni',
      name: 'addUniversity',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddUniversityView.vue')
    },
    {
      path: '/:uniName/editUni',
      name: 'editUniversity',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditUniversityView.vue')
    },
    {
      path: '/:uniName/:facName',
      name: 'faculty',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FacultyView.vue')
    },
    {
      path: '/:uniName/addFaculty',
      name: 'addFaculty',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddFacultyView.vue')
    },
    {
      path: '/:uniName/:facName/editFac',
      name: 'editFaculty',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditFacultyView.vue')
    },
    {
      path: '/:uniName/:facName/:round',
      name: 'round',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RoundView.vue')
    },
    {
      path: '/:uniName/:facName/addRound',
      name: 'addRound',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddRoundView.vue')
    },
    {
      path: '/:uniName/:facName/:round/editRound',
      name: 'editRound',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditRoundView.vue')
    }
  ]
})

export default router
