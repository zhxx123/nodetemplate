<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-plus"
        @click="openDialog('add')"
      >新增角色</el-button>
    </div>
    <el-table :data="list" border stripe>
      <el-table-column label="ID" min-width="20" prop="ID" />
      <el-table-column label="role值" min-width="60" prop="role_number" />
      <el-table-column label="role名称" min-width="60" prop="name" />
      <!-- <el-table-column label="roleID" min-width="150" prop="role_id" /> -->
      <el-table-column label="role描述" min-width="150" prop="description" />
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-edit" @click="editRole(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" disabled icon="el-icon-delete" @click="deleteRoles(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :before-close="closeDialog" :title="editType === 'edit'?'编辑角色':'新增角色'" :visible.sync="dialogFormVisible" width="600px">
      <el-form ref="roleForm" :inline="false" :model="form" :rules="rules" label-width="80px" style="width: 300px; min-width:250px; margin-left:50px;">
        <el-form-item label="角色值" prop="role_number">
          <el-input v-model="form.role_number" autocomplete="off" :disabled="editType === 'edit'" type="number" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色简介" prop="description">
          <el-input v-model="form.description" autocomplete="off" type="textarea" :rows="2" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="form.status"
            active-value="1"
            inactive-value="0"
            active-text="启用"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="enterDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {
  getRoles,
  updateRole,
  addRole,
  deleteRole
} from '@/api/role'
import waves from '@/directive/waves' // waves directive
export default {
  name: 'Api',
  filters: {},
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      dialogFormVisible: false,
      editType: 'add',
      form: {
        role_number: '',
        name: '',
        description: '',
        status: '0'
      },
      type: '',
      rules: {
        role_number: [{ required: true, message: '请输入角色值', trigger: 'blur' }],
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色介绍', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    initForm() {
      this.$refs.roleForm.resetFields()
      this.form = {
        roleNumber: '',
        name: '',
        description: '',
        status: false
      }
    },
    async getList() {
      this.listLoading = true
      const response = await getRoles(this.listQuery)
      const tmpListData = response.data
      this.list = tmpListData.data
      this.total = tmpListData.length
      this.listLoading = false
    },
    // 关闭对话框
    closeDialog() {
      this.initForm()
      this.dialogFormVisible = false
    },
    // 打开对话框
    openDialog(type) {
      this.editType = type
      this.dialogFormVisible = true
    },
    // 方法
    // 修改
    editRole(row) {
      this.form = {
        role_number: row.role_number,
        name: row.name,
        description: row.description,
        status: (row.status === true ? '1' : '0')
      }
      this.openDialog('edit')
    },
    // 删除
    async deleteRoles(row) {
      this.$confirm(`此操作将删除当前角色[role值: ${row.role_number}], 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await deleteRole(row)
          if (res.status === 2000) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getTableData()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 确认对话框
    async enterDialog() {
      this.$refs.roleForm.validate(async valid => {
        if (valid) {
          switch (this.editType) {
            case 'add':
              {
                const dataFrom = {
                  roleNumber: parseInt(this.form.role_number),
                  name: this.form.name,
                  description: this.form.description,
                  status: (this.form.status === '1')
                }
                const res = await addRole(dataFrom)
                if (res.status === 2000) {
                  this.$message({
                    type: 'success',
                    message: '添加成功',
                    showClose: true
                  })
                }
                this.getList()
                this.closeDialog()
              }
              break
            case 'edit':
              {
                const dataFrom = {
                  roleNumber: parseInt(this.form.role_number),
                  name: this.form.name,
                  description: this.form.description,
                  status: (this.form.status === '1')
                }
                const res = await updateRole(dataFrom)
                if (res.status === 2000) {
                  this.$message({
                    type: 'success',
                    message: '编辑成功',
                    showClose: true
                  })
                }
                this.getList()
                this.closeDialog()
              }
              break
            default:
              this.$message({
                type: 'error',
                message: '未知操作',
                showClose: true
              })
              break
          }
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.button-box {
  padding: 10px 20px;
  .el-button {
    float: right;
  }
}
.el-tag--mini {
  margin-left: 5px;
}
.warning {
  color: #dc143c;
}
</style>
