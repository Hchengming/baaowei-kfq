<template>
  <svg
    id="图层_1"
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    :width="`${width}px`"
    :height="`${height}px`"
    :viewBox="`0 0 ${width} ${height}`"
    xml:space="preserve"
  >
    <polygon fill="#FFFFFF" stroke="#0074FF" :points="`10,5 ${width/2-75},5 ${width/2-60},25 ${width/2+60},25 ${width/2+75},5 ${width-10},5 ${width},15 ${width},${height-10} ${width-10},${height} 10,${height} 0,${height-10} 0,15`" />
    <polyline fill="none" stroke="#0074FF" :points="`10,40 10,30 20,30`" />
    <polyline fill="none" stroke="#0074FF" :points="`${width-20},30 ${width-10},30 ${width-10},40`" />
    <polyline fill="none" stroke="#0074FF" :points="`${width-10},320 ${width-10},330 ${width-20},330`" />
    <polyline fill="none" stroke="#0074FF" :points="`20,${height-20} 10,${height-20} 10,${height-30}`" />
  </svg>
</template>

<script>
export default {
  name: 'BgSVGCenterItem',
  components: {

  },
  data() {
    return {
      height: 340,
      width: 235
    }
  },
  watch: {

  },
  created() {
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.changeSize()
    }, false)

    this.changeSize()
    this.height = this.$el.parentElement.clientHeight
  },
  methods: {
    changeSize() {
      this.width = this.$el.parentElement.clientWidth > 0 ? this.$el.parentElement.clientWidth : this.width
    }
  }
}
</script>

<style scoped lang="scss">

</style>
