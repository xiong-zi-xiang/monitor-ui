import baseURL from "@/backendAPI.js";
import {generateMockData} from "@/mock/NEPS/feedbackHistory.js";
import Mock from "mockjs";

const temp = {
    "afId|+1": 1,
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
    "gmId": "MXPD25cjwo",
    "gmName": "@cname",
    "assignDate": "@date",
    "assignTime": "@time",
    "confirmDatetime": null, // 确认日期
    "state": '@integer(1,2)', // 1到2中选择 0未指派 1等待接任务 2有正在做的任务
    "remarks": "@csentence(3, 10)", // 随机中文句子，3到10个字
    "timestamp": 1718320787000
};
const historyTemp = {
    "id|+1": 1,
    "afId|+1": 1,
    "provinceId": "@zip", // 随机省份编码
    "provinceName": "@province", // 随机省份名称
    "cityId": "@zip", // 随机城市编码
    "cityName": "@city", // 随机城市名称
    "districtId": "@zip", // 随机区县编码
    "districtName": "@county", // 随机区县名称
    "address": "@cword(3, 5)", // 随机中文地址，3到5个字
    "so2Value|1-100": 1,
    "s02Level": {
        "id|1-6": 1,
        'chineseExplain|1': ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染'],
        "color|1": ["#009966", '#ffde33', '#ff9933', '#cc0033', '#660099', '#7e0023']
    },
    "so2Aqi|1-100": 20,
    "coValue|1-100": 1,
    "coLevel": {
        "id|1-6": 1,
        'chineseExplain|1': ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染'],
        "color|1": ["#009966", '#ffde33', '#ff9933', '#cc0033', '#660099', '#7e0023']
    },
    "coAqi|1-100": 20,
    'spmValue|1-100': 1,
    "spLevel": {
        "id|1-6": 1,
        'chineseExplain|1': ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染'],
        "color|1": ["#009966", '#ffde33', '#ff9933', '#cc0033', '#660099', '#7e0023']
    },
    "spmAqi|1-100": 1,
    "aqi|1-100": 1,
    "aqiLevel": {
        "id|1-6": 1,
        'chineseExplain|1': ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染'],
        "color|1": ["#009966", '#ffde33', '#ff9933', '#cc0033', '#660099', '#7e0023']
    },
    "confirmDatetime": "2024-06-25T10:22:52",
    "gmId": "MXPD25cjwo",
    "gmName": "@cname",
    "fdTel": /1[3456789]\d{9}/,
    "information": "@csentence(3, 10)",
    "remarks": "@csentence(3, 10)"
}


Mock.mock(baseURL + '/api/v1/feedbacks/waiting-list?page=1&size=10&finish=0', 'get', () => {
    return {
        "statusCode": 200,
        "message": "查询成功",
        "data": {
            records: generateMockData(10, temp),
            "total": 100,
            "size": 10,
            "current": 1,
            "pages": 1
        },
    }
})
Mock.mock(baseURL + '/api/v1/feedbacks/waiting-list?page=2&size=10&finish=0', 'get', () => {
    return {
        "statusCode": 200,
        "message": "查询成功",
        "data": {
            records: generateMockData(10, temp),
            "total": 100,
            "size": 10,
            "current": 1,
            "pages": 1
        },
    }
})
Mock.mock(baseURL + '/api/v1/feedbacks/waiting-list?page=3&size=10&finish=0', 'get', () => {
    return {
        "statusCode": 200,
        "message": "查询成功",
        "data": {
            records: generateMockData(10, temp),
            "total": 100,
            "size": 10,
            "current": 1,
            "pages": 1
        },
    }
})
Mock.mock(baseURL + '/api/v1/feedbacks/waiting-list?page=4&size=10&finish=0', 'get', () => {
    return {
        "statusCode": 200,
        "message": "查询成功",
        "data": {
            records: generateMockData(10, temp),
            "total": 100,
            "size": 10,
            "current": 1,
            "pages": 1
        },
    }
})
Mock.mock(baseURL + '/api/v1/feedbacks/waiting-list?page=5&size=10&finish=0', 'get', () => {
    return {
        "statusCode": 200,
        "message": "查询成功",
        "data": {
            records: generateMockData(10, temp),
            "total": 100,
            "size": 10,
            "current": 1,
            "pages": 1
        },
    }
})

