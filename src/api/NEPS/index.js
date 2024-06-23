import axiosInstance from "@/axios.js";
import baseURL from "@/backendAPI.js";

// 上报AQI
export function submitAQI(AQIForm) {
    return axiosInstance.post(
        baseURL + '/api/v1/feedbacks',
        {
            telId: AQIForm.telId,
            provinceName: AQIForm.provinceName,
            cityName: AQIForm.cityName,
            districtName: AQIForm.districtName,
            address: AQIForm.address,
            information: AQIForm.information,
            estimatedGrade: AQIForm.estimatedGrade,
            remarks: AQIForm.remarks,
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

// 查询历史上报记录
export function selectHistory(page, size) {
    return axiosInstance.get(
        baseURL + '/feedback/getFeedbackByTelId', {
            params: {
                page, size // page 和 size 都是number类型
            }
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}