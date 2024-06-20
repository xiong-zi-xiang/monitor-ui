<template>
  <el-card>

    <template #header>
      <div class="flex items-center justify-center">
        <span class="icon-[emojione--backhand-index-pointing-down] size-6 mr-2"></span>
        <span class="text-base font-sans font-semibold">设置您的个人基本资料</span>
      </div>
    </template>
    <template #default>
      <el-form class="w-96 m-auto " label-width="70px" size="default">
        <el-form-item label="个人头像">
          <el-avatar class="bg-white border ml-4" size="large" src="src/assets/avatar/avatar4.svg"></el-avatar>
        </el-form-item>
        <el-form-item label="账号">
          <el-input class="ml-4 w-50" disabled></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input class="ml-4 w-50"
                    placeholder="请输入真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input class="ml-4 w-50"
                    placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
              class="w-50 ml-4"
              placeholder="选择出生日期"
              style="width: 100%"
              type="date"
          />
        </el-form-item>
        <el-form-item label="登陆密码">
          <el-input class="ml-4 w-50"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <div class="ml-4 w-50">
            <div class="w-25 m-auto">
              <el-check-tag :checked="sex === '男'" class="mr-4" type="primary" @change="toMale">
                男
              </el-check-tag>
              <el-check-tag :checked="sex === '女'" type="danger" @change="toFemale">
                女
              </el-check-tag>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>

    </template>
  </el-card>
</template>

<script setup>
// 暂存值
import {ref} from "vue";

const sex = ref('男')
const toMale = () => {
  sex.value = "男"

}
const toFemale = () => {
  sex.value = "女"
}
</script>

<style scoped>

</style>