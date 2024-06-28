// 多条件查询网格员信息
import axiosInstance from "@/axios.js";
import baseURL from "@/backendAPI.js";

// 多条件查询
export function searchGridInfo(page, size, logId, address, afId, roleState,) {
    // 创建一个对象来存储查询参数
    const params = {};
    // 仅在参数不为 null 或 undefined 时添加到查询参数对象中
    if (page !== undefined && page !== null) params.page = page;
    if (size !== undefined && size !== null) params.size = size;
    if (logId !== undefined && logId !== null) params.logId = logId;
    if (address !== undefined && address !== null) params.address = address;
    if (afId !== undefined && afId !== null) params.afId = afId;
    if (roleState !== undefined && roleState !== null) params.roleState = roleState;
    return axiosInstance.get(baseURL + '/api/v1/grid-managers/search', {
        params
    })
}

// 修改网格员状态
export function changeGridState(logId, state) {
    return axiosInstance.put(baseURL + '/api/v1/grid-managers/state', {
        logId, state
    }, {})
}

// 获取feedbackInfo assignStatus 为指派状态 => number数据
export function getFeedbackInfo(page, size,
                                telId,
                                provinceName, cityName, districtName, address,
                                estimatedGrade,
                                afDateStart, afDateAscending, afDateEnd,
                                gridManager_id,
                                assignDateStart, assignDateEnd, assignDateAscending, assignStatus) {
    const params = {}
    // 将params 赋值
    if (page !== undefined && page !== null) params.page = page;
    if (size !== undefined && size !== null) params.size = size;
    //
    if (telId !== undefined && telId !== null) params.telId = telId;
    //
    if (provinceName !== undefined && provinceName !== null) params.provinceName = provinceName;
    if (cityName !== undefined && cityName !== null) params.cityName = cityName;
    if (districtName !== undefined && districtName !== null) params.districtName = districtName;
    if (address !== undefined && address !== null) params.address = address;
    //
    if (estimatedGrade !== undefined && estimatedGrade !== null) params.estimatedGrade = estimatedGrade;
    //
    if (afDateStart !== undefined && afDateStart !== null) params.logId = afDateStart;
    if (afDateAscending !== undefined && afDateAscending !== null) params.afDateAscending = afDateAscending;
    if (afDateEnd !== undefined && afDateEnd !== null) params.afDateEnd = afDateEnd;
    //
    if (gridManager_id !== undefined && gridManager_id !== null) params.gridManager_id = gridManager_id;
    //
    if (assignDateStart !== undefined && assignDateStart !== null) params.assignDateStart = assignDateStart;
    if (assignDateEnd !== undefined && assignDateEnd !== null) params.assignDateEnd = assignDateEnd;
    if (assignDateAscending !== undefined && assignDateAscending !== null) params.assignDateAscending = assignDateAscending;
    //
    if (assignStatus !== undefined && assignStatus !== null) params.assignStatus = assignStatus;
    return axiosInstance.get(baseURL + '/api/v1/feedbacks/search', {
        params
    })
}

// 查询用户基本信息
export function getAllUserInfo(page, size, logId, name, mobile, gender, state, roles) {
    const params = {}
    // 将params 赋值
    if (page !== undefined && page !== null) params.page = page;
    if (size !== undefined && size !== null) params.size = size;
    if (logId !== undefined && logId !== null) params.logId = logId;
    if (name !== undefined && name !== null) params.name = name;
    if (mobile !== undefined && mobile !== null) params.mobile = mobile;
    if (gender !== undefined && gender !== null) params.gender = gender;
    if (state !== undefined && state !== null) params.state = state;
    if (roles !== undefined && roles !== null) params.roles = roles;
    return axiosInstance.get(baseURL + '/api/v1/members/search', {
        params
    })
}

// 查询全部角色信息
export function getRoleInfo() {
    return axiosInstance.get(baseURL + '/api/v1/roles', {})
}

// 修改用户角色
export function changeUserRoles(logId, roles) {
    return axiosInstance.put(baseURL + `/api/v1/roles/users/${logId}/roles`, roles, {})
}
