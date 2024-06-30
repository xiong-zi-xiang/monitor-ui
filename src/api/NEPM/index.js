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

// 新增角色权限
export function addRolePermission(roleId, permission) {
    return axiosInstance.post(baseURL + `/api/v1/permissions/${roleId}/add`, permission, {})
}

// 新增用户角色
export function addRole(mname, nickName, enable, remark) {
    return axiosInstance.post(baseURL + `/api/v1/roles`, {mname, nickName, enable, remark}, {})
}

