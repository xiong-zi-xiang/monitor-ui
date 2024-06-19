import Mock from 'mockjs';
import baseURL from '@/backendAPI.js'
Mock.mock(baseURL + '/feedback/receiveFeedBack', 'post',{
    "statusCode": 200,
    "message": "提交成功",
    "data": true
})