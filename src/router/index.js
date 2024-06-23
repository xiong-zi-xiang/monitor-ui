import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import mainView from '@/views/mainView.vue'
import infoView from '@/views/info/infoView.vue'
import homeView from '@/views/NEPS/home/homeView.vue'
import feedbackView from '@/views/NEPS/feedback/feedbackView.vue'
import networkForm from '@/components/feedback/networkForm.vue'
import AQIAnticipation from "@/components/feedback/AQIAnticipation.vue";
import confirm from "@/components/feedback/confirm.vue"
import feedbackHistory from "@/views/NEPS/feedbackHistory/feedbackHistory.vue"
import taskView from "@/views/NEPG/task/taskView.vue"
import detectionRecordView from "@/views/NEPG/detectionRecord/detectionRecordView.vue"
import passwordLogin from '@/components/Login/passwordLogin.vue'
import smsLogin from '@/components/Login/smsLogin.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login/passwordLogin'
        },
        {
            path: '/',
            name: 'main',
            component: mainView,
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: homeView,
                },
                {
                    path: '/feedback',
                    name: 'feedback',
                    component: feedbackView,
                    children: [
                        {
                            path: '/feedback/step1',
                            name: 'feedbackStep1',
                            component: networkForm
                        },
                        {
                            path: '/feedback/step2',
                            name: 'feedbackStep2',
                            component: AQIAnticipation
                        },
                        {
                            path: '/feedback/step3',
                            name: 'feedbackStep3',
                            component: confirm
                        },
                    ]
                },
                {
                    path: '/feedbackHistory',
                    name: 'feedbackHistory',
                    component: feedbackHistory,
                },
                {
                    path: '/info',
                    name: 'info',
                    component: infoView
                },
                {
                    path: '/task',
                    name: 'task',
                    component: taskView
                },
                {
                    path: '/detectionRecord',
                    name: 'detectionRecord',
                    component: detectionRecordView
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            children: [
                {
                    path: '/login/passwordLogin',
                    name: 'passwordLogin',
                    component: passwordLogin
                },
                {
                    path: '/login/smsLogin',
                    name: 'smsLogin',
                    component: smsLogin
                }
            ]

        }
    ]
})

export default router
