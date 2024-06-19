<template>
  <el-form ref="formRef" :model="form" :rules="rules">
    <el-form-item label="手机号码" prop="phone">
      <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getCode" :disabled="loading || countdown > 0">
        {{ countdown > 0 ? `${countdown}秒后重试` : (loading ? '发送中...' : '获取验证码') }}
      </el-button>
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="verifyCode">验证验证码</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';

export default {
  setup() {
    const form = reactive({
      phone: '',
      code: ''
    });

    const loading = ref(false);
    const countdown = ref(0);
    const formRef = ref(null);
    let timer = null;

    const rules = {
      phone: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
      ],
      code: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { len: 6, message: '验证码长度应为6位', trigger: 'blur' }
      ]
    };

    const startCountdown = () => {
      countdown.value = 60;
      timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    };

    const getCode = async () => {
      formRef.value.validateField('phone', async (valid) => {
        if (valid) {
          loading.value = true;
          try {
            // 模拟发送验证码的请求
            await new Promise((resolve) => setTimeout(resolve, 2000));
            ElMessage.success('验证码已发送');
            startCountdown();
          } catch (error) {
            ElMessage.error('发送失败，请稍后重试');
          } finally {
            loading.value = false;
          }
        }
      });
    };

    const verifyCode = async () => {
      formRef.value.validate(async (valid) => {
        if (valid) {
          try {
            // 模拟验证验证码的请求
            await new Promise((resolve) => setTimeout(resolve, 2000));
            ElMessage.success('验证成功');
          } catch (error) {
            ElMessage.error('验证失败，请稍后重试');
          }
        }
      });
    };

    return {
      form,
      loading,
      countdown,
      formRef,
      rules,
      getCode,
      verifyCode
    };
  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 20px;
}
</style>
