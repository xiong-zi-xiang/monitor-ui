// 引入 Mock.js 库
import Mock from 'mockjs';
import baseURL from "@/backendAPI.js";

// Mock 模板，生成单个记录
const template = {
    "afId|+1": 1, // 自增 id，从 1 开始
    "telId": /1[3456789]\d{9}/, // 随机手机号码
    "provinceId": "@zip", // 随机省份编码
    "provinceName": "@province", // 随机省份名称
    "cityId": "@zip", // 随机城市编码
    "cityName": "@city", // 随机城市名称
    "districtId": "@zip", // 随机区县编码
    "districtName": "@county", // 随机区县名称
    "address": "@cword(3, 5)", // 随机中文地址，3到5个字
    "information": "@cparagraph(1, 3)", // 随机中文段落，1到3个段落
    "estimatedGrade": "@integer(1, 6)", // 随机评分，整数，范围在0到5之间
    "afDate": "@date", // 随机日期
    "afTime": "@time", // 随机时间
    "gmId": null,
    "gmName": null,
    "assignDate": "@date",
    "assignTime": "@time",
    "state": "@integer(0,2)",
    "remarks": "@csentence(3, 10)" // 随机中文句子，3到10个字
};

// 使用 Mock.js 生成模拟数据
export const generateMockData = (count, template) => {
    const records = [];
    for (let i = 0; i < count; i++) {
        records.push(Mock.mock(template));
    }
    return records;
};


// const records = generateMockData(10);

// 打印生成的模拟数据
// console.log(JSON.stringify(mockData, null, 2));

//返回
Mock.mock(baseURL + '/api/v1/feedbacks/tel/15083532198?' + 'page=1&size=10', 'get', (options) => {
    return {
        "statusCode": 200,
        "message": "查询成功",
        "data": {
            records: generateMockData(10, template),
            "total": 100,
            "size": 10,
            "current": 1,
            "pages": 1
        },
    }
})
Mock.mock(baseURL + '/feedback/getFeedbackByTelId?page=2&size=10', 'get', (options) => {
    return {
        "statusCode": 200,
        "message": "查询成功",
        "data": {
            records: generateMockData(10, template),
            "total": 100,
            "size": 10,
            "current": 1,
            "pages": 1
        },
    }
})
Mock.mock(baseURL + '/feedback/getFeedbackByTelId?page=3&size=10', 'get', (options) => {
    return {
        "statusCode": 200,
        "message": "查询成功",
        "data": {
            records: generateMockData(10, template),
            "total": 100,
            "size": 10,
            "current": 1,
            "pages": 1
        },
    }
})
Mock.mock(baseURL + '/feedback/getFeedbackByTelId?page=4&size=10', 'get', (options) => {
    return {
        "statusCode": 200,
        "message": "查询成功",
        "data": {
            records: generateMockData(10, template),
            "total": 100,
            "size": 10,
            "current": 1,
            "pages": 1
        },
    }
})
Mock.mock(baseURL + '/feedback/getFeedbackByTelId?page=5&size=10', 'get', (options) => {
    return {
        "statusCode": 200,
        "message": "查询成功",
        "data": {
            records: generateMockData(10, template),
            "total": 100,
            "size": 10,
            "current": 1,
            "pages": 1
        },
    }
})


