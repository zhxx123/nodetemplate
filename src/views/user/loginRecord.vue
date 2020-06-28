<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.userid" placeholder="请输入用户ID" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.revoked" placeholder="请选择类型" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in revokedOptions" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" sortable align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="UID" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.role_id | roleFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录时间" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.login_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录IP" align="center" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.login_ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录地区" align="center" width="95">
        <template slot-scope="{row}">
          <span>{{ row.login_city }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录方式" align="center" width="95">
        <template slot-scope="{row}">
          <span>{{ row.login_type || '暂无' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="过期时间" class-name="status-col">
        <template slot-scope="{row}">
          <span>{{ row.express_in | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录状态" class-name="status-col">
        <template slot-scope="{row}">
          <el-tag :type="row.revoked | statusFilter">
            {{ row | revokedFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-if="row.revoked == 0" type="danger" size="mini" @click="handleModifyStatus(row,1)">
            下线
          </el-button>
          <el-button size="mini" type="danger" disabled @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { getLoginRecord, logoutUser } from '@/api/userAction'
import waves from '@/directive/waves' // waves directive
import { parseTime, getNowTimeSecond } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const roleOptions = [
  { key: 1, value: '普通用户' },
  { key: 2, value: '管理员' }
]
// arr to obj, such as { CN : "China", US : "USA" }
const roleKeyValue = roleOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.value
  return acc
}, {})

const revokedOptions = [
  { key: 0, value: '在线' },
  { key: 1, value: '离线' }
]
// arr to obj, such as { CN : "China", US : "USA" }
const revokedKeyValue = revokedOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.value
  return acc
}, {})
export default {
  name: 'UserList',
  components: { Pagination },
  directives: { waves },
  filters: {
    roleFilter(type) {
      if (type === 1) {
        return roleKeyValue[0]
      }
      return roleKeyValue[1]
    },
    revokedFilter(rows) {
      if (rows.revoked) {
        return revokedKeyValue[1]
      }
      //   console.log(rows.id, rows.revoked, rows.express_in, getNowTimeSecond(), rows.express_in < getNowTimeSecond())
      if (rows.express_in < getNowTimeSecond()) {
        rows.revoked = true
        return revokedKeyValue[1]
      }
      return revokedKeyValue[0]
    },
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'info'
      }
      if (status) {
        return statusMap[1]
      }
      return statusMap[0]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        userid: undefined,
        revoked: undefined,
        isrevoked: undefined,
        page: 1,
        limit: 20
      },
      revokedOptions,
      showSecret: false,
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      if (this.listQuery.userid !== undefined && this.listQuery.userid !== null && this.listQuery.userid !== '') {
        this.listQuery.userid = parseInt(this.listQuery.userid)
      } else {
        this.listQuery.userid = undefined
      }
      if (this.listQuery.revoked !== undefined && this.listQuery.revoked !== null && this.listQuery.revoked !== '') {
        this.listQuery.isrevoked = 1
      } else {
        this.listQuery.revoked = undefined
        this.listQuery.isrevoked = undefined
      }

      getLoginRecord(this.listQuery).then(response => {
        const tmpListData = response.data
        this.list = tmpListData.data
        this.total = tmpListData.length
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    },
    handleModifyStatus(row, status) {
      if (status === 1) {
        this.$confirm(`ID:${row.id} 确认强制下线当前用户 [UID: ${row.user_id}]?`, '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await logoutUser(row.user_id)
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          row.revoked = status
        }).catch(err => {
          console.error(err)
        })
      } else {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.revoked = status
      }
    },
    handleDelete(row) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    }
  }
}
</script>
