<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header">
      <span>我的信息</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb image="https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>你好</div>
          {{ user.username }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.username }}</div>
        <div class="user-role text-center text-muted">{{ user.role | roleFilter }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>邮箱</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            <span>{{ user.useremail }}</span>
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>我的角色</span></div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <p v-for="item in roleParse(user.role) " :key="item">
              {{ item }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'

const roleOptions = [
  { key: 1, value: '普通用户' },
  { key: 2, value: '运营管理员' },
  { key: 3, value: '财务管理员' },
  { key: 4, value: '运维管理员' },
  { key: 5, value: '高级管理员' },
  { key: 6, value: '超级管理员' }
]
// arr to obj, such as { CN : "China", US : "USA" }
const roleKeyValue = roleOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.value
  return acc
}, {})
export default {
  components: { PanThumb },
  filters: {
    roleFilter(type) {
      return roleKeyValue[type]
    }
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          username: '',
          useremail: '',
          roles: ''
        }
      }
    }
  },
  methods: {
    roleParse(roles) {
      const roleOptions = [
        { key: 0, value: '普通用户' },
        { key: 1, value: '运维管理员' },
        { key: 2, value: '运营管理员' },
        { key: 3, value: '财务管理员' },
        { key: 4, value: '普通管理员' },
        { key: 5, value: '超级管理员' }
      ]
      const res = []
      console.log(roles)
      roles.forEach((value, index) => {
        res.push(roleOptions[value].value)
      })
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
 .box-center {
   margin: 0 auto;
   display: table;
 }

 .text-muted {
   color: #777;
 }

 .user-profile {
   .user-name {
     font-weight: bold;
   }

   .box-center {
     padding-top: 10px;
   }

   .user-role {
     padding-top: 10px;
     font-weight: 400;
     font-size: 14px;
   }

   .box-social {
     padding-top: 30px;

     .el-table {
       border-top: 1px solid #dfe6ec;
     }
   }

   .user-follow {
     padding-top: 20px;
   }
 }

 .user-bio {
   margin-top: 20px;
   color: #606266;

   span {
     padding-left: 4px;
   }

   .user-bio-section {
     font-size: 14px;
     padding: 15px 0;

     .user-bio-section-header {
       border-bottom: 1px solid #dfe6ec;
       padding-bottom: 10px;
       margin-bottom: 10px;
       font-weight: bold;
     }
   }
 }
</style>
