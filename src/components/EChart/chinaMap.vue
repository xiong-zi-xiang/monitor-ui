<template>

  <div id="main" ref="chartDom" style="width: 100%;height: 800px;"></div>

</template>

<script setup>
import * as echarts from 'echarts';
import {onMounted, ref, watch} from 'vue'
import chinaMapData from "@/assets/map.js";
import {useDark} from '@vueuse/core'
import {getProvinceStatistic} from "@/api/NEPV/index.js";

const chartDom = ref(null);
const isDark = ref(useDark())

const myChart = ref(null)
const formData = ref(null)
onMounted(() => {
  getProvinceStatistic().then(res => {
    console.log(res.data.data)
    formData.value = res.data.data.map(item => {
      console.log(item)
      return {
        name: item.provinceName,
        value: item.avgAqi,
      }
    })
    updateMapChartTheme()
  })
  watch(isDark, () => {
    myChart.value.dispose()
    updateMapChartTheme()
  })
})
echarts.registerMap('chinaMap', chinaMapData)
const updateMapChartTheme = () => {
  const theme = isDark.value ? 'dark' : 'light'; // 根据当前模式选择主题
  myChart.value = echarts.init(chartDom.value, theme) // 初始化
  // 注册当前地图名
  let option = {
    backgroundColor: isDark.value ? "#1d1e1f" : '#ffffff',
    // 地理坐标组件
    // geo: {
    //   type: 'map',
    //   // 地图来源=>注册的chinaMap
    //   map: 'chinaMap',
    //   // roam: true, // 开启平移
    //   zoom: 1.25,
    // },
    // 提示框
    tooltip: {
      formatter: '{a} {b} {c}'
    },
    title: {
      text: 'AQI超标情况'
    },
    visualMap: {
      min: 0,
      max: 300, // 根据你的数据范围调整
      left: 'left',
      top: 'bottom',
      text: ['High', 'Low'],
      calculable: true
    },
    series: [
      {
        // center: [37.550339, 104.114129], // 地图中心点（经度和纬度）
        name: 'AQI',
        type: 'map',
        projection: {
          project: (point) => [point[0] / 180 * Math.PI, -Math.log(Math.tan((Math.PI / 2 + point[1] / 180 * Math.PI) / 2))],
          unproject: (point) => [point[0] * 180 / Math.PI, 2 * 180 / Math.PI * Math.atan(Math.exp(point[1])) - 90]
        },
        mapType: 'chinaMap', // 和注册的地图名保持一致
        // roam: true,
        zoom: 1.1,
        // top: '10%',
        // center: [1, 1], // 地图在容器中的位置
        // label: {
        //   show: true
        // },
        data: formData.value
      }
    ],

    layoutCenter: ['50%', '50%'],//设置地图在画布的位置
  }
  option && myChart.value.setOption(option);
}

</script>