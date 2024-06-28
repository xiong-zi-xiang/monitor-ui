// 记录模板
import baseURL from "@/backendAPI.js";
import Mock from "mockjs";
import {generateMockData} from "@/mock/NEPS/feedbackHistory.js";

const temp = {
    "member": {
        "id|+1": 1,
        "mname": "@cname",
        "logid": "@word",
        "tel": /1[3456789]\d{9}/,
        "gender|1": ["男", "女"],
        "birthday": "@date",
        "state|1": [0, 1, 2],
        "isNew|1": [0, 1]
    },
    "address": "@cword",
    "afId|+1": 1,
    "provinceName": "@province",
    // "provinceName": null,
    "cityName": "@city",
    "districtName": "@county",
    "areaName": "@cword(3, 5)",
    "roleState|1": [0, 1, 2],
    "remark": "先去东北大学南湖校区一趟"
}


// 修改网格员状态
Mock.mock(baseURL + '/api/v1/grid-managers/state', 'put', () => {
    return {
        "statusCode": 200,
        "message": "string",
        "data": true
    }
})
Mock.mock(baseURL + '/api/v1/grid-managers/search?page=1&size=10', 'get', () => {
    return {
        "statusCode": 200,
        "message": "查询成功",
        "data": {
            records: generateMockData(10, temp),
            "total": 165,
            "size": 10,
            "current": 1,
            "pages": 1
        },
    }
})
Mock.mock(baseURL + '/api/v1/grid-managers/search?page=2&size=10', 'get', () => {
    return {
        "statusCode": 200,
        "message": "查询成功",
        "data": {
            records: generateMockData(10, temp),
            "total": 165,
            "size": 10,
            "current": 1,
            "pages": 1
        },
    }
})
Mock.mock(baseURL + '/api/v1/grid-managers/search?page=3&size=10', 'get', () => {
    return {
        "statusCode": 200,
        "message": "查询成功",
        "data": {
            records: generateMockData(10, temp),
            "total": 165,
            "size": 10,
            "current": 1,
            "pages": 1
        },
    }
})
// roleState =1
Mock.mock(baseURL + '/api/v1/grid-managers/search?page=1&size=10&roleState=1', 'get', () => {
    return {
        "statusCode": 200,
        "message": "查询成功",
        "data": {
            records: generateMockData(10, temp),
            "total": 165,
            "size": 10,
            "current": 1,
            "pages": 1
        },
    }
})
Mock.mock(baseURL + '/api/v1/grid-managers/search?page=2&size=10&roleState=1', 'get', () => {
    return {
        "statusCode": 200,
        "message": "查询成功",
        "data": {
            records: generateMockData(10, temp),
            "total": 165,
            "size": 10,
            "current": 1,
            "pages": 1
        },
    }
})
Mock.mock(baseURL + '/api/v1/grid-managers/search?page=3&size=10&roleState=1', 'get', () => {
    return {
        "statusCode": 200,
        "message": "查询成功",
        "data": {
            records: generateMockData(10, temp),
            "total": 165,
            "size": 10,
            "current": 1,
            "pages": 1
        },
    }
})

const feedbackInfoTemp = {
    "afId|+1": 3,
    "telId": /1[3456789]\d{9}/,
    "provinceId": "110000",
    "provinceName": "@province",
    "cityId": "110100",
    "cityName": "@city",
    "districtId": "110105",
    "districtName": "@county",
    "address": "@cword",
    "information": "@word",
    "estimatedGrade|1": [null, 1, 2, 3, 4, 5, 6],
    "afDate": "@date",
    "afTime": "@time",
    "gmId": "@cword(3,5)",
    "gmName": "@cname",
    "assignDate|1": ["@date", null],
    "assignTime|1": ["@date", null],
    "confirmDatetime|1": ["@date", null],
    "state": 0,
    "remarks": "@cword",
    "timestamp": 1718232720000
}

Mock.mock(baseURL + '/api/v1/feedbacks/search?page=1&size=10', 'get', () => {
    return {
        "statusCode": 200,
        "message": "查询成功",
        "data": {
            records: generateMockData(10, feedbackInfoTemp),
            "total": 102,
            "size": 10,
            "current": 1,
            "pages": 1
        },
    }
})
Mock.mock(baseURL + '/api/v1/feedbacks/search?page=2&size=10', 'get', () => {
    return {
        "statusCode": 200,
        "message": "查询成功",
        "data": {
            records: generateMockData(10, feedbackInfoTemp),
            "total": 102,
            "size": 10,
            "current": 1,
            "pages": 1
        },
    }
})
Mock.mock(baseURL + '/api/v1/feedbacks/search?page=3&size=10', 'get', () => {
    return {
        "statusCode": 200,
        "message": "查询成功",
        "data": {
            records: generateMockData(10, feedbackInfoTemp),
            "total": 102,
            "size": 10,
            "current": 1,
            "pages": 1
        },
    }
})