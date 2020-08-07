<template>
  <svg
    id="图层_1"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    :width="`${width}px`"
    :height="`${height}px`"
    :viewBox="`0 0 ${width} ${height}`"
    xml:space="preserve"
  >
    <polygon
      fill="#FFFFFF"
      stroke="#0074FF"
      :points="`5,0 ${width/2-100},0 ${width/2-100+10},10 ${width/2+100-10},10 ${width/2+100},0 ${width-5},0 ${width},5 ${width},${height-5} ${width-5},${height} 5,${height} 0,${height-5} 0,5`"
    />
  </svg>
</template>

<script>
export default {
  name: 'BgSVGCenter',
  data() {
    return {
      height: 570,
      width: 0
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.changeSize()
    }, false)
    this.height = Math.round(this.$el.parentElement.clientHeight)
    this.changeSize()
  },
  methods: {
    changeSize() {
      var that = this
      setTimeout(() => {
        that.width = Math.round(that.$el.parentElement.clientWidth > 0 ? that.$el.parentElement.clientWidth : that.width)
      }, 100)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
