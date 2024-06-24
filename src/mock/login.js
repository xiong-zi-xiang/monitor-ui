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
            "tel": /1[3456789]\d{9}/,
            'gender|1': ['男', '女'], // 随机生成男或女
            'birthday': '@date("yyyy-MM-dd")', // 随机生成日期
            'state|1': [0, 1, 2], // 随机生成 0 或 1 2
            'isNew|1': [0, 1] // 随机生成 0 或 1
        },
        "roles|1-3": [
            {
                "id|+1": 1,
                "mname": "@word",
                "enable|1": [0, 1], // 1是启用s
                "remark": "@cparagraph"
            }
        ],
        'permissions|2-3': ['@pick(["修改基本信息", "根据电话查询反馈信息", "提交反馈", "获取基本信息"])']

    }
})

//得到用户的 信息
// const data = Mock.mock({
//     "statusCode": 200,
//     "message": "获取用户信息成功",
//     "data": {
//         "member": {
//             "id": 2,
//             "mname": "李华",
//             "logid": "lihua123",
//             "tel": "12347236646",
//             "gender": "女",
//             "birthday": "2003-02-13",
//             "state": 1,
//             "isNew": 1
//         },
//         "roles|1-3": [
//             {
//                 "id|+1": 1,
//                 "mname": "@word",
//                 "enable|1": [0, 1],
//                 "remark": "@cparagraph"
//             }
//         ],
//         "permissions|1-5": [
//             "@cword(4, 8)"
//         ]
//     }
// });


