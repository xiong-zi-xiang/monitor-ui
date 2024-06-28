// src/mock/mock.js
import Mock from 'mockjs';
import baseURL from "@/backendAPI.js";


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

// 测试手机登录
Mock.mock(baseURL + '/api/v1/auth/login/mobile', 'post', (options) => {
    console.log(options)
    const {mobile, smsCode} = JSON.parse(options.body)
    if (mobile !== '15083532198' || smsCode !== '123456') {
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

Mock.mock(baseURL + '/api/v1/members/info', 'get', {
    "statusCode": 200,
    "message": "获取用户信息成功",
    "data": {
        "member": {
            'id|1-100': 1,
            "mname": "@cname",
            "logid": "@word",
            "tel": '15083532198',
            'gender|1': ['男', '女'], // 随机生成男或女
            'birthday': '@date("yyyy-MM-dd")', // 随机生成日期
            'state|1': [0, 1], // 随机生成 0 或 1 0没有权限 1是正常
            'isNew|1': [0, 1] // 随机生成 0 或 1
        },
        "roles|1-3": [
            {
                "id|+1": 1,
                "mname": '@pick(["公众监督员", "网格员", "系统管理员" ])',
                "enable|1": [0, 1], // 1是启用
                "remark": "@cparagraph"
            }
        ],
        'permissions|2-3': ['@pick(["修改基本信息", "根据电话查询反馈信息", "提交反馈", "获取基本信息"])']

    }
})


Mock.mock(baseURL + '/api/v1/auth/password/change', 'post', {
    'statusCode': 200,
    message: '成功',
    data: {}
})

Mock.mock(baseURL + '/api/v1/members', 'put', {
    'statusCode': 200,
    message: '成功',
    data: {}
})


