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
          <el-avatar :src="userStore.user.avatar" class="bg-white border ml-4" size="large"></el-avatar>
        </el-form-item>
        <el-form-item label="性别:">
          <div class="ml-4 w-50">
            <div class="w-25 m-auto">
              <el-check-tag :checked=" userStore.user.gender === '男'" class="mr-4" type="primary"
                            @change="toMale">
                男
              </el-check-tag>
              <el-check-tag :checked="userStore.user.gender === '女'" type="danger" @change="toFemale">
                女
              </el-check-tag>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="角色:">
          <el-tag class="ml-4 w-40" size="large">
            <!--            之后调用字典方法返回字符串-->
            <!--            {{ userStore.user.roleid }}-->
          </el-tag>
        </el-form-item>
        <el-form-item label="当前状态:">
          <el-tag class="ml-4 w-40" size="large" type="warning">
            <!--            之后调用字典方法返回字符串-->
            {{ userStore.user.state }}
          </el-tag>
        </el-form-item>
        <el-form-item label="账号:">
          <el-input v-model="userStore.user.logid" class="ml-4 w-50" disabled></el-input>
        </el-form-item>
        <el-form-item label="真实姓名:">
          <el-input v-model="userStore.user.mname"
                    :disabled="!edit"
                    class="ml-4 w-50"
                    placeholder="请输入真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="userStore.user.tel"
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
        <el-button size="large" type="primary" @click="handleSubmit">提交修改</el-button>
      </div>
    </template>
  </el-card>
</template>

<script setup>
// 暂存值
import {ref} from "vue";
import {useUserStore} from "@/stores/user.js";
// 将存储在pinia中的角色信息展示
const userStore = useUserStore()
// 更改提示
const tips = '用户角色、当前状态、账号为不可修改属性'
// 是否允许更改
const edit = ref(false)
const toMale = () => {
  if (edit.value === true)
    userStore.user.gender = "男"

}
const toFemale = () => {
  if (edit.value === true)
    userStore.user.gender = "女"
}
//允许更改
const handleEdit = () => {
  edit.value = !edit.value
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