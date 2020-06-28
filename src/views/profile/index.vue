<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>
        <el-col :span="6" :xs="24">
          <el-card v-loading="listLoading" class="box-card">
            <div slot="header" class="clearfix">
              <span>其他信息</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="getUserInfo">更新</el-button>
            </div>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">用户ID</div></el-col>
              <el-col :span="18"><div class="grid-content bg-purple-light">{{ list.user_id }}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">绑定手机</div></el-col>
              <el-col :span="18"><div class="grid-content bg-purple-light">{{ list.phone || '暂无' }}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">注册时间</div></el-col>
              <el-col :span="18"><div class="grid-content bg-purple-light">{{ list.register_at | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">注册IP</div></el-col>
              <el-col :span="18"><div class="grid-content bg-purple-light">{{ list.register_ip || '暂无' }}</div></el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="6" :xs="24">
          <el-card v-loading="listLoginLoading" class="box-card">
            <div slot="header" class="clearfix">
              <span>安全信息</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="getUserInfo">更新</el-button> -->
            </div>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">上一次登录</div></el-col>
              <el-col :span="18"><div class="grid-content bg-purple-light">{{ loinInfo.login_at | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">登录地址</div></el-col>
              <el-col :span="18"><div class="grid-content bg-purple-light">{{ loinInfo.login_ip || '暂无' }}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">所在地</div></el-col>
              <el-col :span="18"><div class="grid-content bg-purple-light">{{ loinInfo.login_city || '暂无' }}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="grid-content bg-purple">过期时间</div></el-col>
              <el-col :span="18"><div class="grid-content bg-purple-light">{{ loinInfo.express_in | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</div></el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import { getInfo, getUserOauthInfo } from '@/api/user'
export default {
  name: 'Profile',
  components: { UserCard },
  data() {
    return {
      listLoading: false,
      listLoginLoading: false,
      user: {},
      list: {
        user_id: '',
        phone: '',
        register_at: '',
        register_ip: ''
      },
      loinInfo: {
        login_at: '',
        login_ip: '',
        login_city: '',
        express_in: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'roles',
      'useremail'
    ])
  },
  created() {
    this.getUser()
    this.getUserInfo()
    this.getLoginInfo()
  },
  methods: {
    getUser() {
      this.user = {
        username: this.username,
        role: this.roles,
        useremail: this.useremail
      }
    //   console.log(this.user)
    },
    getUserInfo() {
      this.listLoading = true
      getInfo().then(response => {
        const tmpListData = response.data
        this.list = tmpListData
        this.listLoading = false
      })
    },
    getLoginInfo() {
      this.listLoginLoading = true
      const tmpQuery = {
        page: 2,
        limit: 1
      }
      getUserOauthInfo(tmpQuery).then(response => {
        const tmpListData = response.data
        if (tmpListData.length === 1) {
          this.loinInfo = tmpListData.data[0]
        }
        this.listLoginLoading = false
      })
    }
  }
}
</script>
<style scoped>
.bg-purple-dark {
  background: white;
}
.bg-purple {
	color: grey;
	/* text-align: right; */
  background:white;
}
.bg-purple-light {
	/* margin-left: 10px; */

  background:white;
}
.grid-content {
  border-radius: 6px;
  min-height: 46px;
	text-align: left;
  padding-top: 10px;
}
</style>
