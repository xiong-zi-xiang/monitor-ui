import axiosInstance from "@/axios.js";
import baseURL from "@/backendAPI.js";

// AQI占比
export function getAQIPercent() {
    return axiosInstance.get(baseURL + '/api/v1/statistics/aqi/percent', {})
}

//省级空气质量统计信息
export function getProvinceStatistic() {
    return axiosInstance.get(baseURL + '/api/v1/statistics/province', {})
}
