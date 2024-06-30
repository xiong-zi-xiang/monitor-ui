<template>
  <el-card>
    <template #header>
      <div class="flex justify-center">
        <div>
          <span class="icon-[icon-park-outline--permissions] size-6 mr-2 align-bottom" style="color: #0284c7"/>
          角色权限管理
        </div>
      </div>
    </template>
    <template #default>
      <el-table v-loading="loadingTable" :data="allRoles" height="500">
        <el-table-column label="角色ID">
          <template v-slot="{row}">
            <el-tag> {{ row.id }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="角色英文名">
          <template v-slot="{row}">
            <el-tag type="warning"> {{ row.mname }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="角色中文名">
          <template v-slot="{row}">
            <el-tag> {{ row.nickName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否启用">
          <template v-slot="{row}">
            <el-switch
                v-model="row.isEnable"
                class="ml-2"
                disabled
                style="--el-switch-on-color: #13ce66"
            />
          </template>
        </el-table-column>
        <el-table-column label="备注" width="350">
          <template v-slot="{row}">
            <el-tag> {{ row.remark }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column>
          <template v-slot="{row}">
            <el-button plain round size="default" type="primary" @click="openDrawer(row.id)">更改角色权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-drawer
          v-model="drawer"
          direction="rtl"
          size="30%"
          title="I have a nested table inside!"
      >
        <template #header>
                <span class="flex-1">
                  <span class="icon-[token-branded--sudo] mr-2 size-6 align-bottom"/>
        修改对应角色权限</span>
        </template>
        <el-tree
            ref="treeRef"
            :data="data"
            :props="defaultProps"
            node-key="id"
            show-checkbox
            style="max-width: 600px;font-size: 16px"
            @node-click="handleNodeClick"
            @check-change="handleCheckChange"
        />
        <div class="flex justify-center mt-4">
          <el-button round type="success" @click="changeRolePermission(currentRoleId)">修改角色权限</el-button>
        </div>
      </el-drawer>
      <el-drawer
          v-model="drawerAddRoles"
          direction="rtl"
          size="30%"
          title="添加角色"
      >
        <el-form ref="addRoleFormRef" :model="addRoleForm" :rules="addRoleFormRule" label-width="100">
          <el-form-item prop='mname'>
            <template #label>
              <el-tag size="large">角色英文名称</el-tag>
            </template>
            <el-input v-model="addRoleForm.mname" class="w-48" clearable placeholder="请输入角色英文名称"></el-input>
          </el-form-item>
          <el-form-item prop='nickName'>
            <template #label>
              <el-tag size="large">角色中文名称</el-tag>
            </template>
            <el-input v-model="addRoleForm.nickName" class="w-48" clearable placeholder="请输入角色中文名称"></el-input>
          </el-form-item>
          <el-form-item prop=""></el-form-item>
          <el-form-item>
            <template #label>
              <el-tag size="large">角色状态</el-tag>
            </template>
            <el-switch
                v-model="addRoleForm.isEnable"
                class="ml-2"
                style="--el-switch-on-color: #13ce66"
            />
          </el-form-item>
          <el-form-item prop='remark'>
            <template #label>
              <el-tag size="large">备注</el-tag>
            </template>
            <el-input v-model="addRoleForm.remark" class="w-48" clearable placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-form>
        <div class="flex justify-center">
          <el-button type="primary" @click="addRoles">
            提交
          </el-button>
        </div>
      </el-drawer>
    </template>
    <template #footer>
      <div>
        <el-button class="ml-4" type="primary" @click="showDrawer">新增角色</el-button>
      </div>
    </template>
  </el-card>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {addRole, addRolePermission, getPermissionTree, getRoleInfo, getRolesPermission} from "@/api/NEPM/index.js";
import {closeLoadingFull, openFullLoading} from "../../../../public/Loading.js";
import {error, success} from "@/utils/user.js";
import {getUserPermission} from "@/api/login/index.js";
import {useUserStore} from "@/stores/user.js";
import AQI2Text from "../../../../public/AQIText.js";
// store
const userStore = useUserStore()

const defaultProps = {
  children: 'childSysMenu',
  label: 'permissionDescription',
}
const handleCheckChange = (
    data,
    checked,
    indeterminate
) => {
  console.log(data, checked, indeterminate)
}
const handleNodeClick = (data) => {
  console.log(data.label)
}
// 表格加载变量
const loadingTable = ref(true)
// 树形控件绑定变量
const data = ref()
const treeRef = ref(null)
// 全部角色
const allRoles = ref()
onMounted(() => {
  // 获取所有权限树
  getPermissionTree().then(res => {
    if (res.data.statusCode === 200) {
      console.log(res.data.data)
      data.value = res.data.data
      console.log(data.value)
    } else {
      error(res.data.message)
    }
  }).catch(err => {
    error(err)
  })
  getRoleInfo().then(res => {
    if (res.data.statusCode === 200) {
      console.log(res.data.data)
      // 加上boolean字段
      res.data.data.forEach(item => {
        item['isEnable'] = item.enable === 1;
      })
      allRoles.value = res.data.data
      loadingTable.value = false
      console.log(allRoles.value)
    } else {
      error(res.data.message)
    }
  }).catch(err => {
    error(err)
  })
  // // 获取用户权限信息
  // getUserPermission().then(res => {
  //   if (res.data.statusCode === 200) {
  //     console.log(res.data)
  //   } else {
  //     error(res.data.message)
  //   }
  // }).catch(err => {
  //   error(err)
  // }).finally(() => {
  //       closeLoadingFull(loading)
  //     }
  // )
  // 获取全部角色信息
})
// 当前编辑权限数组
const editedPermission = ref(null)

// 当前编辑角色变量
const currentRoleId = ref(null)
const changeRolePermission = (roleId) => {
  console.log('当前角色id', roleId)
  if (treeRef.value) {
    const checkedNodes = treeRef.value.getCheckedNodes();
    editedPermission.value = checkedNodes.map(node => node.id)
    console.log('请求数组', editedPermission.value)
    const loading = openFullLoading()
    addRolePermission(roleId, editedPermission.value).then(res => {
      if (res.data.statusCode === 200) {
        success('成功添加修改对应角色的权限')
        // 前端store数组也要改变
      } else {
        error(res.data.message)
      }
    }).catch(err => {
      error(err)
    }).finally(() => {
          closeLoadingFull(loading)
        }
    )

  }
};
// 角色的默认展开树
const defaultCheckedKeys = ref()

// 获取角色的权限数组
function getRolePermission(id) {
  const loading = openFullLoading()
  getRolesPermission(id).then(res => {
    if (res.data.statusCode === 200) {
      console.log(res.data.data)
      // 得到用户的权限之后 将其放入默认勾选
      treeRef.value.setCheckedKeys(res.data.data.map(item => item.id), false)
      console.log(res.data.data.map(item => item.id))
    } else {
      error(res.data.message)
    }
  }).catch(err => {
    error(err)
  }).finally(() => {
        closeLoadingFull(loading)
      }
  )
}

// 抽屉显示变量
const drawer = ref(false)
const drawerAddRoles = ref(false)
// 打开抽屉
const openDrawer = (id) => {
  drawer.value = true
  // 赋值当前处理角色变量
  currentRoleId.value = id
  // 得到用户的初始权限
  getRolePermission(id)
}
// 打开添加角色抽屉
const showDrawer = () => {
  drawerAddRoles.value = true
}
const addRoleForm = ref({
  mname: '',
  nickName: '',
  isEnable: true,
  remark: '',
  enable: 1,
})
const addRoleFormRef = ref(null)
// 表单校验
const addRoleFormRule = {
  mname: [
    {required: true, message: '请输入英文名称', trigger: 'blur'}
  ],
  remark: [
    {required: true, message: '请输入备注', trigger: 'blur'}
  ],
  nickName: [
    {required: true, message: '请输入中文名称', trigger: 'blur'}
  ]
}
// 提交添加角色
const addRoles = () => {
  //发送请求
  if (addRoleForm.value.isEnable !== true)
    addRoleForm.value.enable = 0
  else
    addRoleForm.value.enable = 1
  // console.log(addRoleForm.value)
  addRoleFormRef.value.validate((valid) => {
    console.log(valid)
    if (valid) {
      const loading = openFullLoading()
      addRole(addRoleForm.value.mname, addRoleForm.value.nickName, addRoleForm.value.enable, addRoleForm.value.remark).then(res => {
        if (res.data.statusCode === 200) {
          // 成功修改
          success('成功添加角色')
          // 再次拉取
          getRoleInfo().then(res => {
            if (res.data.statusCode === 200) {
              console.log(res.data.data)
              // 加上boolean字段
              res.data.data.forEach(item => {
                item['isEnable'] = item.enable === 1;
              })
              allRoles.value = res.data.data
              loadingTable.value = false
              console.log(allRoles.value)
            } else {
              error(res.data.message)
            }
          }).catch(err => {
            error(err)
          })
        } else {
          error(res.data.message)
        }
      }).catch(err => {
        error(err)
      }).finally(() => {
            closeLoadingFull(loading)
          }
      )
    }
  })

}
</script>

<style lang="scss">
.custom-tree {
}

.el-tree-node__content {
  margin-top: 10px;
}
</style>