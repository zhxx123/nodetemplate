<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.userid" placeholder="请输入用户ID" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.status" placeholder="请选择类型" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="ID" prop="id" sortable align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="scope">
          <span>{{ scope.row.ID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接收者ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消息ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.article_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消息标题" align="center" min-width="250px">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布者ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="阅读状态" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.read_ed | classTypeFilter">
            {{ row.read_ed |readFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="阅读时间" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.read_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布状态" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | classTypeFilter" @click="handleModifyStatus(row)">
            {{ row.status | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" disabled type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog title="更新状态" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="dataForm" label-position="left" label-width="100px" style="width: 300px; margin-left:50px;">
        <el-form-item label="序号ID" prop="article_id">
          <el-tag>{{ dataForm.ID }}</el-tag>
        </el-form-item>
        <el-form-item label="消息ID" prop="article_id">
          <el-tag>{{ dataForm.article_id }}</el-tag>
        </el-form-item>
        <el-form-item label="用户ID" prop="user_id">
          <el-tag>{{ dataForm.user_id }}</el-tag>
        </el-form-item>
        <el-form-item label="消息标题" prop="title">
          <el-input v-model="dataForm.title" :rows="1" :maxlength="64" type="textarea" class="article-textarea" autosize placeholder="不超过64个字符" />
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <el-input v-model="dataForm.summary" :rows="1" :maxlength="80" type="textarea" class="article-textarea" autosize placeholder="不超过80个字符" />
        </el-form-item>
        <el-form-item label="内容" prop="content" width="200">
          <el-input v-model="dataForm.content" :rows="2" :maxlength="256" type="textarea" class="article-textarea" autosize placeholder="不超过256个字符" />
        </el-form-item>
        <el-form-item label="发布者" prop="announcer">
          <el-input v-model="dataForm.announcer" :rows="1" :maxlength="32" type="textarea" class="article-textarea" autosize placeholder="不超过32个字符" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          更新
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserMessage, updateMessageStatus, updateMessage } from '@/api/userAction'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const defaultForm = {
  user_id: undefined,
  article_id: undefined,
  title: '',
  summary: '',
  content: '',
  announcer: ''
}
const statusOptions = [
  { key: false, value: '未发布' },
  { key: true, value: '已发布' }
]
// arr to obj, such as { CN : "China", US : "USA" }
const statusKeyValue = statusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.value
  return acc
}, {})
export default {
  name: 'Message',
  components: { Pagination },
  directives: { waves },
  filters: {
    readFilter(type) {
      const statusMap = {
        0: '未读',
        1: '已读'
      }
      if (type) {
        return statusMap[1]
      }
      return statusMap[0]
    },
    statusFilter(type) {
      return statusKeyValue[type]
    },
    classTypeFilter(status) {
      const statusMap = {
        0: 'info',
        1: 'success'
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
        status: undefined,
        ispushed: undefined,
        page: 1,
        limit: 20
      },
      dataForm: Object.assign({}, defaultForm),
      statusOptions,
      dialogFormVisible: false,
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
      if (this.listQuery.status !== undefined && this.listQuery.status !== null && this.listQuery.status !== '') {
        this.listQuery.ispushed = 1
      } else {
        this.listQuery.status = undefined
        this.listQuery.ispushed = undefined
      }
      getUserMessage(this.listQuery).then(response => {
        const tmpListData = response.data
        this.list = tmpListData.data
        this.total = tmpListData.length
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    },
    resetTmp() {
      this.dataForm = Object.assign({}, defaultForm)
    },
    handleUpdate(row) {
      this.dataForm = Object.assign({}, row)
      console.log('row', row)
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tmpData = {
            user_id: this.dataForm.user_id,
            article_id: this.dataForm.article_id,
            title: this.dataForm.title,
            summary: this.dataForm.summary,
            content: this.dataForm.content,
            announcer: this.dataForm.announcer
          }
          updateMessage(tmpData).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '修改状态',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            // 初始化 this.temp
            this.resetTmp()
            // 重新刷新 UserList
            this.getList()
          }).catch(err => {
            console.error(err)
            this.$notify({
              title: '更新消息',
              message: '失败',
              type: 'error',
              duration: 2000
            })
          })
        }
      })
    },
    handleModifyStatus(row) {
    //   console.log(row.status)
      let msgTip = `消息ID: ${row.article_id}  确认要发布当前消息，用户 [UID: ${row.user_id}] 将可见?`
      let msgTitle = '发布消息'
      let msgStatus = true
      if (row.status === true) {
        msgTip = `消息ID: ${row.article_id}  确认要撤回当前消息，用户 [UID: ${row.user_id}] 将不可见?`
        msgTitle = '撤回消息'
        msgStatus = false
      }
      this.$confirm(msgTip, '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const tmpData = {
          'userId': row.user_id,
          'articleId': row.article_id,
          'status': msgStatus
        }
        await updateMessageStatus(tmpData)
        this.$notify({
          title: msgTitle,
          message: '成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      }).catch(err => {
        console.error(err)
        if (err !== 'cancel') {
          this.$notify({
            title: msgTitle,
            message: '失败',
            type: 'error',
            duration: 2000
          })
        }
      })
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
        const tHeader = ['ID', 'MessageID', 'Title', 'AuthorID', 'UserID', 'ReadAt', 'Read']
        const filterVal = ['id', 'article_id', 'title', 'author_id', 'user_id', 'read_at', 'read']
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
    // getFormatTime(timestamp) {
    //   return parseTime(timestamp)
    // }
  }
}
</script>
<style lang="scss" scoped>
.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
