<template>
  <div class="login-box">
    <div class="login-body">
      <img src="@/assets/images/log.jpg">
      <div class="login-form">
        <div class="login-title">平台账户登录</div>
        <hr style="color: rbga(0,0,0,.65);">
        <el-form ref="loginForm" :model="formdata" :rules="rules">
          <el-form-item prop="account">
            <el-input
              ref="account"
              v-model.trim="formdata.account"
              type="text"
              placeholder="请输入帐户名"
              prefix-icon="el-icon-user-solid"
              @blur="checkFocus()"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              ref="password"
              v-model.trim="formdata.password"
              type="password"
              placeholder="密码"
              prefix-icon="el-icon-user-solid"
              @blur="checkFocus()"
            />
          </el-form-item>
          <el-form-item style="margin-top:24px">
            <el-button
              ref="submit"
              :loading="loading"
              type="primary"
              style="width: 100%;font-size: 16px;"
              @click="handleLogin"
              @keyup.enter="handleLogin"
            >确定</el-button>
          </el-form-item>
        </el-form>
        <br>
        <p style="font-size: 14px;color: rbga(0,0,0,.65);">
          版本信息：
          <font color="red">{{ version }}</font>
        </p>
        <br>
        <br>
        <a href="http://23.36.250.236:8021" style="color: #1890ff;font-size: 18px;">点击下载平台使用必备软件</a>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserApeKeyList } from '@/api/ApiAppManage'

export default {
  data() {
    return {
      formdata: {
        account: '',
        password: ''
      },
      version: window.config.version,
      redirect: undefined,
      otherQuery: {},
      rules: {
        account: [{ required: true, message: '请输入帐户名' }],
        password: [{ required: true, message: '请输入密码' }]
      },
      loading: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  beforeCreate() {
    localStorage.clear()
    this.$store.dispatch('tagsView/delAllViews')
  },
  created() {
    const that = this
    document.onkeydown = function(e) {
      var key = (window.event || e).keyCode
      if (key === 13 || key === 100) {
        if (!that.loading) {
          that.handleLogin()
        }
      }
    }
  },
  mounted() {
    this.$refs.account.focus()
  },
  methods: {
    handleLogin() {
      const that = this
      this.loading = true
      if (this.$refs.loginForm) {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$store
              .dispatch('user/login', this.formdata)
              .then(() => {
                this.loading = false
                this.$router.push({
                  path: this.redirect || '/',
                  query: this.otherQuery
                }).catch(err => { err })

                this.getAppPermissions()
              })
              .catch(err => {
                this.loading = false
                this.$notify({
                  title: '登录失败',
                  message: err,
                  type: 'error',
                  duration: 2000
                })
              })
          } else {
            this.loading = false
            that.checkFocus()
          }
        })
      }
    },
    checkFocus() {
      if (this.formdata.account.length === 0) {
        this.$refs.account.focus()
        return false
      }
      if (this.formdata.password.length === 0) {
        this.$refs.password.focus()
        return false
      }
      return true
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    // 当前用户应用功能权限
    getAppPermissions() {
      getUserApeKeyList()
        .then(res => {
          if (res.data) {
            localStorage.appPermissions = JSON.stringify(res.data)
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
<style lang="scss" scoped>
.login-box {
  text-align: center;
  background: #032059;
  height: 100vh;
  overflow-y: hidden;
  .login-body {
    width: 1450px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    margin-top: -300px;
    .login-form {
      height: 563px;
      width: 450px;
      padding: 90px 60px;
      float: right;
      background: white;
      .login-title {
        font-size: 33px;
        font-weight: 600;
        padding-bottom: 20px;
        color: #40a9ff;
      }
    }
  }
}
</style>
