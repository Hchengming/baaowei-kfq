<template>
  <div ref="componentbox" class="dynamic-component-box">
    <div v-if="contents" class="dynamic-component-content">
      <div id="dynamic-component" />
    </div>
    <svg
      :id="`图层_${random}`"
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      :width="`${localwidth}px`"
      :height="`${localheight}px`"
      :viewBox="`0 0 ${localwidth} ${localheight}`"
      xml:space="preserve"
    >
      <polygon
        fill="#FFFFFF"
        stroke="#1890FF"
        :points="`10,0 ${localwidth-100},0 ${localwidth-90},10 ${localwidth-10},10 ${localwidth},20 ${localwidth},${localheight-10} ${localwidth-10},${localheight} 10,${localheight} 0,${localheight-10} 0,10`"
      />
    </svg>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default {
  name: 'DynamicComponent',
  props: {
    height: {
      type: Number,
      default: 240
    },
    width: {
      type: Number,
      default: 600
    },
    content: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {
      random: Math.random(),
      contents: this.content,
      localheight: this.height,
      localwidth: this.width
    }
  },
  watch: {
    content: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$set(this, 'contents', val)
        this.$set(this.content, 'param1', val.param1)
      }
    }
  },

  mounted() {
    this.pageGetWidget()
    var that = this
    window.addEventListener('resize', function() {
      that.changeSize()
    })
  },
  methods: {
    pageGetWidget() {
      const that = this
      // eslint-disable-next-line no-unused-vars
      const request = axios // 供组件里面异步调用API
      if (that.contents && that.contents.param1 && that.contents.param2) {
        // 这个组件结构是先定义好,动态组件的template  methods以及其他
        // eslint-disable-next-line no-eval
        const componentContent = eval('{var temp=' + that.contents.param2 + ';temp}')
        componentContent.template = that.contents.param1 || ''
        // 注册动态组件内容
        const DynamicComponent = Vue.extend(componentContent)
        // 将组成的组件挂载到指定的DOM
        new DynamicComponent().$mount('#dynamic-component')
      }
    },
    changeSize() {
      this.localwidth = (this.$refs.componentbox.clientWidth - 10)
      this.localheigh = this.$refs.componentbox.clientHeight
    }
  }
}
</script>
<style scoped lang="scss">
.dynamic-component-box {
  width: 380px;
  height: 240px;
  position: relative;
  .dynamic-component-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
<style lang="scss">
.dynamic-component-header {
  line-height: 40px;
  padding: 5px 10px;
  display: flex;
  span {
    padding: 0px 10px;
  }
  .iicon {
    text-align: left;
  }
  .iicon:before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
    border: 2px solid #3333ff;
  }
  .total {
    text-align: center;
    color: #f00;
  }
  .more {
    flex: 1;
    text-align: right;
    color: #60bdff;
    cursor: pointer;
    padding-right: 5%;
  }
}
.dynamic-component-body {
  padding: 2px;
  ul {
    margin: 0;
    padding-right: 5%;
    li {
      line-height: 40px;
      cursor: pointer;
    }
    li:hover {
      background: #f5f7fa;
    }
  }
}
</style>
