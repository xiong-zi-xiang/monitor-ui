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
        <el-table-column label="编辑角色信息">
          <template v-slot="{row}">
            <el-button v-if="havePermission('edit-role-info')" plain round type="success"
                       @click="openEditDrawer(row.id)">
              编辑角色信息
            </el-button>
            <el-button v-else disabled type="danger">无权编辑角色信息</el-button>
          </template>
        </el-table-column>
        <el-table-column label="是否启用">
          <template v-slot="{row}">
            <el-switch
                v-model="row.isEnable"
                class="ml-2"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                @click="enable(row)"
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
            <el-button v-if="havePermission('fetch-permission-tree','get-permissions-by-roleId')" plain round
                       size="default" type="primary"
                       @click="openDrawer(row.id)">更改角色权限
            </el-button>
            <el-button v-else disabled plain round size="default" type="danger">
              无权更改角色权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-drawer
          v-model="editDrawer"
          direction="rtl"
          size="30%"
          title="修改角色信息">
        <el-form label-width="150">
          <el-form-item label="角色中文名称">
            <el-input v-model="roleInfoForm.mname" class="w-60" placeholder="请输入角色的中文名称"></el-input>
          </el-form-item>
          <el-form-item label="角色英文名称">
            <el-input v-model="roleInfoForm.ename" class="w-60" placeholder="请输入角色英文名称"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="roleInfoForm.remark" :rows="4" class="w-60" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <div class="flex justify-center">
          <div>
            <el-button type="primary" @click="handleSubmitRoleInfo">提交</el-button>
          </div>
        </div>
      </el-drawer>
      <el-drawer
          v-model="drawer"
          direction="rtl"
          size="30%"
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
        />
        <div class="flex justify-center mt-4">
          <el-button v-if="havePermission('update-user-role')" round type="success"
                     @click="changeRolePermission(currentRoleId)">
            修改角色权限
          </el-button>
          <el-button v-else disabled round type="danger">
            无权修改角色权限
          </el-button>
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
        <el-button v-if="havePermission('add-role')" class="ml-4" type="primary" @click="showDrawer">新增角色</el-button>
        <el-button v-else class="ml-4" disabled type="danger">
          无权新增角色
        </el-button>
      </div>
    </template>
  </el-card>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {
  addRole,
  updateRolePermission,
  getPermissionTree,
  getRoleInfo,
  getRolesPermission,
  enableAndDisableRole, changeRoleInfo
} from "@/api/NEPM/index.js";
import {closeLoadingFull, openFullLoading} from "../../../../public/Loading.js";
import {alertErr, alertSuccess, error, success} from "@/utils/user.js";
import {getUserInfo,} from "@/api/login/index.js";
import {useUserStore} from "@/stores/user.js";
import havePermission from "../../../../public/permisssion.js";

const {$state, SET_AVATAR, SET_JWT, SET_PERMISSIONS, SET_ROLES, SET_USER} = useUserStore()
// store
const userStore = useUserStore()

function enable(row) {
  console.log(row)
  console.log(row.isEnable)
  enableAndDisableRole(row.id, row.isEnable).then(res => {
    if (res.data.statusCode === 200) {
      alertSuccess('成功禁用/启用角色')
      // 修改信息
      if (row.enable === 1)
        row.enable = 0
      else
        row.enable = 1
      // 重新加载当前用户信息
      resetUserInfo()
    } else {
      // 回滚
      row.isEnable = !row.isEnable
      alertErr(res.data.message)
    }
  }).catch(err => {
    row.isEnable = !row.isEnable
  })
}

function getIds(data) {
  let ids = [];

  // console.log('树', data)

  function recurse(items) {
    items.forEach(item => {
      // ids.push(item.id);
      // // console.log(item.childSysMenu)
      // if (item.childSysMenu && item.childSysMenu.length > 0) {
      //   recurse(item.childSysMenu);
      // }
      if (!item.childSysMenu || item.childSysMenu.length === 0) {
        // 如果没有子节点，将当前节点的 id 添加到 ids 数组中
        ids.push(item.id);
      } else {
        // 如果有子节点，则递归调用 recurse 函数处理子节点
        recurse(item.childSysMenu, ids);
      }
    });
  }


  recurse(data);
  // console.log('数组', ids)
  return ids;
}

// 处理权限树
let inValidId = 100

function changeId(items) {
  console.log(items)
  items.forEach(item => {
    if (!item.childSysMenu || item.childSysMenu.length === 0) {
      return
    }
    if (item.childSysMenu[0].id === item.id)
      item.id = inValidId++
    else {
      changeId(item.childSysMenu);
    }
    // if (!item.childSysMenu || item.childSysMenu.length === 0) {
    //   if (item.id === -1) {
    //     // 没有子节点 而且此节点的的id为-1
    //     item.id = inValidId++
    //   }
    // } else {
    //   // 如果有子节点，则递归调用 recurse 函数处理子节点
    //   changeId(item.childSysMenu);
    // }
  });
}

