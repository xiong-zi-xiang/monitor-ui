<template>
  <el-card>
    <template #header>
      <div class="flex justify-center">
        <div>
          <span class="icon-[bi--grid-1x2-fill] size-5 mr-2 align-bottom" style="color: #009966;"/>
          网格员管理
        </div>
      </div>
    </template>

    <template #default>
      <div v-if="loading" style="height: 600px;">
        <el-skeleton v-if="loading" :rows="7" animated/>
        <el-skeleton v-if="loading" :rows="7" animated/>
      </div>
      <el-form v-if="!loading" ref="selectFormRef" :inline="true" :model="conditionForm">
        <el-form-item label="编号">
          <el-input v-model.number="conditionForm.afId" placeholder="请输入编号"></el-input>
        </el-form-item>
        <el-form-item label="地区">
          <el-input v-model.number="conditionForm.address" placeholder="请输入网格员地区"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="conditionForm.logId" placeholder="请输入网格员账号"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model.number="conditionForm.roleState" clearable placeholder="网格员状态" style="width: 240px">
            <el-option
                v-for="item in options"
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
      <el-table v-if="!loading" :data="record" height="600" stripe style="width: 100%; ">
        <el-table-column label="账号" prop="member.logid"/>
        <el-table-column label="姓名" prop="member.mname"/>
        <el-table-column label="手机号" prop="member.tel" width="150"/>
        <el-table-column label="性别" prop="member.gender"/>
        <el-table-column label="反馈id" prop="afId"></el-table-column>
        <el-table-column label="当前工作网格" width="320">
          <template v-slot="{row}">
            <el-tag v-if="isWorking(row.provinceName)" class="mr-2">{{ row.provinceName }}</el-tag>
            <el-tag v-if="isWorking(row.provinceName)" class="mr-2">{{ row.cityName }}</el-tag>
            <el-tag v-if="isWorking(row.provinceName)">{{ row.districtName }}</el-tag>
            <el-tag v-if="!isWorking(row.provinceName)" size="large" type="danger">当前未工作</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="详细地址">
          <template v-slot="{row}">
            <el-tag v-if="isWorking(row.provinceName)">{{ row.areaName }}</el-tag>
            <el-tag v-if="!isWorking(row.provinceName)" size="large" type="danger">当前未工作</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" width="200"></el-table-column>
        <el-table-column label="状态" prop="member.state">
          <template v-slot="{row}">
            <el-tag :type="getTypeAndText(row.member.state).type" class="w-20" size="large">
              {{ getTypeAndText(row.member.state).text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="用户状态">
          <template v-slot="{row}">
            <el-tag :type="row.member.isNew === 1 ? 'danger':'success'" size="large">
              {{ row.member.isNew === 1 ? '新用户' : '老用户' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="修改状态">
          <template v-slot="{row}">
            <el-button :disabled="operation(row.member.state).disabled" :type="operation(row.member.state).type"
                       class="w-20" plain round @click="changeState(row.member.logid,row.member.state,row)">
              {{ operation(row.member.state).text }}
            </el-button>
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
    </template>
  </el-card>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {changeGridState, searchGridInfo} from "@/api/NEPM/index.js";
import {alertSuccess, error, success} from "@/utils/user.js";
import {Icon} from '@iconify/vue';
import {selectHistory} from "@/api/NEPS/index.js";
import AQI2Text from "../../../../public/AQIText.js";
// 记录
const record = ref()
const total = ref(0)
// 骨架加载变量
const loading = ref(true)
// 分页配置变量
const currentPage = ref(1);
const pageSize = ref(10);
// 条件表单 => 点击查询后赋值给查询用表单
const conditionForm = ref({
  logId: null,// 这个不是number
  address: null,
  afId: null,
  roleState: null,
})
// 查询表单 发送请求用
const selectForm = ref({
  logId: null,// 这个不是number
  address: null,
  afId: null,
  roleState: null,
})
// 单选选项
const options = [
  {
    value: 0,
    label: '可工作'
  },
  {
    value: 1,
    label: '临时抽调'
  },
  {
    value: 2,
    label: '休假 '
  }]
const selectFormRef = ref(null)
onMounted(() => {
  getSelectPage(1, 10)
})

// 通过state判断 type 和 text or color
function getTypeAndText(roleState) {
  if (roleState === 0) {
    return {
      type: 'success',
      text: '可工作',
    }
  }
  if (roleState === 1) {
    return {
      type: 'warning',
      text: '临时抽调',
    }
  }
  if (roleState === 2) {
    return {
      type: 'danger',
      text: '休假',
    }
  }
  return {
    type: 'danger',
    text: '其他状态',
  }
}

// 判断操作框的样式
function operation(state) {
  if (state === 0) {
    return {
      text: '休假',
      type: 'success',
      disabled: false
    }
  }
  if (state === 1) {
    return {
      text: '临时抽调',
      type: 'danger',
      disabled: true
    }
  }
  if (state === 2) {
    return {
      text: '返回工作',
      type: 'warning',
      disabled: false
    }
  }
}

// 更改网格员状态
function changeState(logId, state, row) {
  changeGridState(logId, state)
      .then(res => {
        if (res.data.statusCode === 200) {
          // 说明处理成功
          if (state === 0)
            row.member.state = 2
          if (state === 2)
            row.member.state = 0
          alertSuccess('修改成功')
        } else {
          error(res.data.message)
        }
      })
      .catch(err => {
        error(err)
      })

}

// 得到某一页的数据
function getSelectPage(page, size) {
  setTimeout(() => {
    searchGridInfo(page, size, selectForm.value.logId, selectForm.value.address, selectForm.value.afId, selectForm.value.roleState,).then(res => {
      if (res.data.statusCode === 200) {
        record.value = res.data.data.records
        total.value = res.data.total
        loading.value = false
        console.log(record.value)
      } else {
        error(res.data.message)
      }
    }).catch(err => {
      error(err)
    })
  }, 100)
}

// 判断是否工作
function isWorking(provinceName) {
  return provinceName !== null;
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

</script>

<style scoped>

</style>