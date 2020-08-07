<template>
  <!-- <iframe v-if="$route.query.src" ref="iframe" v-loading.fullscreen.lock="fullscreenLoading" :src="$route.query.src" class="iframe" />
  <iframe v-else ref="iframe" v-loading.fullscreen.lock="fullscreenLoading" :src="urlPath" class="iframe" /> -->
  <div class="iframe" />
</template>

<script>
export default {
  name: 'MyIframe',
  components: {},
  props: {
    routerPath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fullscreenLoading: false,
      urlPath: this.getUrlPath()
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    routerPath: function(val) {
      this.urlPath = this.getUrlPath()
    }
  },
  created() {
    this.fullscreenLoading = true
  },
  mounted() {
    this.iframeInit()
    window.onresize = () => {
      this.iframeInit()
    }
  },
  methods: {
    iframeInit() {
      const iframe = this.$refs.iframe
      if (!iframe) {
        return false
      }
      const clientHeight = document.documentElement.clientHeight - 90
      iframe.style.height = `${clientHeight}px`
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          this.fullscreenLoading = false
        })
      } else {
        iframe.onload = () => {
          this.fullscreenLoading = false
        }
      }
    },
    getUrlPath: function() {
      return this.$route.meta.iframeUrl || ''
    }
  }
}
</script>

<style>
.iframe {
  width: 100%;
  height: 100%;
  border: 0;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
