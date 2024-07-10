<template>
  <el-card>

    <template #header>
      <div class="flex items-center justify-center">
        <span class="icon-[emojione--backhand-index-pointing-down] size-6 mr-2"></span>
        <span class="text-base font-sans font-semibold">设置您的个人基本资料</span>
      </div>
    </template>
    <template #default>
      <el-form class="w-96 m-auto " label-position="right" label-width="90px" size="default">
        <el-form-item>
          <template #label>
            <span class="mt-6">个人头像</span>
          </template>
          <el-avatar :src="userStore.avatar" class="bg-white border ml-4" size="large"></el-avatar>
        </el-form-item>
        <el-form-item label="性别:">
          <div class="ml-4 w-50">
            <div class="w-25 m-auto">
              <el-check-tag :checked=" info.gender === '男'" class="mr-4" type="primary"
                            @change="toMale">
                男
              </el-check-tag>
              <el-check-tag :checked="info.gender === '女'" type="danger" @change="toFemale">
                女
              </el-check-tag>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="角色:">
          <div class="flex">
            <el-tag v-for="item in  userStore.roles " class="ml-4" size="large">
              {{ item.nickName }}
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item label="当前状态:">
          <el-tag :type="userStore.user.state=== 0 ? 'danger':'primary'" class="ml-4 w-40" size="large">
            {{ stateText }}
          </el-tag>
        </el-form-item>
        <el-form-item label="账号:">
          <el-input v-model="userStore.user.logid" class="ml-4 w-50" disabled></el-input>
        </el-form-item>
        <el-form-item label="真实姓名:">
          <el-input v-model="info.mname"
                    :disabled="!edit"
                    class="ml-4 w-50"
                    placeholder="请输入真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="info.tel"
                    :disabled="!edit"
                    class="ml-4 w-50"
                    placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="出生日期:">
          <el-date-picker
              v-model="userStore.user.birthday"
              :disabled="!edit"
              class="w-50 ml-4"
              placeholder="选择出生日期"
              style="width: 100%"
              type="date"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div class="w-80 mx-auto">
        <el-tooltip :content="tips" effect="customized">
          <el-button size="large" @click="handleEdit">编辑资料</el-button>
        </el-tooltip>
        <el-button :disabled="updatePermission().disable" :type="updatePermission().type" size="large"
                   @click="handleSubmit">
          {{ updatePermission().text }}
        </el-button>
      </div>
    </template>
  </el-card>
</template>

<script setup>
// 暂存值
import {computed, ref} from "vue";
import {useUserStore} from "@/stores/user.js";
import {changeInfo} from "@/api/info/index.js";
import {alertErr, alertSuccess, error, success} from "@/utils/user.js";
import havePermission from "../../../public/permisssion.js";
// 将存储在pinia中的角色信息展示
const userStore = useUserStore()
// 更改提示
const tips = '用户角色、当前状态、账号为不可修改属性'
// 是否允许更改
const edit = ref(false)
const toMale = () => {
  if (edit.value === true)
    info.value.gender = "男"

}
const toFemale = () => {
  if (edit.value === true)
    info.value.gender = "女"
}
//允许更改
const handleEdit = () => {
  edit.value = !edit.value
}
// form表单
const info = ref({
  gender: userStore.user.gender,
  mname: userStore.user.mname,
  tel: userStore.user.tel,
  birthday: userStore.user.birthday,
})

// 状态文字
const stateText = computed(() => {
  switch (userStore.user.state) {
    case 0:
      return '目前尚未分配角色';
    case 1:
      return '已分配角色';
    default:
      return '未知状态';
  }
});

const handleSubmit = () => {

  changeInfo(info.value).then(res => {
    if (res.data.statusCode === 200) {
      // 将值重新赋给store
      userStore.user.gender = info.value.gender
      userStore.user.mname = info.value.mname
      userStore.user.tel = info.value.tel
      userStore.user.birthday = info.value.birthday
      alertSuccess('修改成功')
      edit.value = false
    } else {
      alertErr(res.data.message)
    }
  })
}

function updatePermission() {
  if (havePermission('update-user-details'))
    return {
      text: '提交修改',
      disable: false,
      type: 'primary'
    }
  else
    return {
      text: '没有修改权限',
      disable: true,
      type: 'danger'
    }
}
</script>

<style>
.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>