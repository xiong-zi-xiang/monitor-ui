import Mock from 'mockjs';
import baseURL from '@/backendAPI.js'

Mock.mock(baseURL + '/api/v1/feedbacks', 'post', {
    "statusCode": 200,
    "message": "提交成功",
    "data": true
})

