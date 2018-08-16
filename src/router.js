import Vue from 'vue'
import Router from 'vue-router'
import HomeView from './views/HomeView.vue'
import ProjectView from './views/ProjectView.vue'
import NotFoundView from './views/NotFoundView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/project/:slug',
      name: 'project.view',
      component: ProjectView,
      props: true
    },
    {
      path: '*',
      name: 'not_found',
      component: NotFoundView
    }
  ]
})
