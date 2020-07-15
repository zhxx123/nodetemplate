<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    pieData: {
      type: Object,
      required: true

    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    pieData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
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
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.pieData)
    },
    setOptions({ value, label, tips } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}G ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: label
        },
        series: [
          {
            name: tips,
            type: 'pie',
            // roseType: 'radius',
            radius: [1, 100],
            center: ['50%', '50%'],
            data: [
              { value: value[0], name: label[0] },
              { value: value[1], name: label[1] }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              normal: {
                color: function(params) {
                  // 自定义颜色
                  var colorList = [
                    '#FF0000', '#32CD32'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }

          }
        ]
      })
    }
  }
}
</script>
