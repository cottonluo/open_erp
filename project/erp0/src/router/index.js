import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import employees from '@/components/employees'
import home from '@/components/home'
import finished_stat from '@/components/finished_stat'
import half_finished_stat from '@/components/half_finished_stat'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(Router);
Vue.use(iView);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/recording',
      name: 'employees',
      component: employees
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[{path:"/finished_stat",component:finished_stat},{path:"/half_finished_stat",component:half_finished_stat},{path:"",component:home}]
    }
  ]
})
