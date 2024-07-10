<template>
  <div id="main" ref="chartDom" style="width: 100%;height: 340px;"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import {onMounted, ref, watch} from 'vue'
import {useDark} from '@vueuse/core'

const chartDom = ref(null);
// props 声明
const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  titleText: {
    type: String,
    required: true
  }
});
const myChart = ref(null)
// 是否是深色
const isDark = ref(useDark())
const updateGemCoverChartTheme = () => {
  const theme = isDark.value ? 'dark' : 'light'; // 根据当前模式选择主题
  myChart.value = echarts.init(chartDom.value, theme) // 初始化
  const option = {
    backgroundColor: isDark.value ? "#1d1e1f" : '#ffffff',
    title: {
      text: props.titleText,
      left: 'center',
      top: 'top',        // 设置标题距离顶部位置，可根据需要调整
      textStyle: {
        fontSize: 15
      },
    },
    tooltip: {
      formatter: '{b}:{c}'
    },
    series: [
      {
        type: 'gauge',
        radius: '100%',
        // 仪表盘进度设置
        progress: {
          show: true,
          itemStyle: {
            color: "#009966"
          }
        },
        //设置仪表盘指针
        pointer: {
          length: "100%",
          width: 3.5,
          itemStyle: {
            color: "#009966"
          }
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          offsetCenter: ['0', '60%'],
          fontWeight: 'bold',
          fontSize: 16  // 设置文字大小，单位为像素
        },
        data: [
          {
            value: props.value,
            name: '覆盖率'
          }
        ]
        ,
        // 设置分个段数
        splitNumber: 10,
        // 设置分割线之间的刻度数
        axisTick: {
          show: false
        }
      }
    ]
  };
  option && myChart.value.setOption(option) // 挂载
}
onMounted(() => {
  // 监听主题变化
  watch(isDark, () => {
    myChart.value.dispose()
    updateGemCoverChartTheme()
  })
  updateGemCoverChartTheme()
})


</script>