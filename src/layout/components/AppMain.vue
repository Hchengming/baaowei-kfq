<template>
  <section class="app-main">
    <div v-show="!this.$route.meta.iframeUrl" class="router-view">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </div>
  </section>
</template>
<script>
// import { question } from '@/api/home/ApiHome'
export default {
  name: 'AppMain',
  data() {
    return {

    }
  },
  computed: {
    cachedViews() {
      this.checkRoute()
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  },
  methods: {
    checkRoute() {
      const { name } = this.$route
      if (
        name === 'Home' &&
        this.$store.state.tagsView.visitedViews.length < 2
      ) {
        this.$store.commit('settings/SET_TAGSVIEW', false)
      } else {
        this.$store.commit('settings/SET_TAGSVIEW', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main,.iframe-view {
  // margin-top: 5px;
  /* 50= navbar  50  */
  // min-height: calc(100vh - 50px);
  /*width: 100%;*/
  position: relative;
  overflow: hidden;
  overflow-y: auto;
  height: calc(100vh - 50px);
  .iframe-view {
    height: 100%;
    width: 100%;
    .iframe {
      height: 100%;
      width: 100%;
    }
  }
  .router-view {
    width: 100%; // 会有滚动条问题
    // width: 1440px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden; //去首页横向滚动条
    // overflow-x: auto; //去首页横向滚动条
  }
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    height: calc(100vh - 74px);
    // height: calc(100vh - 50px);
    // overflow-y: auto;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
