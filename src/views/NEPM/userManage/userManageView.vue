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
                        class="mr-2" size="large">
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
        <el-table-column label="用户角色" prop="member.gender" width="400">
          <template v-slot="{row}">
            <el-tag v-for="item in row.roles" :type="'success'" class="w-20 mr-2 mt-2" size="large" type="primary">
              {{ item.nickName }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
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
          <el-button :type="'primary'" size="default" @click="submit">提交</el-button>
        </div>
      </div>
    </template>
  </el-card>

</template>

<script setup>

import {nextTick, onMounted, ref} from "vue";
import {changeUserRoles, getAllUserInfo, getRoleInfo} from "@/api/NEPM/index.js";
import {error, success} from "@/utils/user.js";
import {useUserStore} from "@/stores/user.js";
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
      total.value = res.data.data.total
      loading.value = false
      console.log(record.value)

    } else {
      error(res.data.message)
    }
  }).catch(err => {
    error(err)
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
  }).catch(err => {
    error(err)
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
      success('修改成功')
    } else {
      error(res.data.message)
    }
  }).catch(err => {
    error(err)
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
</script>