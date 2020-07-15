<template>
  <div :id="id" :class="className" :style="{ height:height,width:width }" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import 'echarts/map/js/china'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'myChartChina'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '600%'
    },
    data: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      var mychartID = document.getElementById(this.id)
      this.chart = echarts.init(mychartID)
      var resizeMyChartContainer = function() {
        mychartID.style.width = (document.body.offsetWidth / 2) + 'px'// 页面一半的大小
      }
      resizeMyChartContainer()
      const option = {
        title: {
          text: '2099年全国GDP分布',
          subtext: '数据来源：匿名'
        },
        tooltip: {
          trigger: 'item'
        },
        dataRange: {
          orient: 'horizontal',
          min: 0,
          max: 55000,
          text: ['高', '低'],
          color: ['#0b50b9', '#c3e2f4'],
          splitNumber: 0
        },
        selectedMode: 'single',
        series: [
          {
            name: '2099年全国GDP分布',
            type: 'map',
            roam: false,
            zoom: 1.25,
            mapType: 'china',
            mapLocation: {
              x: 'center'
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)',
                label: {
                  show: false
                }
              },
              emphasis: {
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                label: {
                  show: true
                }
              }
            },
            // 位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: 'center',
            top: 'center',
            right: null,
            bottom: null,
            // width: '100%',
            // height: '100%',
            // 数据
            data: this.data
          }
        ]
      }
      this.chart.setOption(option)
      window.onresize = function() {
        resizeMyChartContainer()
        mychartID.resize()
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.chartsClass {
  padding-left: 1.2rem;
}
</style>
