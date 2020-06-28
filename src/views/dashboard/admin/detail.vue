<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />
    <el-row v-loading="listLoading" :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <div style="background:#fff;margin-bottom:12px;">
            基础信息 <span class="pie-chart-tip">最后更新: {{ sysBasicList.update_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </div>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">标识</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{ sysBasicList.uid }}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">操作系统</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{ sysBasicList.os_system }}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">架构</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{ sysBasicList.os_arch }}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">核心</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{ sysBasicList.cpu_count }}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">处理器</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{ sysBasicList.cpu_name }}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">内存</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{ sysBasicList.mem_total }} G</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">磁盘</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{ sysBasicList.disk_total }} G</div></el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <div style="background:#fff;margin-bottom:12px;">
            网络信息 <span class="pie-chart-tip">最后更新: {{ sysBasicList.update_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </div>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">MAC地址</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{ sysBasicList.net_mac }}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">外网IP</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{ sysSimpleList.net_remote_ip }}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">内网IP</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{ sysSimpleList.net_local_ip }}</div></el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <div style="background:#fff;margin-bottom:12px;">
            运行时间 <span class="pie-chart-tip">最后更新: {{ sysSimpleList.update_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </div>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">已运行</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{ sysSimpleList.sys_uptime }}</div></el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div style="background:#fff;margin-bottom:12px;">
        CPU 使用率 <span class="pie-chart-tip">最后更新: {{ sysSimpleList.update_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
      </div>
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <div style="background:#fff;margin-bottom:12px;">
            内存 <span class="pie-chart-tip">最后更新: {{ sysSimpleList.update_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </div>
          <pie-chart :pie-data="memChartData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <div style="background:#fff;margin-bottom:12px;">
            磁盘 <span class="pie-chart-tip">最后更新: {{ sysSimpleList.update_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </div>
          <pie-chart :pie-data="diskChartData" />
        </div>
      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div style="background:#fff; margin-bottom:12px;">
        网络 <span class="pie-chart-tip">最后更新: {{ sysSimpleList.update_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
      </div>
      <net-line-chart :chart-data="netChartData" />
    </el-row>
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}" style="padding-right:8px;margin-bottom:30px;">
        <div class="chart-wrapper">
          <div style="background:#fff; margin-bottom:12px;">
            登录状态 <span class="pie-chart-tip">最后更新: {{ sysSimpleList.update_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </div>
          <el-table v-loading="listLoading" :data="loginList" style="width: 100%;padding-top: 15px;">
            <el-table-column label="用户名" width="100">
              <template slot-scope="scope">
                {{ scope.row.login_name }}
              </template>
            </el-table-column>
            <el-table-column label="TTY" width="100" align="center">
              <template slot-scope="scope">
                {{ scope.row.tty }}
              </template>
            </el-table-column>
            <el-table-column label="时间" min-width="200" align="center">
              <template slot-scope="scope">
                {{ scope.row.login_time }}
              </template>
            </el-table-column>
            <el-table-column label="登录地址" min-width="200" align="center">
              <template slot-scope="scope">
                {{ scope.row.login_addr }}
              </template>
            </el-table-column>
            <el-table-column label="类型" width="100" align="center">
              <template slot-scope="scope">
                {{ scope.row.detail }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSystemBasicInfo, getSystemSimpleInfo } from '@/api/system'
import GithubCorner from '@/components/GithubCorner'
import LineChart from './components/LineChart'
import NetLineChart from './components/NetLineChart'
import PieChart from './components/PieChart'
import { parseTime } from '@/utils'
export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    LineChart,
    PieChart,
    NetLineChart
  },
  data() {
    return {
      lineChartData: {
        xAxisData: [],
        oneMinData: [],
        fiveMinData: [],
        fifteenMinData: [],
        name: ['1分钟', '5分钟', '15分钟'],
        tips: '使用率'
      },
      memChartData: {
        value: [],
        label: ['已使用', '未使用'],
        tips: '内存使用情况'
      },
      diskChartData: {
        value: [],
        label: ['已使用', '未使用'],
        tips: '磁盘使用情况'
      },
      netChartData: {
        xAxisData: [],
        sendData: [],
        recvData: [],
        label: ['发送', '接收'],
        unit: 'KB',
        tips: '数据量'
      },
      loginList: null,
      cpuList: null,
      sysBasicList: {
        update_at: 0,
        uid: null,
        cpu_count: 1,
        cpu_name: null,
        os_arch: null,
        os_byte_order: null,
        os_system: null,
        net_mac: null,
        disk_total: null,
        mem_total: null
      },
      sysSimpleList: {
        update_at: 0,
        uid: null,
        net_remote_ip: null,
        net_local_ip: null,
        mem_used: null,
        mem_usage: null,
        sys_uptime: null,
        disk_used: null,
        disk_usage: null,
        net_byte_sent: 0,
        net_byte_recv: 0,
        cpu_average: null,
        login_count: 0,
        login_user: null
      },
      listQuery: {
        uid: '',
        page: 1,
        limit: 10
      },
      listLoading: false
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    if (id) {
      this.listQuery.uid = id
      this.getList()
    } else {
      this.$message({
        message: '错误页面',
        type: 'danger'
      })
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      getSystemBasicInfo(this.listQuery).then(response => {
        const tmpData = response.data
        if (tmpData.length > 0) {
          this.sysBasicList = tmpData.data[tmpData.length - 1]
        }
        // Just to simulate the time of the request
        setTimeout(() => {
        //   this.listLoading = false
        }, 1.5 * 1000)
      })
      getSystemSimpleInfo(this.listQuery).then(response => {
        const tmpData = response.data
        if (tmpData.length > 0) {
          this.sysSimpleList = tmpData.data[tmpData.length - 1]
          this.getSystem()
          this.updateNetData(tmpData.data)
          this.updateCpuData(tmpData.data)
        }
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getSystem() {
      const tmp = this.sysSimpleList.login_user
      if (tmp !== null) {
        this.loginList = JSON.parse(tmp)
      }
      const cpu = this.sysSimpleList.cpu_average
      if (cpu !== null) {
        this.cpuList = JSON.parse(cpu)
      }
      if (this.sysBasicList !== null && this.sysSimpleList !== null) {
        const mem_fee = (this.sysBasicList.mem_total - this.sysSimpleList.mem_used).toFixed(2)
        const disk_fee = (this.sysBasicList.disk_total - this.sysSimpleList.disk_used).toFixed(2)
        this.memChartData.value = [this.sysSimpleList.mem_used, mem_fee]
        this.diskChartData.value = [this.sysSimpleList.disk_used, disk_fee]
      }
    },
    updateNetData(tmpList) {
      const newNet = this.netChartData

      tmpList.forEach(function(val, index) {
        newNet.xAxisData.push(parseTime(val.update_at))
        newNet.recvData.push(parseFloat(val.net_byte_recv / 1000000.0).toFixed(2))
        newNet.sendData.push(parseFloat(val.net_byte_sent / 1000000.0).toFixed(2))
      })
      newNet.unit = 'MB'
      this.netChartData = newNet
    //   console.log(this.netChartData)
    },
    updateCpuData(tmpList) {
      const newCpu = this.lineChartData
      const cpuCount = this.sysBasicList.cpu_count || 1
      tmpList.forEach(function(val, index) {
        newCpu.xAxisData.push(parseTime(val.update_at))

        if (val.cpu_average !== null) {
          const cpu = JSON.parse(val.cpu_average)
          if (cpu.length === 3) {
            newCpu.oneMinData.push((parseFloat(cpu[0]) * 100 / cpuCount).toFixed(2))
            newCpu.fiveMinData.push((parseFloat(cpu[1]) * 100 / cpuCount).toFixed(2))
            newCpu.fifteenMinData.push((parseFloat(cpu[2]) * 100 / cpuCount).toFixed(2))
          }
        }
      })
      this.lineChartData = newCpu
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
	.pie-chart-tip{
		color: grey;
		font-size: 13px;
		float: right;
	}
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
.bg-purple-dark {
  background: white;
}
.bg-purple {
	color: grey;
  background:white;
}
.bg-purple-light {
  background:white;
}
.grid-content {
  border-radius: 6px;
  min-height: 46px;
  text-align: left;
  padding-top: 10px;
}
</style>
