<template>
  <el-card>
    <template #header>
      <div class="flex justify-center">
        <div>
          <span class="icon-[icon-park--home] mr-2 size-6 align-bottom"></span>
        </div>
        首页
      </div>
    </template>
    <template #default>
      <test/>
    </template>
  </el-card>
</template>

<script setup>
import test from "@/views/test.vue";
import {defineComponent} from "vue";

</script>

<style scoped>

</style>