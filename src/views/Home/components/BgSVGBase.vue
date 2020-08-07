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
    <polygon
      fill="#FFFFFF"
      stroke="#1890FF"
      :points="`5,0 ${width-100},0 ${width-90},10 ${width-5},10 ${width},15 ${width},${height-5} ${width-5},${height} 5,${height} 0,${height-5} 0,5`"
    />
  </svg>
</template>

<script>
export default {
  name: 'BgSVGCenter',
  components: {

  },
  props: {

  },
  data() {
    return {
      height: 275,
      width: 470
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
