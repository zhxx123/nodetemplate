/*
 * @Author: zhxx
 * @Date: 2020-07-10 19:38:38
 * @LastEditors: zhxx
 * @LastEditTime: 2020-07-10 19:38:45
 */
import 'echarts'
import 'echarts/map/js/china'
import 'echarts/map/js/world'

import 'echarts-wordcloud'

import VabChart from 'vue-echarts'
import theme from './vab-echarts-theme.json'

VabChart.registerTheme('vab-echarts-theme', theme)
export default VabChart
