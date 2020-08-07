<template>
  <section class="iframe-view">
    <iframe v-for="item in cachedIframes" v-show="item.show" ref="iframe" :key="item.meta.iframeUrl" :name="item.name" :src="getParamUrl(item.meta.iframeUrl)" class="iframe" :style="`height:${clientHeight}px`" />
  </section>
</template>

<script>
import { replaceUrlUserParams } from '@/utils/router'
export default {
  name: 'AppIframe',
  data() {
    return {
      iframes: []
    }
  },
  computed: {
    cachedIframes() {
      var that = this
      this.$store.state.Iframe.iframes.forEach(item => {
        item.show = item.name === that.$route.name
      })
      return this.$store.state.Iframe.iframes.filter(c => c.meta.iframeUrl)
    },
    clientHeight() {
      return document.documentElement.clientHeight - 80
    }
  },
  methods: {
    getParamUrl(url) {
      return replaceUrlUserParams(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  margin-top: 5px;
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  /*width: 100%;*/
  position: relative;
  overflow: hidden;
  .iframe-view {
    height: 100%;
    width: 100%;
    .iframe {
      height: 100%;
      width: 100%;
    }
  }
  .router-view {
    height: 100%;
    width: 100%;
  }
}

.hasTagsView {
  .iframe-view {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 74px);
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
