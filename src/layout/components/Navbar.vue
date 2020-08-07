<template>
  <div class="allbar">
    <!--顶部导航栏-->
    <div class="navbar">
      <!--首页LOGO-->
      <div class="navbar-item logo-box">
        <div class="logo-img">
          <img src="@/assets/home/LOGO.png">
        </div>
        <span class="logo-title">国土空间信息平台</span>
      </div>
      <!--工具-->
      <div v-show="showAllItem" class="navbar-item">
        <div class="navbar-tools">
          <div class="icon-item">
            <app-link to="/home">
              <span>
                <img src="@/assets/home/首页.svg" style="vertical-align:middle;margin-top: -6px;">
              </span>
              <span class="head-title">首页</span>
            </app-link>
          </div>
          <div class="icon-item head-applicaiton" style="cursor: pointer">
            <el-dropdown @command="toXtgg" @visible-change="changeState">
              <div>
                <span>
                  <img src="@/assets/home/应用-.svg" style="vertical-align:middle;margin-top: -5px;">
                </span>
                <span class="head-title">应用</span>
              </div>
              <el-dropdown-menu slot="dropdown" class="applicationDropDown">
                <div><application /></div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="icon-item head-onepic" style="cursor: pointer" @click="toYZT">
            <span>
              <img src="@/assets/home/一张图.svg" style="vertical-align: middle;margin-top: -4px;">
            </span>
            <span class="head-title">国土空间规划一张图</span>
          </div>
          <div class="icon-item head-search" style="cursor: pointer" @click="searchButton">
            <span>
              <img src="@/assets/home/搜索.svg" style="vertical-align: middle;margin-top: -5px;">
            </span>
            <span class="head-title">搜索</span>
          </div>
        </div>
      </div>
      <!--搜索-->
      <div v-show="!showAllItem" class="navbar-item navbar-search">
        <el-input
          ref="atlas-name-input"
          v-model="searchKeyword"
          size="small"
          style="cursor:pointer;width:500px;"
          clearable
          @blur="searchBlur"
        >
          <el-button slot="append" @click="searchAPI">搜索</el-button>
        </el-input>
      </div>
      <!--消息-->
      <div v-show="showAllItem" class="navbar-item navbar-message-box">
        <div class="icon-item head-addressbook" @click="showTel">
          <span>
            <img src="@/assets/home/通讯录-.svg" style="vertical-align: middle;margin-top: -4px;">
          </span>
          <span class="head-title">通讯录</span>
        </div>
        <div class="icon-item head-notice" style="cursor: pointer" @click="toNotice">
          <el-dropdown @command="toXtgg">
            <div>
              <el-badge class="badge-box" :value="noticeCount" :hidden="noticeCount==0">
                <img src="@/assets/home/系统公告.svg" style="vertical-align: baseline;">
              </el-badge>
              <span class="head-title">通知</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in xtgg"
                :key="item.Url"
                :command="item"
              >
                <b>{{ item.publisher }} :</b> {{ item.subject }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="icon-item head-mails" style="cursor: pointer" @click="toEmail">
          <el-dropdown @command="toEmailItem">
            <div>
              <el-badge :value="emailCount" :hidden="emailCount==0" class="badge-box">
                <span>
                  <img src="@/assets/home/电子邮件.svg" style="vertical-align: middle;margin-top: -7px;">
                </span>
              </el-badge>
              <span class="head-title">邮件</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item,index) in unreadEmail"
                :key="index"
                :command="item"
              >
                <b>{{ item.From }} :</b> {{ item.Subject }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="icon-item head-customer" @click="showFeedback">
          <span>
            <img src="@/assets/home/反馈.svg" style="vertical-align: middle;margin-top: -4px;">
          </span>
          <span class="head-title">帮助</span>
        </div>
      </div>
      <!--个人中心-->
      <div class="navbar-item navbar-userinfo">
        <div class="icon-item date-time">
          <span>{{ nowDate }}</span>
          <span>{{ nowWeek }}</span>
        </div>
        <screenfull id="screenfull" class="icon-item screen-full" title="全屏" />
        <el-dropdown class="avatar-container icon-item" trigger="click" style="cursor: pointer">
          <div class="avatar-wrapper">
            <span class="navbar-userinfo-name">{{ uname }}</span>
            <el-avatar
              size="small"
              :src="'userDefault.png'"
            />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/home/setting">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <!--小信-->
      <message :dispear="dispear" />
    </div>
    <div class="xiaoxin" :class="dispear===0?'':'xiaoxin1'">
      <p class="dispear">
        <a href="javascript:void(0)" class="robotStyle">
          <img src="@/assets/home/bg_0.png" class="staff_img" alt="">
        </a>
        <label class="robotWord">你好！有任何疑问，小信将热情为你解答哦~</label>
      </p>
    </div>
  </div>
</template>

<script>
import AppLink from './Sidebar/Link'
import Application from './application'
import { EmailSystemApi } from '@/utils/config'
import { OldSystemGet } from '@/api/home/ApiHome'
import Message from './message'
import Screenfull from '@/components/Screenfull'
export default {
  components: {
    Application,
    AppLink,
    Message,
    Screenfull
  },
  data() {
    return {
      searchKeyword: '',
      unreadEmail: [],
      xtgg: [],
      showAllItem: true,
      dialogVisible: false,
      timer: null,
      nowWeek: '',
      nowDate: '',
      nowTime: '',
      uname: localStorage.uname,
      noticeCount: 0,
      emailCount: 0,
      table: false,
      dispear: 0
    }
  },
  created() {
    setTimeout(() => {
      this.dispear = 1
    }, 3000)
  },
  mounted() {
    var that = this
    this.timer = setInterval(() => {
      that.setNowTimes()
    }, 1000)
    this.getUnReadEmail(that)
    this.getUnReadNotice(that)
    // 定时刷新数据
    setTimeout(() => {
      this.getUnReadEmail(that)
      this.getUnReadNotice(that)
    }, 5 * 60 * 1000)
  },

  methods: {
    showFeedback: function() {
      this.$store.commit('user/SET_DRAWERFEEDBACK', true)
    },
    showTel: function() {
      this.$store.commit('user/SET_TEL', true)
    },
    toApplication: function() {
      this.$store.commit('user/SET_DRAWER', true)
    },
    searchBlur: function() {
      var vueThis = this
      // 设置定时器
      // 离焦事件先于搜索点击事件,加一个定时器,延迟离焦事件
      this.timeoutId = setTimeout(() => {
        vueThis.showAllItem = true
        if (vueThis.searchKeyword === '') {
          return
        } else {
          vueThis.searchKeyword = ''
        }
      }, 200)
    },
    searchAPI: function() {
      if (this.searchKeyword === '') {
        this.searchBlur()
        return
      }
      this.OpenPage('智能搜索', '/NModules/Search/Index.html?key=' + this.searchKeyword + '#')
    },
    searchButton: function() {
      this.showAllItem = !this.showAllItem
      var vueThis = this
      // 解决autofocus只触发一次的问题
      this.$nextTick(() => { // 自动获取焦点 element组件autofocus失效
        vueThis.$refs['atlas-name-input'].$refs.input.focus()
      })
    },
    search: function() {
      this.dialogVisible = true
    },
    toNotice: function() {
      this.OpenPage('通知', '/home/tzdetail')
    },
    toEmail: function() {
      this.OpenPage('邮件', EmailSystemApi + '/login.aspx?ticket=' + localStorage.ticket + '&hash=module%3Dmbox.ListModule%257C%257B%2522fid%2522%253A3%252C%2522order%2522%253A%2522date%2522%252C%2522desc%2522%253Atrue%257D')
    },
    /* 显示时间*/
    setNowTimes() {
      const myDate = new Date()
      const wk = myDate.getDay()
      const yy = String(myDate.getFullYear())
      const mm = myDate.getMonth() + 1
      const dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
      const hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())
      const min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
      const sec = String(myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds())
      const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      const week = weeks[wk]
      this.nowDate = yy + '-' + mm + '-' + dd
      this.nowTime = hou + ':' + min + ':' + sec
      this.nowWeek = week
    },
    async logout() {
      await
      this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=/home`)
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    toYZT: function() {
      this.OpenPage('国土空间规划一张图', window.config.MapApi + `/login.xip?LoginMethod=portalletlogin&Userid=${localStorage.uid || 20223}#`)
    },
    toEmailItem: function(row) {
      this.OpenPage(row.Subject + row.ID, `${EmailSystemApi}/login.aspx?ticket={ticket}&hash=module%3Dread.ReadModule%7C%7B%22fid%22%3A3%2C%22moduleName%22%3A%22mbox.ListModule_0%22%2C%22viewType%22%3A%22%22%2C%22id%22%3A%22${row.ID}%22%7D`)
      var that = this
      setTimeout(() => {
        this.getUnReadEmail(that)
      }, 3000)
    },
    getUnReadEmail(that) {
      OldSystemGet('/Api/PortalLet.ashx', {
        action: 'GetPortalLetData',
        serviceName: 'Xinfo.Bus.BL.Service.EgovPlatform.PortalLet.MailPortalLetService,Xinfo.Bus.BL.Service',
        guid: 'rcgz_wdyj',
        getCount: true
      }).then(res => {
        that.unreadEmail = res.data.Data.data
        that.emailCount = res.data.Data.count
      })
    },
    getUnReadNotice(that) {
      OldSystemGet('/Api/PortalLet.ashx', {
        action: 'GetPortalLetData',
        serviceName: 'Xinfo.Bus.BL.Service.EgovPlatform.PortalLet.PublicDocmentPortalLetService,Xinfo.Bus.BL.Service',
        guid: 'rcgz_tz',
        getCount: true,
        intTypeId: 3,
        strBizType: 3
      }).then(res => {
        that.xtgg = res.data.Data.data
        that.noticeCount = res.data.Data.count
      })
    },
    toXtgg: function(row) {
      this.OpenPage(row.subject + row.docid, '/Modules/PublicDocument/view/view.htm?id=' + row.docid)
      var that = this
      setTimeout(() => {
        this.getUnReadNotice(that)
      }, 3000)
    },
    changeState(state) {
      if (state) {
        document.addEventListener('keydown', this.enterEvent)
      } else {
        document.removeEventListener('keydown', this.enterEvent, false)
      }
      console.log(state)
    },
    enterEvent(e) {
      if (e.keyCode === 13) {
        return false
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.applicationDropDown{
  position: absolute;
  top: 18px!important;
  left: 5px!important;
  z-index: 10;
  padding: 10px 0;
  margin: 35px 0;
  background-color: #fff;
  border: 1px solid #e6ebf5;
  border-radius: 4px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}
.allbar{
  position: relative;
  .navbar {
    height: 40px;
    overflow: hidden;
    position: relative;
    background: #1890ff;
    border-bottom: solid 1px #00479d;
    display: flex;
    .navbar-item{
      flex:1;
      height: 40px;
      color: white;
      .icon-item {
          vertical-align: text-bottom;
          line-height: 40px;
          display: inline-block;
          height: 40px;
          padding: 0px 8px;
          cursor: pointer;
          .icon {
            font-size: 20px;
          }
          &:hover {
            background-color: rgb(1, 71, 227);
          }
      }
      .date-time{
        width: 160px;
      }
    }
    .logo-box {
      margin-left: 20px;
      display: inline-block;
      flex: 0 0 250px;
      .logo-img{
        display:inline-block;
        vertical-align:text-bottom;
        margin-bottom: 5px;
      }
      .logo-title{
        vertical-align:text-bottom;
        font-size:18px;
        font-weight:bold;
        color: white;
        font-family: Microsoft Yahei;
        line-height: 40px;
      }
    }
    .navbar-tools{
      float: left;
    }
    .navbar-message-box{
      flex: 0 0 330px;
    }
    .head-title{
      color: white;
      font-weight:bold;
    }
    .navbar-userinfo{
      flex: 0 0 380px;
      text-align:right;
      .navbar-userinfo-name{
        color: white;
        vertical-align: super;
        line-height: 40px;
        display: inline-block;
        font-weight: 600;
        font-size: 16px;
      }
    }
    .screen-full{
      cursor: pointer;
    }

  }

  .xiaoxin1{
    transition:all 2s linear;
    width: 0 !important;
    overflow: hidden;
  }
  .xiaoxin{
      position: absolute;
      right: -0;
      z-index: 2;
      height: 32px;
      line-height: 30px;
      width:340px;
      transition: all 1s ease-in;
      background-color:rgba(255, 255, 255,0.8);
      box-shadow: 2px 2px 4px 2px #dcdfe6;
      border-top-left-radius: 24px;
      border-bottom-left-radius: 24px;
      .dispear{
          margin: 0 0 0 4px;padding: 0 6px 0 0;text-align: left;
          .robotStyle{
              width: 30px;height:30px;border-radius:50%;border:2px solid #409EFF;display: inline-block;background: #cbe6e8;vertical-align: middle;line-height: 30px;
              .staff_img{width: 20px;height: 20px;margin-top: 3px;margin-right: 3px;margin-left: 3px;}
          }
          .robotWord{color: #409EFF;font-weight: normal;vertical-align: middle;font-size: 14px;}
      }
  }
}
.el-icon-caret-bottom{
  color: white;
}
</style>

<style lang="scss">
.badge-box{
  .el-badge__content{
    top: 5px !important;
    right: -15px !important;
  }
}
.navbar-search{
  line-height:35px;
  .el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 0px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 32px;
    line-height: 32px;
    outline: none;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
  .el-input-group__append, .el-input-group__prepend {
    background-color: #F5F7FA;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #DCDFE6;
    border-radius: 0px;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
  }
  .el-input__inner:focus {
    border-radius: 0px;
    outline: none;
  }
}
</style>
