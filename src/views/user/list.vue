<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.email" placeholder="请输入邮箱" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column label="用户名" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="250px">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机" align="center" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.register_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册IP" align="center" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.register_ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center" width="95">
        <template slot-scope="{row}">
          <span v-if="row.role_id" class="link-type" @click="handleUpdateRole(row)">{{ roleParse(row.role_id) }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="200px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.user_status| statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdateUserInfo(row)">
            重置密码
          </el-button>
          <el-button size="mini" type="danger" disabled @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog title="修改状态" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 300px; margin-left:50px;">
        <el-form-item label="用户ID" prop="user_id">
          <template>
            <span>{{ temp.user_id }}</span>
          </template>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <template>
            <span>{{ temp.email }}</span>
          </template>
        </el-form-item>
        <el-form-item label="帐号状态" prop="now_status">
          <el-tag>{{ temp.now_status | statusFilter }}</el-tag>
        </el-form-item>
        <el-form-item label="修改状态" prop="upstatus">
          <el-select v-model="temp.upstatus" class="filter-item" placeholder="Please select" @change="handleStatus">
            <el-option v-for="item in statusOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="isShowSelectTime" label="选择时间">
          <el-date-picker v-model="temp.user_status" type="datetime" format="yyyy-MM-dd hh:mm:ss" value-format="timestamp" placeholder="Please pick a date" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改角色" :visible.sync="roleDialogFormVisible">
      <el-form ref="roleForm" :rules="rules" :model="roleTemp" label-position="left" label-width="100px" style="width: 300px; margin-left:50px;">
        <el-form-item label="用户ID" prop="user_id">
          <template>
            <span>{{ roleTemp.user_id }}</span>
          </template>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <template>
            <span>{{ roleTemp.email }}</span>
          </template>
        </el-form-item>
        <el-form-item label="角色ID" prop="times">
          <el-tag>{{ roleTemp.role_id }}</el-tag>
        </el-form-item>
        <el-form-item label="当前角色" prop="times">
          <el-tag>{{ roleParse(roleTemp.role_id) }}</el-tag>
        </el-form-item>
        <el-form-item label="修改角色" prop="now_role">
          <el-switch
            v-model="roleTemp.normal_role"
            active-value="1"
            inactive-value="0"
            active-text="普通用户"
          />
          <el-switch
            v-model="roleTemp.do_role"
            active-value="1"
            inactive-value="0"
            active-text="运维管理员"
          />
          <el-switch
            v-model="roleTemp.op_role"
            active-value="1"
            inactive-value="0"
            active-text="运营管理员"
          />
          <el-switch
            v-model="roleTemp.fe_role"
            active-value="1"
            inactive-value="0"
            active-text="财务管理员"
          />
          <el-switch
            v-model="roleTemp.admin_role"
            active-value="1"
            inactive-value="0"
            active-text="普通管理员"
          />
          <el-switch
            v-model="roleTemp.super_role"
            active-value="1"
            inactive-value="0"
            active-text="超级管理员"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateRoleData()">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="重置密码" :visible.sync="userInfoDialogFormVisible">
      <el-form ref="userInfoForm" :rules="rules" :model="userInfoTemp" label-position="left" label-width="100px" style="width: 300px; margin-left:50px;">
        <el-form-item label="用户ID" prop="user_id">
          <template>
            <span>{{ userInfoTemp.user_id }}</span>
          </template>
        </el-form-item>
        <el-form-item label="当前邮箱" prop="email">
          <template>
            <span>{{ userInfoTemp.email }}</span>
          </template>
        </el-form-item>
        <el-form-item label="新邮箱" prop="new_email">
          <el-input v-model="userInfoTemp.new_email" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="userInfoTemp.password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="password">
          <el-input v-model="userInfoTemp.check_password" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userInfoDialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateUserInfoData()">
          确定
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getUserList, updateUserStatus, updateUserRole, updateUserInfo } from '@/api/userAction'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'UserList',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      if (status === 0) {
        return '正常'
      } else if (status < 0) {
        return '永久锁定'
      } else if (status !== null && status > 100000000) {
        const time = parseTime(status)
        return `锁定: ${time} 到期`
      } else {
        return '正常'
      }
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        email: null,
        page: 1,
        limit: 20
      },
      statusOptions: [
        { key: 0, value: '正常' },
        { key: 1, value: '锁定' },
        { key: 2, value: '永久锁定' }
      ],
      temp: {
        user_id: '',
        email: '',
        user_status: 0,
        now_status: 0, // 当前状态
        upstatus: ''
      },
      roleTemp: {
        user_id: '',
        email: '',
        role_id: 0,
        normal_role: 0, // 普通用户
        do_role: 0, // 运维管理员
        op_role: 0, // 运营管理员
        fe_role: 0, // 财务管理员
        admin_role: 0, // 普通管理员
        super_role: 0 // 超级管理员
      },
      userInfoTemp: {
        user_id: 0,
        email: '',
        new_email: '',
        password: '',
        check_password: ''
      },
      dialogFormVisible: false,
      roleDialogFormVisible: false,
      userInfoDialogFormVisible: false,
      isShowSelectTime: false,
      rules: {
        user_id: [{ required: true, message: 'userid is required', trigger: 'change' }],
        email: [{ required: true, message: 'email is required', trigger: 'change' }],
        role_id: [{ required: true, message: 'role is required', trigger: 'change' }],
        user_status: [{ required: true, message: 'status is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getUserList(this.listQuery).then(response => {
        const tmpListData = response.data
        this.list = tmpListData.data
        this.total = tmpListData.length
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    },
    roleParse(roleID) {
      const roleOptions = [
        { key: 0, value: '普通用户' },
        { key: 1, value: '运维管理员' },
        { key: 2, value: '运营管理员' },
        { key: 3, value: '财务管理员' },
        { key: 4, value: '普通管理员' },
        { key: 5, value: '超级管理员' }
      ]
      const roleList = [0, 1, 2, 3, 4, 5]
      const res = []
      roleList.forEach((value, index) => {
        if (((roleID >> value) & 1) === 1) {
          res.push(roleOptions[value].value)
        }
      })
      return res.join(',')
    },
    handleStatus(value) {
      if (value === 0) { // 正常
        this.temp.user_status = 0
        this.isShowSelectTime = false
      } else if (value === 1) { // 锁定
        // this.temp.status = 16000
        this.isShowSelectTime = true
      } else { // 永久锁定
        this.temp.user_status = -1
        this.isShowSelectTime = false
      }
    },
    resetTmp() {
      this.temp = {
        user_id: '',
        email: '',
        user_status: 0,
        now_status: 0, // 当前状态
        upstatus: ''
      }
      this.isShowSelectTime = false
    },
    handleUpdate(row) {
      this.temp = {
        user_id: row.user_id,
        email: row.email,
        user_status: new Date(),
        now_status: row.user_status,
        upstatus: 0
      }
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log('temp:', this.temp)
          if (this.temp.upstatus === 1 && this.temp.user_status === 0) {
            this.$notify({
              title: '修改状态',
              message: '未设置锁定时间',
              type: 'warning',
              duration: 2000
            })
            return
          }

          let tmpTime = this.temp.user_status
          if (this.temp.upstatus === 1 && (typeof tmpTime === 'number') && (tmpTime.toString().length === 13)) {
            tmpTime = tmpTime / 1000
          }
          if (this.temp.upstatus === 0) {
            tmpTime = 0
          }

          const tempData = {
            'userId': this.temp.user_id,
            'email': this.temp.email,
            'userStatus': tmpTime
          }
          // console.log('updateData', this.temp)
          updateUserStatus(tempData).then(() => {
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
          })
        }
      })
    },
    handleUpdateRole(row) {
      this.roleTemp = {
        user_id: row.user_id,
        email: row.email,
        role_id: row.role_id,
        normal_role: ((row.role_id >> 0) & 1).toString(), // 普通用户
        do_role: ((row.role_id >> 1) & 1).toString(), // 运维管理员
        op_role: ((row.role_id >> 2) & 1).toString(), // 运营管理员
        fe_role: ((row.role_id >> 3) & 1).toString(), // 财务管理员
        admin_role: ((row.role_id >> 4) & 1).toString(), // 普通管理员
        super_role: ((row.role_id >> 5) & 1).toString() // 超级管理员
      }
      console.log(this.roleTemp)
      this.roleDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['roleForm'].clearValidate()
      })
    },
    updateRoleData() {
      this.$refs['roleForm'].validate((valid) => {
        if (valid) {
          const roleid = this.rolesToInt(this.roleTemp)

          if (roleid !== this.roleTemp.role_id) {
            const tempData = {
              'userId': this.roleTemp.user_id,
              'roleId': roleid
            }
            // console.log('updateData', tempData)
            updateUserRole(tempData).then(response => {
              if (response.status === 2000) {
                this.roleDialogFormVisible = false
                this.$notify({
                  title: '修改角色',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })
                // 初始化 this.temp
                this.resetTmp()
                // 重新刷新 UserList
                this.getList()
              } else {
                this.$notify({
                  title: '修改角色',
                  message: response.msg || '失败',
                  type: 'error',
                  duration: 5000
                })
              }
            }).catch(err => {
              console.error(err)
              this.$notify({
                title: '失败',
                message: err,
                type: 'error',
                duration: 4000
              })
            })
          } else {
            this.roleDialogFormVisible = false
            this.$notify({
              title: '修改角色',
              message: '未修改',
              type: 'success',
              duration: 2000
            })
          }
        }
      })
    },
    rolesToInt(roleTemp) {
      let roleID = 0
      if (roleTemp.normal_role === '1') {
        roleID |= (1 << 0)
      } else {
        if (roleTemp.do_role === '1') {
          roleID |= (1 << 1)
        }
        if (roleTemp.op_role === '1') {
          roleID |= (1 << 2)
        }
        if (roleTemp.fe_role === '1') {
          roleID |= (1 << 3)
        }
        if (roleTemp.admin_role === '1') {
          roleID |= (1 << 4)
        }
        if (roleTemp.super_role === '1') {
          roleID |= (1 << 5)
        }
      }
      return roleID
    },
    handleUpdateUserInfo(row) {
      this.userInfoTemp = {
        user_id: row.user_id,
        email: row.email,
        new_email: '',
        password: '',
        check_password: ''
      }
      this.userInfoDialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['userInfoForm'].clearValidate()
      })
    },
    updateUserInfoData() {
      this.$refs['userInfoForm'].validate((valid) => {
        if (valid) {
          if (this.userInfoTemp.new_email !== '' || this.userInfoTemp.password !== '') {
            if (this.userInfoTemp.password !== '' && this.userInfoTemp.check_password !== this.userInfoTemp.password) {
              this.$notify({
                title: '修改用户信息',
                message: '两次密码不一致',
                type: 'warning',
                duration: 2000
              })
              return
            }
            const tempData = {
              'userId': this.userInfoTemp.user_id,
              'email': this.userInfoTemp.new_email,
              'password': this.userInfoTemp.password
            }
            // console.log('updateData', tempData)
            updateUserInfo(tempData).then(response => {
              if (response.status === 2000) {
                this.userInfoDialogFormVisible = false
                this.$notify({
                  title: '修改用户信息',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })
              // 重新刷新 UserList
                //   this.getList()
              } else {
                this.$notify({
                  title: '修改用户信息',
                  message: response.msg,
                  type: 'error',
                  duration: 2000
                })
              }
            })
          } else {
            this.userInfoDialogFormVisible = false
            this.$notify({
              title: '修改用户信息',
              message: '未修改',
              type: 'success',
              duration: 2000
            })
          }
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '删除用户',
        message: '删除成功',
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
    // getFormatTime(timestamp) {
    //   return parseTime(timestamp)
    // }
  }
}
</script>
