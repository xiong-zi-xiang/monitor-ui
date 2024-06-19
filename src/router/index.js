import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import NEPSView from '@/views/NEPS/NEPSView.vue'
import infoView from '@/views/info/infoView.vue'
import homeView from '@/views/NEPS/home/homeView.vue'
import feedbackView from '@/views/NEPS/feedback/feedbackView.vue'
import networkForm from '@/components/feedback/networkForm.vue'
import AQIAnticipation from "@/components/feedback/AQIAnticipation.vue";
import confirm from "@/components/feedback/confirm.vue"
import feedbackHistory from "@/views/NEPS/feedbackHistory/feedbackHistory.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:"/login",
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/NEPS',
      name: 'NEPS',
      component: NEPSView,
      children: [
        {
          path:'/NEPS/home',
          name:'home',
          component:homeView,
        },
        {
          path:'/NEPS/feedback',
          name:'feedback',
          component:feedbackView,
          children:[
            {
              path:'/NEPS/feedback/step1',
              name:'feedbackStep1',
              component:networkForm
            },
            {
              path:'/NEPS/feedback/step2',
              name:'feedbackStep2',
              component:AQIAnticipation
            },
            {
              path:'/NEPS/feedback/step3',
              name:'feedbackStep3',
              component:confirm
            },
          ]
        },
        {
          path:'/NEPS/feedbackHistory',
          name:'feedbackHistory',
          component:feedbackHistory,
        },
        {
          path: '/NEPS/info',
          name: 'info',
          component: infoView
        },
      ]
    },
  ]
})

export default router
