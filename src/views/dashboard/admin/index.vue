<template>
  <div class="dashboard-editor-container">
    <el-row v-for="(page, indexs) of pages" :key="indexs">
      <el-col v-for="(item, innerindex) of page" :key="innerindex" :span="5" :offset="innerindex > 0 ? 1 : 1">
        <div class="chart-wrapper">
          <div style="background:#fff;margin-bottom:12px;" @click="handleMachine(item)">
            <a> 机器{{ item.count }}</a> <span class="pie-chart-tip">最后更新: {{ item.uptime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </div>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">名称</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{ item.name }}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">标识</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{ item.uid }}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">系统</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{ item.system }}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">cpu</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{ item.cpuinfo }}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">其他</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{ item.memdisk }}</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">IP</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light">{{ item.remoteip }}</div></el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSystemBasicInfo } from '@/api/system'
import { parseTime } from '@/utils'
export default {
  name: 'DashboardAdmin',
  components: {
  },
  data() {
    return {
      sysBasicList: [{
        uptime: 0,
        name: null,
        system: null,
        cpuinfo: null,
        memdisk: null,
        remoteip: null
      }],

      listQuery: {
        uid: '',
        page: 1,
        limit: 10
      },
      listLoading: false
    }
  },
  computed: {
    pages() {
      const pages = []
      this.sysBasicList.forEach((item, index) => {
        const page = Math.floor(index / 4)// 4代表4条为一行，随意更改
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getSystemBasicInfo(this.listQuery).then(response => {
        const tmpData = response.data
        if (tmpData.length > 0) {
          this.getSystem(tmpData.data)
        }
        // Just to simulate the time of the request
        setTimeout(() => {
        //   this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getSystem(tmpList) {
      const newBasicInfo = []
      let count = 1
      tmpList.forEach(function(val, index) {
        const name = val.nick_name// val.nickname
        const uid = val.uid
        const uptime = parseTime(val.update_at)
        const system = val.os_system
        const cpuinfo = val.cpu_name + ' ' + val.cpu_count + 'C'
        const memdisk = val.mem_total + 'G mem, ' + val.disk_total + 'G disk'
        const ip = val.net_remote_ip
        newBasicInfo.push({ 'count': count, 'name': name, 'uid': uid, 'uptime': uptime, 'system': system, 'cpuinfo': cpuinfo, 'memdisk': memdisk, 'remoteip': ip })
        count = count + 1
      })
      this.sysBasicList = newBasicInfo
    //   console.log(this.sysBasicList)
    },
    handleMachine(item) {
      if (item.uid.length > 0) {
        this.$router.push({
          path: `/machine/detail/${item.uid}`
        })
      }
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