//判断网格员是否空闲
Mock.mock(baseURL + '/api/v1/grid-managers/available', 'get', {
    "statusCode": 200,
    "message": "指派成功",
    "data": true
})
//接受指派
Mock.mock(baseURL + '/api/v1/grid-managers/assign/accept', 'post', {
    "statusCode": 200,
    "message": "接受成功",
})
// 计算AQI
Mock.mock(baseURL + '/api/v1/aqi/level/list?SO2=1&CO=1&SPM=1', 'get', {
    "statusCode": 200,
    "message": "success",
    "data": [
        {
            "id": 1,
            "chineseExplain": "优",
            "color": "#009966"
        },
        {
            "id": 1,
            "chineseExplain": "优",
            "color": "#009966"
        },
        {
            "id": 1,
            "chineseExplain": "优",
            "color": "#009966"
        },
        {
            "id": 1,
            "chineseExplain": "优",
            "color": "#009966"
        }
    ]
})

//上报AQI
Mock.mock(baseURL + '/api/v1/statistics', 'post', {
    "statusCode": 200,
    "message": "上报成功",
})

Mock.mock(baseURL + '/api/v1/feedbacks/current', 'get', {
    "statusCode": 200,
    "message": "获取成功",
    "data": {
        "afId": '@integer(1,2,3)',
        "telId": /1[3456789]\d{9}/, // 随机手机号码
        "provinceId": "@zip", // 随机省份编码
        "provinceName": "@province", // 随机省份名称
        "cityId": "@zip", // 随机城市编码
        "cityName": "@city", // 随机城市名称
        "districtId": "@zip", // 随机区县编码
        "districtName": "@county", // 随机区县名称
        "address": "@cword(3, 5)", // 随机中文地址，3到5个字
        "information": "@cparagraph(1, 3)", // 随机中文段落，1到3个段落
        "estimatedGrade": "@integer(0, 5)", // 随机评分，整数，范围在0到5之间
        "afDate": "@date", // 随机日期
        "afTime": "@time", // 随机时间
        "gmId": "MXPD25cjwo",
        "gmName": "@cname",
        "assignDate": "@date",
        "assignTime": "@time",
        "confirmDatetime": null, // 确认日期
        "state": '@integer(1,2)', // 1到2中选择 0未指派 1等待接任务 2有正在做的任务
        "remarks": "@csentence(3, 10)", // 随机中文句子，3到10个字
    }
})

// 查询自己的历史
Mock.mock(baseURL + '/api/v1/statistics/history?page=1&size=10', 'get', () => {
        return {
            "statusCode": 200,
            "message": "查询成功",
            "data": {
                records: generateMockData(10, historyTemp),
                "total": 100,
                "size": 10,
                "current": 1,
                "pages": 1
            },
        }
    }
)
// 查询自己的历史
Mock.mock(baseURL + '/api/v1/statistics/history?page=2&size=10', 'get', () => {
        return {
            "statusCode": 200,
            "message": "查询成功",
            "data": {
                records: generateMockData(10, historyTemp),
                "total": 100,
                "size": 10,
                "current": 1,
                "pages": 1
            },
        }
    }
)
// 查询自己的历史
Mock.mock(baseURL + '/api/v1/statistics/history?page=3&size=10', 'get', () => {
        return {
            "statusCode": 200,
            "message": "查询成功",
            "data": {
                records: generateMockData(10, historyTemp),
                "total": 100,
                "size": 10,
                "current": 1,
                "pages": 1
            },
        }
    }
)

