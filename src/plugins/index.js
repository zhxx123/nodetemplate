/*
 * @Author: zhxx
 * @Date: 2020-07-10 19:38:38
 * @LastEditors: zhxx
 * @LastEditTime: 2020-07-10 20:17:12
 */
/* 公共引入,勿随意修改,修改时需经过确认 */
import Vue from 'vue'
import './element'
import './support'
import '@/styles/vab.scss'
import vab from '@/utils/vab'
import '@/remixIcon'
import '@/colorfulIcon'
import '@/config/permission'
import '@/utils/errorLog'
import drag from '@/directive/drag'
import permissions from '@/directive/permissions'
import './vabIcon'
import VabQueryForm from '@/components/VabQueryForm'
import VabQueryFormTopPanel from '@/components/VabQueryForm/VabQueryFormTopPanel'
import VabQueryFormBottomPanel from '@/components/VabQueryForm/VabQueryFormBottomPanel'
import VabQueryFormLeftPanel from '@/components/VabQueryForm/VabQueryFormLeftPanel'
import VabQueryFormRightPanel from '@/components/VabQueryForm/VabQueryFormRightPanel'

Vue.use(permissions)
Vue.use(drag)
Vue.use(vab)

Vue.component('vab-query-form', VabQueryForm)
Vue.component('vab-query-form-left-panel', VabQueryFormLeftPanel)
Vue.component('vab-query-form-right-panel', VabQueryFormRightPanel)
Vue.component('vab-query-form-top-panel', VabQueryFormTopPanel)
Vue.component('vab-query-form-bottom-panel', VabQueryFormBottomPanel)
