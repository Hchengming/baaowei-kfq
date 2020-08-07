<template>
  <div v-loading="true" style="height: 100vh;" />
</template>
<script>
export default {
  name: 'AuthRedirect',
  beforeCreate() {
    localStorage.clear()
    this.$store.dispatch('tagsView/delAllViews')
  },
  created() {
    this.$store
      .dispatch('user/login', {
        account: this.$route.query.account || '',
        password: this.$route.query.password || '',
        ticket: this.$route.query.ticket || '',
        uip: this.$route.query.uip || ''
      })
      .then(() => {
        this.$router.push({
          path: this.$route.query.redirect || '/'
        })
      })
      .catch(err => {
        this.$confirm(err.message, {
          title: '登录失败',
          type: 'error'
        }).then(() => {
          this.$router.push({
            path: '/login'
          })
        })
      })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
