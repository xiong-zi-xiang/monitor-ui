import axiosInstance from "@/axios.js";
import baseURL from "@/backendAPI.js";

//finish 字段说明 0为未处理和处理中，1为确认的数据，即历史记录
export function getTask(page, size, finish) {
    return axiosInstance.get(baseURL + '/api/v1/feedbacks/waiting-list',
        {
            params: {
                page, size, finish // page 和 size 都是number类型
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

//判断网格员是否可指派
export function isAvailable() {
    return axiosInstance.get(baseURL + '/api/v1/grid-managers/available',
        {}
    )
}

//接受指派
export function acceptAssign(afId, address, remark) {
    return axiosInstance.post(baseURL + '/api/v1/grid-managers/assign/accept',
        {
            afId,
            address,
            remark
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

// 得到当前检测任务
export function getCurrentTask() {
    return axiosInstance.get(baseURL + '/api/v1/feedbacks/current', {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

//计算AQI
export function getAQILevel(SO2, CO, SPM) {
    return axiosInstance.get(baseURL + '/api/v1/aqi/level/list', {
        params: {
            SO2,
            CO,
            SPM
        },
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

// 上报统计信息
export function reportInfo(so2Value, coValue, spmValue, remarks) {
    return axiosInstance.post(baseURL + '/api/v1/statistics',
        {
            so2Value,
            coValue,
            spmValue,
            remarks,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
}


//查询反馈数据
export function selectHistory(page, size) {
    return axiosInstance.get(baseURL + '/api/v1/statistics/history', {
        params: {
            page, size
        },
        headers: {
            'Content-Type': 'application/json',
        }
    })
}