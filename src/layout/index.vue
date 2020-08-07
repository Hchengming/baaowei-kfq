<!--这儿是布局文件-->
<template>
  <!--layout最外层div-->
  <div class="layout">
    <div :class="classObj" class="app-wrapper">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <feedback />
      <tel />
      <quhui />
      <div :class="{hasTagsView:needTagsView}" class="main-container">
        <navbar />
        <tags-view v-if="needTagsView" />
        <app-main v-show="!this.$route.meta.iframeUrl" />
        <!-- iframe -->
        <AppIframe v-show="this.$route.meta.iframeUrl" />
      </div>
    </div>
  </div>
</template>

<script>
import { AppMain, AppIframe, Navbar, TagsView } from './components'
import { getConfig, getGuide, editGuide } from '@/api/home/ApiHome'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import tel from './components/tel'
import feedback from './components/feedback'
import Quhui from './components/quhui'

export default {
  name: 'Layout',
  components: {
    Quhui,
    feedback,
    tel,
    AppMain,
    AppIframe,
    Navbar,
    TagsView,
  },
  mixins: [ResizeMixin],
  props: {},
  data() {
    return {
      screenWidth: document.body.clientWidth,
      active: 0,
      show: 0,
      direction: 'ltr',
      guide: '',
      stepsList: [],
      routePath: '',
      nextBtn: '',
    }
  },
  computed: {
    /* 布局宽度*/
    layoutwidth() {
      return {
        width: 1903,
      }
    },

    /* 事实上...mapState并不是mapState的扩展,而是...对象展开符的扩展*/
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      showSettings: (state) => state.settings.showSettings,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      }
    },
  },
  watch: {
    $route(to) {
      this.getGuideState(to.path)
    },
  },
  created() {
    const getPath = this.$route.path
    this.routePath = getPath.substring(1)
  },
  mounted: function () {
    this.screenWidth = document.body.clientWidth
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
      })()
    }
    var that = this
    setTimeout(() => {
      // 调用引导页
      that.getGuideState()
    }, 2000)
    // 解决火狐拖拽打开百度问题
    document.body.ondrop = function (e) {
      e.stopPropagation()
      e.preventDefault()
    }
  },
  methods: {
    // 获取首页配置
    getConfig(guide) {
      getConfig(guide)
        .then((res) => {
          let stepsList = []
          stepsList = res.data
          setTimeout(() => {
            this.showGuid(stepsList)
          }, 2000)
        })
        .catch((res) => {
          console.log('error', res)
        })
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    // 获取guide
    getGuideState(changePath) {
      var uid = localStorage.uid || 0
      if (changePath) {
        const path = changePath.substring(1)
        this.routePath = path || this.routePath
      }
      getGuide(uid, this.routePath)
        .then((res) => {
          if (res.data) {
            if (res.data.guideState === 0) {
              var guide = res.data.guideId
              this.getConfig(guide)
            }
          }
        })
        .catch((res) => {
          console.log(res)
        })
    },
    // 加载引导
    showGuid(stepsList) {
      this.$driver.defineSteps(stepsList)
      this.$driver.start()
      // this.nextbtn = document.getElementsByClassName('driver-next-btn')
      // var setInter = 0
      // var clearTime = setInterval(() => {
      //   if (this.nextbtn.length > 0) {
      //     this.nextbtn[0].click()
      //     ++setInter
      //     if (setInter === stepsList.length || this.nextbtn[0].innerHTML === '完成') {
      //       clearInterval(clearTime)
      //     }
      //   } else {
      //     return false
      //   }
      // }, 2000)

      var uid = localStorage.uid || 0
      editGuide(this.routePath, uid)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {})
        .catch((res) => {
          // eslint-disable-next-line no-console
          console.log(res)
        })
    },
  },
}
</script>

