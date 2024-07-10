<template>
  <el-card>
    <template #header>
      <div class="flex justify-center">
        <div>
          <span class="icon-[icon-park-solid--weixin-people-nearby] size-7 align-bottom" style="color: #0284c7;"/>
          用户管理
        </div>
      </div>
    </template>
    <template #default>
      <el-form ref="selectFormRef" :inline="true" :model="conditionForm">
        <el-form-item label="账号">
          <el-input v-model="conditionForm.logId" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="conditionForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="conditionForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="conditionForm.gender" clearable placeholder="选择性别" style="width: 130px">
            <el-option
                v-for="item in optionsSex"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model.number="conditionForm.state" clearable placeholder="选择状态" style="width: 130px">
            <el-option
                v-for="item in optionsState"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-button class="mb-5" type="success" @click="select">
          <template #icon>
            <span class="icon-[tabler--search]"></span>
          </template>
          查询
        </el-button>
      </el-form>
      <el-table v-loading="loading" :data="record" height="400" highlight-current-row style="width: 100%;"
                @current-change="handleSelect">
        <el-table-column type="expand">
          <template #default="scope">
            <el-descriptions :column="1" class="ml-2" size="large" title="详细信息">
              <el-descriptions-item>
                <template #label>
                  <span class="icon-[icon-park-outline--permissions] mr-1 align-baseline"/>
                  权限状态
                </template>
                <el-tag v-for="(item,index) in scope.row.permissions" :type="'success'"
                        class="mr-2 mt-2" size="large">
                  {{ item }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item v-for="(item,index) in scope.row.roles">
                <template #label>
                  <el-tag class="mb-4">角色详情{{ index }}</el-tag>
                </template>
                <el-descriptions>
                  <el-descriptions-item label="角色英文名" width="200">
                    <el-tag size="large">{{ item.mname }}</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="角色备注" width="200">
                    <el-tag size="large">{{ item.remark }}</el-tag>
                  </el-descriptions-item>
                </el-descriptions>
              </el-descriptions-item>
            </el-descriptions>
          </template>
        </el-table-column>
        <el-table-column label="账号" prop="member.logid"></el-table-column>
        <el-table-column label="用户名" prop="member.mname"></el-table-column>
        <el-table-column label="性别" prop="member.gender" width="60">
          <template v-slot="{row}">
            <el-tag :type="row.member.gender === '男'? 'primary':'danger'" class="w-8" size="large">
              {{ row.member.gender }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="member.gender">
          <template v-slot="{row}">
            <el-tag :type="'primary'" size="large" style="width: 100px;">
              {{ row.member.tel }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否为新用户" prop="member.gender">
          <template v-slot="{row}">
            <el-tag :type="row.member.isNew? 'danger':'success'" size="large">
              {{ row.member.isNew ? '新用户' : '老用户' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="用户角色" prop="member.gender" width="300">
          <template v-slot="{row}">
            <el-tag v-for="item in row.roles" :type="'success'" class="w-20 mr-2 mt-2" size="large" type="primary">
              {{ item.nickName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="启用/禁用用户">
          <template v-slot="{row}">
            <el-switch
                v-model="row.enable"
                :disabled="!haveDisableAndEnablePermission(row.enable)"
                class="ml-2"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                @click="changeState(row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="重置密码">
          <template v-slot="{row}">
            <el-button v-if="havePermission('reset-pwd')" plain round type="primary" @click="resetUserPassword(row)">
              重置密码
            </el-button>
            <el-button v-else disabled plain round type="danger">无权重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
          v-model="dialogVisible"
          title="提示"
          width="500"
      >
        <span>确认要重置此用户密码吗</span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmResetPassword">
              确认
            </el-button>
          </div>
        </template>
      </el-dialog>
    </template>
    <!--  分页栏-->
    <template #footer>
      <div class="flex justify-center">
        <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            background
            layout="prev, pager, next, jumper"
            @current-change="handleCurrentChange"
        />
      </div>
      <div class="flex justify-center mt-10 h-24">
        <el-form v-if="currentRow !== null" :label-position="'left'" :model="currentRow" class="w-180">
          <el-form-item label="当前角色">
            <el-tag v-for="(role,index) in currentRow.roles"
                    :key="role"
                    :closable='edit'
                    :type="'success'"
                    class="mr-2"
                    size="large"
                    @close="handleClose(currentRow.roles,role)">
              {{ role.nickName }}
            </el-tag>
            <el-select
                v-if="selectVisible"
                ref="SelectRef"
                v-model="selectedValue"
                class="w-36"
                placeholder="添加角色"
                @blur="handleSelectChange"
                @change="handleSelectChange"
            >
              <el-option
                  v-for="option in roles"
                  :key="option.id"
                  :disabled="disabled(option)"
                  :label="option.nickName"
                  :value="option.id"
              />
            </el-select>
            <el-button v-else class="button-new-select w-36" size="default" @click="showSelect">
              添加新角色
            </el-button>
          </el-form-item>
          <el-form-item>
            <div class="flex justify-center">
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="flex justify-center">
        <div class="">
          <el-button size="default" @click="edit = !edit">编辑</el-button>
          <el-button v-if="havePermission('update-user-role')" :type="'primary'" size="default" @click="submit">提交
          </el-button>
          <el-button v-else :type="'danger'" disabled size="default">无权编辑用户角色</el-button>
        </div>
      </div>
    </template>
  </el-card>

</template>

<script setup>

import {nextTick, onMounted, ref} from "vue";
import {
  axiosResetUserPassword,
  changeUserRoles,
  disableUser,
  enableUser,
  getAllUserInfo,
  getRoleInfo
} from "@/api/NEPM/index.js";
import {alertErr, alertSuccess, error, success} from "@/utils/user.js";
import {useUserStore} from "@/stores/user.js";
import {getUserInfo} from "@/api/login/index.js";
import router from "@/router/index.js";
import {ElNotification} from "element-plus";
import {closeLoadingFull, openFullLoading} from "../../../../public/Loading.js";
import havePermission from "../../../../public/permisssion.js";

const {$state, SET_AVATAR, SET_JWT, SET_PERMISSIONS, SET_ROLES, SET_USER} = useUserStore()
// 记录
const record = ref()
// 角色数组
const roles = ref()
const total = ref(0)
// 骨架加载变量
const loading = ref(true)
// 分页配置变量
const currentPage = ref(1);
const pageSize = ref(10);
// 条件表单 => 点击查询后赋值给查询用表单
// state为number
const conditionForm = ref({
  logId: null,
  name: null,
  mobile: null,
  gender: null,
  state: null,// 这个是number
  roles: null,
})
// 查询表单 发送请求用
const selectForm = ref({
  logId: null,
  name: null,
  mobile: null,
  gender: null,
  state: null,// 这个是number
  roles: null,
})
const selectFormRef = ref(null)
// 性别选项
const optionsSex = [
  {
    value: '男',
    label: '男'
  },
  {
    value: '女',
    label: '女'
  }]
// 状态选项
const optionsState = [
  {
    value: 0,
    label: '角色为空'
  },
  {
    value: 1,
    label: '已分配角色'
  }]
onMounted(() => {
  getSelectPage(1, 10)
  // 获取所有用户
})
// 某一行是否选中
const currentRow = ref(null)
// 是否可编辑
const edit = ref(false)

function getSelectPage(page, size) {
  getAllUserInfo(page, size,
      selectForm.value.logId, selectForm.value.name,
      selectForm.value.mobile, selectForm.value.gender,
      selectForm.value.state, selectForm.value.roles).then(res => {
    if (res.data.statusCode === 200) {
      // 存储记录
      record.value = res.data.data.records
      record.value.forEach(item => {
        // item['enable'] = item.member.state === 1
        item['enable'] = item.available === 1
      })
      total.value = res.data.data.total
      loading.value = false
      console.log(record.value)

    } else {
      error(res.data.message)
    }
  })
  // 获取角色表
  getRoleInfo().then(res => {
    if (res.data.statusCode === 200) {
      // 存储角色
      roles.value = res.data.data
      console.log(roles.value)
    } else {
      error(res.data.message)
    }
  })
}

//处理分页
function handleCurrentChange(page) {
  loading.value = true;
  getSelectPage(page, 10)
}

// 处理点击查询
function select() {
  // 继续发送请求即可
  loading.value = true;
  // 将查询参数暂存到selectForm
  selectForm.value = conditionForm.value
  // 发送请求
  getSelectPage(1, 10)
}

const currentRoles = ref(null)

// 处理选择某一行
function handleSelect(val) {
  console.log(val)
  currentRow.value = val;
  currentRoles.value = currentRow.roles
}

// 处理标签关闭
function handleClose(roles, role) {
  const index = roles.findIndex(item =>
      item.mname === role.mname
  );
  if (index !== -1) {
    roles.splice(index, 1);
  }
}

// 得到用户信息
const userStore = useUserStore()
// 当前列的所有rolesId
const rolesId = ref()

// 删除或加入用户角色
function submit() {
  rolesId.value = currentRow.value.roles.map(role => role.id)
  console.log(currentRow.value)
  changeUserRoles(currentRow.value.member.logid, rolesId.value).then(res => {
    if (res.data.statusCode === 200) {
      fleshUserState()
      success('修改成功')
    } else {
      error(res.data.message)
    }
  })
}


// 是否可见
const selectVisible = ref(false) // 控制选择框的显示与隐藏
const selectedValue = ref(null) // 选择框的绑定值
//selectRef
const SelectRef = ref(null)
// showSelect
const showSelect = () => {
  selectVisible.value = true
  nextTick(() => {
    SelectRef.value.focus();
    SelectRef.value.toggleMenu();
  });
}
// 判断是否不能添加
const disabled = (role) => {
  console.log(role)
  const index = currentRow.value.roles.findIndex(item =>
      item.id === role.id
  )
  return index !== -1;

}
// 添加
const handleSelectChange = () => {
  if (selectedValue.value) {
    // console.log("currentRow.value.roles" + '')
    // console.log(currentRow.value)
    // console.log(roles.value)
    // currentRow.value.roles.map
    // console.log(selectedValue.value)
    // 找到为selectedValue的对象
    // 将对象加入 currentRow
    currentRow.value.roles.push(roles.value.find(item => item.id === selectedValue.value))
    console.log(currentRow.value.roles)
  }
  selectVisible.value = false
  selectedValue.value = ''
}


// 成功返回的时候重新获取用户信息 达到刷新的目的
function fleshUserState() {
  getUserInfo().then(res => {
    //设置用户信息 到store中
    SET_USER(res.data.data.member);
    // 看看用户信息
    console.log(res.data.data)
    SET_ROLES(res.data.data.roles)
    SET_PERMISSIONS(res.data.data.permissions)
    //路由跳转
  })
}

const dialogVisible = ref(false)
const userInfo = ref(null)

//重置用户密码
function resetUserPassword(row) {
  dialogVisible.value = true
  userInfo.value = row
}

function confirmResetPassword() {
  dialogVisible.value = false
  let loading = openFullLoading()
  // 发送请求
  axiosResetUserPassword(userInfo.value.member.logid).then(res => {
    if (res.data.statusCode === 200) {
      success('密码已被重置为123456')
      // 如果是自己的话 那么密码要实时更新
      console.log(userInfo.value.member)
      if (userInfo.value.member.logid === userStore.user.logid) {
        userStore.user.logpwd = '123456'
      }
    } else {
      error(res.data.message)
    }
  }).finally(() => {
        closeLoadingFull(loading)
      }
  )
}

function changeState(row) {
  if (row.enable) {
    enableUser(row.member.logid).then(res => {
      if (res.data.statusCode === 200) {
        alertSuccess('成功启用用户')
        // row.member.state = 1
        row.available = 1
        // if (row.member.logid === userStore.user.logid) {
        //   userStore.user.state = 1
        // }
      } else {
        // 回滚
        row.enable = !row.enable
        alertErr('启用用户失败')
      }
    }).catch(err => {
      // 回滚
      row.enable = !row.enable
    })
  } else {
    disableUser(row.member.logid).then(res => {
      if (res.data.statusCode === 200) {
        alertSuccess('成功禁用用户')
        // row.member.state = 0
        row.available = 0
        // if (row.member.logid === userStore.user.logid) {
        //   userStore.user.state = 0
        // }
      } else {
        // 回滚
        row.enable = !row.enable
        alertErr('修改失败')
      }
    }).catch(err => {
      row.enable = !row.enable
    })
  }
  console.log(row.enable)
}

// 是否有禁用 启用用户的权限
function haveDisableAndEnablePermission(enable) {
  if (enable === 1) {
    return havePermission('disable-user')
  } else {
    return havePermission('enable-user')
  }
}
</script>