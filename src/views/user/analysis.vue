<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" />
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card shadow="never">
          <div slot="header">
            <span>访问量</span>
          </div>
          <bar-chart :chart-data="lineData" />
          <div class="bottom">
            <span>日均访问量:

              <vab-count
                :start-val="config1.startVal"
                :end-val="config1.endVal"
                :duration="config1.duration"
                :separator="config1.separator"
                :prefix="config1.prefix"
                :suffix="config1.suffix"
                :decimals="config1.decimals"
              />
            </span>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card shadow="never">
          <div slot="header">
            <span>注册数</span>
          </div>
          <line-chart :chart-data="lineData" />
          <div class="bottom">
            <span>总注册数:
              <vab-count
                :start-val="config2.startVal"
                :end-val="config2.endVal"
                :duration="config2.duration"
                :separator="config2.separator"
                :prefix="config2.prefix"
                :suffix="config2.suffix"
                :decimals="config2.decimals"
              /></span>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card shadow="never">
          <div slot="header">
            <span>常见登录地</span>
          </div>
          <word-cloud :data="cyData" />
          <div class="bottom">
            <span>词云数量:<vab-count
              :start-val="config3.startVal"
              :end-val="config3.endVal"
              :duration="config3.duration"
              :separator="config3.separator"
              :prefix="config3.prefix"
              :suffix="config3.suffix"
              :decimals="config3.decimals"
            /></span>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="13" :xl="13">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>GDP分布图</span>
          </div>
          <china-map :data="gdpData" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarChart from '../components/BarChart'
import LineChart from '../components/LineChart'
import WordCloud from '../components/WordCloud'
import ChinaMap from '../components/ChinaMap'
import VabCount from '@/plugins/vabCount'
export default {
  name: 'Index',
  components: {
    BarChart,
    WordCloud,
    VabCount,
    LineChart,
    ChinaMap
  },
  data() {
    return {
      timer: 0,
      updateTime: process.env.VUE_APP_UPDATE_TIME,
      nodeEnv: process.env.NODE_ENV,
      config1: {
        startVal: 0,
        endVal: 300,
        decimals: 0,
        prefix: '',
        suffix: '',
        separator: ',',
        duration: 5000
      },
      config2: {
        startVal: 0,
        endVal: 2000,
        decimals: 0,
        prefix: '',
        suffix: '',
        separator: ',',
        duration: 5000
      },
      config3: {
        startVal: 0,
        endVal: 200,
        decimals: 0,
        prefix: '',
        suffix: '',
        separator: ',',
        duration: 4000
      },
      lineData: {
        xAxisData: ['0时', '4时', '8时', '12时', '16时', '20时', '24时'],
        yAxisData: [10, 52, 20, 33, 39, 33, 22],
        name: '访问量',
        tips: '访问统计'
      },
      cyData: [
        {
          name: '深圳',
          value: 100
        },
        {
          name: '广州',
          value: 70
        },
        {
          name: '珠海',
          value: 93
        },

        {
          name: '郑州',
          value: 65
        },
        {
          name: '南阳',
          value: 60
        },
        {
          name: '湖北',
          value: 45
        },
        {
          name: '上海',
          value: 38
        },
        {
          name: '江西',
          value: 30
        },
        {
          name: '东京',
          value: 25
        },
        {
          name: '北京',
          value: 23
        },
        {
          name: '南京',
          value: 20
        },
        {
          name: '西京',
          value: 10
        },
        {
          name: '襄阳',
          value: 1
        },
        {
          name: '长沙',
          value: 17
        }
      ],
      gdpData: [
        { name: '西藏', value: 605.83 },
        { name: '青海', value: 1670.44 },
        { name: '宁夏', value: 2102.21 },
        { name: '海南', value: 2522.66 },
        { name: '甘肃', value: 5020.37 },
        { name: '贵州', value: 5701.84 },
        { name: '新疆', value: 6610.05 },
        { name: '云南', value: 8893.12 },
        { name: '重庆', value: 10011.37 },
        { name: '吉林', value: 10568.83 },
        { name: '山西', value: 11237.55 },
        { name: '天津', value: 11307.28 },
        { name: '江西', value: 11702.82 },
        { name: '广西', value: 11720.87 },
        { name: '陕西', value: 12512.3 },
        { name: '黑龙江', value: 12582 },
        { name: '内蒙古', value: 14359.88 },
        { name: '安徽', value: 15300.65 },
        { name: '北京', value: 16251.93 },
        { name: '福建', value: 17560.18 },
        { name: '上海', value: 19195.69 },
        { name: '湖北', value: 19632.26 },
        { name: '湖南', value: 19669.56 },
        { name: '四川', value: 21026.68 },
        { name: '辽宁', value: 22226.7 },
        { name: '河北', value: 24515.76 },
        { name: '河南', value: 26931.03 },
        { name: '浙江', value: 32318.85 },
        { name: '山东', value: 45361.85, selected: true },
        { name: '江苏', value: 49110.27 },
        { name: '广东', value: 53210.28 },
        { name: '香港', value: 3210.28 },
        { name: '澳门', value: 5310.28 },
        { name: '台湾', value: 5210.28 },
        { name: '南海诸岛', value: 1 }
      ]
      // 其他信息
    }
  },
  created() {
    // this.fetchData()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  mounted() {
  },
  methods: {
    handleClick(e) {
      this.$baseMessage(`点击了${e.name},这里可以写跳转`)
    },
    handleZrClick(e) {},
    handleChangeTheme() {
      this.$baseEventBus.$emit('theme')
    }
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  padding: 0 !important;
  margin: 0 !important;
  background: #f5f7f8 !important;

  ::v-deep {
    .el-alert {
      padding: 20px;

      &--info.is-light {
        min-height: 82px;
        padding: 20px;
        margin-bottom: 15px;
        color: #909399;
        background-color: white;
        border: 1px solid #ebeef5;
      }
    }

    .el-card__body {
      .echarts {
        width: 100%;
        height: 140px;
      }
    }
  }

  .card {
    min-height: 420px;

    ::v-deep {
      .el-card__body {
        .echarts {
          width: 100%;
          height: 305px;
        }
      }
    }
  }

  .bottom {
    height: 40px;
    padding-top: 20px;
    margin-top: 5px;
    color: #595959;
    text-align: left;
    border-top: 1px solid #dcdfe6;
  }

  .table {
    width: 100%;
    color: #666;
    border-collapse: collapse;
    background-color: #fff;

    td {
      position: relative;
      min-height: 20px;
      padding: 9px 15px;
      font-size: 14px;
      line-height: 20px;
      border: 1px solid #e6e6e6;

      &:nth-child(odd) {
        width: 20%;
        text-align: right;
        background-color: #f7f7f7;
      }
    }
  }

  .icon-panel {
    height: 100px;
    text-align: center;
    cursor: pointer;

    svg {
      font-size: 40px;
    }

    p {
      margin-top: 10px;
    }
  }

  .bottom-btn {
    margin-top: 5px;

    button {
      margin: 5px 10px 5px 0;
    }
  }
}
</style>
