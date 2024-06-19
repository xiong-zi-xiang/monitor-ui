// src/mock/mock.js
import Mock from 'mockjs';
import baseURL from "@/backendAPI.js";
Mock.mock(baseURL+'/auth/login','post',(options) =>{
    console.log(options.type)
    const {logId,logPwd} = JSON.parse(options.body)
    if (logId !== 'admin' || logPwd !== 'admin123') {
        return Mock.mock({
            "statusCode": 401,
            "message": '用户名或密码错误'
        });
    }
    else {
        // 返回对象在data域
        return Mock.mock({
            "statusCode": 200,
            "message": "success",
            "data": {
                "member": {
                    "mname": "张小明",
                    "logid": "MXPD25cjwo",
                    "logpwd": "2bBQWjzrXp",
                    "tel": "9006740279",
                    "gender": "男",
                    "birthday": 1185897600000,
                    "roleid": 1,
                    "state": 0
                },
                "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dJZCI6IjJiQlFXanpyWHAiLCJleHAiOjE3MTgyNjk5MzYsImlhdCI6MTcxODI2MjczNn0.IqqmTAsNPBvNQRyKQvnUdl3bnO5CJpEqgFFR8K0diQY"
            }
        })
    }
})



