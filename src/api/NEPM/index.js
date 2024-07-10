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

// 获取feedbackInfo assignStatus 为指派状态 => number数据 estimatedGrade  number
export function getFeedbackInfo(page, size,
                                telId,
                                provinceName, cityName, districtName, address,
                                estimatedGrade,
                                afDateStart, afDateAscending, afDateEnd,
                                gridManager_id,
                                assignDateStart, assignDateEnd, assignDateAscending, assignStatus) {
    const params = {}
    // 将params 赋值
    if (page !== '' && page !== null) params.page = page;
    if (size !== '' && size !== null) params.size = size;
    //
    if (telId !== '' && telId !== null) params.telId = telId;
    //
    if (provinceName !== '' && provinceName !== null) params.provinceName = provinceName;
    if (cityName !== '' && cityName !== null) params.cityName = cityName;
    if (districtName !== '' && districtName !== null) params.districtName = districtName;
    if (address !== '' && address !== null) params.address = address;
    //
    if (estimatedGrade !== '' && estimatedGrade !== null) params.estimatedGrade = estimatedGrade;
    //
    if (afDateStart !== '' && afDateStart !== null) params.logId = afDateStart;
    if (afDateAscending !== '' && afDateAscending !== null) params.afDateAscending = afDateAscending;
    if (afDateEnd !== '' && afDateEnd !== null) params.afDateEnd = afDateEnd;
    //
    if (gridManager_id !== '' && gridManager_id !== null) params.gridManager_id = gridManager_id;
    //
    if (assignDateStart !== '' && assignDateStart !== null) params.assignDateStart = assignDateStart;
    if (assignDateEnd !== '' && assignDateEnd !== null) params.assignDateEnd = assignDateEnd;
    if (assignDateAscending !== '' && assignDateAscending !== null) params.assignDateAscending = assignDateAscending;
    // problems?
    if (assignStatus !== undefined && assignStatus !== null) params.assignStatus = assignStatus;
    return axiosInstance.get(baseURL + '/api/v1/feedbacks/search', {
        params
    })
}

// 查询用户基本信息
export function getAllUserInfo(page, size, logId, name, mobile, gender, state, roles) {
    const params = {}
    // 将params 赋值
    if (page !== '' && page !== null) params.page = page;
    if (size !== '' && size !== null) params.size = size;
    if (logId !== '' && logId !== null) params.logId = logId;
    if (name !== '' && name !== null) params.name = name;
    if (mobile !== '' && mobile !== null) params.mobile = mobile;
    if (gender !== '' && gender !== null) params.gender = gender;
    if (state !== undefined && state !== null) params.state = state;
    if (roles !== '' && roles !== null) params.roles = roles;
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

// 指派网格员
export function assignGrid(afId, logId) {
    return axiosInstance.post(baseURL + '/api/v1/feedbacks/assign', {
        afId, logId
    })
}

// 获取用户的权限信息
export function getRolesPermission(roleId) {
    return axiosInstance.get(baseURL + `/api/v1/permissions/role/${roleId}`, {})
}

// 获取权限树
export function getPermissionTree() {
    return axiosInstance.get(baseURL + '/api/v1/permissions/tree', {})
}

// 修改角色权限
export function updateRolePermission(roleId, permission) {
    return axiosInstance.post(baseURL + `/api/v1/permissions/${roleId}/update`, permission, {})
}

// 新增用户角色
export function addRole(mname, nickName, enable, remark) {
    return axiosInstance.post(baseURL + `/api/v1/roles`, {mname, nickName, enable, remark}, {})
}

// 重置用户密码
export function axiosResetUserPassword(logId) {
    return axiosInstance.post(baseURL + '/api/v1/auth/pwd/reset', logId, {})
}

// 分条件查询统计数据
export function selectStatistic(page, size,
                                id, afId,
                                provinceName, cityName, districtName, address,
                                so2ValueMax, so2ValueMin, so2Ascending,
                                coValueMax, coValueMin, coAscending,
                                spmValueMax, spmValueMin, spmAscending,
                                aqiMax, aqiMin, aqiAscending,
                                confirmDatetime, gmId, fdTel) {
    const params = {}
    params.page = page
    params.size = size
    //
    params.id = id
    params.afId = afId
    //
    if (provinceName !== '' && provinceName !== null && provinceName !== undefined) {
        params.provinceName = provinceName
        params.cityName = cityName
        params.districtName = districtName
    }
    if (address !== '' && address !== null && address !== undefined)
        params.address = address
    //
    params.so2ValueMax = so2ValueMax
    params.so2ValueMin = so2ValueMin
    params.so2Ascending = so2Ascending
    //
    params.coValueMax = coValueMax
    params.coValueMin = coValueMin
    params.coAscending = coAscending
    //
    params.spmValueMax = spmValueMax
    params.spmValueMin = spmValueMin
    params.spmAscending = spmAscending
    //
    params.aqiMax = aqiMax
    params.aqiMin = aqiMin
    params.aqiAscending = aqiAscending
    //
    params.confirmDatetime = confirmDatetime
    params.gmId = gmId
    params.fdTel = fdTel
    return axiosInstance.get(baseURL + '/api/v1/statistics/search', {
        params: params
    })
}

// 禁用用户
export function disableUser(logId) {
    return axiosInstance.put(baseURL + `/api/v1/members/disable/${logId}`)
}

//启用用户
export function enableUser(logId) {
    return axiosInstance.put(baseURL + `/api/v1/members/enable/${logId}`)
}

// 禁用角色
export function enableAndDisableRole(roleId, enabled) {

    return axiosInstance.put(baseURL + `/api/v1/roles/${roleId}/enabled`, {
        roleId: Number(roleId)
    }, {
        params: {
            enabled
        }
    })
}

// 编辑某角色信息
export function changeRoleInfo(id, mname, nickName, enable, remark) {
    // console.log(id)
    return axiosInstance.put(baseURL + '/api/v1/roles', {id, mname, nickName, enable, remark})
}


// 统计模块

// export function getAQILevelPercent() {
//     return axiosInstance.get(baseURL + '/api/v1/statistics/aqi/percent', {})
// }