<!--加了scoped影响不了element 组件-->
<style lang="scss">
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
/*layout最外层div*/
.layout {
  width: 100%;
  min-width: 1430px;
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    .dialogBody {
      position: relative;
    }

    .el-drawer.ltr,
    .el-drawer.rtl {
      top: 0;
      bottom: 0;
      position: relative;
      .el-drawer__header {
        color: white;
        background-color: blue;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        position: fixed;
        margin-bottom: 0px;
        padding: 10px;
        width: 80%;
        z-index: 100;
      }
    }
    .el-drawer {
      border: solid 1px #1890ff;
      position: absolute;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      background-color: #fff;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2),
        0 0px 0px 0px rgba(0, 0, 0, 0.14), 0 6px 6px 5px rgba(0, 0, 0, 0.12);
      /*overflow-y: scroll;*/
      overflow-x: hidden;
    }
    .el-drawer.ltr {
      left: 61px;
      top: 100px;
    }
    .el-drawer__header {
      /*渐变*/
      color: white;
      background-image: linear-gradient(
        to left,
        rgb(26, 145, 255),
        rgb(93, 191, 255)
      );
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      margin-bottom: 0px;
      padding: 10px;
    }
    /*搜索div*/
    .search {
      background-color: rgba(201, 227, 251, 1);
      .lizi {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .searchDiv {
        text-align: center;
        /*搜索输入框*/
        .searchInput {
          .searchicon {
            background-color: rgb(48, 154, 254);
            color: white;
          }
          width: 500px;
          padding: 80px 0px;
        }
      }
      /*一级菜单列表*/
      .firstAPPList {
        padding-bottom: 20px;
        color: #22334a;
        /*一级菜单列表项*/
        .firstAPPListItem {
          display: inline-block;
          padding-left: 40px;
          .shop_cart-enter-active {
            transition: all 1s ease-out;
          }
          .shop_cart-enter {
            opacity: 1;
            transform: scale(0.1);
            transform: translate(-1110px, 200px);
          }
        }
      }
    }
    .main-container {
      background-color: #f5f7fa;
      .tags-view-container {
        height: 34px;
        width: 100%;
        background: #fff;
        border-bottom: 1px solid #c8d2e2;
        box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.12),
          0 0 0px 0 rgba(0, 0, 0, 0.04);
      }
      .fixed-header {
        border: 1px solid #f5f7fa;
        position: fixed;
        top: 0;
        right: 0;
        /*防止穿透*/
        z-index: 1001;
        /*z-index: 9;*/
        width: calc(100% - #{$sideBarWidth});
        transition: width 0.28s;
      }

      .hideSidebar .fixed-header {
        width: calc(100% - 54px);
      }

      .mobile .fixed-header {
        width: 100%;
      }
    }
    /*导航对话框*/
    .navdialog {
      .title {
        background-color: blue;
        width: 100%;
        line-height: 30px;
      }
      /*对话框body*/
      .dialogBody {
        .box-card {
          width: 100%;
          display: inline-block;
          .clearfix:before,
          .clearfix:after {
            display: table;
            content: '';
          }

          .clearfix:after {
            clear: both;
          }
          .image {
            width: 100%;
            height: 50px;
            display: block;
          }
        }
      }
    }
    .secondAPPList {
      width: 100%;
      display: inline-block;
      padding: 20px;
      ul.pagination {
        display: inline-block;
        padding: 0;
        margin: 0;
      }

      ul.pagination li {
        display: inline;
      }

      ul.pagination li a {
        color: black;
        float: left;
        padding: 8px 16px;
        text-decoration: none;
      }

      ul.pagination li a.active {
        background-color: #4caf50;
        color: white;
      }

      ul.pagination li a:hover:not(.active) {
        background-color: #ddd;
      }
      .el-card.is-always-shadow {
        box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.1);
      }
      .el-card__body {
        padding: 5px 5px 0px 5px;
      }
      .el-card {
        border-radius: 4px;
        border: 1px solid #c8d2e2;
        background-color: #fff;
        overflow: hidden;
        color: #303133;
        -webkit-transition: 0.3s;
        transition: 0.3s;
        width: 140px;
        height: 140px;
      }
      .image {
        width: 100%;
        height: 90px;
      }
      /*margin-top: 200px;*/
    }

    /*自定义侧边栏*/
    .custom-sidebar-container {
      text-align: center;
      -webkit-transition: width 0.28s;
      transition: width 0.28s;
      width: 60px !important;
      background-color: #202533;
      /*background-color: #f5222d;*/
      height: 100%;
      position: fixed;
      /*font-size: 0px;*/
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
      .sidebaricon:hover {
        background: rgb(102, 112, 144);
      }
    }

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }
}
</style>