function getCheckedNodes() {
  console.log(treeRef.value.getCheckedNodes(false, false))
}

const defaultProps = {
  children: 'childSysMenu',
  // label: 'id',
  label: 'permissionDescription',
}

// const handleCheckChange = (
//     data,
//     checked,
//     indeterminate
// ) => {
//   console.log(data, checked, indeterminate)
//   const checkedNodes = treeRef.value.getCheckedNodes();
//   console.log(checkedNodes)
// }
// const handleNodeClick = (data) => {
//   console.log(data.label)
// }
// 表格加载变量
const loadingTable = ref(true)
// 树形控件绑定变量
const data = ref()
const treeRef = ref(null)
// 全部角色
const allRoles = ref()

function resetUserInfo() {
  getUserInfo().then(res => {
    if (res.data.statusCode === 200) {
      // 热更新
      userStore.roles = res.data.data.roles
    } else {
      alertErr(res.data.message)
    }
  })
}

onMounted(() => {
  getRoleInfo().then(res => {
    if (res.data.statusCode === 200) {

      console.log("角色信息", res.data.data)
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
  })

})
// 当前编辑权限数组
const editedPermission = ref(null)

// 当前编辑角色变量
const currentRoleId = ref(null)
const changeRolePermission = (roleId) => {
  console.log('当前角色id', roleId)
  if (treeRef.value) {
    const checkedNodes = treeRef.value.getCheckedNodes(false, true);
    editedPermission.value = checkedNodes.map(node => node.id)
    // 剔除id为-1的元素
    console.log('请求数组--未处理前', editedPermission.value)
    editedPermission.value = editedPermission.value.filter(item => item < 100)
    editedPermission.value = [...new Set(editedPermission.value)]
    console.log('请求数组', editedPermission.value)
    const loading = openFullLoading()
    updateRolePermission(roleId, editedPermission.value).then(res => {
      if (res.data.statusCode === 200) {
        getUserInfo().then(res => {
          SET_PERMISSIONS(res.data.data.permissions)
          alertSuccess('成功添加修改对应角色的权限')
        })
      } else {
        error(res.data.message)
      }
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
  getRolesPermission(id).then(res => {
    if (res.data.statusCode === 200) {
      // inValidId = 100
      // changeId(res.data.data)
      console.log('角色权限数组', getIds(res.data.data))
      treeRef.value.setCheckedKeys(getIds(res.data.data), false)
      console.log("选中", treeRef.value.getCheckedKeys())
      console.log("半选", treeRef.value.getHalfCheckedKeys())
    } else {
      error(res.data.message)
    }
  })
}

// 抽屉显示变量
const drawer = ref(false)
const drawerAddRoles = ref(false)
// 打开抽屉
const openDrawer = (id) => {
  drawer.value = true
  // 赋值当前处理角色变量
  currentRoleId.value = id
  // 获取所有权限树 这两个请求条件缺一不可
  getPermissionTree().then(res => {
    if (res.data.statusCode === 200) {
      console.log("所有权限树", res.data.data)
      // inValidId = 100
      // changeId(res.data.data)
      // 重新赋值
      inValidId = 100
      data.value = res.data.data
      // 得到用户的初始权限
      getRolePermission(id)
    } else {
      error(res.data.message)
    }
  })
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
          alertSuccess('成功添加角色')
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
          })
        } else {
          error(res.data.message)
        }
      }).finally(() => {
            closeLoadingFull(loading)
          }
      )
    }
  })

}
const editDrawer = ref(false)

// 打开抽屉
function openEditDrawer(roleId) {
  console.log(roleId)
  currentEditRoleId.value = roleId
  editDrawer.value = true
  roleInfoForm.value.id = roleId
}

const currentEditRoleId = ref()
const roleInfoForm = ref({
  id: 0,
  mname: '',
  remark: '',
  ename: '',
})

function handleSubmitRoleInfo() {
  console.log("value", roleInfoForm.value.id)
  changeRoleInfo(roleInfoForm.value.id,
      roleInfoForm.value.ename,
      roleInfoForm.value.mname,
      1, // 默认启用
      roleInfoForm.value.remark).then(res => {
    if (res.data.statusCode === 200) {
      alertSuccess('成功修改角色信息')
      getRoleInfo().then(res => {
        if (res.data.statusCode === 200) {

          console.log("角色信息", res.data.data)
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
      })
    } else {
      alertErr(res.data.message)
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