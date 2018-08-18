import Vue from 'vue'
import Router from 'vue-router'
import HomeView from './views/HomeView.vue'
import ProjectView from './views/ProjectView.vue'
import SearchProjectsView from './views/SearchProjectsView.vue'
import NotFoundView from './views/NotFoundView.vue'

const AND_OPERATOR = 'AND'
const OR_OPERATOR = 'OR'

const CONDITION_REGEXP = new RegExp(`(${AND_OPERATOR}|${OR_OPERATOR})`, 'i');

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
      path: '/search/projects',
      name: 'search.projects',
      component: SearchProjectsView,
      props: route => {
        let operator = AND_OPERATOR;
        if (route.query.operator && route.query.operator.match(CONDITION_REGEXP)) {
          operator = route.query.operator.match(CONDITION_REGEXP)[0].toUpperCase()
        }
        return {
          platforms: !route.query.platforms ? [] : route.query.platforms.split(',').filter(Boolean).sort(),
          operator,
          languages: !route.query.languages ? [] : route.query.languages.split(',').filter(Boolean).sort(),
        }
      }
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
