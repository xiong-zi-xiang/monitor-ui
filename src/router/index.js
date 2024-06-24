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
import enroll from '@/components/Login/enroll.vue'
import page404view from '@/views/page404view.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: mainView,
            meta: {requiresAuth: true},
            children: [
                {
                    path: '/',
                    redirect: '/home'
                },
                {
                    path: '/home',
                    name: 'home',
                    component: homeView,
                    meta: {requiresAuth: true},
                },
                {
                    path: '/feedback',
                    name: 'feedback',
                    component: feedbackView,
                    meta: {requiresAuth: true},
                    children: [
                        {
                            path: '/feedback/step1',
                            name: 'feedbackStep1',
                            component: networkForm,
                            meta: {requiresAuth: true},
                        },
                        {
                            path: '/feedback/step2',
                            name: 'feedbackStep2',
                            component: AQIAnticipation,
                            meta: {requiresAuth: true},

                        },
                        {
                            path: '/feedback/step3',
                            name: 'feedbackStep3',
                            component: confirm,
                            meta: {requiresAuth: true},
                        },
                    ]
                },
                {
                    path: '/feedbackHistory',
                    name: 'feedbackHistory',
                    component: feedbackHistory,
                    meta: {requiresAuth: true},
                },
                {
                    path: '/info',
                    name: 'info',
                    component: infoView,
                    meta: {requiresAuth: true},
                },
                {
                    path: '/task',
                    name: 'task',
                    component: taskView,
                    meta: {requiresAuth: true},
                },
                {
                    path: '/detectionRecord',
                    name: 'detectionRecord',
                    component: detectionRecordView,
                    meta: {requiresAuth: true},
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            children: [
                {
                    path: '/login',
                    redirect: '/login/passwordLogin'
                },
                {
                    path: '/login/passwordLogin',
                    name: 'passwordLogin',
                    component: passwordLogin
                },
                {
                    path: '/login/smsLogin',
                    name: 'smsLogin',
                    component: smsLogin
                },
                {
                    path: '/login/enroll',
                    name: 'enroll',
                    component: enroll
                }
            ]

        },
        {
            path: '/:pathMatch(.*)',
            //访问主页的时候 重定向到index页面
            redirect: '/404',
        },
        {
            name: '404',
            path: '/404',
            component: page404view,
        }
    ]
})

export default router
