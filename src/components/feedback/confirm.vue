<template>
  <el-descriptions
      :column="1"
      border
      size="large"
      title="确认填写信息"
  >
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon class="iconStyle">
            <Guide/>
          </el-icon>
          所在省
        </div>
      </template>
      <el-tag size="large" type="success">{{ AQIStore.city[0] }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon class="iconStyle">
            <office-building/>
          </el-icon>
          所在市
        </div>
      </template>
      <el-tag size="large" type="success">{{ AQIStore.city[1] }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon class="iconStyle">
            <Position/>
          </el-icon>
          所在区
        </div>
      </template>
      <el-tag size="large" type="success">{{ AQIStore.city[2] }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon class="iconStyle">
            <House/>
          </el-icon>
          具体地址
        </div>
      </template>
      <el-tag size="large" type="success">{{ AQIStore.detail }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon class="iconStyle">
            <Grid/>
          </el-icon>
          空气质量等级
        </div>
      </template>
      {{ AQIStore.level }}
      <el-tag id="tag" :color="AQIStore.color" size="large"></el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon class="iconStyle">
            <ZoomIn/>
          </el-icon>
          反馈信息
        </div>
      </template>
      {{ AQIStore.information }}
    </el-descriptions-item>
  </el-descriptions>
  <el-form-item label="备注" style="display: flex;margin: 40px auto 0;width: 500px;">
    <el-input v-model="AQIStore.remarks" :rows="4" placeholder="如有备注请填写" style="width: 500px"
              type="textarea"></el-input>
  </el-form-item>
  <div style="display: flex;justify-content: center;align-items: center;height: 50px;margin-top: 20px;">
    <el-button size="large" style="margin-right: 20px" type="primary" @click="nextStep">下一步</el-button>
    <el-button size="large" @click="previousStep">返回</el-button>
  </div>
</template>

<script setup>
import {Grid, Guide, House, OfficeBuilding, Position, ZoomIn} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {useAQIStore} from "@/stores/AQI.js";
import {ElMessage, ElMessageBox} from "element-plus";
import {useUserStore} from "@/stores/user.js";
import {ref} from 'vue'
import axiosInstance from "@/axios.js";
import {submitAQI} from "@/api/NEPS/index.js";

const AQIStore = useAQIStore()
const userStore = useUserStore()
const router = useRouter()

const nextStep = () => {
  ElMessageBox.confirm(
      '确认后将无法撤销,确认要提交吗',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '再次查看',
        type: 'warning',
      }
  ).then(() => {
    // 包装提交数据
    const AQIForm = {
      telId: userStore.user.tel,
      provinceName: AQIStore.city[0],
      cityName: AQIStore.city[1],
      districtName: AQIStore.city[2],
      address: AQIStore.detail,
      information: AQIStore.information,
      estimatedGrade: AQIStore.estimatedGrade,
      remarks: AQIStore.remarks
    }
    // 发送请求
    submitAQI(AQIForm).then(response => {
      ElMessage({
        type: 'success',
        message: '成功上报AQI',
      })
      // 重置 pinia 状态
      AQIStore.$reset()
      router.push({name: 'home'})
    })
  }).catch(() => {
    ElMessage({
      type: 'warning',
      message: '取消确认',
    })
  })
}
const previousStep = () => {
  AQIStore['active']--;
  router.push({name: 'feedbackStep2'})
}

</script>
<style scoped>
.iconStyle {
  margin-right: 8px;
}

.el-descriptions {
  margin-top: 20px;
}

.cell-item {
  display: flex;
  align-items: center;
}

.margin-top {
  margin-top: 20px;
}

#tag {
  border: none;
  aspect-ratio: 1;
}
</style>