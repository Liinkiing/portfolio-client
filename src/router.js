import Vue from 'vue'
import Router from 'vue-router'
import HomeView from './views/HomeView.vue'
import ProjectView from './views/ProjectView.vue'
import ProjectsSearchPlatform from './views/ProjectsSearchPlatform.vue'
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
      path: '/projects/platform/:platform',
      name: 'projects.platform',
      component: ProjectsSearchPlatform,
      props: route => ({platforms: [route.params.platform]})
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
