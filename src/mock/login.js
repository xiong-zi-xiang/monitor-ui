// src/mock/mock.js
import Mock from 'mockjs';
import baseURL from "@/backendAPI.js";

Mock.setup({
    timeout: '200-600'
});
Mock.mock(baseURL + '/api/v1/auth/login', 'post', (options) => {
    console.log(options)
    const {logId, logPwd} = JSON.parse(options.body)
    if (logId !== 'admin' || logPwd !== 'admin123') {
        return Mock.mock({
            "statusCode": 401,
            "message": '用户名或密码错误'
        });
    } else {
        // 返回对象在data域
        return Mock.mock({
                "statusCode": 200,
                "message": "success",
                "data": "@string('lower',64)"
            }
        )
    }
})

Mock.mock(baseURL + '/api/v1/code/sms',
    'post', {}
)

// 测试 看看token
Mock.mock(baseURL + '/test', 'get', (options) => {
    console.log(options)
})


